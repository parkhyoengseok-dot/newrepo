import { useEffect } from "react";
import L from "leaflet";

export default function MapView({ reports }: { reports: any[] }) {
  useEffect(() => {
    const map = L.map("map").setView([15.5, 74.5], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    reports.forEach((report) => {
      L.marker([report.lat, report.lon]).addTo(map).bindPopup(`
        <b>${report.place}</b><br>${report.desc}
      `);
    });
  }, [reports]);

  return <div id="map" style={{ height: "400px" }}></div>;
}
