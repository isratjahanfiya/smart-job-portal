// Run manually: node scripts/seedDemoOpportunities.js
// Idempotent demonstration postings attached to an existing verified company and its recruiter.
require("dotenv").config();
const mongoose = require("mongoose");
const connect = require("../config/mongo");
const { Company, CompanyAccess, Job } = require("../models");
(async()=>{try{
  await connect();
  const company = await Company.findOne({verification_status:"verified"}).lean();
  if (!company) throw Error("Create and verify a company first.");
  const access = await CompanyAccess.findOne({company_id:String(company._id)}).lean();
  if (!access) throw Error("Verified company has no assigned recruiter.");
  const deadline = new Date(); deadline.setDate(deadline.getDate()+90);
  const examples=[
    ["Frontend Developer","full_time","IT & Software",["React","JavaScript","CSS"],25000,45000],
    ["Junior Backend Engineer","full_time","IT & Software",["Node.js","MongoDB","REST API"],30000,50000],
    ["IT Support Executive","part_time","IT & Software",["Troubleshooting","Networking"],15000,25000],
    ["Web Development Intern","internship","IT & Software",["HTML","CSS","JavaScript"],8000,12000],
    ["Software QA Intern","internship","IT & Software",["Manual Testing","Bug Reporting"],9000,13000]
  ];
  for(const [title,job_type,category,required_skills,salary_min,salary_max] of examples){
    const existing=await Job.findOne({company_id:String(company._id),title,description:/\[SmartCareer seed demo\]/});
    if(existing){console.log("Already exists:",title);continue;}
    await Job.create({company_id:String(company._id),recruiter_id:access.recruiter_id,title,job_type,category,required_skills,salary_min,salary_max,location:company.location||"Dhaka",deadline,description:`[SmartCareer seed demo] ${title} opening for testing the end-to-end application and HR recruitment workflow. Applicants should have the listed skills and interest in practical team projects.`,required_qualifications:"Relevant university study or equivalent practical experience.",approval_status:"pending",is_active:true});
    console.log("Created pending approval:",title);
  }
  console.log("Visit Admin Dashboard and approve the sample postings before they appear publicly.");
}catch(e){console.error(e.message);process.exitCode=1}finally{await mongoose.disconnect()}})();
