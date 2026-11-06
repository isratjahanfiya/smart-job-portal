# SmartCareer — Real Job & Internship Workflow

1. Copy the existing `server/.env` into this project (do not share it).
2. In `server`: run `npm install`, then `npm run dev`.
3. In the project root: run `npm install`, then `npm run dev`.
4. Recruiter → Post Opportunity → select verified company and choose `full_time`, `part_time`, `contract`, or `internship`.
5. Admin → Job & Internship Approval → approve pending posts.
6. `/jobs` lists approved active non-internship records. `/internships` lists recruiter-posted, approved internships alongside labeled sample data.
7. `/job/<MongoDB ID>` or `/internship/db-<MongoDB ID>` shows detail tabs and Apply button.
8. Student logs in and applies via the existing real MongoDB application form with CV. Recruiter sees applications in Manage Applicants.

## Optional: Add five genuine MongoDB demo records

From the `server` folder, run `node scripts/seedDemoOpportunities.js` once. It requires an existing verified company with recruiter access and creates three jobs + two internships, status **pending**. Admin must approve them. They are marked as demo postings. The script will not repeat the same posting when run again.

No records were inserted in your local MongoDB by generating this ZIP. Existing MongoDB data remains untouched.
