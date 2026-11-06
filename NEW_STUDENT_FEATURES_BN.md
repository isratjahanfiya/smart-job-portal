# New Student Features — SmartCareer

Existing recruitment workflow is retained.

- /profile: full MongoDB Student Profile, University, Department, CGPA, Year, Skills, Experience, Project, Certifications, Languages, Photo (max 250 KB).
- /resume: MongoDB-based CV preview and browser Print/Save as PDF; uploaded existing CV (PDF max 1.8 MB) stored on StudentProfile with download.
- /jobs: advanced location, category, job type, salary, skill and deadline filtering; work mode and sorting remain available.
- /career and listing cards: match score from MongoDB student skills vs posting required_skills, missing skills in opportunity details.

Start backend from server (`npm install`, `npm run dev`), frontend from project root (`npm install`, `npm run dev`). Copy your existing server/.env locally; never upload it.

Note: Demo jobs may not supply real categories/requirements. Only MongoDB-approved jobs have persistent required skills. Salary is numeric; fake/demo salary may be approximate. Browser PDF uses Print → Save as PDF. Skill match represents shared skills, not an automated hiring decision. Existing applicant CV upload on applications is unchanged.
