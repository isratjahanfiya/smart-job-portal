
import { useState } from "react";
import "../styles/company.css";

const API_URL = "http://localhost:5000/api";

export default function CompanyForm() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    industry: "",
    location: "",
    email: "",
    phone: "",
    website: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");
    setError("");

    const token = sessionStorage.getItem("sc-token");

    if (!token) {
      setError("Please login as a recruiter.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/companies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Company registration failed."
        );
      }

      setMessage(
        "Company submitted successfully! Awaiting admin verification."
      );

      setForm({
        name: "",
        description: "",
        industry: "",
        location: "",
        email: "",
        phone: "",
        website: ""
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sc-company-page">
      <div className="sc-company-header">
        <h2>Create Company Profile</h2>
        <p>
          Register your company to start posting jobs
          and internships on SmartCareer.
        </p>
      </div>

      {message && (
        <div className="sc-company-success" role="status">
          {message}
        </div>
      )}

      {error && (
        <div className="sc-company-error" role="alert">
          {error}
        </div>
      )}

      <form
        className="sc-company-form"
        onSubmit={handleSubmit}
      >
        <label>
          Company Name *
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter company name"
            maxLength={200}
            required
          />
        </label>

        <label>
          Company Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe your company"
            rows={5}
          />
        </label>

        <label>
          Industry *
          <select
            name="industry"
            value={form.industry}
            onChange={handleChange}
            required
          >
            <option value="">Select Industry</option>
            <option value="IT & Software">
              IT & Software
            </option>
            <option value="Banking & Finance">
              Banking & Finance
            </option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Manufacturing">
              Manufacturing
            </option>
            <option value="NGO & Development">
              NGO & Development
            </option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label>
          Location *
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Dhaka, Bangladesh"
            required
          />
        </label>

        <label>
          Company Email *
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="company@example.com"
            required
          />
        </label>

        <label>
          Contact Number
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter company phone number"
          />
        </label>

        <label>
          Website
          <input
            type="url"
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="https://example.com"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading
            ? "Submitting..."
            : "Submit Company for Verification"}
        </button>
      </form>
    </div>
  );
}
