import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import JobCard from "../components/JobCard";
import Footer from "../components/Footer";
import TopHeader from "../components/TopHeader";
import { jobs, internships } from "../data/data";

import {
  FaBriefcase,
  FaGraduationCap,
  FaBuilding,
  FaUsers,
  FaLaptopCode,
  FaChartBar,
  FaCog,
  FaPalette,
  FaBook,
  FaHeartbeat,
  FaHeadset,
  FaArrowRight,
  FaUniversity,
  FaSeedling,
  FaHotel,
  FaHandsHelping,
  FaTruck,
  FaFlask,
  FaUserTie,
  FaBullhorn,
  FaKeyboard,
  FaTshirt,
  FaUsersCog,
  FaShieldAlt,
  FaGavel,
  FaShoppingCart,
  FaTools,
  FaCar,
  FaUtensils,
  FaMotorcycle,
  FaPaintBrush,
  FaBolt
} from "react-icons/fa";

function Home() {

  const categories = [
    
  {
    name: "Accounting & Finance",
    jobs: 461,
    icon: <FaChartBar />,
  },
  {
    name: "Production & Operation",
    jobs: 216,
    icon: <FaCog />,
  },
  {
    name: "Agro & Fisheries",
    jobs: 95,
    icon: <FaSeedling />,
  },
  {
    name: "Bank & Financial Institution",
    jobs: 89,
    icon: <FaUniversity />,
  },

  {
    name: "Hospitality & Tourism",
    jobs: 306,
    icon: <FaHotel />,
  },
  {
    name: "NGO & Development",
    jobs: 237,
    icon: <FaHandsHelping />,
  },
  {
    name: "Supply Chain & Procurement",
    jobs: 201,
    icon: <FaTruck />,
  },
  {
    name: "Commercial",
    jobs: 77,
    icon: <FaBriefcase />,
  },

  {
    name: "Research & Consultancy",
    jobs: 22,
    icon: <FaFlask />,
  },
  {
    name: "Education & Training",
    jobs: 356,
    icon: <FaGraduationCap />,
  },
  {
    name: "IT & Telecommunication",
    jobs: 283,
    icon: <FaLaptopCode />,
  },
  {
    name: "Receptionist & Office Support",
    jobs: 88,
    icon: <FaUserTie />,
  },

  {
    name: "Engineering & Architecture",
    jobs: 559,
    icon: <FaTools />,
  },
  {
    name: "Marketing & Sales",
    jobs: 1339,
    icon: <FaBullhorn />,
  },
  {
    name: "Data Entry & BPO",
    jobs: 45,
    icon: <FaKeyboard />,
  },
  {
    name: "Garments & Textile",
    jobs: 615,
    icon: <FaTshirt />,
  },

  {
    name: "Customer Service",
    jobs: 245,
    icon: <FaHeadset />,
  },
  {
    name: "Design & Creative",
    jobs: 168,
    icon: <FaPalette />,
  },
  {
    name: "HR & Organization Development",
    jobs: 221,
    icon: <FaUsersCog />,
  },
  {
    name: "Media & Advertisement",
    jobs: 130,
    icon: <FaBullhorn />,
  },

  {
    name: "Security & Support Service",
    jobs: 64,
    icon: <FaShieldAlt />,
  },
  {
    name: "General Management & Admin",
    jobs: 223,
    icon: <FaBriefcase />,
  },
  {
    name: "Pharmaceutical",
    jobs: 115,
    icon: <FaFlask />,
  },
  {
    name: "Law & Legal",
    jobs: 41,
    icon: <FaGavel />,
  },

  {
    name: "Healthcare & Medical",
    jobs: 289,
    icon: <FaHeartbeat />,
  },
  {
    name: "E-commerce & Digital Marketing",
    jobs: 202,
    icon: <FaShoppingCart />,
  },
  {
    name: "Electrical & Electronics",
    jobs: 26,
    icon: <FaTools />,
  },
  {
    name: "Mechanic & Technician",
    jobs: 56,
    icon: <FaCog />,
  },

  {
    name: "Driver",
    jobs: 29,
    icon: <FaCar />,
  },
  {
    name: "Chef & Cook",
    jobs: 75,
    icon: <FaUtensils />,
  },
  {
    name: "Delivery Services",
    jobs: 19,
    icon: <FaMotorcycle />,
  },
  {
    name: "Graphic Designer",
    jobs: 66,
    icon: <FaPaintBrush />,
  },
];
    
  

  return (
    <>
    <TopHeader />
      <Navbar />

      <Hero />

      {/* Statistics */}

      <section className="stats-section">

        <div className="stat-box">
          <FaBriefcase />
          <div>
            <strong>6,458</strong>
            <span>Live Jobs</span>
          </div>
        </div>

        <div className="stat-box">
          <FaGraduationCap />
          <div>
            <strong>23,668+</strong>
            <span>Vacancies</span>
          </div>
        </div>

        <div className="stat-box">
          <FaBuilding />
          <div>
            <strong>3,715</strong>
            <span>Companies</span>
          </div>
        </div>

        <div className="stat-box">
          <FaUsers />
          <div>
            <strong>5,000+</strong>
            <span>Students & Job Seekers</span>
          </div>
        </div>

      </section>


      {/* Main */}

      <main className="page-container">

        <div className="main-layout">

          {/* Left */}

          <div className="main-content">

            {/* Categories */}

            <section className="section-card">

  <div className="section-title">

    <h2>Popular Job Categories</h2>

    <a href="#">
      View All
      <FaArrowRight />
    </a>

  </div>

  <div className="category-grid">

    {categories.map((category) => (
      <div
        className="category-card"
        key={category.name}
      >

        <div className="category-icon">
          {category.icon}
        </div>

        <h3>{category.name}</h3>

        <span>
          {category.jobs} opportunities
        </span>

      </div>
    ))}

  </div>

</section>


            {/* Featured Jobs */}

            <section className="section-card">

              <div className="section-title">

                <h2>Featured Jobs</h2>

                <a href="#">
                  View All
                  <FaArrowRight />
                </a>

              </div>

              <div className="job-grid">

                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}

              </div>

            </section>


            {/* Internships */}

            <section className="section-card">

              <div className="section-title">

                <h2>Featured Internships</h2>

                <a href="#">
                  View All
                  <FaArrowRight />
                </a>

              </div>

              <div className="job-grid">

                {internships.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                  />
                ))}

              </div>

            </section>


            {/* Companies */}

            <section className="section-card">

              <div className="section-title">

                <h2>Top Companies</h2>

                <a href="#">
                  View All
                  <FaArrowRight />
                </a>

              </div>

              <div className="company-list">

                {[
                  "TechNova",
                  "DigitalSoft",
                  "CreativeHub",
                  "DataEdge",
                  "MarketLab",
                  "NextGen",
                ].map((company) => (
                  <div
                    className="company-card"
                    key={company}
                  >
                    <div>
                      {company.charAt(0)}
                    </div>

                    <span>{company}</span>
                  </div>
                ))}

              </div>

            </section>

          </div>


          {/* Sidebar */}

          <aside className="sidebar">

            <div className="sidebar-card">

              <div className="sidebar-heading">
                <FaBolt />
                <h3>Quick Links</h3>
              </div>

              {[
                "Employer List",
                "New Jobs",
                "Deadline Tomorrow",
                "Internship Opportunities",
                "Part-time Jobs",
                "Remote Jobs",
                "Work From Home",
                "Fresher Jobs",
              ].map((item) => (
                <a href="#" key={item}>
                  {item}
                  <FaArrowRight />
                </a>
              ))}

            </div>


            {/* Career Guidance */}

            <div className="career-card">

              <FaGraduationCap />

              <h3>Career Guidance</h3>

              <p>
                Explore career paths, required skills and
                learning resources.
              </p>

              <a href="#">
                View Resources
                <FaArrowRight />
              </a>

            </div>


            {/* Trending */}

            <div className="sidebar-card">

              <h3>🔥 Trending Keywords</h3>

              <div className="keyword-list">

                {[
                  "React",
                  "Python",
                  "JavaScript",
                  "Data Entry",
                  "Graphic Design",
                  "Digital Marketing",
                  "UI/UX",
                  "PHP",
                  "Excel",
                  "Node.js",
                ].map((keyword) => (
                  <span key={keyword}>
                    {keyword}
                  </span>
                ))}

              </div>

            </div>

          </aside>

        </div>

      </main>

      <Footer />

    </>
  );
}

export default Home;






