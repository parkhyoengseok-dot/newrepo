import ChartsPanel from "./ChartsPanel";
import ActivityFeed from "./Feed";
import ModelChecks from "./ModelChecks";
import HotspotTimeline from "./HotspotTimeline";
import { useEffect } from "react";
import { useStore } from "../store";

export default function Dashboard(){
  const {reports, queue} = useStore();

  useEffect(()=>{
    const k1 = document.getElementById("kpi1");
    const k2 = document.getElementById("kpi2");
    if(k1) k1.textContent = String(reports.length + queue.length);
    if(k2) k2.textContent = String(Math.max(1, Math.round((reports.length + queue.length)/3)));
  },[reports, queue]);

  return (
    <section className="px-4 pb-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
        <div data-aos="fade-up" className="glass p-4 rounded-smooth">
          <h2 className="font-semibold"><i className="fa-solid fa-signal"></i> Social Signals (Mock NLP)</h2>
          <ChartsPanel />
          <p className="text-muted text-sm mt-2">Top keywords & sentiment mined from public posts (simulated).</p>
        </div>

        <div data-aos="fade-up" className="glass p-4 rounded-smooth">
          <ModelChecks />
        </div>

        <div data-aos="fade-up" className="glass p-4 rounded-smooth">
          <h2 className="font-semibold"><i className="fa-solid fa-clock-rotate-left"></i> Activity Feed</h2>
          <ActivityFeed />
        </div>

        <div data-aos="fade-up" className="glass p-4 rounded-smooth">
          <h2 className="font-semibold"><i className="fa-solid fa-map-location-dot"></i> Hotspot Timeline</h2>
          <HotspotTimeline />
        </div>
      </div>
    </section>
  );
}
