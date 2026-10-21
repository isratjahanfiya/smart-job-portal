import { useEffect, useState } from "react";
import Navbar from '../components/Navbar';import Footer from '../components/Footer';
import {jobs,internships} from '../data/data';
import { getJobs } from "../services/api";
import AuthForm from "../components/AuthForm";
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}};
const store=(key,value)=>localStorage.setItem(key,JSON.stringify(value));
const links=[['/dashboard','Dashboard'],['/profile','My Profile'],['/resume','Resume / CV'],['/applications','My Applications'],['/saved','Saved Opportunities'],['/recent','Recently Viewed'],['/compare','Compare'],['/career','Career & Skills'],['/notifications','Notifications'],['/calendar','Calendar'],['/recruiter','Recruiter Demo'],['/admin','Admin Demo']];
const demo=[...jobs,...internships].map(j=>({...j,deadline:'30 Nov 2026',mode:j.type==='Hybrid'?'Hybrid':'Onsite',experience:'Entry level',duration:j.type==='Internship'?'3 months':'Permanent',description:'Work with a collaborative team, contribute to practical projects and develop your professional skills.'}));
export default function Portal({route}){
    const [databaseJobs, setDatabaseJobs] = useState([]);
const [jobsLoading, setJobsLoading] = useState(true);
const [jobsError, setJobsError] = useState("");
const [profile,setProfile]=useState(()=>read('sc-profile',{name:'',email:'',phone:'',education:'',skills:'React, JavaScript',projects:'',experience:'',certifications:'',goal:'Web Developer'}));
const [saved,setSaved]=useState(()=>read('sc-saved',[]));const [apps,setApps]=useState(()=>read('sc-apps',[]));const [custom,setCustom]=useState(()=>read('sc-postings',[]));const [recent,setRecent]=useState(()=>read('sc-recent',[]));const [selected,setSelected]=useState([]);const [query,setQuery]=useState('');const [mode,setMode]=useState('All');const [sort,setSort]=useState('Newest');const [message,setMessage]=useState('');

useEffect(() => {
  let active = true;

  getJobs()
    .then((data) => {
        console.log("DATABASE JOBS:", data);
      if (!active) return;

      const formattedJobs = data.map((job) => ({
        id: `db-${job.id}`,
        title: job.title,
        company: `Company ${job.company_id}`,
        location: job.location || "Not specified",
        type: job.job_type === "full_time"
          ? "Full Time"
          : job.job_type === "part_time"
          ? "Part Time"
          : job.job_type || "Other",
        salary: `${Number(job.salary_min || 0).toLocaleString("en-US")} - ${Number(job.salary_max || 0).toLocaleString("en-US")}`,
        mode: "Not specified",
        skills: [],
        deadline: job.deadline
          ? new Date(job.deadline).toLocaleDateString("en-GB")
          : "Not specified",
        experience: "Not specified",
        duration: "Not specified",
        description: job.description || "",
      }));

      setDatabaseJobs(formattedJobs);
      setJobsError("");
    })
    .catch((error) => {
      if (active) setJobsError(error.message);
    })
    .finally(() => {
      if (active) setJobsLoading(false);
    });

  return () => {
    active = false;
  };
}, []);
const all = [...databaseJobs, ...demo, ...custom];const parts=route.split('/');const page=parts[1];const job=all.find(j=>String(j.id)===parts[2]);
const skills=profile.skills.split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);const score=j=>j.skills.length?Math.round(j.skills.filter(s=>skills.includes(s.toLowerCase())).length/j.skills.length*100):0;

