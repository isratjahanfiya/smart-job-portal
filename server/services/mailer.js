// SMTP credentials are optional. Without them, no email is sent and UI reports that accurately.
const nodemailer = require('nodemailer');
function configured(){return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_FROM)}
async function sendInterviewInvite({to,name,jobTitle,companyName,when,location,message}){
 if(!configured())return {sent:false,reason:'Email not sent: SMTP is not configured. Interview is saved and shown in the student dashboard.'};
 const date=new Date(when);if(!Number.isFinite(date.getTime()))throw Error('Valid interview time is required');
 const transporter=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT||587),secure:String(process.env.SMTP_PORT)==='465',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}});
 const lines=[`Hello ${name},`,'',`You have been shortlisted for an interview for ${jobTitle} at ${companyName}.`,`Interview date and time: ${date.toLocaleString('en-GB',{timeZone:process.env.INTERVIEW_TIMEZONE||'Asia/Dhaka',dateStyle:'full',timeStyle:'short'})} (${process.env.INTERVIEW_TIMEZONE||'Asia/Dhaka'})`,`Location / meeting link: ${location}`,'',message||'Please confirm your availability by replying to this email.','','Best regards',`${companyName} Recruitment Team`];
 await transporter.sendMail({from:process.env.SMTP_FROM,to,subject:`Interview invitation: ${jobTitle} — ${companyName}`,text:lines.join('\n')});
 return {sent:true,reason:'Interview invitation email sent.'};
}
module.exports={sendInterviewInvite};
