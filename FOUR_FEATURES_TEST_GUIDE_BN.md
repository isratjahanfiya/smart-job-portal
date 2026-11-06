# SmartCareer — Four Features Testing Guide

এই ZIP আগের SmartCareer Admin Custom Categories & Front Page Fixed প্রজেক্টের ওপর তৈরি। পুরোনো database, .env, application, job posting ও interview email logic অপরিবর্তিত। নতুন কোনো `.env` ZIP-এ নেই।

## চালু করা
1. ZIP Extract করে ভিতরের `smartcareer-mongodb` Folder VS Code-এ খুলবে।
2. পুরোনো Working Project-এর `server/.env` File নতুন `server` Folder-এ Copy করবে। `.env` GitHub-এ Push করবে না।
3. পুরোনো Project-এর Backend/Frontend বন্ধ করবে; MongoDB চালু রাখবে।
4. Server Terminal: `cd server`, `npm install`, Windows certificate problem থাকলে `$env:NODE_USE_SYSTEM_CA="1"`, তারপর `npm run dev`।
5. Frontend Terminal (main project Folder): `npm install`, `npm run dev`। Browser-এ Vite `Local:` URL খুলবে।

## 1 Student Application Progress Tracker (FR-61–64, FR-86)
Student login → `#/applications` → Application Progress-এ Applied / Under Review / Shortlisted / Interview / Selected দেখবে। Recruiter `#/recruiter-applicants` থেকে Status পরিবর্তন করলে Student Page Refresh করে নতুন Stage দেখবে। Rejected Status আলাদাভাবে দেখায়। পুরোনো Applications-এর পুরোনো status timestamps না থাকলে নতুন status changes থেকে history জমা হবে। MongoDB: `applications.status_history`।

## 2 Recruiter Analytics Dashboard (FR-100–102)
Recruiter login → `#/recruiter-analytics` (অথবা `#/recruiter`-এ Analytics)। Posted Jobs, Active Jobs, Received Applications, Shortlisted, Interviews, Selected এবং per-job Applications দেখতে পাবে। শুধু ওই Recruiter-এর নিজের Posted Jobs থেকে সংখ্যা গণনা হয়।

## 3 Smart Job Recommendations (FR-65–69)
Student login → `#/profile` → Skills + Career Goal Save → `#/recommendations`। Approved, Active, Non-expired MongoDB Jobs থেকে Match Percent, Matched & Missing Skills দেখাবে। Percentage শুধুই exact normalized skills overlap; কোনো Job-এর Required Skills না থাকলে Not available। Career Goal Job Title/Category-এর সঙ্গে মেললে আগে দেখানো হবে। Job Detail Click করে Apply করতে পারবে।

## 4 Admin Analytics & Reports (FR-103–113-এর রিপোর্টিং অংশ)
Admin login → `#/admin-analytics` অথবা `#/admin`-এর উপরে Platform Analytics। Users, Students, Recruiters, Companies, Verified Companies, Approved Active Jobs, Pending Jobs, Applications এবং Category Counts দেখা যাবে। `Export CSV` চাপলে রিপোর্ট Download হবে। User Management, Category Editing, Job Moderation আগের Project অনুযায়ী থাকবে।

## API
- GET `/api/insights/student/recommendations` — student only
- GET `/api/insights/recruiter/analytics` — recruiter only
- GET `/api/insights/admin/analytics` — admin only

## Security & verification
- Backend JWT role protection অপরিবর্তিত।
- MongoDB `smartcareer_nosql` data delete করা লাগবে না।
- Backend syntax verified. Frontend npm installation/build and local MongoDB end-to-end tests এই পরিবেশে শেষ করা যায়নি।
- Interview email-এর জন্য পুরোনো working SMTP `.env` ও certificate setting বজায় রাখতে হবে।
