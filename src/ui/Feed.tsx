import { useEffect, useRef } from "react";
import { useStore } from "../store";

export default function ActivityFeed(){
  const {reports, queue} = useStore();
  const wrap = useRef<HTMLDivElement|null>(null);

  useEffect(()=>{
    if(!wrap.current) return;
    wrap.current.innerHTML = "";
    const items = [...reports, ...queue].slice(-10).reverse();
    items.forEach(r=>{
      const el = document.createElement("div");
      el.className = "glass rounded-lg p-2 my-2 text-sm";
      el.innerHTML = `<i class="fa-solid fa-circle-dot text-[#9adcf5]"></i> <b>${r.type}</b> @ ${r.place} — ${new Date(r.time).toLocaleString()}`;
      wrap.current?.appendChild(el);
    })
  },[reports, queue]);

  return <div ref={wrap} className="max-h-[260px] overflow-auto"></div>;
}
