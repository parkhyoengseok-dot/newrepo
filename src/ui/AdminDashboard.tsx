import { useEffect, useState } from "react";
import supabase from "../utils/supabase";

type Report = {
  id: string;
  place?: string | null;
  desc?: string | null;
  verified?: boolean | null;
  [key: string]: any;
};

export default function AdminDashboard() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    const fetchReports = async () => {
      const { data } = await supabase.from<"reports", Report>("reports").select("*");
      setReports(data ?? []);
    };
    fetchReports();
  }, []);

  const handleVerify = async (id: string) => {
    const { error } = await supabase
      .from("reports")
      .update({ verified: true })
      .eq("id", id);
    if (!error) {
      setReports(reports.map((report) => (report.id === id ? { ...report, verified: true } : report)));
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Verify Reports</h2>
      <div className="report-list">
        {reports.map((report) => (
          <div key={report.id} className="report-card">
            <h3>{report.place}</h3>
            <p>{report.desc}</p>
            <button
              className="btn verify-btn"
              onClick={() => handleVerify(report.id)}
              disabled={!!report.verified}
            >
              {report.verified ? "Verified" : "Verify"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
