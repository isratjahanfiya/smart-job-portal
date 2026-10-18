import { useMemo, useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/internships.css";

import { internshipData } from "../data/internships";

const initialFilters = {
  search: "",
  salary: 0,
  experience: "",
  fresher: false,
  category: "",
  location: "",
  deadline: "",
  mode: "",
};

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Internships() {
  const [filters, setFilters] = useState(initialFilters);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const categories = [...new Set(internshipData.map((job) => job.category))];
  const locations = [...new Set(internshipData.map((job) => job.location))];

  const updateFilter = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setPage(1);
  };

  const filteredJobs = useMemo(() => {
    return internshipData.filter((job) => {
      const searchText =
        `${job.title} ${job.company} ${job.location} ${job.category}`
          .toLowerCase();

      return (
        searchText.includes(filters.search.trim().toLowerCase()) &&
        job.salary >= Number(filters.salary) &&
        (filters.experience === "" ||
          job.experience <= Number(filters.experience)) &&
        (!filters.fresher || job.experience === 0) &&
        (!filters.category || job.category === filters.category) &&
        (!filters.location || job.location === filters.location) &&
        (!filters.deadline || job.deadline <= filters.deadline) &&
        (!filters.mode || job.mode === filters.mode)
      );
    });
  }, [filters]);

  const pageCount = Math.ceil(filteredJobs.length / perPage);
  const visibleJobs = filteredJobs.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const vacancies = filteredJobs.reduce(
    (total, job) => total + job.vacancies,
    0
  );

  const activeFilters = [
    ["search", filters.search],
    ["salary", Number(filters.salary) > 0
      ? `Minimum ৳${Number(filters.salary).toLocaleString()}`
      : ""],
    ["experience", filters.experience !== ""
      ? `Experience ≤ ${filters.experience} year(s)`
      : ""],
    ["fresher", filters.fresher ? "Fresher" : ""],
    ["category", filters.category],
    ["location", filters.location],
    ["deadline", filters.deadline
      ? `Deadline by ${formatDate(filters.deadline)}`
      : ""],
    ["mode", filters.mode],
  ].filter(([, value]) => value);

  return (
    <>
      <Navbar />

      <main className="internship-page">
        <div className="internship-summary">
          <strong>{filteredJobs.length} Internships</strong>
          <span>{vacancies} Vacancies</span>
        </div>

        <div className="internship-layout">
          <aside className="internship-filters">
            <label className="internship-search">
              <FaSearch aria-hidden="true" />
              <input
                aria-label="Search internships"
                placeholder="Search internships..."
                value={filters.search}
                onChange={(event) =>
                  updateFilter("search", event.target.value)
                }
              />
            </label>

            <details open>
              <summary>Quick Filter</summary>

              <div className="internship-filter-content">
                <label>
                  Minimum monthly stipend
                  <input
                    type="range"
                    min="0"
                    max="30000"
                    step="1000"
                    value={filters.salary}
                    onChange={(event) =>
                      updateFilter("salary", Number(event.target.value))
                    }
                  />
                  <small>
                    ৳{Number(filters.salary).toLocaleString()}
                  </small>
                </label>

                <label>
                  Maximum required experience
                  <select
                    value={filters.experience}
                    onChange={(event) =>
                      updateFilter("experience", event.target.value)
                    }
                  >
                    <option value="">Any experience</option>
                    <option value="0">No experience</option>
                    <option value="1">Up to 1 year</option>
                    <option value="2">Up to 2 years</option>
                  </select>
                </label>

                <label className="internship-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.fresher}
                    onChange={(event) =>
                      updateFilter("fresher", event.target.checked)
                    }
                  />
                  Fresher opportunities
                </label>
              </div>
            </details>

            <details>
              <summary>Category / Industry</summary>
              <div className="internship-filter-content">
                <select
                  aria-label="Category"
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
              <div className="internship-filter-content">
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
              <summary>Application Deadline</summary>
              <div className="internship-filter-content">
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
              <div className="internship-filter-content">
                <select
                  aria-label="Work mode"
                  value={filters.mode}
                  onChange={(event) =>
                    updateFilter("mode", event.target.value)
                  }
                >
                  <option value="">All work modes</option>
                  <option>Onsite</option>
                  <option>Hybrid</option>
                  <option>Remote</option>
                </select>
              </div>
            </details>

            <button
              className="internship-clear"
              onClick={clearFilters}
            >
              Clear All ×
            </button>
          </aside>

          <section className="internship-results">
            <div className="internship-active">
              <strong>Active Filters:</strong>
              <span className="internship-chip">Internship</span>

              {activeFilters.map(([key, value]) => (
                <button
                  className="internship-chip"
                  key={key}
                  onClick={() =>
                    updateFilter(key, initialFilters[key])
                  }
                  aria-label={`Remove ${value} filter`}
                >
                  {value} ×
                </button>
              ))}

              <button
                className="internship-clear-link"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>

            <div className="internship-list">
              <div className="internship-list-toolbar">
                <label>
                  Internships per page
                  <select
                    value={perPage}
                    onChange={(event) => {
                      setPerPage(Number(event.target.value));
                      setPage(1);
                    }}
                  >
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </label>
              </div>
{visibleJobs.map((job) => (
  <a
    className="internship-list-card internship-card-link"
    key={job.id}
    href={`#/internship/${job.id}`}
  >
    <h2>{job.title}</h2>
    <h3>{job.company}</h3>

    <p>
      <FaMapMarkerAlt aria-hidden="true" />
      {job.location}
    </p>

    <div className="internship-card-bottom">
      <p>
        <FaBriefcase aria-hidden="true" />
        {job.experience === 0
          ? "No experience required"
          : `${job.experience} year experience`}
      </p>

      <p>
        <FaCalendarAlt aria-hidden="true" />
        Deadline: {formatDate(job.deadline)}
      </p>
    </div>

    <div className="internship-card-meta">
      <span>
        ৳{job.salary.toLocaleString()} / month
      </span>
      <span>{job.mode}</span>
    </div>
  </a>
))}
              {visibleJobs.length === 0 && (
                <div className="internship-empty" role="status">
                  No internships match your filters.
                  <button onClick={clearFilters}>Reset filters</button>
                </div>
              )}

              {pageCount > 1 && (
                <nav
                  className="internship-pagination"
                  aria-label="Internship pages"
                >
                  {Array.from({ length: pageCount }, (_, index) => (
                    <button
                      key={index}
                      className={page === index + 1 ? "selected" : ""}
                      aria-current={page === index + 1 ? "page" : undefined}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </nav>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}