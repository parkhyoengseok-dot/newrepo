import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

export default function ChartsPanel(){
  const kwRef = useRef<HTMLCanvasElement|null>(null);
  const sentRef = useRef<HTMLCanvasElement|null>(null);

  useEffect(()=>{
    if(!kwRef.current || !sentRef.current) return;

    const kw = new Chart(kwRef.current, {
      type:"bar",
      data:{ labels:['swell','flooding','storm','current','tsunami','evacuation','warning','beach','harbour','fishermen'],
             datasets:[{ label:'Mentions', data:[42,31,27,18,12,9,8,7,6,5] }] },
      options:{ plugins:{legend:{display:false}}, scales:{y:{beginAtZero:true}}}
    });

    const sent = new Chart(sentRef.current, {
      type:"doughnut",
      data:{ labels:['Concern','Neutral','Reassurance'], datasets:[{ data:[58,28,14] }] },
      options:{ plugins:{legend:{position:'bottom'}} }
    });

    return ()=>{ kw.destroy(); sent.destroy(); };
  },[]);

  return (
    <div>
      <canvas ref={kwRef} height={180}></canvas>
      <div className="h-3"></div>
      <canvas ref={sentRef} height={170}></canvas>
    </div>
  );
}
