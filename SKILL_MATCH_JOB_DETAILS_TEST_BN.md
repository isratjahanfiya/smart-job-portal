# Job Details Skill Match — Testing

1. পুরোনো Project-এর `server/.env` নতুন Project-এর `server` Folder-এ Copy করো। Secret কাউকে পাঠাবে না।
2. অন্য Project-এর Backend বন্ধ করে নতুন Project-এর `server` Folder থেকে `npm install` এবং `npm run dev` চালাও। SMTP Certificate সমস্যা থাকলে আগের মতো একই Terminal-এ `$env:NODE_USE_SYSTEM_CA="1"` চালিয়ে Backend Start করো।
3. মূল `smartcareer-mongodb` Folder থেকে আলাদা Terminal-এ `npm install` ও `npm run dev` চালাও।
4. Student Account দিয়ে Login করে `#/profile`-এ Skills Save করো: `AutoCAD, Circuit Analysis, Electrical Design`।
5. `#/jobs` থেকে Junior Electrical Engineer-এর View Details খোলো। Your Skill Match Section-এ 60%, matched 3টি, missing Troubleshooting ও MS Office হওয়ার কথা, যদি Job-এ ওই 5টি required skills থাকে।
6. Profile-এ আরো `Troubleshooting, MS Office` যোগ করলে Details Page পুনরায় খুলে 100% দেখো।
7. Student Login ছাড়া বা Recruiter/Admin Login-এ ব্যক্তিগত match লুকানো থাকবে।

এই Update শুধু `src/pages/RealOpportunityDetails.jsx` এবং `src/styles/internship-details.css` পরিবর্তন করেছে। Existing login, apply, recruiter এবং admin code অপরিবর্তিত আছে।
