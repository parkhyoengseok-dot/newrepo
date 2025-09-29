export default function Newland() {
  return
    <div className="landing-page">
      <h1 className="text-center">Welcome to INCOIS Ocean Hazard Reporting Platform</h1>
      <p className="text-center">
        This platform helps in reporting and verifying ocean hazards like Tsunamis, Storm Surges, Swell Waves, and more.
      </p>
      <div className="text-center">
        <button className="btn primary" onClick={() => window.location.href = "/login"}>
          Login
        </button>
        <button className="btn secondary" onClick={() => window.location.href = "/signup"}>
          Sign Up
        </button>
      </div>
    </div>
  );
}