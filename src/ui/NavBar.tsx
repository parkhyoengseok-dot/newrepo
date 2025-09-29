import { useStore } from "../store";

export default function NavBar() {
  const { lang, setLang, role, setRole } = useStore();
  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4 flex items-center justify-between transition-all">
      <div className="flex items-center gap-4 font-bold text-lg">
        <div className="h-12 w-12 rounded-xl grid place-items-center text-[#0a0f16]" style={{ background: "linear-gradient(135deg, #4cc9f0, #80ffdb)" }}>🌊</div>
        <span className="text-lg">INCOIS Ocean Hazard Intel</span>
      </div>
      <div className="hidden md:flex gap-4">
        <select
          className="bg-[#0e1523] border border-border rounded-lg px-4 py-2 text-sm text-text"
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
        >
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
          <option value="ta">தமிழ்</option>
          <option value="te">తెలుగు</option>
        </select>

        <select
          className="bg-[#0e1523] border border-border rounded-lg px-4 py-2 text-sm text-text"
          value={role}
          onChange={(e) => setRole(e.target.value as any)}
        >
          <option value="citizen">Citizen</option>
          <option value="official">Official</option>
          <option value="analyst">Analyst</option>
        </select>

        <button
          className="px-4 py-2 bg-primary text-text rounded-lg hover:bg-accent transition-all"
          onClick={() => document.getElementById("report")?.scrollIntoView({ behavior: "smooth" })}
        >
          <i className="fa-solid fa-triangle-exclamation"></i> Report Hazard
        </button>
      </div>

      {/* Mobile view: Hamburger menu */}
      <div className="md:hidden">
        <button className="text-primary">
          <i className="fa-solid fa-bars"></i>
        </button>
      </div>
    </nav>
  );
}
