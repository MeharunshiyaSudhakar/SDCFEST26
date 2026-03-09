"use client";

import { use, useState, useEffect } from "react";
import { planetsData } from "@/lib/planets";
import { notFound, useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Float,
    PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import SpaceBackground from "@/components/three/SpaceBackground";
import SpaceAudio from "@/components/SpaceAudio";

export default function PlanetPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);
    const planet = planetsData[slug as keyof typeof planetsData];
    const [showUI, setShowUI] = useState(false);

    if (!planet) {
        notFound();
    }

    useEffect(() => {
        // Reveal UI with a cinematic delay
        const timer = setTimeout(() => setShowUI(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-screen relative overflow-hidden bg-black">
            {/* 👽 Atmospheric Entry Screen Flash - Changed to Thematic Blue */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 2, ease: "circIn" }}
                className="fixed inset-0 bg-[#00d2ff] z-[999] pointer-events-none mix-blend-screen"
            />

            <SpaceAudio play={true} />
            <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas gl={{ alpha: true }}>
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
                    <SpaceBackground speed={0.4} />

                    <ambientLight intensity={0.1} />
                    <pointLight position={[0, 0, -10]} intensity={5} color={planet.color} />
                    <spotLight position={[10, 10, 10]} intensity={2} angle={0.2} penumbra={1} color={planet.color} />

                    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
                        <mesh>
                            <sphereGeometry args={[4, 64, 64]} />
                            <meshStandardMaterial
                                color={planet.color}
                                emissive={planet.color}
                                emissiveIntensity={0.3}
                                metalness={0.9}
                                roughness={0.2}
                            />
                        </mesh>
                        {/* Planet Glow layer */}
                        <mesh scale={[1.05, 1.05, 1.05]}>
                            <sphereGeometry args={[4, 64, 64]} />
                            <meshStandardMaterial color={planet.color} transparent opacity={0.15} side={THREE.BackSide} />
                        </mesh>
                    </Float>

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* PLANETARY HUD INTERFACE */}
            <AnimatePresence>
                {showUI && (
                    <div className="relative z-10 w-full h-full flex flex-col md:flex-row items-center justify-between p-10 md:p-24 overflow-y-auto">
                        {/* Left Data Analytics Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: -100 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hud-border p-10 rounded-xl w-full lg:w-[45%] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] bg-black/40"
                        >
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <h2 className="text-[#00d2ff] font-mono text-sm tracking-[0.5em] uppercase opacity-70">
                                        {planet.type} SYSTEM
                                    </h2>
                                    <h1 className="text-5xl md:text-7xl font-orbitron text-white tracking-widest font-thin italic uppercase">
                                        {planet.title}
                                    </h1>
                                </div>

                                <p className="text-xl md:text-2xl font-inter text-gray-400 font-light leading-relaxed border-l-2 border-[#00d2ff] pl-6 py-2">
                                    {planet.description_long}
                                </p>

                                <div className="grid grid-cols-2 gap-8 py-8 border-y border-white/10">
                                    <div className="space-y-1">
                                        <span className="text-[#00d2ff] font-mono text-[10px] block opacity-50 uppercase tracking-widest">TEMPORAL UNITS</span>
                                        <span className="text-2xl font-orbitron text-white">{planet.time}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[#00d2ff] font-mono text-[10px] block opacity-50 uppercase tracking-widest">LANDING PAD</span>
                                        <span className="text-2xl font-orbitron text-white">{planet.venue}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Action/Directives Panel */}
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="hud-border p-10 rounded-xl w-full lg:w-[35%] bg-black/60 shadow-[0_0_50px_rgba(0,210,255,0.1)] mt-10 lg:mt-0"
                        >
                            <h3 className="text-[#00d2ff] font-orbitron font-bold text-2xl mb-10 tracking-[0.5em] uppercase border-b border-[#00d2ff]/20 pb-4">
                                MISSION DIRECTIVES
                            </h3>

                            <ul className="space-y-6 mb-12">
                                {planet.rules.map((rule, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + idx * 0.1 }}
                                        className="flex gap-4 text-lg text-gray-300 font-inter lowercase tracking-wider border-b border-white/5 pb-2"
                                    >
                                        <span className="text-[#00d2ff]">/</span>
                                        {rule}
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.button
                                whileHover={{ scale: 1.02, backgroundColor: "#00d2ff", color: "#000", boxShadow: "0 0 50px #00d2ff" }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-6 bg-transparent border border-[#00d2ff] text-[#00d2ff] font-orbitron text-xl font-black rounded uppercase tracking-[0.5em] transition-all"
                            >
                                🛰 INITIATE MISSION
                            </motion.button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Return to Galaxy Controls */}
            <button
                onClick={() => router.push("/#galaxy")}
                className="absolute bottom-10 left-10 z-50 text-white/50 font-mono flex items-center gap-4 hover:text-[#00d2ff] transition-all group"
            >
                <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:border-[#00d2ff] transition-all">&larr;</div>
                <span className="text-xs uppercase tracking-[0.8em]">RETURN TO GALAXY</span>
            </button>
        </div>
    );
}
