# SmartCareer — Job Comparison Fix

## সংশোধন
- Job Card-এর Compare Checkbox নির্বাচন সঙ্গে সঙ্গে Browser localStorage-এ রাখা হয় (`sc-compare`)।
- ২ অথবা ৩টি Job নির্বাচন করলে Job List-এর উপরে ও নিচে Compare Button দেখা যায়।
- Compare Page নতুন Route-এ খুললেও নির্বাচিত MongoDB Job ID সংরক্ষিত থাকে।
- MongoDB Jobs API Load শেষ হওয়ার পর Comparison Table তৈরি হয়।
- সর্বোচ্চ ৩টি Job নির্বাচন করা যাবে।
- Login, Job Apply, HR Workflow ও অন্য Pages পরিবর্তন করা হয়নি।

## Run
1. পুরোনো working project Backup রাখুন।
2. ZIP Extract করে `smartcareer-mongodb` VS Code-এ খুলুন।
3. পুরোনো `server/.env` এই Project-এর `server/`-এ Copy করুন। Secret Share করবেন না।
4. পুরোনো Backend/Frontend বন্ধ করুন।
5. Backend Terminal (server folder): `npm install`, তারপর `$env:NODE_USE_SYSTEM_CA="1"`, তারপর `npm run dev`।
6. Frontend Terminal (project root): `npm install`, তারপর `npm run dev`।
7. Student Login → `#/jobs` → দুইটি Job-এ Compare টিক দিন।
8. List-এর **উপরের** `Compare 2 selected jobs` চাপুন।
9. `#/compare`-এ Company, Salary, Location, Required Skills, Deadline, Skill Match-এর Table দেখুন।
10. Jobs Page-এ ফিরে তৃতীয় Job নির্বাচন করে Repeat করুন।

## Note
- Browser Data clear করলে নির্বাচন মুছে যাবে।
- Compare Page-এ MongoDB API unavailable হলে Table আসবে না; Backend চালু আছে কি না দেখুন।
- এই পরিবেশে সম্পূর্ণ Frontend Build এবং Local MongoDB End-to-End test চালানো হয়নি।