function logout() {
  sessionStorage.removeItem("sc-token");
  window.location.hash = "/login";
  window.location.reload();
}
const notice=text=>setMessage(text);const toggle=id=>{const next=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];setSaved(next);store('sc-saved',next)};
const open=j=>{const next=[j.id,...recent.filter(id=>id!==j.id)].slice(0,20);setRecent(next);store('sc-recent',next);location.hash='/opportunity/'+j.id};
const updateApps=next=>{setApps(next);store('sc-apps',next)};
function cards(items){return <div className="portal-grid">{items.map(j=><article className="portal-card" key={j.id}><small>{j.company} · {j.mode}</small><h2>{j.title}</h2><p>{j.location} · {j.type}</p><p>৳ {j.salary}</p><div className="portal-tags">{j.skills.map(s=><span key={s}>{s}</span>)}</div><p>Skill match: <strong>{score(j)}%</strong> · Deadline: {j.deadline}</p><div className="portal-actions"><button onClick={()=>open(j)}>View details</button><button className="secondary" onClick={()=>toggle(j.id)}>{saved.includes(j.id)?'Unsave':'Save'}</button><label><input type="checkbox" checked={selected.includes(j.id)} onChange={()=>setSelected(selected.includes(j.id)?selected.filter(id=>id!==j.id):selected.length<3?[...selected,j.id]:selected)}/> Compare</label></div></article>)}</div>}
function profileForm(){return <form className="portal-card portal-form" onSubmit={e=>{e.preventDefault();store('sc-profile',profile);notice('Profile saved on this browser.')}}>{Object.keys(profile).map(key=><label key={key}>{key==='skills'?'Skills (comma separated)':key}<input type={key==='email'?'email':'text'} value={profile[key]} onChange={e=>setProfile({...profile,[key]:e.target.value})}/></label>)}<button>Save profile</button></form>}
let content;
if(['jobs','internships','saved','recent'].includes(page)){
let items=all.filter(j=>page==='internships'?j.type==='Internship':page==='jobs'?j.type!=='Internship':page==='saved'?saved.includes(j.id):recent.includes(j.id));items=items.filter(j=>(j.title+' '+j.company+' '+j.skills.join(' ')+' '+j.location).toLowerCase().includes(query.toLowerCase())&&(mode==='All'||j.mode===mode));items.sort((a,b)=>sort==='Match score'?score(b)-score(a):sort==='Salary'?parseFloat(b.salary.replaceAll(',',''))-parseFloat(a.salary.replaceAll(',','')):sort==='Company'?a.company.localeCompare(b.company):b.id-a.id);

content = <>
  {page === "jobs" && jobsLoading && (
    <p>Loading database jobs...</p>
  )}

  {page === "jobs" && jobsError && (
    <p role="alert" style={{ color: "red" }}>
      Database Error: {jobsError}
    </p>
  )}

  <div className="portal-toolbar">
<input aria-label="Search opportunities" placeholder="Search title, company, skill or location" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Work mode" value={mode} onChange={e=>setMode(e.target.value)}>{['All','Onsite','Hybrid','Remote'].map(x=><option key={x}>{x}</option>)}</select><select aria-label="Sort" value={sort} onChange={e=>setSort(e.target.value)}>{['Newest','Match score','Salary','Company'].map(x=><option key={x}>{x}</option>)}</select><button className="secondary" onClick={()=>{setQuery('');setMode('All');setSort('Newest')}}>Clear filters</button></div><p>{items.length} opportunities</p>{items.length?cards(items):<p>No opportunities found.</p>}{selected.length>0&&<a href="#/compare" onClick={()=>store('sc-compare',selected)}>Compare {selected.length} selected</a>}</>;
}else if(page==='opportunity')content=job?<article className="portal-card"><small>{job.company}</small><h2>{job.title}</h2><p>{job.description}</p><p>{job.location} · {job.mode} · {job.experience} · {job.duration}</p><p>Salary / stipend: ৳ {job.salary}</p><h3>Required skills</h3><p>{job.skills.join(', ')}</p><h3>Your skill match: {score(job)}%</h3><p>Missing skills: {job.skills.filter(s=>!skills.includes(s.toLowerCase())).join(', ')||'None'}</p><p>Deadline: {job.deadline}</p><a className="portal-button" href={'#/apply/'+job.id}>Apply now</a><button className="secondary" onClick={()=>toggle(job.id)}>{saved.includes(job.id)?'Unsave':'Save opportunity'}</button></article>:<p>Opportunity not found.</p>;
else if(page==='profile')content=profileForm();
else if(page==='resume')content=<><button onClick={()=>window.print()}>Print / Save as PDF</button><article className="portal-card resume"><h2>{profile.name||'Your name'}</h2><p>{profile.email} · {profile.phone}</p>{['education','skills','experience','projects','certifications'].map(key=><section key={key}><h3>{key}</h3><p>{profile[key]||'Add this information in My Profile.'}</p></section>)}</article></>;
else if(page==='apply')content=job?<form className="portal-card portal-form" onSubmit={e=>{e.preventDefault();if(apps.some(a=>a.jobId===job.id))return notice('You have already applied for this opportunity.');const form=new FormData(e.target);updateApps([...apps,{id:Date.now(),jobId:job.id,title:job.title,company:job.company,status:'Applied',date:new Date().toLocaleDateString(),name:form.get('name'),email:form.get('email'),cv:form.get('cv').name,cover:form.get('cover')}]);notice('Demo application recorded. The CV file is not uploaded to a server.')}}><h2>Apply for {job.title}</h2><label>Name<input name="name" required defaultValue={profile.name}/></label><label>Email<input name="email" type="email" required defaultValue={profile.email}/></label><label>Phone<input name="phone" required defaultValue={profile.phone}/></label><label>CV (PDF)<input name="cv" type="file" accept=".pdf" required/></label><label>Cover letter<textarea name="cover" required/></label><button>Submit demo application</button></form>:<p>Opportunity not found.</p>;
else if(page==='applications')content=<div className="portal-grid">{apps.length?apps.map(a=><article key={a.id} className="portal-card"><h2>{a.title}</h2><p>{a.company} · {a.date}</p><strong>{a.status}</strong><p>Applied → Under Review → Shortlisted → Interview → Selected</p>{!['Withdrawn','Rejected','Selected'].includes(a.status)&&<button className="secondary" onClick={()=>updateApps(apps.map(x=>x.id===a.id?{...x,status:'Withdrawn'}:x))}>Withdraw application</button>}</article>):<p>No applications yet. Browse opportunities to get started.</p>}</div>;
else if(page==='companies'||page==='company'){const companies=[...new Set(all.map(j=>j.company))];content=<div className="portal-grid">{companies.filter(c=>page==='companies'||c===decodeURIComponent(parts[2]||'')).map(c=><article className="portal-card" key={c}><h2>{c}</h2><p>Demo company · Bangladesh</p><p>{all.filter(j=>j.company===c).length} opportunities</p>{page==='companies'?<a href={'#/company/'+encodeURIComponent(c)}>Explore company</a>:cards(all.filter(j=>j.company===c))}</article>)}</div>}
else if(page==='compare'){const ids=read('sc-compare',[]);content=ids.length?<div className="portal-grid">{ids.map(id=>all.find(j=>j.id===id)).filter(Boolean).map(j=><article className="portal-card" key={j.id}><h2>{j.title}</h2>{['company','salary','location','mode','experience','duration','deadline'].map(k=><p key={k}><strong>{k}: </strong>{j[k]}</p>)}<p>Skills: {j.skills.join(', ')}</p><p>Match: {score(j)}%</p></article>)}</div>:<p>Select two or three opportunities from the listings, then click Compare selected.</p>}
else if(page==='career')content=<><article className="portal-card"><h2>{profile.goal}</h2><p>Match scores measure required skill overlap. They are not hiring probabilities.</p><a href="#/profile">Update your skills and career goal</a></article><h2>Recommendations by skill overlap</h2>{cards([...all].sort((a,b)=>score(b)-score(a)).slice(0,3))}</>;
else if(page==='dashboard')content=<><div className="portal-grid">{[['Applications',apps.length],['Saved opportunities',saved.length],['Profile completion',Math.round(Object.values(profile).filter(Boolean).length/Object.keys(profile).length*100)+'%']].map(([label,value])=><article className="portal-card" key={label}><small>{label}</small><h2>{value}</h2></article>)}</div><h2>Recommended for you</h2>{cards([...all].sort((a,b)=>score(b)-score(a)).slice(0,3))}</>;
else if(page==='notifications')content=<div className="portal-card">{apps.length?apps.map(a=><p key={a.id}>{a.title}: {a.status} · {a.date}</p>):<p>No application updates yet.</p>}</div>;
else if(page==='calendar')content=<div className="portal-card"><h2>Saved opportunity deadlines</h2>{all.filter(j=>saved.includes(j.id)).map(j=><p key={j.id}>{j.deadline} — {j.title}</p>)}{!saved.length&&<p>Save an opportunity to see its deadline here.</p>}<h2>Interviews</h2>{apps.filter(a=>a.interview).map(a=><p key={a.id}>{a.title} — {a.interview}</p>)}</div>;
else if (page === "login" || page === "register") {
  content = <AuthForm page={page} />;
}
else if (page === "forgot-password") {
  content = <p>Password reset is not available yet.</p>;
}
else if(page==='recruiter')content=<><a className="portal-button" href="#/post">Post opportunity</a><h2>Demo applicants</h2>{apps.length?apps.map(a=><article className="portal-card" key={a.id}><h3>{a.name} — {a.title}</h3><p>{a.email} · CV filename: {a.cv}</p><p>{a.cover}</p><label>Status <select value={a.status} onChange={e=>updateApps(apps.map(x=>x.id===a.id?{...x,status:e.target.value}:x))}>{['Applied','Under Review','Shortlisted','Interview','Selected','Rejected','Withdrawn'].map(s=><option key={s}>{s}</option>)}</select></label><label> Interview time <input type="datetime-local" value={a.interview||''} onChange={e=>updateApps(apps.map(x=>x.id===a.id?{...x,interview:e.target.value}:x))}/></label></article>):<p>Submit a demo application to see it here.</p>}<h2>Your demo postings</h2>{cards(custom)}</>;
else if(page==='post')content=<form className="portal-card portal-form" onSubmit={e=>{e.preventDefault();const f=new FormData(e.target);const j=Object.fromEntries(f);j.id=Date.now();j.skills=j.skills.split(',').map(s=>s.trim()).filter(Boolean);const next=[...custom,j];setCustom(next);store('sc-postings',next);notice('Demo posting saved.');e.target.reset()}}>{['title','company','location','salary','skills','description','experience','duration'].map(k=><label key={k}>{k}<input name={k} required/></label>)}<label>Deadline<input name="deadline" type="date" min={new Date().toISOString().slice(0,10)} required/></label><label>Type<select name="type"><option>Full Time</option><option>Part Time</option><option>Contract</option><option>Internship</option></select></label><label>Work mode<select name="mode"><option>Onsite</option><option>Remote</option><option>Hybrid</option></select></label><button>Publish demo posting</button></form>;
else if(page==='admin')content=<article className="portal-card"><h2>Administration preview</h2><p>{all.length} listings · {apps.length} demo applications</p><p>Account management, company verification and moderation require the backend. This preview does not grant administrative access.</p></article>;
else if(page==='about')content=<article className="portal-card"><h2>Connecting skills with opportunities</h2><p>SmartCareer helps students and job seekers explore jobs and internships, prepare their profiles and manage applications. Recruiters can organize postings and candidate progress.</p></article>;
else content=<p>Page not found. <a href="#/">Return home</a></p>;
return <><Navbar/><div className="portal-shell"><aside className="portal-sidebar">{links.map(([url,label])=><a key={url} className={route===url?'current':''} href={'#'+url}>{label}</a>)}</aside><main className="portal-main">
  
<main className="portal-main">

  {sessionStorage.getItem("sc-token") && (
    <button
      type="button"
      className="secondary"
      onClick={logout}
    >
      Logout
    </button>
  )}

  <small className="demo-label">
    Frontend prototype · Sample listings · Data saved in this browser
  </small>

  <h1>
    {links.find(([url]) => url === route)?.[1] ||
      page.replaceAll("-", " ")}
  </h1>

  {message && (
    <div role="status" className="portal-message">
      {message}
      <button
        className="secondary"
        onClick={() => setMessage("")}
      >
        Dismiss
      </button>
    </div>
  )}

  {content}

</main>
<small className="demo-label">Frontend prototype · Sample listings · Data saved in this browser</small><h1>{links.find(([url])=>url===route)?.[1]||page.replaceAll('-',' ')}</h1>{message&&<div role="status" className="portal-message">{message}<button className="secondary" onClick={()=>setMessage('')}>Dismiss</button></div>}{content}</main></div><Footer/></>}
