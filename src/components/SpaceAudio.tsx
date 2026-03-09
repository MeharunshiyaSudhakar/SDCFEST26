"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function SpaceAudio({ play }: { play: boolean }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isEstablished, setIsEstablished] = useState(false);

    // Protocol: Unlock Audio on first interaction
    useEffect(() => {
        console.log("Audio Link System Initialized - Waiting for pulse...");
        const establishLink = () => {
            if (audioRef.current) {
                audioRef.current.play()
                    .then(() => {
                        setIsEstablished(true);
                        console.log("Audio uplink established.");
                    })
                    .catch(() => {
                        console.warn("Autoplay blocked. Waiting for manual override.");
                    });
            }
            window.removeEventListener("click", establishLink);
            window.removeEventListener("keydown", establishLink);
        };

        window.addEventListener("click", establishLink);
        window.addEventListener("keydown", establishLink);

        return () => {
            window.removeEventListener("click", establishLink);
            window.removeEventListener("keydown", establishLink);
        };
    }, []);

    // Phase Control: Adjust volume/playback on mission start
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = play ? 0.6 : 0.2;
            audioRef.current.play().catch(() => {
                // If blocked, we just wait for the interaction handler
            });
        }
    }, [play]);

    const handleToggle = () => {
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
            setIsMuted(audioRef.current.muted);
        }
    };

    return (
        <div className="fixed bottom-32 right-10 z-[700] flex flex-col items-center gap-3">
            {/* Status Indicator */}
            <div className={`text-[9px] font-mono tracking-widest uppercase transition-colors duration-500 ${isEstablished ? 'text-cyan-400 opacity-60' : 'text-red-500 animate-pulse'}`}>
                {isEstablished ? "SIGNAL ACTIVE" : "SIGNAL BLOCKED"}
            </div>

            <button
                onClick={handleToggle}
                className="p-4 rounded-full border border-[#00d2ff]/30 bg-black/60 shadow-[0_0_25px_rgba(0,210,255,0.2)] hover:border-[#00d2ff] hover:bg-black transition-all"
                title={isMuted ? "Reconnect Frequency" : "Secure Frequency"}
            >
                {isMuted ? <VolumeX size={24} className="text-red-500" /> : <Volume2 size={24} className="text-[#00d2ff]" />}
            </button>

            <audio ref={audioRef} loop preload="auto">
                <source src="https://pixabay.com/music/download/115366/" type="audio/mp3" />
                <source src="https://cdn.pixabay.com/download/audio/2022/11/22/audio_106b0ac680.mp3?filename=dark-ambient-soundscape-115366.mp3" type="audio/mp3" />
                <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" type="audio/mp3" />
            </audio>
        </div>
    );
}
