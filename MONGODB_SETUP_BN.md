# SmartCareer MongoDB edition — চালানোর নিয়ম

এই ZIP-এ আগের React UI রেখে Express backend-এর SQL query MongoDB/Mongoose দিয়ে প্রতিস্থাপন করা হয়েছে। PostgreSQL server চালানোর প্রয়োজন নেই।

1. MongoDB Community Server চালু করো এবং MongoDB Compass থেকে `mongodb://127.0.0.1:27017` connect করো।
2. `server/.env.example` copy করে `server/.env` বানাও। `JWT_SECRET`-এ শক্তিশালী random secret দাও; `.env` GitHub-এ দেবে না।
3. প্রথম Terminal: `cd server`, `npm install`, `npm run dev`।
4. দ্বিতীয় Terminal: project root-এ `npm install`, `npm run dev`। Vite-এর দেখানো localhost port খুলবে।
5. নতুন Student/Recruiter Account Website থেকে register করো। Admin তৈরি করতে `cd server` থেকে একবার `node scripts/createAdmin.js` চালাও (Terminal-এ password দৃশ্যমান হতে পারে)।
6. Recruiter login → Create Company → Admin login → Approve → Recruiter login → Post Job → Admin `/api/admin/jobs` endpoint দিয়ে Job approve করতে হবে (এর UI বাকি)।
7. MongoDB Compass-এ `smartcareer_nosql` database এবং collections দেখো। প্রথম insert-এর আগে collection নাও দেখা যেতে পারে।

## সতর্কতা / সীমাবদ্ধতা
- **পুরোনো PostgreSQL records ZIP-এ নেই।** তাই PostgreSQL Users, Companies, Jobs, Applications এই ZIP-এ migrate হয়নি। পুরোনো email/password সরাসরি কাজ করবে না—MongoDB-তে নতুন করে account বানাও অথবা আলাদা authenticated export/migration করো।
- ZIP-এ original private uploaded CV file-ও নেই। পুরোনো applicants-এর CV স্থানান্তর হয়নি।
- Home ও Internship Details-এর sample listings আলাদা demo data; `/apply-internship/:id` এখনো sample-form preview, MongoDB application নয়। Real approved MongoDB job-এর application endpoint `/api/applications` কাজের জন্য তৈরি।
- Recruiter applicant management API আছে (`/api/recruiter/applications`) কিন্তু dedicated frontend management screen এখনো যোগ করা হয়নি।
- Job approval API (`GET /api/admin/jobs`, `PATCH /api/admin/jobs/:id`) আছে, কিন্তু admin jobs approval frontend নেই।
- শুধু code/static syntax যাচাই করা হয়েছে; এখানে local MongoDB server না থাকায় runtime/database end-to-end test করা হয়নি।
- যদি শিক্ষক একেবারেই শুধুমাত্র MongoDB storage চান, CV এখন `server/private_uploads/cvs`-এ private file হিসেবে থাকে। CV-গুলো MongoDB GridFS-এ সরানোর কাজ এখনও বাকি।
