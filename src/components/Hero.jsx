import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaThLarge,
  FaGraduationCap,
} from "react-icons/fa";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-main">

        <div className="hero-content">

          <div className="hero-text">

            <span className="hero-small-title">
              <FaGraduationCap />
              Opportunities for a Brighter Tomorrow
            </span>

            <h1>
              Find the Right Opportunity.
              <span> Build Your Future.</span>
            </h1>

            <p>
              Discover jobs and internships, build your profile,
              get personalized recommendations, and take the next
              step in your career journey.
            </p>

          </div>

          <div className="hero-picture">

            <div className="picture-placeholder">
              <FaGraduationCap />
              <p>Your Career Starts Here</p>
            </div>

            <div className="match-floating-card">
              <strong>Get Matched Jobs</strong>
              <span>Based on your skills & career goals</span>
            </div>

          </div>

        </div>

        {/* Search */}

        <div className="search-container">

          <div className="search-field">
            <FaBriefcase />
            <div>
              <input
                type="text"
                placeholder="Job title, keyword or skill"
              />
              <span>e.g. Frontend Developer</span>
            </div>
          </div>

          <div className="search-field">
            <FaMapMarkerAlt />
            <div>
              <input
                type="text"
                placeholder="Location"
              />
              <span>e.g. Dhaka</span>
            </div>
          </div>

          <div className="search-field">
            <FaThLarge />
            <div>
              <select>
                <option>Select Category</option>
                <option>IT & Software</option>
                <option>Engineering</option>
                <option>Business</option>
                <option>Design</option>
                <option>Marketing</option>
                <option>Education</option>
              </select>

              <span>Choose job category</span>
            </div>
          </div>

          <button className="search-btn">
            <FaSearch />
            Search
          </button>

        </div>

        {/* Locations */}

        <div className="location-list">

          {[
            "Dhaka (1482)",
            "Chattogram (521)",
            "Rajshahi (214)",
            "Khulna (198)",
            "Sylhet (176)",
            "Barishal (102)",
            "Rangpur (134)",
            "Mymensingh (96)",
          ].map((location) => (
            <button key={location}>
              <FaMapMarkerAlt />
              {location}
            </button>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Hero;