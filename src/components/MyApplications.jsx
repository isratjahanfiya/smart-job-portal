
import { useEffect, useState } from "react";
import { getMyApplications } from "../services/api";
import ApplicationTimeline from "./ApplicationTimeline";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getMyApplications()
      .then((data) => {
        if (active) {
          setApplications(data.applications);
        }
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading) return <p>Loading applications...</p>;

  if (error) {
    return <p role="alert">{error}</p>;
  }

  return (
    <div>
      <h2>My Job Applications</h2>

      {applications.length === 0 && (
        <p>You have not applied for any database jobs yet.</p>
      )}

      <div className="portal-grid">
        {applications.map((app) => (
          <article className="portal-card" key={app.id}>
            <h2>{app.title}</h2>

            <p>
              Applied:{" "}
              {new Date(app.applied_at).toLocaleDateString()}
            </p>

            <p>CV: {app.cv_original_name}</p>

            <p>
              Status: <strong>{app.status}</strong>
            </p>

            <ApplicationTimeline application={app} />
            {app.response && <p><strong>Employer response:</strong> {app.response}</p>}
            {app.interview_at && <p><strong>Interview:</strong> {new Date(app.interview_at).toLocaleString()} — {app.interview_location || "Check HR response for details"}</p>}
            <a href={`#/opportunity/db-${app.job_id}`}>
              View Job
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
