# SmartCareer Category, Search & Quick Links — Test Guide

## New behavior
- Home categories link to `#/jobs?category=<category name>`.
- Category counts are calculated from MongoDB approved, active, non-expired jobs.
- Search box can combine keyword, location and category.
- Location shortcuts and Quick Links open relevant Jobs/Internships pages.
- Recruiter Post Job category list includes all Home categories.
- Newly posted jobs require admin approval before public listing/counts update.
- Jobs listing shows an empty-state message when none match.

## Running
1. Extract the ZIP and open `smartcareer-mongodb` in VS Code.
2. Copy your working *private* `server/.env` locally. Never commit or share it.
3. Backend terminal inside `server`: `npm install` then `$env:NODE_USE_SYSTEM_CA="1"` if your network requires Windows CA, then `npm run dev`.
4. Frontend terminal inside `smartcareer-mongodb`: `npm install` then `npm run dev`.
5. Open the Vite Local URL.

## Test
1. Recruiter login → Post Opportunity → category `Accounting & Finance` → submit.
2. Admin login → Job & Internship Approval → approve.
3. Home category card `Accounting & Finance` → Jobs page should show this job.
4. Return Home: category count should increase according to approved active jobs in your DB.
5. Try Search keyword and Dhaka location plus category. Check filtered results.
6. Quick Links: New Jobs, Internships, Part-time, Remote and Fresher Jobs.
7. Category without matching jobs should show `No opportunities found`.

## Notes
- Existing records missing a category will not match category filters until recruiter updates/reposts them with a valid category.
- Category counts exclude pending/rejected, closed and expired jobs.
- Some older homepage feature cards, demo job cards, company directory and marketing metrics are still demonstration content; no real MongoDB metric is invented for them.
- No existing MongoDB records are changed by opening this project. You must add and approve jobs in the running site.
