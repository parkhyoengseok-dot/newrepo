import { useEffect } from "react";
import { useStore } from "../store";
import { i18n } from "../i18n";
import NavBar from "./NavBar";
import Hero from "./Hero";
import Dashboard from "./Dashboard";
import ReportPanel from "./ReportPanel";
import Footer from "./Footer";

export default function App(){
  const lang = useStore(s=>s.lang);

  useEffect(()=>{
    // @ts-ignore
    if(window.AOS){ /* global AOS from index.html */
      // @ts-ignore
      window.AOS.init({duration:700, once:true});
    }
  },[]);

  const t = i18n[lang];

  return (
    <div>
      <NavBar />
      <Hero t={t}/>
      <Dashboard />
      <ReportPanel />
      <Footer />
    </div>
  );
}
