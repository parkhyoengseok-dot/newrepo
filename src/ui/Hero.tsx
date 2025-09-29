import { useEffect } from "react";

type Props = { t: Record<string, string> };

export default function Hero({ t }: Props) {
  return (
    <header className="py-16 px-4 bg-panel">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10">
        <div className="flex-1 text-center md:text-left" data-aos="fade-right">
          <span className="inline-flex items-center gap-2 text-xs text-muted px-3 py-2 rounded-full border border-border bg-white/10">
            <i className="fa-solid fa-shield-heart" /> Early warnings meet field intelligence
          </span>
          <h1 className="text-heading mt-4">{t.heroTitle}</h1>
          <p className="text-muted mt-2">{t.heroSub}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
            <div className="glass p-6 rounded-smooth shadow-glass hover:shadow-lg transition-all">
              <h3 id="kpi1" className="text-4xl font-bold">0</h3>
              <small className="text-muted">{t.kpi1Sub}</small>
            </div>
            <div className="glass p-6 rounded-smooth shadow-glass hover:shadow-lg transition-all">
              <h3 id="kpi2" className="text-4xl font-bold">0</h3>
              <small className="text-muted">{t.kpi2Sub}</small>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center" data-aos="fade-left">
          <div className="glass p-6 rounded-smooth w-full shadow-glass">
            <div id="map" className="w-full h-[400px] rounded-lg"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
