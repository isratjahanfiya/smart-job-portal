# SmartCareer — Four New Features (বাংলা গাইড)

1. **Deadline Countdown:** Student Login → `#/jobs` → Approved Job Card-এ `days remaining` দেখো। Date অতিক্রম করলে `Closed` দেখাবে। Deadline হিসাবের জন্য MongoDB-এর ISO তারিখ ব্যবহৃত হয়।
2. **Comparison:** Jobs Page-এ ২ বা ৩টি Job-এর `Compare` Checkbox টিক দাও → `Compare selected` চাপো → `#/compare`-তে Salary, Location, Skills, Deadline, Match Score পাশাপাশি তুলনা করো।
3. **CV Quality:** Student Login → `#/cv-quality` অথবা `#/resume` → Missing Fields ও Completeness Score দেখো; Profile Update করে Refresh করলে Score পরিবর্তন হবে। এটি কেবল completeness checker, PDF content parser নয়।
4. **Interview Calendar:** Student Login → `#/calendar` → Upcoming Interviews দেখো → `Add to Calendar (.ics)` Download করে Outlook/Google Calendar-এ Import করো। Reminder Calendar App-এর ওপর নির্ভরশীল।

**এখনও সীমাবদ্ধতা:** Deadline Countdown পেজ খোলা থাকলে মিনিটে আপডেট হয়; Demo Jobs-এর কিছু Date ISO নয়। Calendar automated background email/push reminders পাঠায় না; বিদ্যমান HR Interview Email ব্যবস্থা আলাদা কাজ করে।

## চালানো
Backend: `cd server`, `npm install`, `$env:NODE_USE_SYSTEM_CA="1"`, `npm run dev`। Frontend (root): `npm install`, `npm run dev`। আগের `server/.env` কপি করো; Git-এ শেয়ার করবে না।
