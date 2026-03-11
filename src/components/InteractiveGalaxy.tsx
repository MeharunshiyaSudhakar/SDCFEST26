"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import SpaceBackground from "./three/SpaceBackground";
import GalaxyMap from "./three/GalaxyMap";
import { planetsData } from "@/lib/planets";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function InteractiveGalaxy({ onAbort }: { onAbort: () => void }) {
    const [selectedPlanet, setSelectedPlanet] = useState<any>(null);
    const [isWarping, setIsWarping] = useState(false);
    const cameraRef = useRef<any>(null!);

    const handleSelectPlanet = (planetPos: number[], link: string) => {
        setIsWarping(true);

        // Zoom toward the planet first
        gsap.to(cameraRef.current.position, {
            x: planetPos[0],
            y: planetPos[1],
            z: planetPos[2] + 4,
            duration: 2,
            ease: "power3.inOut",
            onComplete: () => {
                // Open link directly
                setTimeout(() => {
                    if (link && link !== "#") {
                        window.open(link, "_blank");
                    } else {
                        alert("REGISTRATION INTERCEPTED: DATA ENCRYPTED. ACCESS GRANTED SOON.");
                    }
                    // Reset warping state to allow selecting others
                    setIsWarping(false);
                }, 1000);
            }
        });

        // Optional: fade HUD back in after a while
        gsap.to(".hud-controls", { opacity: 0, duration: 0.5 });
        gsap.to(".hud-controls", { opacity: 1, duration: 0.5, delay: 3 });
    };

    return (
        <div className="w-screen h-screen relative overflow-hidden bg-transparent">
            {/* 3D World */}
            <div className="absolute inset-0 z-0 text-[#00d2ff]">
                <Canvas shadows gl={{ alpha: true }}>
                    <PerspectiveCamera
                        ref={cameraRef}
                        makeDefault
                        position={[0, 40, 60]}
                        fov={50}
                    />
                    <SpaceBackground speed={isWarping ? 10 : 1} />

                    <GalaxyMap
                        planets={planetsData}
                        onSelectPlanet={handleSelectPlanet}
                    />

                    <OrbitControls
                        enablePan={false}
                        maxDistance={100}
                        minDistance={10}
                        autoRotate={!isWarping}
                        autoRotateSpeed={0.5}
                        enabled={!isWarping}
                    />
                </Canvas>
            </div>

            {/* Galaxy HUD Overlay */}
            <div className="hud-controls absolute inset-0 z-10 pointer-events-none p-6 md:p-12">
                <div className="max-w-7xl mx-auto h-full flex flex-col justify-between items-center text-center">

                    {/* TOP HUD SECTION - Clean Floating Text */}
                    <div className="w-full relative flex flex-col items-center gap-8 mt-4">
                        {/* ABORT MISSION (Top Left Corner) */}
                        <div className="absolute top-0 left-0 pointer-events-auto">
                            <motion.button
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={onAbort}
                                className="shining-effect hud-border px-6 py-3 bg-black/20 text-[#00d2ff] font-orbitron text-[9px] tracking-[0.4em] uppercase hover:bg-[#00d2ff]/10 hover:text-[#00d2ff] transition-all flex items-center gap-2 group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                ABORT MISSION
                            </motion.button>
                        </div>

                        {/* CENTERED INFO */}
                        <div className="space-y-3">
                            <h2 className="text-[#00d2ff] font-orbitron tracking-[0.8em] text-[10px] md:text-sm flex items-center justify-center gap-4 uppercase font-bold">
                                <span className="w-1.5 h-1.5 bg-[#00d2ff] rounded-full animate-pulse shadow-[0_0_15px_#00d2ff]" />
                                ANALYZING SECTOR 42
                            </h2>
                            <p className="text-white/40 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-medium max-w-lg">
                                SELECT A PLANETARY SYSTEM TO INVESTIGATE COORDINATES
                            </p>
                        </div>
                    </div>

                    {/* BOTTOM HUD SECTION (Navigation Protocol) */}
                    <div className="w-full flex justify-center pb-12 opacity-50">
                        <div className="text-[#00d2ff] text-[9px] md:text-[11px] font-mono tracking-[1.8em] uppercase animate-pulse pl-[1.8em]">
                            ZOOM TO EXPLORE SYSTEM
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isWarping && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className="absolute inset-0 z-[100] bg-[#00d2ff] pointer-events-none mix-blend-screen flex flex-col items-center justify-center p-20"
                    >
                        <p className="text-white font-orbitron text-2xl md:text-5xl tracking-[2em] uppercase pl-[2em] drop-shadow-[0_0_20px_#00d2ff]">
                            WARPING...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-transparent pointer-events-none border-[1px] border-white/5 mx-2 my-2 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)]" />
        </div >
    );
}
