const router=require('express').Router();
const mongoose=require('mongoose');
const {Bookmark,Job}=require('../models');
const {authenticate,authorize}=require('../middleware/auth');
router.use(authenticate,authorize('student'));
router.get('/',async(req,res)=>{try{const items=await Bookmark.find({user_id:req.user.id}).sort({createdAt:-1}).lean();res.json(items.map(x=>({id:String(x._id),job_id:x.job_id})));}catch(e){res.status(500).json({error:'Unable to load bookmarks'});}});
router.post('/',async(req,res)=>{try{const id=req.body.job_id;if(!mongoose.isValidObjectId(id))return res.status(400).json({error:'Invalid job ID'});const job=await Job.findById(id);if(!job||job.approval_status!=='approved'||!job.is_active)return res.status(404).json({error:'Job unavailable'});const b=await Bookmark.findOneAndUpdate({user_id:req.user.id,job_id:id},{$setOnInsert:{user_id:req.user.id,job_id:id}},{upsert:true,new:true});res.json({message:'Saved',id:String(b.id)});}catch(e){res.status(500).json({error:'Unable to save job'});}});
router.delete('/:id',async(req,res)=>{try{await Bookmark.deleteOne({user_id:req.user.id,job_id:req.params.id});res.json({message:'Removed'});}catch(e){res.status(500).json({error:'Unable to remove bookmark'});}});
module.exports=router;
