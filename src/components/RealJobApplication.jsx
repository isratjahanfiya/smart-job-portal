
import { useState } from "react";
import { submitJobApplication } from "../services/api";

export default function RealJobApplication({ job }) {
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const cv = formData.get("cv");

    if (!cv || cv.size === 0) {
      setMessage("Please select your PDF CV.");
      return;
    }

    if (cv.size > 5 * 1024 * 1024) {
      setMessage("CV must be 5 MB or smaller.");
      return;
    }

    formData.set("job_id", String(job.id).replace(/^db-/, ""));

    setSaving(true);
    setMessage("");

    try {
      await submitJobApplication(formData);
      setSuccess(true);
      setMessage("Application submitted successfully!");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form
      className="portal-card portal-form"
      onSubmit={handleSubmit}
    >
      <h2>Apply for {job.title}</h2>
      <p>{job.company}</p>

      <label>
        Full Name
        <input
          name="applicant_name"
          required
          maxLength={150}
        />
      </label>

      <label>
        Email
        <input
          name="applicant_email"
          type="email"
          required
        />
      </label>

      <label>
        Phone
        <input
          name="phone"
          type="tel"
          required
          maxLength={30}
        />
      </label>

      <label>
        Upload CV (PDF, maximum 5 MB)
        <input
          name="cv"
          type="file"
          accept=".pdf,application/pdf"
          required
        />
      </label>

      <label>
        Cover Letter
        <textarea
          name="cover_letter"
          rows={5}
          maxLength={5000}
          required
        />
      </label>

      <button type="submit" disabled={saving || success}>
        {saving ? "Submitting..." : success ? "Submitted" : "Apply Now"}
      </button>

      {message && <p role="status">{message}</p>}

      {success && (
        <a href="#/applications">View My Applications</a>
      )}
    </form>
  );
}
