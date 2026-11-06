
import { useEffect, useState } from "react";
import "../styles/postJob.css";

const API_URL = "http://localhost:5000/api";

const fallbackCategories = ["Accounting & Finance", "Production & Operation", "Agro & Fisheries", "Bank & Financial Institution", "Hospitality & Tourism", "NGO & Development", "Supply Chain & Procurement", "Commercial", "Research & Consultancy", "Education & Training", "IT & Telecommunication", "Receptionist & Office Support", "Engineering & Architecture", "Marketing & Sales", "Data Entry & BPO", "Garments & Textile", "Customer Service", "Design & Creative", "HR & Organization Development", "Media & Advertisement", "Security & Support Service", "General Management & Admin", "Pharmaceutical", "Law & Legal", "Healthcare & Medical", "E-commerce & Digital Marketing", "Electrical & Electronics", "Mechanic & Technician", "Driver", "Chef & Cook", "Delivery Services", "Graphic Designer", "IT & Software"];

export default function PostJobForm() {
  const [companies, setCompanies] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);
  useEffect(()=>{fetch(`${API_URL}/jobs/categories`).then(r=>{if(!r.ok)throw Error();return r.json()}).then(rows=>{if(Array.isArray(rows)&&rows.length)setCategories(rows.map(r=>r.name))}).catch(()=>{});},[]);
  const [loadingCompanies, setLoadingCompanies] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [form, setForm] = useState({
    company_id: "",
    title: "",
    category: "IT & Software",
    description: "",
    job_type: "full_time",
    location: "",
    salary_min: "",
    salary_max: "",
    deadline: "",
    required_qualifications: "",
    required_skills: ""
  });

  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const token = sessionStorage.getItem("sc-token");

        if (!token) {
          throw new Error("Please sign in as a recruiter.");
        }

        const response = await fetch(
          `${API_URL}/jobs/my-companies`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load companies."
          );
        }

        setCompanies(data);

        if (data.length === 1) {
          setForm((previous) => ({
            ...previous,
            company_id: String(data[0].company_id)
          }));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingCompanies(false);
      }
    };

    loadCompanies();
  }, []);

  const update = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    try {
      const token = sessionStorage.getItem("sc-token");

      if (!token) {
        throw new Error("Please sign in as a recruiter.");
      }

      const response = await fetch(
        `${API_URL}/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({...form, required_skills: form.required_skills.split(",").map(s=>s.trim()).filter(Boolean)})
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to post job."
        );
      }

      setSuccess(
        "Posting submitted successfully! Awaiting admin approval."
      );

      setForm((previous) => ({
        ...previous,
        title: "",
        description: "",
        location: "",
        salary_min: "",
        salary_max: "",
        deadline: ""
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sc-post-job">
      <h1>Post a Job or Internship</h1>

      <p className="sc-post-intro">
        Submit a vacancy for admin review.
        Approved jobs will be visible to students.
      </p>

      {error && (
        <div className="sc-post-error" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="sc-post-success" role="status">
          {success}
        </div>
      )}

      {loadingCompanies ? (
        <p>Loading your companies...</p>
      ) : companies.length === 0 ? (
        <p>
          No verified company is assigned to your
          recruiter account. Contact the administrator.
        </p>
      ) : (
        <form onSubmit={submit}>

          <label>
            Company
            <select
              name="company_id"
              value={form.company_id}
              onChange={update}
              required
            >
              <option value="">
                Select company
              </option>

              {companies.map((company) => (
                <option
                  key={company.company_id}
                  value={company.company_id}
                >
                  {company.name || company.company_id}
                </option>
              ))}
            </select>
          </label>

          <label>
            Job Title
            <input
              name="title"
              value={form.title}
              onChange={update}
              placeholder="e.g. Junior Software Developer"
              minLength={5}
              maxLength={200}
              required
            />
          </label>

          <label>
            Job Category
            <select
              name="category"
              value={form.category}
              onChange={update}
              required
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label>
            Job Description
            <textarea
              name="description"
              value={form.description}
              onChange={update}
              rows={6}
              minLength={20}
              placeholder="Responsibilities, qualifications and requirements"
              required
            />
          </label>

          <label>
            Required Qualifications
            <textarea name="required_qualifications" value={form.required_qualifications} onChange={update} placeholder="e.g. Bachelor degree or equivalent" />
          </label>
          <label>
            Required Skills (comma separated)
            <input name="required_skills" value={form.required_skills} onChange={update} placeholder="Excel, Communication, React" />
          </label>
          <label>
            Job Type
            <select
              name="job_type"
              value={form.job_type}
              onChange={update}
            >
              <option value="full_time">
                Full Time
              </option>
              <option value="part_time">
                Part Time
              </option>
              <option value="internship">
                Internship
              </option>
              <option value="contract">
                Contract
              </option>
            </select>
          </label>

          <label>
            Location
            <input
              name="location"
              value={form.location}
              onChange={update}
              placeholder="e.g. Dhaka"
              required
            />
          </label>

          <div className="sc-post-grid">
            <label>
              Minimum Salary (BDT)
              <input
                type="number"
                name="salary_min"
                value={form.salary_min}
                onChange={update}
                min="0"
                required
              />
            </label>

            <label>
              Maximum Salary (BDT)
              <input
                type="number"
                name="salary_max"
                value={form.salary_max}
                onChange={update}
                min="0"
                required
              />
            </label>
          </div>

          <label>
            Application Deadline
            <input
              type="date"
              name="deadline"
              value={form.deadline}
              onChange={update}
              min={new Date().toLocaleDateString("en-CA")}
              required
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "Submit Job for Approval"}
          </button>
        </form>
      )}
    </div>
  );
}
