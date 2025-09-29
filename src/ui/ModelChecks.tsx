import { useEffect, useState } from "react";
import { useStore } from "../store";

export default function ModelChecks(){
  const role = useStore(s=>s.role);
  const [items,setItems] = useState<{name:string;status:string}[]>([]);

  const rebuild = ()=>{
    const it = [
      {name:'INCOIS surge model vs. crowd heat', status: Math.random()>.3?'Aligned':'Divergent'},
      {name:'Wave height anomaly vs. reports', status: Math.random()>.5?'Aligned':'Needs review'},
      {name:'Currents forecast vs. rip incidents', status: Math.random()>.4?'Aligned':'Divergent'}
    ];
    setItems(it);
  };

  useEffect(()=>{ rebuild(); },[]);

  if(role==="citizen"){
    return <div className="text-muted">Switch to <b>Official</b> or <b>Analyst</b> to see model cross-checks.</div>;
  }
  return (
    <div>
      <h2 className="font-semibold"><i className="fa-solid fa-layer-group"></i> Model Cross-checks</h2>
      <p className="text-muted text-sm">Analyst view: compare crowd hotspots vs. modeled areas of concern.</p>
      <ul className="mt-2 space-y-2 text-sm text-muted">
        {items.map((i,idx)=>(
          <li key={idx}> <i className="fa-solid fa-square mr-2" style={{color: i.status==='Aligned' ? '#29f19c' : '#ffd43b'}}/> {i.name} — <b>{i.status}</b></li>
        ))}
      </ul>
      <button onClick={rebuild} className="mt-3 px-3 py-2 rounded-lg border border-border">Recalculate hotspots</button>
    </div>
  );
}
