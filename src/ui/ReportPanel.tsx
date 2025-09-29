import { useEffect, useRef, useState } from "react";
import { useStore } from "../store";
import type { EventType, Report } from "../types";

declare global { interface Window { L:any; } }

export default function ReportPanel(){
  const {fakeOffline, toggleOffline, queue, syncQueue, enqueue, addReport, filters, setFilters, resetFilters} = useStore();

  // Map init
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const heatRef = useRef<any>(null);

  // Form
  const [type,setType] = useState<Exclude<EventType,"all">>("swell");
  const [place,setPlace] = useState("");
  const [desc,setDesc] = useState("");
  const [time,setTime] = useState<string>("");

  // Local state link to store.reports changes by subscribing
  const reports = useStore(s=>s.reports);

  // Build map
  useEffect(()=>{
    if(mapRef.current) return;
    const map = window.L.map("map",{zoomControl:false}).setView([15.5,74.5],5);
    window.L.control.zoom({position:'bottomright'}).addTo(map);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; OpenStreetMap'}).addTo(map);
    mapRef.current = map;
    rebuildAll();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  // Rebuild when reports/queue/filters change
  useEffect(()=>{ rebuildAll(); },[reports, queue, filters]);

  const rebuildAll = ()=>{
    const map = mapRef.current; if(!map) return;

    // clear markers
    markersRef.current.forEach(m=>map.removeLayer(m));
    markersRef.current = [];

    // filter
    const from = filters.from ? new Date(filters.from).getTime() : -Infinity;
    const to   = filters.to   ? new Date(filters.to).getTime()+24*3600e3 : Infinity;

    const combined = [...reports, ...queue];
    const filtered = combined.filter(r=>{
      const t = new Date(r.time).getTime();
      const matchType = (filters.type==="all") || r.type===filters.type;
      const matchQ = !filters.q || (r.place+r.desc).toLowerCase().includes(filters.q.toLowerCase());
      return matchType && matchQ && t>=from && t<=to;
    });

    // markers
    filtered.forEach(r=>{
      const icon = window.L.icon({ iconUrl: iconUrl(r.type), iconSize:[28,28], iconAnchor:[14,14] });
      const m = window.L.marker([r.lat,r.lon],{icon}).addTo(map)
        .bindPopup(`<b>${r.place}</b><br><small>${r.type.replace('_',' ')}</small><br>${r.desc}<br><small>${new Date(r.time).toLocaleString()}</small>`);
      markersRef.current.push(m);
    });

    // heat
    if(heatRef.current){ map.removeLayer(heatRef.current); }
    const pts = combined.map(r=>[r.lat, r.lon, 0.6]);
    if(pts.length){
      // @ts-ignore leaflet.heat
      heatRef.current = window.L.heatLayer(pts, {radius:22, blur:16, minOpacity:0.25}).addTo(map);
    }
  };

  const iconUrl = (t:string)=>{
    const colors:any = {tsunami:'#ff4d6d', storm_surge:'#ff922b', swell:'#4cc9f0', flooding:'#ffd43b', currents:'#b197fc'};
    const color = colors[t]||'#9fb1c6';
    const svg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40'>
      <circle cx='20' cy='20' r='10' fill='${color}' stroke='white' stroke-width='2'/>
    </svg>`);
    return `data:image/svg+xml;utf8,${svg}`;
  };

  const submit = ()=>{
    const id = `r-${Math.random().toString(36).slice(2,9)}`;
    const when = time ? new Date(time).toISOString() : new Date().toISOString();
    // place -> lat lon (if user typed Lat x, Lon y); else map center
    const center = mapRef.current.getCenter();
    let lat=center.lat, lon=center.lng;
    const m = place.match(/Lat\s*([-+]?\d+(\.\d+)?)[^\d-+]+Lon\s*([-+]?\d+(\.\d+)?)/i);
    if(m){ lat=parseFloat(m[1]); lon=parseFloat(m[3]); }

    const r: Report = {id, lat, lon, type, place: place||"Unknown", desc: desc||"—", time: when, media: 0};
    if(useStore.getState().fakeOffline) { enqueue(r); }
    else { addReport(r); }
    setDesc(""); setPlace(""); setTime("");
  };

  // Filters wiring (hero controls)
  useEffect(()=>{
    const apply = ()=>{
      const type = (document.getElementById("filter-type") as HTMLSelectElement)?.value as any;
      const from = (document.getElementById("filter-from") as HTMLInputElement)?.value;
      const to   = (document.getElementById("filter-to") as HTMLInputElement)?.value;
      const q    = (document.getElementById("filter-q") as HTMLInputElement)?.value;
      setFilters({type, from, to, q});
    };
    const reset = ()=>{ (document.getElementById("filter-q") as HTMLInputElement).value=""; setFilters({type:"all", q:"", from:undefined, to:undefined}); };

    document.getElementById("filter-apply")?.addEventListener("click", apply);
    document.getElementById("filter-reset")?.addEventListener("click", reset);
    return ()=>{
      document.getElementById("filter-apply")?.removeEventListener("click", apply);
      document.getElementById("filter-reset")?.removeEventListener("click", reset);
    };
  },[setFilters]);

  const useMyLocation = ()=>{
    if(!navigator.geolocation){ alert("Geolocation not supported"); return; }
    navigator.geolocation.getCurrentPosition(pos=>{
      const {latitude, longitude} = pos.coords;
      setPlace(`Lat ${latitude.toFixed(4)}, Lon ${longitude.toFixed(4)}`);
      mapRef.current.setView([latitude, longitude], 12);
    },()=>alert("Could not get location"));
  };

  return (
    <section id="report" className="px-4 pb-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 glass rounded-smooth p-4" data-aos="fade-up">
          <h2 className="font-semibold"><i className="fa-solid fa-triangle-exclamation"></i> Submit a Hazard Report</h2>
          <p className="text-muted text-sm">No login in this demo. Data stays local unless you “Sync”.</p>

          <div className="grid md:grid-cols-2 gap-3 mt-2">
            <div>
              <label className="text-sm">Event Type</label>
              <select value={type} onChange={e=>setType(e.target.value as any)} className="w-full bg-[#0c1422] border border-border rounded-lg px-3 py-2">
                <option value="swell">Swell / High Waves</option>
                <option value="flooding">Coastal Flooding</option>
                <option value="currents">Strong Currents</option>
                <option value="storm_surge">Storm Surge</option>
                <option value="tsunami">Tsunami</option>
              </select>
            </div>
            <div>
              <label className="text-sm">Location (auto / manual)</label>
              <input value={place} onChange={e=>setPlace(e.target.value)} placeholder="e.g., Marina Beach, Chennai" className="w-full bg-[#0c1422] border border-border rounded-lg px-3 py-2"/>
            </div>
            <div>
              <label className="text-sm">Description</label>
              <input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What did you observe?" className="w-full bg-[#0c1422] border border-border rounded-lg px-3 py-2"/>
            </div>
            <div>
              <label className="text-sm">When</label>
              <input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} className="w-full bg-[#0c1422] border border-border rounded-lg px-3 py-2"/>
            </div>
            <div className="flex items-end gap-2">
              <button onClick={useMyLocation} className="px-3 py-2 rounded-lg border border-border"><i className="fa-solid fa-location-crosshairs"></i> Use my location</button>
              <button onClick={submit} className="px-3 py-2 rounded-lg border border-border bg-gradient-to-b from-[#1b4a62] to-[#11354a]">Submit</button>
            </div>
          </div>
        </div>

        <div className="glass rounded-smooth p-4" data-aos="fade-up">
          <h2 className="font-semibold"><i className="fa-solid fa-wifi"></i> Connectivity</h2>
          <p className="text-muted text-sm">Offline-first demo: reports queue locally if offline.</p>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${fakeOffline? "bg-danger":"bg-ok"}`}></div>
            <div>{fakeOffline? "Offline (simulated)":"Online"}</div>
          </div>
          <div className="h-[1px] bg-border my-3"></div>
          <button onClick={toggleOffline} className="px-3 py-2 rounded-lg border border-border mr-2">
            <i className="fa-solid fa-plug-circle-xmark"></i> Toggle offline
          </button>
          <button onClick={syncQueue} className="px-3 py-2 rounded-lg border border-border bg-gradient-to-b from-[#1b4a62] to-[#11354a]">
            <i className="fa-solid fa-cloud-arrow-up"></i> Sync queued (mock)
          </button>
          <p className="text-muted text-sm mt-2">Queued: {queue.length}</p>
        </div>
      </div>
    </section>
  );
}
