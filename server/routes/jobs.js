const express=require('express');const {Job,Company,CompanyAccess}=require('../models');const {authenticate,authorize}=require('../middleware/auth');const r=express.Router();
const Category=require('../models').Category;
const defaultCategories=require('../config/defaultCategories');
const esc=v=>String(v).replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
async function ensureCategories(){
  await Category.bulkWrite(defaultCategories.map(name=>({updateOne:{filter:{name},update:{$setOnInsert:{name,active:true}},upsert:true}})),{ordered:false});
}
// Include existing job categories, including old postings, even if not in the starter list.
r.get('/categories',async(req,res)=>{try{
  await ensureCategories();
  const [registered,rows]=await Promise.all([Category.find({active:true}).select('name').sort({name:1}).lean(),Job.aggregate([{$match:{approval_status:'approved',is_active:true,deadline:{$gte:new Date(new Date().toISOString().slice(0,10))}}},{$group:{_id:'$category',count:{$sum:1}}}])]);
  const counts=new Map(rows.map(x=>[x._id,x.count]));
  const names=[...new Set([...registered.map(x=>x.name),...rows.map(x=>x._id).filter(Boolean)])];
  res.json(names.map(name=>({name,count:counts.get(name)||0})));
}catch(e){console.error(e);res.status(500).json({error:'Unable to load categories'})}});
r.get('/',async(req,res)=>{try{
  const jobs=await Job.find({approval_status:'approved',is_active:true,deadline:{$gte:new Date(new Date().toISOString().slice(0,10))}}).sort({createdAt:-1}).lean();
  // Keep company_id unchanged for existing application/recruiter workflows.
  const companyIds=[...new Set(jobs.map(j=>j.company_id).filter(Boolean))];
  const companies=await Company.find({_id:{$in:companyIds.filter(id=>/^[a-f\d]{24}$/i.test(String(id)))}}).select('_id name').lean();
  const companyNames=new Map(companies.map(c=>[String(c._id),c.name]));
  res.json(jobs.map(j=>({...j,id:String(j._id),created_at:j.createdAt,company_name:companyNames.get(String(j.company_id))||'Company unavailable'})));
}catch(e){console.error('Failed to fetch jobs:',e);res.status(500).json({error:'Failed to fetch jobs'})}});
r.get('/mine',authenticate,authorize('recruiter'),async(req,res)=>{try{const jobs=await Job.find({recruiter_id:req.user.id}).sort({createdAt:-1}).lean();res.json(jobs.map(j=>({...j,id:String(j._id)})))}catch(e){res.status(500).json({error:'Unable to load your jobs.'})}});
r.get('/my-companies',authenticate,authorize('recruiter'),async(req,res)=>{try{const access=await CompanyAccess.find({recruiter_id:req.user.id}).lean();const verified=await Company.find({_id:{$in:access.map(a=>a.company_id)},verification_status:'verified'}).lean();res.json(verified.map(c=>({company_id:String(c._id),name:c.name})))}catch(e){res.status(500).json({error:'Unable to load assigned companies.'})}});
r.post('/',authenticate,authorize('recruiter'),async(req,res)=>{try{await ensureCategories();const b=req.body;const min=Number(b.salary_min),max=Number(b.salary_max),deadline=new Date(`${b.deadline}T00:00:00Z`);if(typeof b.title!=='string'||b.title.trim().length<5||typeof b.description!=='string'||b.description.trim().length<20||!(typeof b.category==='string' && await Category.exists({name:b.category,active:true}))||!['full_time','part_time','internship','contract'].includes(b.job_type)||typeof b.location!=='string'||!b.location.trim()||!Number.isFinite(min)||!Number.isFinite(max)||min<0||max<min||Number.isNaN(deadline.getTime())||deadline<new Date(new Date().toISOString().slice(0,10)))return res.status(400).json({error:'Invalid job information.'});const company=await Company.findOne({_id:b.company_id,verification_status:'verified'});const access=await CompanyAccess.exists({recruiter_id:req.user.id,company_id:String(b.company_id)});if(!company||!access)return res.status(403).json({error:'Not authorized for verified company.'});const job=await Job.create({company_id:String(company.id),recruiter_id:req.user.id,title:b.title.trim(),category:b.category,description:b.description.trim(),job_type:b.job_type,location:b.location.trim(),salary_min:min,salary_max:max,deadline,required_qualifications:b.required_qualifications||'',required_skills:Array.isArray(b.required_skills)?b.required_skills:[],approval_status:'pending'});res.status(201).json({message:'Job submitted for admin approval.',job:{...job.toObject(),id:String(job.id)}})}catch(e){console.error(e);res.status(500).json({error:'Unable to create job.'})}});
r.patch('/:id/close',authenticate,authorize('recruiter'),async(req,res)=>{try{const job=await Job.findOneAndUpdate({_id:req.params.id,recruiter_id:req.user.id},{$set:{is_active:false}},{new:true});if(!job)return res.sendStatus(404);res.json({message:'Posting closed',job})}catch(e){res.status(400).json({error:'Invalid job ID'})}});
r.put('/:id',authenticate,authorize('recruiter'),async(req,res)=>{try{const job=await Job.findOne({_id:req.params.id,recruiter_id:req.user.id,is_active:true});if(!job)return res.sendStatus(404);for(const key of ['title','description','location','required_qualifications'])if(typeof req.body[key]==='string')job[key]=req.body[key].trim();if(Array.isArray(req.body.required_skills))job.required_skills=req.body.required_skills.filter(s=>typeof s==='string').slice(0,30);job.approval_status='pending';await job.save();res.json({message:'Posting edited; awaiting approval',job})}catch(e){res.status(400).json({error:'Invalid job ID or update'})}});
module.exports=r;
