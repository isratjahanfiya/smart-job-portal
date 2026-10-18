# SmartCareer frontend continuation

Run `npm install`, then `npm run dev`. Run `npm run build` for a production build.

Homepage preserved; Navbar now links to pages. Hash routing needs no extra dependency.
Pages: jobs, internships, details, demo account forms, profile, printable resume, application form/history, saved/recent listings, comparison, company directory/details, career matching, dashboard, notifications, calendar, recruiter applicant review/interviews/posting, admin preview, about.

Demo state is stored in browser localStorage. Account forms DO NOT authenticate; recruiter/admin screens are public previews. CV files are not uploaded, only filenames are recorded. Match score is the percentage of required skills found in the comma-separated profile skills, not a hiring probability.

Remaining backend work: MySQL schema; Express APIs; JWT/bcrypt authentication and authorization; secure file uploads; recovery email; real notifications; company verification/moderation; posting edit/close; advanced filters; automated deadline reminders; tests and deployment. Existing homepage sample figures and match percentages remain illustrative. Use a backend before real recruitment data.
