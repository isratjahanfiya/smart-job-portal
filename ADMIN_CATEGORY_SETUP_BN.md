# SmartCareer: Category Management + Home Page Test

1. Extract ZIP. Copy your existing `server/.env` into the new `server/` folder. Never upload `.env` to GitHub.
2. Backend terminal from `server`: `npm install`, `$env:NODE_USE_SYSTEM_CA="1"`, `npm run dev`.
3. Frontend terminal from project root: `npm install`, `npm run dev`. Stop previous servers first.
4. Admin login → `#/admin` → **Manage Job Categories**. Add `Electrical & Electronics`, `Renewable Energy` or any new name if missing. No code edits needed.
5. Recruiter login → `#/post` → select an active category and verified company → submit. Check all required fields and deadline.
6. Admin login → `#/admin` → Approve the pending job.
7. Home page → category count updates for approved active unexpired jobs; click category card to view filtered jobs. Search keyword/location/category and Quick Links.
8. MongoDB Compass `smartcareer_nosql`: check `categories` and `jobs`. Data already in the database is not deleted.

Notes: The Home layout is retained, and new categories without a bespoke icon use a briefcase icon. Disabled categories disappear from recruiter choices; old postings are retained. The app includes hard-coded sample UI elsewhere; only approved active real jobs are counted. No live MongoDB end-to-end test is performed here.
