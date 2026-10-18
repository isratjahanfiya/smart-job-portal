import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { internshipData } from "../data/internships";
import "../styles/internship-details.css";

function readSavedIds() {
  try {
    const value = JSON.parse(
      localStorage.getItem("sc-internship-saved") || "[]"
    );

    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function BulletList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

const tabs = [
  ["all", "All"],
  ["requirements", "Requirements"],
  ["responsibilities", "Responsibilities"],
  ["benefits", "Salary & Benefits"],
  ["company", "Company Information"],
];

export default function InternshipDetails({ id }) {
  const job = internshipData.find(
    (item) => String(item.id) === String(id)
  );

  const [activeTab, setActiveTab] = useState("all");
  const [savedIds, setSavedIds] = useState(readSavedIds);
  const [message, setMessage] = useState("");
  const [showApplication, setShowApplication] = useState(false);

  if (!job) {
    return (
      <>
        <Navbar />

        <main className="intern-detail">
          <h1>Internship not found</h1>
          <a href="#/internships">Return to internship list</a>
        </main>

        <Footer />
      </>
    );
  }

  const saved = savedIds.includes(job.id);
  const visible = (section) =>
    activeTab === "all" || activeTab === section;

  // Compare local calendar dates, allowing applications on deadline day.
  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const expired = job.deadline < today;

  function toggleSave() {
    const next = saved
      ? savedIds.filter((savedId) => savedId !== job.id)
      : [...savedIds, job.id];

    try {
      localStorage.setItem(
        "sc-internship-saved",
        JSON.stringify(next)
      );

      setSavedIds(next);
      setMessage(
        saved
          ? "Internship removed from saved items."
          : "Internship saved on this browser."
      );
    } catch {
      setMessage("Unable to save. Check your browser storage settings.");
    }
  }

  async function shareJob() {
    const url = window.location.href;

    try {
      if (navigator.share) {
        await navigator.share({
          title: job.title,
          text: `${job.title} at ${job.company}`,
          url,
        });

        return;
      }

      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
        setMessage("Internship link copied.");
      } else {
        setMessage(`Copy this link: ${url}`);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        setMessage(`Share this link: ${url}`);
      }
    }
  }

  return (
    <>
      <Navbar />

      <main className="intern-detail">
        <a className="detail-back" href="#/internships">
          ← Internship List
        </a>

        <header className="detail-header">
          <div>
            <p className="detail-company-name">{job.company}</p>
            <h1>{job.title}</h1>
            <span className="detail-demo">
              Academic prototype · Sample listing
            </span>
          </div>

          <div className="detail-stipend">
            <span>Monthly allowance</span>
            <strong>৳{job.salary.toLocaleString()}</strong>
            <small>{job.duration} · {job.mode}</small>
          </div>
        </header>

        <div className="detail-action-row">
          <p>
            Application Deadline:{" "}
            <strong>{formatDate(job.deadline)}</strong>
          </p>

          <div className="detail-buttons">
            <button
              className="detail-primary"
              disabled={expired}
              onClick={() => setShowApplication(true)}
            >
              {expired ? "Deadline Passed" : "Apply Now"}
            </button>

            <button
              aria-pressed={saved}
              onClick={toggleSave}
            >
              {saved ? "★ Saved" : "☆ Save"}
            </button>

            <button onClick={shareJob}>Share</button>

            <button onClick={() => window.print()}>
              Print
            </button>
          </div>
        </div>

        {message && (
          <div className="detail-message" role="status">
            <span>{message}</span>
            <button
              aria-label="Dismiss message"
              onClick={() => setMessage("")}
            >
              ×
            </button>
          </div>
        )}

        <nav
          className="detail-tabs"
          aria-label="Internship information sections"
        >
          {tabs.map(([key, label]) => (
            <button
              key={key}
              className={activeTab === key ? "active" : ""}
              aria-pressed={activeTab === key}
              onClick={() => setActiveTab(key)}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="detail-summary">
          <p>
            Vacancy: <strong>{job.vacancies ?? "Not specified"}</strong>
          </p>

          <p>
            Location: <strong>{job.location}</strong>
          </p>

          <p>
            Published: <strong>{formatDate(job.published)}</strong>
          </p>
        </div>

        {job.videoCV && (
          <p className="detail-video">
            Applicants are encouraged to submit a <strong>Video CV.</strong>
          </p>
        )}

        {visible("requirements") && (
          <section className="detail-section">
            <h2>Requirements</h2>

            <h3>Education</h3>
            <BulletList items={job.education} />

            <h3>Additional Requirements</h3>
            <BulletList items={job.requirements} />
          </section>
        )}

        {visible("responsibilities") && (
          <section className="detail-section">
            <h2>Responsibilities & Context</h2>

            <p>
              <strong>Location:</strong> {job.location}
            </p>

            <p>
              <strong>Duration:</strong> {job.duration}
            </p>

            <p>{job.context}</p>

            <h3>Job Responsibilities</h3>
            <BulletList items={job.responsibilities} />
          </section>
        )}

        {visible("benefits") && (
          <section className="detail-section">
            <h2>Compensation & Other Benefits</h2>
            <BulletList items={job.benefits} />

            <h3>Employment Status</h3>
            <p>{job.employmentStatus}</p>

            <h3>Job Location</h3>
            <p>{job.location}</p>
          </section>
        )}

        {visible("company") && (
          <section className="detail-section detail-company">
            <div className="detail-company-heading">
              <div className="detail-company-logo" aria-hidden="true">
                {job.company.charAt(0)}
              </div>

              <div>
                <h2>{job.company}</h2>
                <p>
                  {job.companyInfo.industry} ·{" "}
                  {job.companyInfo.employees} Employees
                </p>
              </div>
            </div>

            <p>{job.companyInfo.description}</p>

            <h3>Address</h3>
            <p>{job.companyInfo.address}</p>
          </section>
        )}

        <aside className="detail-report">
          <h2>Safe Application Reminder</h2>
          <p>
            চাকরি পাওয়ার জন্য কোনো ব্যক্তি বা প্রতিষ্ঠানকে অর্থ প্রদান
            করবেন না। সন্দেহজনক বিজ্ঞাপন হলে platform administrator-এর
            সঙ্গে যোগাযোগ করুন।
          </p>
        </aside>

        {showApplication && (
          <section
            className="detail-section detail-application"
            aria-label="Application preview"
          >
            <h2>Apply for {job.title}</h2>

            <p>
              Frontend demo: this form does not send an application or
              upload your CV to a server.
            </p>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                setMessage(
                  "Demo form validated. No application was sent."
                );
              }}
            >
              <label>
                Full Name
                <input name="name" autoComplete="name" required />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                CV / Resume (PDF)
                <input
                  name="cv"
                  type="file"
                  accept=".pdf,application/pdf"
                  required
                />
              </label>

              <label>
                Cover Letter
                <textarea name="coverLetter" rows="5" required />
              </label>

              <div className="detail-buttons">
                <button className="detail-primary" type="submit">
                  Check Demo Application
                </button>

                <button
                  type="button"
                  onClick={() => setShowApplication(false)}
                >
                  Close
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}