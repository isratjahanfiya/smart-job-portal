import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/jobs.css";

function localDateString(date) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function dateAfter(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return localDateString(date);
}

// Demo dates are relative to today so each filter can be tested.
const demoJobs = [
  {
    id: 201,
    title: "Frontend Developer",
    company: "TechNova — Demo",
    location: "Dhaka",
    type: "Full Time",
    sector: "Private",
    published: dateAfter(0),
    deadline: dateAfter(20),
  },
  {
    id: 202,
    title: "Part Time Content Writer",
    company: "CreativeHub — Demo",
    location: "Remote",
    type: "Part Time",
    sector: "Private",
    published: dateAfter(-2),
    deadline: dateAfter(15),
  },
  {
    id: 203,
    title: "Contract Software Engineer",
    company: "DigitalSoft — Demo",
    location: "Dhaka",
    type: "Contract",
    sector: "Private",
    published: dateAfter(-4),
    deadline: dateAfter(10),
  },
  {
    id: 204,
    title: "Administrative Officer",
    company: "Government Organisation — Demo",
    location: "Dhaka",
    type: "Full Time",
    sector: "Government",
    published: dateAfter(-10),
    deadline: dateAfter(25),
  },
  {
    id: 205,
    title: "Customer Support Executive",
    company: "SupportPlus — Demo",
    location: "Chattogram",
    type: "Full Time",
    sector: "Private",
    published: dateAfter(-8),
    deadline: dateAfter(1),
  },
];

const filterNames = {
  all: "General Search",
  new: "New Jobs",
  deadline: "Deadline Tomorrow",
  "part-time": "Part Time Jobs",
  contract: "Contractual Jobs",
  government: "Government Jobs",
};

export default function Jobs({ filter = "all" }) {
  const [search, setSearch] = useState("");

  const selectedFilter = Object.hasOwn(filterNames, filter)
    ? filter
    : "all";

  const today = new Date();

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const todayText = localDateString(today);
  const tomorrowText = localDateString(tomorrow);
  const weekAgoText = localDateString(weekAgo);

  const filteredJobs = demoJobs.filter((job) => {
    const matchesSearch =
      `${job.title} ${job.company} ${job.location}`
        .toLowerCase()
        .includes(search.trim().toLowerCase());

    let matchesFilter = true;

    if (selectedFilter === "new") {
      // "New" means published within the last seven calendar days.
      matchesFilter =
        job.published >= weekAgoText &&
        job.published <= todayText;
    } else if (selectedFilter === "deadline") {
      matchesFilter = job.deadline === tomorrowText;
    } else if (selectedFilter === "part-time") {
      matchesFilter = job.type === "Part Time";
    } else if (selectedFilter === "contract") {
      matchesFilter = job.type === "Contract";
    } else if (selectedFilter === "government") {
      matchesFilter = job.sector === "Government";
    }

    return (
      matchesSearch &&
      matchesFilter &&
      job.deadline >= todayText
    );
  });

  return (
    <>
      <Navbar />

      <main className="jobs-page">
        <p className="jobs-demo-note">
          Academic prototype · Demo listings
        </p>

        <h1>{filterNames[selectedFilter]}</h1>

        <div className="jobs-page-toolbar">
          <input
            aria-label="Search jobs"
            placeholder="Search title, company or location..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            aria-label="Job category filter"
            value={selectedFilter}
            onChange={(event) => {
              window.location.hash =
                `/jobs?filter=${event.target.value}`;
            }}
          >
            {Object.entries(filterNames).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <p>{filteredJobs.length} jobs found</p>

        <div className="jobs-page-list">
          {filteredJobs.map((job) => (
            <article className="jobs-page-card" key={job.id}>
              <span className="jobs-type-badge">
                {job.type}
              </span>

              <h2>{job.title}</h2>
              <h3>{job.company}</h3>

              <p>{job.location} · {job.sector}</p>

              <div className="jobs-page-dates">
                <span>Published: {job.published}</span>
                <span>Deadline: {job.deadline}</span>
              </div>
            </article>
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <p role="status">
            No jobs match your search and selected filter.
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}