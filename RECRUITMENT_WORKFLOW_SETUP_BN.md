# SmartCareer Recruitment Workflow — বাংলা Setup

এই সংস্করণটি `SmartCareer_MongoDB_Proposal_Upgrade (24).zip`-এর ওপর তৈরি। আগে থাকা Student, Recruiter, Admin, Company Approval ও Job Posting Feature রাখা হয়েছে।

## Run
1. ZIP Extract করে ভিতরের `smartcareer-mongodb` Folder VS Code-এ Open করুন।
2. পুরোনো Project-এর `server/.env` নতুন Project-এর `server/.env`-এ Copy করুন। Secret কাউকে দেবেন না।
3. Terminal 1: `cd server`, তারপর `npm install`, `npm run dev`।
4. Terminal 2: Project Root-এ `npm install`, `npm run dev`। Browser-এ Vite-এর Local URL খুলুন।
5. MongoDB Compass: `smartcareer_nosql` Database-এ `applications`, `notifications`, `jobs` Collection দেখুন।

## Real Email চালু করতে (Optional)
`server/.env`-এ নিচের ৫টি Variable যোগ করুন, নিজের SMTP Provider-এর আসল তথ্য বসিয়ে:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=youremail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM="SmartCareer HR <youremail@gmail.com>"
INTERVIEW_TIMEZONE=Asia/Dhaka
```

Gmail ব্যবহার করলে সাধারণ Password নয়, Google Account-এ App Password (যদি সেই Account-এ উপলব্ধ থাকে) ব্যবহার করুন। অন্য Provider হলে তাদের SMTP Host/Port ব্যবহার করুন। Backend Restart করুন। Gmail credentials GitHub-এ Push করবেন না।

**SMTP না থাকলে:** Email পাঠানো হবে না, UI-তে সতর্কবার্তা দেখাবে। তবু Student-এর My Applications এবং Notifications Page-এ Interview Details থাকবে। Email সফল হয়েছে কি না `applications.email_status`-এ থাকবে। Production-এ reliable delivery/queue আলাদা Enhancement।

## Full Test
1. Recruiter Login → Verified Company → `#/post` থেকে Job/Internship Post করুন।
2. Admin Login → `#/admin` থেকে Posting Approve করুন।
3. Student Login → `#/jobs` → Database Posting → Apply Now → CV PDF Upload করে Submit করুন। পুরোনো Demo Listing-এ Real Submission হয় না।
4. Recruiter Login → `#/recruiter-applicants` → Applicant-এর CV ও Information দেখুন। শুধু নিজের Recruiter Account দিয়ে Post করা Vacancy-র Application দেখতে পাবেন।
5. **Mark Under Review** → **Shortlist** → Interview Date/Time + Office Address/Meeting URL লিখে **Save Interview & Send Invitation** চাপুন। SMTP configured থাকলে Email যাবে; না থাকলে Warning দেখা যাবে।
6. Student Login → `#/applications` ও `#/notifications`-এ Status, HR Response ও Interview Details দেখুন।
7. Interview-এর পর Recruiter Applicant Card → **Mark Selected (Manual)** বা **Reject**। Student Status-এ Update দেখুন।

## Important
- Email কখনো Automatic Selection করে না। Recruiter manually Selected বা Rejected করবেন।
- Applicant CV Private Folder-এ থাকে; Recruiter Authorization ছাড়া Download করা যায় না।
- Password, JWT Secret, SMTP Credentials শেয়ার করবেন না।
- Database Job/Internship-এর জন্য Workflow কাজ করে। Preloaded Demo Internship-এর Form এখনো Demo Only।
- Existing Schema Data Delete / Reset করা হয়নি।
