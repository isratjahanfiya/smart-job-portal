import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaBell,
  FaChevronDown,
  FaGraduationCap,
  FaSearch,
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
  FaFileContract,
  FaLandmark,
} from "react-icons/fa";
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-container">

        {/* Logo */}
        <div className="logo">
          <FaGraduationCap className="logo-icon" />

          <div>
            <h2>SmartCareer</h2>
            <span>Job & Internship Portal</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <a href="#/" className="active-link">
            Home
          </a>

      <div className="jobs-nav-dropdown">
  <button className="jobs-nav-trigger" type="button">
    Jobs <FaChevronDown className="small-icon" />
  </button>

  <div className="jobs-mega-menu">
    <p className="jobs-menu-label">JOBS</p>

    <div className="jobs-menu-grid">
      <a href="#/jobs?filter=all">
        <span className="jobs-menu-icon">
          <FaSearch />
        </span>
        General Search
      </a>

      <a href="#/jobs?filter=new">
        <span className="jobs-menu-icon">
          <FaBriefcase />
        </span>
        New Jobs
      </a>

      <a href="#/jobs?filter=deadline">
        <span className="jobs-menu-icon">
          <FaCalendarAlt />
        </span>
        Deadline Tomorrow
      </a>

      <a href="#/jobs?filter=part-time">
        <span className="jobs-menu-icon">
          <FaClock />
        </span>
        Part Time Jobs
      </a>

      <a href="#/jobs?filter=contract">
        <span className="jobs-menu-icon">
          <FaFileContract />
        </span>
        Contractual Jobs
      </a>

      <a href="#/jobs?filter=government">
        <span className="jobs-menu-icon">
          <FaLandmark />
        </span>
        Government Jobs
      </a>
    </div>
  </div>
</div>

         <a href="#/internships">Internships</a>

          <a href="#/companies">
            Companies <FaChevronDown className="small-icon" />
          </a>

          <a href="#/career">
            Career Resources <FaChevronDown className="small-icon" />
          </a>

          <a href="#/about">About</a>

          {/* Mobile Buttons */}
          <div className="mobile-buttons">
            <button className="login-btn" onClick={()=>location.hash="/login"}>Login</button>
            <button className="create-btn" onClick={()=>location.hash="/register"}>Create Account</button>
          </div>
        </nav>

        {/* Right Side */}
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Toggle theme" onClick={()=>document.body.classList.toggle("portal-dark")}>
            <FaMoon />
          </button>

          <button className="icon-btn notification-btn" onClick={()=>location.hash="/notifications"}>
            <FaBell />
            <span className="notification-number">3</span>
          </button>

          <button className="login-btn" onClick={()=>location.hash="/login"}>Login</button>

          <button className="create-btn" onClick={()=>location.hash="/register"}>
            Create Account
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>
    </header>
  );
}

export default Navbar;