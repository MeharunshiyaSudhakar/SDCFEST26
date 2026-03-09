"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Backdrop } from "@react-three/drei";
import gsap from "gsap";
import { DemogorgonHead } from "./three/Demogorgon";

export default function MonsterEntry({ onEnter }: { onEnter: () => void }) {
    // Phase logic: idle -> intro_text -> shaking -> growling -> breaking -> portal_open
    const [phase, setPhase] = useState("idle");
    const containerRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        // Initial sequence on mount
        const timer = setTimeout(() => setPhase("intro_text"), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleStartBreach = () => {
        setPhase("shaking");

        // GSAP cinematic shake
        const timeline = gsap.timeline();
        timeline.to(containerRef.current, {
            x: 10,
            y: 10,
            duration: 0.05,
            repeat: 40,
            yoyo: true,
            ease: "none"
        });

        timeline.add(() => setPhase("breaking"), "+=1");
        // After break, hold for monster scream, then portal
        timeline.add(() => setPhase("portal_open"), "+=4");
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col items-center justify-center cursor-none"
        >
            {/* Background Cinematic Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#ff00000a] to-[#000000] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

            {/* Random Lightning Fills */}
            <AnimatePresence>
                {(phase === "shaking" || phase === "breaking") && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0, 0.2, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: Math.random() * 2 }}
                        className="absolute inset-0 bg-white/20 z-0 pointer-events-none"
                    />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {phase === "idle" && (
                    <motion.div
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        className="z-10 text-gray-500 font-orbitron tracking-[1em]"
                    >
                        INITIALIZING REALITY...
                    </motion.div>
                )}

                {phase === "intro_text" && (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                        transition={{ duration: 2 }}
                        className="z-10 text-center flex flex-col items-center gap-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-creepster text-neon-red tracking-[0.5em] glitch-text leading-tight drop-shadow-[0_0_20px_#ff0000]">
                            SOMETHING IS COMING...
                        </h1>
                        <motion.button
                            whileHover={{ scale: 1.05, textShadow: "0 0 15px #00f3ff" }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleStartBreach}
                            className="px-12 py-5 font-orbitron text-xl text-neon-blue border border-neon-blue/40 rounded bg-black/40 backdrop-blur-md hover:border-neon-blue transition-all duration-300"
                        >
                            [ WITNESS THE BREACH ]
                        </motion.button>
                    </motion.div>
                )}

                {phase === "breaking" && (
                    <motion.div
                        key="breaking"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px]" />

                        {/* 3D Monster Breach */}
                        <div className="relative w-full h-full">
                            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                <ambientLight intensity={0.2} />
                                <pointLight position={[0, 0, 2]} intensity={5} color="#ff0000" />
                                <spotLight position={[0, 10, 0]} angle={0.2} penumbra={1} intensity={10} color="#ff0000" />

                                <Float speed={10} rotationIntensity={5} floatIntensity={1}>
                                    <group position={[0, 0, 1]} scale={1.5}>
                                        <DemogorgonHead />
                                    </group>
                                </Float>
                            </Canvas>
                        </div>

                        {/* Glass Shards Layers */}
                        {[...Array(30)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    x: 0,
                                    y: 0,
                                    scale: 0.1,
                                    rotate: 0
                                }}
                                animate={{
                                    x: (Math.random() - 0.5) * 2000,
                                    y: (Math.random() - 0.5) * 2000,
                                    scale: Math.random() * 2,
                                    rotate: Math.random() * 720,
                                    opacity: 0
                                }}
                                transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                                className="absolute w-20 h-20 bg-white/20 blur-[1px] pointer-events-none"
                                style={{
                                    clipPath: `polygon(${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%, ${Math.random() * 100}% ${Math.random() * 100}%)`,
                                    zIndex: 60
                                }}
                            />
                        ))}

                        <motion.h2
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: 1 }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                            className="absolute text-[120px] font-creepster text-neon-red drop-shadow-[0_0_50px_#ff0000] z-60 pointer-events-none"
                        >
                            BREACH
                        </motion.h2>
                    </motion.div>
                )}

                {phase === "portal_open" && (
                    <motion.div
                        key="portal"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 3, ease: "circOut" }}
                        className="relative z-[100] flex flex-col items-center gap-12"
                    >
                        {/* Giant Swirling Void Portal (Netflix Style Scale) */}
                        <div className="relative w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] flex items-center justify-center">
                            {/* Outer Glow Ring */}
                            <div className="absolute inset-0 rounded-full border-[1.5rem] border-neon-red blur-xl animate-pulse shadow-[0_0_150px_#ff0000,inset_0_0_100px_#ff0000] opacity-30" />

                            {/* Inner Portal Vortex */}
                            <div className="absolute inset-0 rounded-full border-[0.5rem] border-neon-red overflow-hidden bg-black flex items-center justify-center shadow-[inset_0_0_80px_#000000]">
                                {/* Rotating nebula layers */}
                                <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,#ff0000,#000,#4a0000,#000,#ff0000)] animate-[spin_8s_linear_infinite]" />
                                <div className="absolute inset-[-50%] bg-[conic-gradient(from_180deg,#9d00ff,#000,#00f3ff,#000,#9d00ff)] animate-[spin_12s_linear_infinite] opacity-30" />

                                {/* Floating "In" button inside the vortex */}
                                <div className="z-10 text-center space-y-8 p-12 backdrop-blur-[3px] rounded-full border border-white/5 bg-black/20">
                                    <h2 className="text-4xl md:text-6xl font-creepster text-white tracking-widest leading-normal">
                                        SYMPOSIUM<br />DIMENSION
                                    </h2>
                                    <motion.button
                                        whileHover={{ scale: 1.1, boxShadow: "0 0 50px #ff0000" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={onEnter}
                                        className="px-16 py-6 font-orbitron text-2xl text-white bg-neon-red border-none rounded-full font-black tracking-widest shadow-[0_0_30px_#ff0000]"
                                    >
                                        ENTER THE VOID
                                    </motion.button>
                                </div>
                            </div>

                            {/* Fog Spore layers leaking out */}
                            <div className="absolute -inset-20 bg-radial-gradient(circle, #ff000022 0%, transparent 70%) pointer-events-none mix-blend-screen animate-pulse" />
                        </div>

                        <p className="font-orbitron text-neon-red tracking-[0.8em] animate-pulse">NO TURNING BACK</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Persistent Spores overlay for global depth */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
            </div>
        </div>
    );
}
