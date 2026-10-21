
import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/jobs"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs...</p>;

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "30px 5%" }}>
      <h1>Available Jobs</h1>

      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p>Location: {job.location}</p>
            <p>Type: {job.job_type}</p>
            <p>
              Salary: ৳{job.salary_min} - ৳{job.salary_max}
            </p>
            <p>Deadline: {job.deadline?.slice(0, 10)}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Jobs;
