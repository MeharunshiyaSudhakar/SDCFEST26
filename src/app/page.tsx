"use client";

import { useState } from "react";
import MissionBriefing from "@/components/MissionBriefing";
import InteractiveGalaxy from "@/components/InteractiveGalaxy";
import SpaceAudio from "@/components/SpaceAudio";
import VideoBackground from "@/components/VideoBackground";

export default function Home() {
  const [missionStarted, setMissionStarted] = useState(false);

  return (
    <main className="relative min-h-screen w-full m-0 p-0">
      {/* Background stays fixed here */}
      <VideoBackground />

      {/* Mission Audio Toggle */}
      <SpaceAudio play={missionStarted} />

      {!missionStarted ? (
        /* The Opening Star Awakening & Mission Briefing HUD */
        <MissionBriefing onStart={() => setMissionStarted(true)} />
      ) : (
        /* The 3D Galaxy Navigation (World Map) */
        <div id="galaxy" className="w-full h-screen relative bg-transparent overflow-hidden">
          <InteractiveGalaxy onAbort={() => setMissionStarted(false)} />
        </div>
      )}
    </main>
  );
}
