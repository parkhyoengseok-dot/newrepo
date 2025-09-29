export type Role = "citizen" | "official" | "analyst";
export type EventType = "all" | "tsunami" | "storm_surge" | "swell" | "flooding" | "currents";

export interface Report {
  lat: number;
  lon: number;
  type: Exclude<EventType, "all">;
  place: string;
  desc: string;
  time: string;        // ISO
  media?: number;      // count
  id: string;
}
