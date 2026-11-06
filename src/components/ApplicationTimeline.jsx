import React from 'react';
const steps=['Applied','Under Review','Shortlisted','Interview','Selected'];
export default function ApplicationTimeline({application}){
 const history=Array.isArray(application.status_history)?application.status_history:[];
 const current=application.status||'Applied';const stopped=['Rejected','Withdrawn'].includes(current);
 const last=steps.indexOf(current);
 return <section aria-label="Application progress" className="sc-progress"><h3>Application Progress</h3><ol className="sc-progress-list">{steps.map((step,i)=>{const event=[...history].reverse().find(h=>h.status===step);const completed=!stopped&&last>=i;return <li key={step} className={completed?'sc-stage-done':''}><span aria-hidden="true">{completed?'✓':'○'}</span><div><strong>{step}</strong>{event?.changed_at&&<small>{new Date(event.changed_at).toLocaleString()}</small>}</div></li>})}</ol>{stopped&&<p role="status"><strong>Final status: {current}</strong></p>}{!history.length&&<p className="sc-muted">Detailed status timestamps are available for new updates.</p>}</section>;
}
