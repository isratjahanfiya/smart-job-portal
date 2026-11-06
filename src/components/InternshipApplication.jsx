
import { useState } from "react";

export default function InternshipApplication({ internshipId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    university: "",
    skills: "",
    coverLetter: ""
  });

  const [cv, setCv] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!cv) {
      setError("Please upload your CV.");
      return;
    }

    if (
      cv.type !== "application/pdf" ||
      cv.size > 5 * 1024 * 1024
    ) {
      setError("CV must be a PDF under 5 MB.");
      return;
    }

    // Demo application only.
    // No CV or applicant information is uploaded.
    setMessage(
      "Demo application form completed. " +
      "Real submission requires a database internship."
    );
  }

  return (
    <div
      className="portal-card"
      style={{ maxWidth: 800, margin: "30px auto" }}
    >
      <h2>Internship Application</h2>

      <p>Internship ID: {internshipId}</p>

      <p>
        Complete the form to preview the application
        process.
      </p>

      <p style={{ color: "#9a6700" }}>
        Sample listing — demo only.
      </p>

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      {message && (
        <p role="status" style={{ color: "green" }}>
          {message}
        </p>
      )}

      <form
        className="sc-company-form"
        onSubmit={handleSubmit}
      >
        <label>
          Full Name *
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Email *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Phone Number *
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          University / Institution *
          <input
            name="university"
            value={form.university}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Skills
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Communication, Excel, Marketing"
          />
        </label>

        <label>
          Cover Letter
          <textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={handleChange}
            rows={5}
          />
        </label>

        <label>
          Upload CV (PDF, max 5 MB) *
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={(e) =>
              setCv(e.target.files?.[0] || null)
            }
            required
          />
        </label>

        <button type="submit">
          Complete Demo Application
        </button>
      </form>
    </div>
  );
}
