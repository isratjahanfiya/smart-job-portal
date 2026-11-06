import {useEffect,useState} from 'react';
export default function DeadlineCountdown({deadline}){
 const [now,setNow]=useState(Date.now());
 useEffect(()=>{const id=setInterval(()=>setNow(Date.now()),60000);return ()=>clearInterval(id)},[]);
 const date=new Date(deadline); if(!deadline||Number.isNaN(date.getTime()))return <span>Deadline unavailable</span>;
 const days=Math.ceil((date.getTime()-now)/86400000);
 return <span role="status" style={{color:days<0?'#b91c1c':days<=3?'#b45309':'inherit'}}>{days<0?'Closed (deadline passed)':days===0?'Last day to apply':`${days} day${days===1?'':'s'} remaining`}</span>
}
