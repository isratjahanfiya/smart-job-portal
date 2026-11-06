import {useEffect,useState} from 'react';
import {getStudentProfile} from '../services/api';
const fields=[['university','University'],['department','Department'],['degree','Degree'],['cgpa','CGPA'],['graduation_year','Graduation year'],['phone','Contact number'],['location','Location'],['skills','Skills'],['projects','Projects'],['experience','Experience'],['certifications','Certifications'],['languages','Languages'],['career_goal','Career goal'],['cv_name','Uploaded CV (PDF)']];
export default function CVQualityChecker({profile:initial}){
 const [profile,setProfile]=useState(initial||null),[error,setError]=useState('');
 useEffect(()=>{if(initial){setProfile(initial);return;}let active=true;getStudentProfile().then(d=>{if(active)setProfile(d.profile||{})}).catch(e=>{if(active)setError(e.message)});return()=>{active=false}},[initial]);
 if(error)return <p role="alert">{error}</p>;if(!profile)return <p>Loading CV quality check...</p>;
 const present=v=>Array.isArray(v)?v.length>0:v!==undefined&&v!==null&&String(v).trim()!=='';
 const missing=fields.filter(([key])=>!present(profile[key]));const score=Math.round((fields.length-missing.length)/fields.length*100);
 return <section className="portal-card"><h2>CV Quality & Profile Completeness</h2><p>Completeness: <strong>{score}%</strong> ({fields.length-missing.length}/{fields.length} sections)</p><progress value={score} max="100" style={{width:'100%',height:15}} aria-label="CV completeness"/><p>This checks missing fields only. It does not assess hiring suitability or PDF writing quality.</p><h3>Suggested improvements</h3>{missing.length?<ul>{missing.map(([key,label])=><li key={key}>Add {label}</li>)}</ul>:<p>All tracked sections are complete.</p>}<a href="#/profile">Edit My Profile</a> · <a href="#/resume">Resume Builder</a></section>
}
