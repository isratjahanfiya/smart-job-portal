import {
  FaMapMarkerAlt,
  FaBookmark,
  FaCalendarAlt,
} from "react-icons/fa";

function JobCard({ job }) {
  return (
    <div className="job-card">

      <div className="job-card-top">

        <span className={`job-badge ${job.badgeClass}`}>
          {job.type}
        </span>

        <button className="bookmark" aria-label="View saved opportunities" onClick={()=>{const ids=JSON.parse(localStorage.getItem("sc-saved")||"[]");if(!ids.includes(job.id))localStorage.setItem("sc-saved",JSON.stringify([...ids,job.id]));location.hash="/saved"}}>
          <FaBookmark />
        </button>

      </div>

      <div className="company-row">

        <div className="company-logo">
          {job.company.charAt(0)}
        </div>

        <span>{job.company}</span>

      </div>

      <h3><a href={`#/opportunity/${job.id}`} style={{color:"inherit",textDecoration:"none"}}>{job.title}</a></h3>

      <p className="job-location">
        <FaMapMarkerAlt />
        {job.location}
      </p>

      <p className="salary">
        ৳ {job.salary}
      </p>

      <div className="skills">
        {job.skills.map((skill) => (
          <span key={skill}>{skill}</span>
        ))}
      </div>

      <div className="job-footer">

        <span>
          <FaCalendarAlt />
          {job.deadline}
        </span>

        <strong>{job.match}% Match</strong>

      </div>

    </div>
  );
}

export default JobCard;