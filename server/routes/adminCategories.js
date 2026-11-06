const express=require('express');
const {Category,Job}=require('../models');
const {authenticate,authorize}=require('../middleware/auth');
const defaults=require('../config/defaultCategories');
const r=express.Router();r.use(authenticate,authorize('admin'));
async function seed(){await Category.bulkWrite(defaults.map(name=>({updateOne:{filter:{name},update:{$setOnInsert:{name,active:true}},upsert:true}})),{ordered:false})}
r.get('/',async(req,res)=>{try{await seed();res.json(await Category.find().sort({name:1}).lean())}catch(e){res.status(500).json({error:'Unable to load categories'})}});
r.post('/',async(req,res)=>{try{const name=String(req.body.name||'').trim().replace(/\s+/g,' ');if(name.length<2||name.length>90)return res.status(400).json({error:'Category name must be 2–90 characters'});const exists=await Category.findOne({name:new RegExp('^'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i')});if(exists)return res.status(409).json({error:'Category already exists; enable it if inactive'});const category=await Category.create({name,active:true});res.status(201).json(category)}catch(e){res.status(500).json({error:'Unable to create category'})}});
r.patch('/:id',async(req,res)=>{try{if(typeof req.body.active!=='boolean')return res.status(400).json({error:'active must be a boolean'});const found=await Category.findByIdAndUpdate(req.params.id,{$set:{active:req.body.active}},{new:true});if(!found)return res.sendStatus(404);res.json(found)}catch(e){res.status(400).json({error:'Invalid category ID'})}});
// Rename updates existing postings to keep category filters and statistics consistent.
r.put('/:id',async(req,res)=>{try{const name=String(req.body.name||'').trim().replace(/\s+/g,' ');if(name.length<2||name.length>90)return res.status(400).json({error:'Category name must be 2–90 characters'});const cat=await Category.findById(req.params.id);if(!cat)return res.sendStatus(404);const existing=await Category.exists({name:new RegExp('^'+name.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'$','i'),_id:{$ne:cat._id}});if(existing)return res.status(409).json({error:'Category name already exists'});const old=cat.name;cat.name=name;await cat.save();await Job.updateMany({category:old},{$set:{category:name}});res.json(cat)}catch(e){res.status(400).json({error:'Unable to rename category'})}});
module.exports=r;
