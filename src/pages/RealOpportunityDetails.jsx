import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getJobs } from "../services/api";
import "../styles/internship-details.css";

export default function RealOpportunityDetails({ id, kind = "job" }) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("all");
  const [message, setMessage] = useState("");
  const [matching, setMatching] = useState({ loading: false, data: null, notice: "" });
  useEffect(() => {
    const token = sessionStorage.getItem("sc-token");
    if (!token) {
      setMatching({ loading: false, data: null, notice: "Sign in as a student to see your personal skill match." });
      return;
    }
    const controller = new AbortController();
    setMatching({ loading: true, data: null, notice: "" });
    fetch("http://localhost:5000/api/insights/student/recommendations", {
      headers: { Authorization: `Bearer ${token}` }, signal: controller.signal
    }).then(async response => {
      if (response.status === 403) return { nonStudent: true };
      if (!response.ok) throw new Error("Unable to load skill matching. Please refresh.");
      return response.json();
    }).then(result => {
      if (result.nonStudent) {
        setMatching({ loading: false, data: null, notice: "Skill matching is available for student accounts only." });
        return;
      }
      const found = result.recommendations?.find(item => String(item.id) === String(id));
      setMatching({ loading: false, data: found || null, notice: found ? "" : "Skill match is unavailable for this opportunity." });
    }).catch(e => {
      if (e.name !== "AbortError") setMatching({ loading: false, data: null, notice: e.message });
    });
    return () => controller.abort();
  }, [id]);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    getJobs().then(rows => {
      if (!alive) return;
      const selected = rows.find(j => String(j.id || j._id) === String(id));
      if (!selected || (kind === "internship") !== (selected.job_type === "internship")) {
        setError("This opportunity is not active or has not been approved.");
      } else { setJob(selected); setError(""); }
    }).catch(e => { if (alive) setError(e.message); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id, kind]);
  const date = job?.deadline ? new Date(job.deadline).toLocaleDateString("en-GB") : "Not specified";
  const expired = job?.deadline ? new Date(job.deadline).getTime() < Date.now() - 86400000 : false;
  const skills = Array.isArray(job?.required_skills) ? job.required_skills : [];
  const tabs = [["all","All"],["requirements","Requirements"],["responsibilities","Responsibilities"],["benefits","Salary & Benefits"],["company","Company Information"]];
  const show = section => tab === "all" || tab === section;
  async function save() {
    const token = sessionStorage.getItem("sc-token");
    if (!token) { window.location.hash = "/login"; return; }
    try {
      const response = await fetch("http://localhost:5000/api/bookmarks",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${token}`},body:JSON.stringify({job_id:String(id)})});
      const result = await response.json();
      if (!response.ok) throw Error(result.error || "Could not save");
      setMessage("Opportunity saved.");
    } catch (e) { setMessage(e.message); }
  }
  return <><Navbar/><main className="intern-detail">
    <a className="detail-back" href={kind === "internship" ? "#/internships" : "#/jobs"}>← {kind === "internship" ? "Internships" : "Jobs"}</a>
    {loading ? <p>Loading opportunity details...</p> : error ? <p role="alert">{error}</p> : job && <>
      <header className="detail-header"><div><p className="detail-company-name">{job.company_name || "Company"}</p><h1>{job.title}</h1><p>{job.category} · {job.location} · {job.job_type?.replaceAll("_"," ")}</p><span className="detail-demo">Verified database opportunity</span></div>
      <div className="detail-stipend"><span>{kind === "internship" ? "Compensation / Stipend" : "Salary Range"}</span><strong>৳{Number(job.salary_min||0).toLocaleString()} – ৳{Number(job.salary_max||0).toLocaleString()}</strong></div></header>
      <div className="detail-action-row"><p>Application deadline: <strong>{date}</strong></p><div className="detail-buttons">
        <button className="detail-primary" disabled={expired} onClick={()=>{if(!sessionStorage.getItem("sc-token")){window.location.hash="/login";return;}window.location.hash=`/apply/db-${id}`;}}>{expired ? "Deadline Passed" : "Apply for " + (kind === "internship" ? "Internship" : "Job")}</button>
        <button onClick={save}>☆ Save</button><button onClick={()=>navigator.clipboard?.writeText(window.location.href).then(()=>setMessage("Link copied"))}>Share</button><button onClick={()=>window.print()}>Print</button>
      </div></div>
      {message && <p role="status">{message}</p>}
      <section className="skill-match-panel" aria-label="Your skill match">
        <h2>Your Skill Match</h2>
        {matching.loading ? <p>Calculating your match...</p> : matching.data ? <>
          {matching.data.match_percent === null ?
            <p>Match not available: this job has no specified required skills.</p> : <>
              <div className="skill-match-heading"><strong>Matched required skills</strong><strong>{matching.data.match_percent}%</strong></div>
              <div className="skill-match-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={matching.data.match_percent} aria-label="Skill match percentage"><div style={{ width: `${matching.data.match_percent}%` }} /></div>
              <p><strong>Matched Skills:</strong> {matching.data.matched_skills?.join(", ") || "None yet"}</p>
              <p><strong>Missing Skills:</strong> {matching.data.missing_skills?.join(", ") || "None"}</p>
              <p className="skill-match-note">Based on your saved student profile and this job's required skills. This is not a hiring probability.</p>
            </>}
        </> : <p>{matching.notice || "No match information available."} <a href="#/profile">Update your skills</a></p>}
      </section>
      <nav className="detail-buttons" aria-label="Job details tabs">{tabs.map(([key,label])=><button key={key} onClick={()=>setTab(key)} aria-pressed={tab===key}>{label}</button>)}</nav>
      {show("requirements") && <section><h2>Requirements & Qualifications</h2><p>{job.required_qualifications || "See the job description."}</p><h3>Required Skills</h3>{skills.length ? <ul>{skills.map(s=><li key={s}>{s}</li>)}</ul> : <p>Not specified</p>}</section>}
      {show("responsibilities") && <section><h2>Job Description & Responsibilities</h2><p style={{whiteSpace:"pre-wrap"}}>{job.description}</p></section>}
      {show("benefits") && <section><h2>Salary & Benefits</h2><p>৳{Number(job.salary_min||0).toLocaleString()} – ৳{Number(job.salary_max||0).toLocaleString()}</p><p>Other benefits: Contact the employer for details.</p></section>}
      {show("company") && <section><h2>Company Information</h2><p>{job.company_name || "Company"}</p><p>Location: {job.location}</p></section>}
    </>}
  </main><Footer/></>;
}
