import { FaGraduationCap } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-grid">

        <div>
          <div className="footer-logo">
            <FaGraduationCap />
            <h2>SmartCareer</h2>
          </div>

          <p>
            Helping students and job seekers discover
            better career opportunities.
          </p>
        </div>

        <div>
          <h3>For Job Seekers</h3>
          <a href="#">Jobs</a>
          <a href="#">Internships</a>
          <a href="#">Companies</a>
          <a href="#">Career Resources</a>
        </div>

        <div>
          <h3>For Employers</h3>
          <a href="#">Post a Job</a>
          <a href="#">Find Candidates</a>
          <a href="#">Recruiter Login</a>
        </div>

        <div>
          <h3>Company</h3>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 SmartCareer — Smart Job & Internship Portal
      </div>

    </footer>
  );
}

export default Footer;