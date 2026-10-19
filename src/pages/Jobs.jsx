import { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaAward,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/jobs.css";

function dateAfter(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");
}

function formatDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Sample listings. Replace with your own data or backend response.
const jobs = [
  {
    id: 201,
    title: "Senior Officer - HR",
    company: "Green Industry Council",
    initials: "GIC",
    location: "Anywhere in Bangladesh",
    category: "Human Resources",
    experience: 3,
    salary: 45000,
    vacancies: 2,
    type: "Full Time",
    sector: "Private",
    mode: "Onsite",
    published: dateAfter(-2),
    deadline: dateAfter(30),
    featured: true,
    color: "#109653",
  },
  {
    id: 202,
    title: "Assistant Manager - Application Development",
    company: "DigitalPay Limited",
    initials: "DP",
    location: "Dhaka",
    category: "Software Development",
    experience: 4,
    salary: 80000,
    vacancies: 3,
    type: "Full Time",
    sector: "Private",
    mode: "Hybrid",
    published: dateAfter(-1),
    deadline: dateAfter(13),
    featured: true,
    color: "#ed5838",
  },
  {
    id: 203,
    title: "Manager - Finance & Operations",
    company: "Unicorn Properties — Demo",
    initials: "UP",
    location: "Dhaka",
    category: "Finance",
    experience: 6,
    salary: 90000,
    vacancies: 1,
    type: "Contract",
    sector: "Private",
    mode: "Onsite",
    published: dateAfter(-4),
    deadline: dateAfter(13),
    featured: true,
    color: "#a77d24",
  },
  {
    id: 204,
    title: "Youth Campaign Mentor",
    company: "Community Development — Demo",
    initials: "CD",
    location: "Dhaka",
    category: "Development",
    experience: 2,
    salary: 30000,
    vacancies: 4,
    type: "Part Time",
    sector: "Private",
    mode: "Hybrid",
    published: dateAfter(-8),
    deadline: dateAfter(1),
    featured: true,
    color: "#00a5bb",
  },
  {
    id: 205,
    title: "Officer - Special Asset Management",
    company: "Finance Corporation — Demo",
    initials: "FC",
    location: "Chattogram",
    category: "Finance",
    experience: 2,
    salary: 40000,
    vacancies: 2,
    type: "Full Time",
    sector: "Private",
    mode: "Onsite",
    published: dateAfter(-3),
    deadline: dateAfter(18),
    featured: false,
    color: "#2653a1",
  },
  {
    id: 206,
    title: "Assistant Instructor - Technical Skills",
    company: "Technical Institute — Demo",
    initials: "TI",
    location: "Dhaka",
    category: "Education",
    experience: 1,
    salary: 28000,
    vacancies: 3,
    type: "Contract",
    sector: "Private",
    mode: "Onsite",
    published: dateAfter(-5),
    deadline: dateAfter(20),
    featured: false,
    color: "#bb8741",
  },
  {
    id: 207,
    title: "Junior Frontend Developer",
    company: "TechNova — Demo",
    initials: "TN",
    location: "Remote",
    category: "Software Development",
    experience: 0,
    salary: 25000,
    vacancies: 5,
    type: "Full Time",
    sector: "Private",
    mode: "Remote",
    published: dateAfter(0),
    deadline: dateAfter(15),
    featured: false,
    color: "#7853be",
  },
  {
    id: 208,
    title: "Administrative Officer",
    company: "Public Organisation — Demo",
    initials: "PO",
    location: "Rajshahi",
    category: "Administration",
    experience: 0,
    salary: 22000,
    vacancies: 6,
    type: "Full Time",
    sector: "Government",
    mode: "Onsite",
    published: dateAfter(-10),
    deadline: dateAfter(25),
    featured: false,
    color: "#21816e",
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

const initialFilters = {
  search: "",
  minSalary: 0,
  maxExperience: "",
  fresher: false,
  category: "",
  location: "",
  deadline: "",
  mode: "",
  type: "",
};

export default function Jobs({ filter = "all" }) {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(6);

  const selectedFilter = Object.hasOwn(filterNames, filter)
    ? filter
    : "all";

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  }

  function clearFilters() {
    setFilters({ ...initialFilters });
    setPage(1);
    window.location.hash = "/jobs?filter=all";
  }

  const filteredJobs = jobs
    .filter((job) => {
      const searchText =
        `${job.title} ${job.company} ${job.location} ${job.category}`
          .toLowerCase();

      let matchesMenu = true;

      if (selectedFilter === "new") {
        matchesMenu =
          job.published >= dateAfter(-7) &&
          job.published <= dateAfter(0);
      } else if (selectedFilter === "deadline") {
        matchesMenu = job.deadline === dateAfter(1);
      } else if (selectedFilter === "part-time") {
        matchesMenu = job.type === "Part Time";
      } else if (selectedFilter === "contract") {
        matchesMenu = job.type === "Contract";
      } else if (selectedFilter === "government") {
        matchesMenu = job.sector === "Government";
      }

      return (
        matchesMenu &&
        job.deadline >= dateAfter(0) &&
        searchText.includes(filters.search.trim().toLowerCase()) &&
        job.salary >= Number(filters.minSalary) &&
        (filters.maxExperience === "" ||
          job.experience <= Number(filters.maxExperience)) &&
        (!filters.fresher || job.experience === 0) &&
        (!filters.category || job.category === filters.category) &&
        (!filters.location || job.location === filters.location) &&
        (!filters.deadline || job.deadline <= filters.deadline) &&
        (!filters.mode || job.mode === filters.mode) &&
        (!filters.type || job.type === filters.type)
      );
    })
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        b.published.localeCompare(a.published)
    );

  const totalVacancies = filteredJobs.reduce(
    (total, job) => total + job.vacancies,
    0
  );

  const pageCount = Math.ceil(filteredJobs.length / perPage);
  const currentPage = Math.min(page, Math.max(1, pageCount));

  const visibleJobs = filteredJobs.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const categories = [...new Set(jobs.map((job) => job.category))];
  const locations = [...new Set(jobs.map((job) => job.location))];

  function pagination() {
    if (pageCount <= 1) return null;

    return (
      <nav className="js-pagination" aria-label="Job result pages">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            className={currentPage === index + 1 ? "active" : ""}
            aria-current={
              currentPage === index + 1 ? "page" : undefined
            }
            onClick={() => setPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </nav>
    );
  }

  return (
    <>
      <Navbar />

      <main className="job-search-page">
        <div className="js-topbar">
          <div className="js-count">
            <strong>{filteredJobs.length} Jobs</strong>
            <span>{totalVacancies} Vacancies</span>
          </div>

          {pagination()}
        </div>

        <div className="js-layout">
          <aside className="js-sidebar">
            <label className="js-search">
              <FaSearch aria-hidden="true" />

              <input
                aria-label="Search jobs"
                placeholder="Search for Jobs..."
                value={filters.search}
                onChange={(event) =>
                  updateFilter("search", event.target.value)
                }
              />
            </label>

            <details open>
              <summary>Quick Filter</summary>

              <div className="js-filter-body">
                <label>
                  Minimum Monthly Salary

                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value={filters.minSalary}
                    onChange={(event) =>
                      updateFilter(
                        "minSalary",
                        Number(event.target.value)
                      )
                    }
                  />

                  <small>
                    ৳{Number(filters.minSalary).toLocaleString()}
                  </small>
                </label>

                <label>
                  Maximum Required Experience

                  <select
                    value={filters.maxExperience}
                    onChange={(event) =>
                      updateFilter("maxExperience", event.target.value)
                    }
                  >
                    <option value="">Any experience</option>
                    <option value="0">No experience</option>
                    <option value="1">Up to 1 year</option>
                    <option value="2">Up to 2 years</option>
                    <option value="3">Up to 3 years</option>
                    <option value="5">Up to 5 years</option>
                    <option value="10">Up to 10 years</option>
                  </select>
                </label>

                <label className="js-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.fresher}
                    onChange={(event) =>
                      updateFilter("fresher", event.target.checked)
                    }
                  />
                  Fresher
                </label>
              </div>
            </details>

            <details>
              <summary>Category / Industry</summary>

              <div className="js-filter-body">
                <select
                  aria-label="Category or industry"
                  value={filters.category}
                  onChange={(event) =>
                    updateFilter("category", event.target.value)
                  }
                >
                  <option value="">All categories</option>

                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </div>
            </details>

            <details>
              <summary>Location</summary>

              <div className="js-filter-body">
                <select
                  aria-label="Location"
                  value={filters.location}
                  onChange={(event) =>
                    updateFilter("location", event.target.value)
                  }
                >
                  <option value="">All locations</option>

                  {locations.map((location) => (
                    <option key={location}>{location}</option>
                  ))}
                </select>
              </div>
            </details>

            <details>
              <summary>Posted / Deadline</summary>

              <div className="js-filter-body">
                <label>
                  Publication / Deadline Filter

                  <select
                    value={selectedFilter}
                    onChange={(event) => {
                      setPage(1);
                      window.location.hash =
                        `/jobs?filter=${event.target.value}`;
                    }}
                  >
                    {Object.entries(filterNames).map(
                      ([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label>
                  Deadline on or before

                  <input
                    type="date"
                    value={filters.deadline}
                    onChange={(event) =>
                      updateFilter("deadline", event.target.value)
                    }
                  />
                </label>
              </div>
            </details>

            <details>
              <summary>Other Filters</summary>

              <div className="js-filter-body">
                <label>
                  Work Mode

                  <select
                    value={filters.mode}
                    onChange={(event) =>
                      updateFilter("mode", event.target.value)
                    }
                  >
                    <option value="">All modes</option>
                    <option>Onsite</option>
                    <option>Hybrid</option>
                    <option>Remote</option>
                  </select>
                </label>

                <label>
                  Employment Type

                  <select
                    value={filters.type}
                    onChange={(event) =>
                      updateFilter("type", event.target.value)
                    }
                  >
                    <option value="">All types</option>
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contract</option>
                  </select>
                </label>
              </div>
            </details>

            <button
              type="button"
              className="js-clear"
              onClick={clearFilters}
            >
              Clear All Filters
            </button>
          </aside>

          <section className="js-results">
            <header className="js-results-header">
              <h1>
                <FaAward aria-hidden="true" />
                {selectedFilter === "all"
                  ? "General Search"
                  : filterNames[selectedFilter]}
              </h1>

              <label>
                Jobs per page

                <select
                  value={perPage}
                  onChange={(event) => {
                    setPerPage(Number(event.target.value));
                    setPage(1);
                  }}
                >
                  <option value="6">6</option>
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="50">50</option>
                </select>
              </label>
            </header>

            <p className="js-demo-note">
              Demo listings · Featured jobs appear first
            </p>

            <div className="js-card-grid">
              {visibleJobs.map((job) => (
                <article className="js-job-card" key={job.id}>
                  <div className="js-card-main">
                    <div>
                      {job.featured && (
                        <span className="js-featured">Featured</span>
                      )}

                      <h2>{job.title}</h2>
                      <h3>{job.company}</h3>

                      <p className="js-location">
                        <FaMapMarkerAlt aria-hidden="true" />
                        {job.location}
                      </p>
                    </div>

                    <div
                      className="js-company-mark"
                      style={{ color: job.color }}
                      aria-label={`${job.company} initials`}
                    >
                      {job.initials}
                    </div>
                  </div>

                  <div className="js-card-tags">
                    <span>{job.type}</span>
                    <span>{job.mode}</span>
                  </div>

                  <div className="js-card-footer">
                    <span>
                      <FaBriefcase aria-hidden="true" />
                      {job.experience === 0
                        ? "Fresher"
                        : `At least ${job.experience} years`}
                    </span>

                    <span>
                      <FaCalendarAlt aria-hidden="true" />
                      {formatDate(job.deadline)}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {visibleJobs.length === 0 && (
              <div className="js-empty" role="status">
                <h2>No jobs found</h2>
                <p>Try another search or clear your filters.</p>
                <button onClick={clearFilters}>Reset filters</button>
              </div>
            )}

            <div className="js-bottom-pagination">
              {pagination()}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}