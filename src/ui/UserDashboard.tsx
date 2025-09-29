import React, { useState, useEffect } from "react";
import supabase from "../utils/supabase";

type Report = {
  id?: number;
  user_id?: string | null;
  place: string;
  desc: string;
  type: string;
};

export default function UserDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [newReport, setNewReport] = useState<Report>({ place: "", desc: "", type: "" });

  const fetchReports = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) {
      setReports([]);
      return;
    }
    const { data, error } = await supabase
      .from("reports")
      .select("*")
      .eq("user_id", userId);
    if (!error) {
      setReports(data || []);
    } else {
      console.error(error);
      setReports([]);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleReportSubmit = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const userId = userData?.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("reports")
      .insert([
        {
          user_id: userId,
          place: newReport.place,
          desc: newReport.desc,
          type: newReport.type,
        },
      ])
      .select(); // return inserted rows

    if (!error) {
      setReports((prev) => [...prev, ...(data || [])]);
      setNewReport({ place: "", desc: "", type: "" });
    } else {
      console.error(error);
    }
  };

  return (
    <div className="user-dashboard">
      <h2>Your Reports</h2>
      <div className="report-form">
        <input
          type="text"
          placeholder="Place"
          value={newReport.place}
          onChange={(e) => setNewReport({ ...newReport, place: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newReport.desc}
          onChange={(e) => setNewReport({ ...newReport, desc: e.target.value })}
        />
        <button onClick={handleReportSubmit}>Submit Report</button>
      </div>

      <div className="report-list">
        {reports.map((report, index) => (
          <div key={index} className="report-card">
            <h3>{report.place}</h3>
            <p>{report.desc}</p>
          </div>
        ))}
      </div>

      <button className="btn sos-button">SOS Alert</button>
    </div>
  );
}
