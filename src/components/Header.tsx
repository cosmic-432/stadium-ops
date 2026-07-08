import React from "react";
import { UserRole, StadiumVenue } from "../types";
import { Building2, Users, ShieldCheck, HeartHandshake, Sparkles, MapPin, RefreshCw, Activity, Leaf, Crown, Megaphone, Trophy } from "lucide-react";

interface HeaderProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  venues: Record<string, StadiumVenue>;
  selectedVenueId: string;
  setSelectedVenueId: (id: string) => void;
  onOpenImageModal: () => void;
  onRefreshData: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  setRole,
  venues,
  selectedVenueId,
  setSelectedVenueId,
  onOpenImageModal,
  onRefreshData,
}) => {
  const currentVenue = venues[selectedVenueId] || venues.metlife;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50 px-3 py-2.5 transition-all space-y-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-rose-400 to-sky-500 flex items-center justify-center shadow-sm shrink-0 text-white">
            <Building2 className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-1.5">
            <h1 className="font-sans font-bold text-sm text-slate-800 tracking-tight">StadiumOps</h1>
            <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full font-medium">FIFA '26</span>
          </div>
        </div>

        {/* Right side: Venue Selector & AI Studio */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-xl border border-slate-200/60">
            <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <select
              value={selectedVenueId}
              onChange={(e) => setSelectedVenueId(e.target.value)}
              className="bg-transparent text-[11px] font-medium text-slate-700 focus:outline-none cursor-pointer max-w-[120px] sm:max-w-none"
            >
              {(Object.values(venues) as StadiumVenue[]).map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name.split("(")[0]}
                </option>
              ))}
            </select>
            <button
              onClick={onRefreshData}
              title="Refresh Telemetry"
              className="p-1 rounded-lg hover:bg-slate-200/50 text-slate-500 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={onOpenImageModal}
            className="flex items-center gap-1 bg-gradient-to-r from-purple-100 to-rose-100 text-slate-700 px-2 py-1.5 rounded-xl text-[11px] font-medium border border-purple-200/50 shadow-sm shrink-0"
          >
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span className="hidden sm:inline">AI Studio</span>
          </button>
        </div>
      </div>

      {/* Second Row: Role Switchers & Features */}
      <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start gap-1 overflow-x-auto pb-0.5">
        <div className="bg-slate-100 p-0.5 rounded-xl flex gap-1 border border-slate-200/60 flex-wrap justify-center sm:justify-start w-full">
          <button
            onClick={() => setRole("fan")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "fan"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Users className="w-3 h-3 text-sky-500" />
            <span>Fans</span>
          </button>
          <button
            onClick={() => setRole("organizer")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "organizer"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <ShieldCheck className="w-3 h-3 text-emerald-500" />
            <span>Ops</span>
          </button>
          <button
            onClick={() => setRole("volunteer")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "volunteer"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <HeartHandshake className="w-3 h-3 text-rose-500" />
            <span>Volunteers</span>
          </button>
          <button
            onClick={() => setRole("crowd-map")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "crowd-map"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Activity className="w-3 h-3 text-indigo-500" />
            <span>Crowd</span>
          </button>
          <button
            onClick={() => setRole("sustainability")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "sustainability"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Leaf className="w-3 h-3 text-emerald-600" />
            <span>Green</span>
          </button>
          <button
            onClick={() => setRole("vip")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "vip"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Crown className="w-3 h-3 text-amber-500" />
            <span>VIP</span>
          </button>
          <button
            onClick={() => setRole("emergency")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "emergency"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Megaphone className="w-3 h-3 text-rose-500" />
            <span>Alerts</span>
          </button>
          <button
            onClick={() => setRole("bracket")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "bracket"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Trophy className="w-3 h-3 text-sky-500" />
            <span>Bracket</span>
          </button>
          <button
            onClick={() => setRole("weather")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "weather"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="w-3 h-3 text-sky-400 font-bold">☁️</span>
            <span>Weather</span>
          </button>
          <button
            onClick={() => setRole("support")}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all shrink-0 ${
              currentRole === "support"
                ? "bg-white text-slate-800 shadow-sm font-semibold"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <span className="w-3 h-3 text-indigo-500 font-bold">💬</span>
            <span>Fan Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
