# SmartCareer — Proposal Requirements and Implementation Status

Project reference: `webtechprojectproposal(3).pdf`, Section 6.1, FR-01 through FR-113. This is an **incremental update to the user's earlier MongoDB ZIP**, not proof that all 113 requirements have passed testing. Existing MongoDB user and company data remain in the running local MongoDB database and are **not** contained in a ZIP of source code.

## Features added to this updated ZIP

- **Admin Job Approval UI:** `src/components/AdminJobs.jsx` uses existing `GET /api/admin/jobs` and `PATCH /api/admin/jobs/:id` endpoints. Admin can approve/reject pending job and internship submissions.
- **Recruiter My Postings UI:** `src/components/MyPostedJobs.jsx` uses `GET /api/jobs/mine`, `PUT /api/jobs/:id`, `PATCH /api/jobs/:id/close` for listing, editing, and closing posts.
- **Recruiter Applicant Management UI:** `src/components/RecruiterApplicants.jsx` uses existing recruiter APIs for listing applicants, viewing profile/CV, setting status, sending interview date/response. Access is checked server side.
- **More Job/Internship fields:** `PostJobForm.jsx` now collects qualifications and comma-separated skills and sends them to the existing MongoDB API.
- **MongoDB notifications UI:** `src/components/MongoNotifications.jsx` displays and marks as read existing MongoDB notifications.
- **MongoDB bookmarks:** New `Bookmark` model, `/api/bookmarks` backend, `MongoSavedJobs.jsx`; published database jobs are saved to MongoDB instead of browser storage. Sample/demo listings still use browser-only state.
- **Application tracking:** My Applications now shows recruiter responses and interview date. The existing MongoDB applications API includes those fields.
- **Role-specific sidebars:** Student, recruiter, and admin navigation items are separated; this is display only, server-side authorization continues to be essential.

## What is STILL missing or requires manual end-to-end verification

- FR-08–09 password-recovery emails/token flow; FR-20 profile photo; FR-21–26 MongoDB-sourced resume builder and uploaded CV management.
- FR-27–38 full advanced search (category, salary, deadline etc.) across published DB opportunities; FR-49 related listings.
- FR-55–64 **real demo-internship application**: existing internship 101 is a sample listing. Only admin-approved MongoDB job/internship documents can be submitted to `/api/applications`.
- FR-65–69 skill matching currently uses some browser-local sample skills; needs consistent MongoDB student skills + job required_skills, recommendations and skill gap.
- FR-79 edit UI currently edits title, description, location, qualifications and skills only, not all posting fields.
- FR-84 advanced applicant filtering by qualifications/skills (basic name/email/title search added).
- FR-88–93 notifications for application submission and recruiter response are implemented; deadline reminders, matching alerts are outstanding.
- FR-94–102 complete MongoDB dashboard metrics and active/inactive counts.
- FR-104–113 admin user CRUD, reports, categories/skills, moderation/reporting workflows.
- CV PDFs are currently stored in `server/private_uploads/cvs`, **not inside MongoDB**; application metadata is MongoDB. If lecturer requires *all persistent data including file bytes* in MongoDB, implement GridFS, migrate existing uploads, and then remove file-system storage.
- NFR testing: session expiry/inactivity, input validation, mobile layout, performance, backups, browser compatibility, and load tests.

## Run steps

1. **Backup** the previously running project directory. Do not overwrite or delete MongoDB data.
2. Extract this ZIP as a **new folder**. Copy your existing local `server/.env` only to your own machine's new `server/.env` (never commit it). `MONGO_URI` should point to the same MongoDB database if you want to reuse existing accounts and companies.
3. Open the extracted project root in VS Code. Backend terminal: `cd server`, then `npm install`, then `npm run dev`.
4. Frontend terminal from root: `npm install`, then `npm run dev`. Open the exact Vite Local URL.
5. Login as **admin**, go `#/admin`, approve a pending test job or internship. Login as **recruiter**, go `#/my-postings` and `#/recruiter-applicants`. Login as **student**, test `#/saved`, `#/notifications`, apply to an approved database job. Ensure MongoDB Compass collection data changes as expected.
6. **Do not publish** until features and security are fully tested. The current project uses local development settings.

## Suggested order for finishing proposal

(1) Complete MongoDB-sourced Student Profile + CV management; (2) Real Job/Internship unified listings, search, filtering, apply; (3) Recruiter advanced candidate filtering, applicant statuses; (4) MongoDB dashboard analytics; (5) Notifications and reminders; (6) Admin moderation and reports; (7) Password reset, security checks, responsive/mobile and full test matrix.
