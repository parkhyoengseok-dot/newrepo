import { create } from "zustand";
import type { Role, Report, EventType } from "./types";

type State = {
  role: Role;
  lang: "en"|"hi"|"ta"|"te";
  fakeOffline: boolean;
  reports: Report[];
  queue: Report[];
  filters: { type: EventType; q: string; from?: string; to?: string; };
  setRole: (r: Role)=>void;
  setLang: (l: State["lang"])=>void;
  toggleOffline: ()=>void;
  addReport: (r: Report)=>void;
  enqueue: (r: Report)=>void;
  syncQueue: ()=>void;
  setFilters: (f: Partial<State["filters"]>)=>void;
  resetFilters: ()=>void;
};

const queued = JSON.parse(localStorage.getItem("queuedReports") || "[]") as Report[];

export const useStore = create<State>((set,get)=>({
  role: "citizen",
  lang: "en",
  fakeOffline: false,
  reports: [],
  queue: queued,
  filters: { type:"all", q:"" },
  setRole:(r)=>set({role:r}),
  setLang:(l)=>set({lang:l}),
  toggleOffline:()=>set(s=>({fakeOffline:!s.fakeOffline})),
  addReport:(r)=>set(s=>({reports:[...s.reports, r]})),
  enqueue:(r)=>set(s=>{
    const next=[...s.queue, r]; localStorage.setItem("queuedReports", JSON.stringify(next));
    return {queue: next};
  }),
  syncQueue:()=>set(s=>{
    const moved = s.queue;
    const nextReports = [...s.reports, ...moved];
    localStorage.setItem("queuedReports","[]");
    return {reports: nextReports, queue: []};
  }),
  setFilters:(f)=>set(s=>({filters:{...s.filters, ...f}})),
  resetFilters:()=>set({filters:{type:"all", q:""}})
}));

// seed demo
function seed() {
  const now = Date.now();
  const demo: Omit<Report,"id">[] = [
    {lat:12.9716,lon:77.5946,type:"swell",place:"Mangaluru Coast (mock)",desc:"High waves battering promenade",time:new Date(now-1*3600e3).toISOString()},
    {lat:13.0827,lon:80.2707,type:"flooding",place:"Marina Beach, Chennai",desc:"Sea water encroaching service road",time:new Date(now-2*3600e3).toISOString()},
    {lat:15.2993,lon:74.1240,type:"swell",place:"Goa Baga Beach",desc:"Unusual swell, lifeguards alerting people",time:new Date(now-3*3600e3).toISOString()},
    {lat:17.3850,lon:78.4867,type:"currents",place:"Kakinada",desc:"Rip current signs near jetty",time:new Date(now-4*3600e3).toISOString()},
    {lat:19.0760,lon:72.8777,type:"storm_surge",place:"Mumbai Colaba",desc:"Water levels rising with storm band",time:new Date(now-5*3600e3).toISOString()},
    {lat:9.9312,lon:76.2673,type:"swell",place:"Kochi Fort",desc:"Harbour choppy, boats docked",time:new Date(now-6*3600e3).toISOString()},
  ];
  const rs: Report[] = demo.map((d,i)=>({id:`seed-${i}`,...d}));
  useStore.setState({reports: rs});
}
seed();
