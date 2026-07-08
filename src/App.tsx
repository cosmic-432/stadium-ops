import React, { useState, useEffect } from "react";
import { UserRole, StadiumVenue } from "./types";
import { Header } from "./components/Header";
import { FanConcierge } from "./components/FanConcierge";
import { OpsDashboard } from "./components/OpsDashboard";
import { VolunteerAssistant } from "./components/VolunteerAssistant";
import { CrowdDensityMap } from "./components/CrowdDensityMap";
import { SustainabilityTracker } from "./components/SustainabilityTracker";
import { VipSuitePass } from "./components/VipSuitePass";
import { EmergencyBroadcast } from "./components/EmergencyBroadcast";
import { TournamentBracket } from "./components/TournamentBracket";
import { LiveWeatherWidget } from "./components/LiveWeatherWidget";
import { GlobalFanChat } from "./components/GlobalFanChat";
import { AIGeneratorModal } from "./components/AIGeneratorModal";
import { FloatingAiAssistant } from "./components/ui/glowing-ai-chat-assistant";
import { MouseGlow } from "./components/ui/MouseGlow";
import { Component as SpotlightCursor } from "./components/ui/spotlight-cursor";
import { Trophy, Loader2 } from "lucide-react";

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>("fan");
  const [venues, setVenues] = useState<Record<string, StadiumVenue> | null>(null);
  const [selectedVenueId, setSelectedVenueId] = useState<string>("metlife");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchVenues = async () => {
    try {
      const res = await fetch("/api/stadiums");
      const data = await res.json();
      setVenues(data);
    } catch (err) {
      console.error("Failed to load venues:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [currentRole]);

  if (isLoading || !venues) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-sky-500 animate-spin" />
          <p className="text-sm font-medium text-slate-600">Loading StadiumOps FIFA World Cup 2026...</p>
        </div>
      </div>
    );
  }

  const currentVenue = venues[selectedVenueId] || venues.metlife;

  return (
    <div className="min-h-screen font-sans antialiased selection:bg-rose-100 selection:text-rose-900 pb-12 bg-slate-50/70 text-slate-800">
      {/* Top Header */}
      <Header
        currentRole={currentRole}
        setRole={setCurrentRole}
        venues={venues}
        selectedVenueId={selectedVenueId}
        setSelectedVenueId={setSelectedVenueId}
        onOpenImageModal={() => setIsImageModalOpen(true)}
        onRefreshData={fetchVenues}
      />

      {/* Main Content Area based on User Role */}
      <main className="mt-4">
        {currentRole === "fan" && <FanConcierge venue={currentVenue} />}
        {currentRole === "organizer" && <OpsDashboard venue={currentVenue} />}
        {currentRole === "volunteer" && <VolunteerAssistant venue={currentVenue} />}
        {currentRole === "crowd-map" && <CrowdDensityMap venue={currentVenue} />}
        {currentRole === "sustainability" && <SustainabilityTracker venue={currentVenue} />}
        {currentRole === "vip" && <VipSuitePass venue={currentVenue} />}
        {currentRole === "emergency" && <EmergencyBroadcast venue={currentVenue} />}
        {currentRole === "bracket" && <TournamentBracket venue={currentVenue} />}
        {currentRole === "weather" && <LiveWeatherWidget venue={currentVenue} />}
        {currentRole === "support" && <GlobalFanChat venue={currentVenue} />}
      </main>

      {/* AI Image Generator Modal */}
      <AIGeneratorModal isOpen={isImageModalOpen} onClose={() => setIsImageModalOpen(false)} />

      {/* Floating 3D AI Assistant */}
      <FloatingAiAssistant currentRole={currentRole} venueId={selectedVenueId} />

      {/* Mouse Glowing Light Spotlight */}
      <MouseGlow />
      <SpotlightCursor config={{ 
        radius: 75, 
        brightness: 0.22, 
        color: ['#fb7185', '#fda4af'] 
      }} />
    </div>
  );
}
