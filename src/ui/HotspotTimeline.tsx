import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function HotspotTimeline(){
  const ref = useRef<HTMLCanvasElement|null>(null);
  useEffect(()=>{
    if(!ref.current) return;
    const labels = Array.from({length:12}, (_,i)=>`${i+1}h ago`);
    const vals = labels.map((_,i)=>Math.round(4+Math.random()*10 + (i>8?6:0)));
    const ch = new Chart(ref.current,{
      type:"line",
      data:{ labels, datasets:[{ label:"Hotspot count", data:vals, tension:.35, fill:true }]},
      options:{ plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}
    });
    return ()=>ch.destroy();
  },[]);
  return <canvas ref={ref} height={200}></canvas>;
}
