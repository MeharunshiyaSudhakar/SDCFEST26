"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Github, Linkedin, Phone, Briefcase, Timer, Globe, ChevronDown } from "lucide-react";

export default function MissionBriefing({ onStart }: { onStart: () => void }) {
    const [phase, setPhase] = useState("booting");
    const [timeLeft, setTimeLeft] = useState({
        days: 0, hours: 0, minutes: 0, seconds: 0
    });

    useEffect(() => {
        const timer1 = setTimeout(() => setPhase("mission_data"), 1500);
        const timer2 = setTimeout(() => setPhase("awaiting_input"), 4500);

        const targetDate = new Date("March 17, 2026 09:00:00").getTime();
        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const difference = targetDate - now;
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000)
                });
            }
        }, 1000);

        return () => {
            clearTimeout(timer1); clearTimeout(timer2); clearInterval(countdownInterval);
        };
    }, []);

    const handleInitiate = () => {
        gsap.to(".landing-container", {
            opacity: 0,
            duration: 0.8,
            onComplete: onStart
        });
    };

    return (
        <div className="landing-container relative z-10 w-full min-h-screen bg-transparent text-white selection:bg-[#00d2ff] selection:text-black">

            {/* TOP BRANDING BAR (Full Width Text) - Now scrolls with the content */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="absolute top-0 left-0 w-full z-50 py-6 px-10 bg-gradient-to-b from-black/80 to-transparent pointer-events-none"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-[#00d2ff] font-mono text-[9px] md:text-[11px] tracking-[0.4em] uppercase font-light">
                    <Globe size={14} />
                    <span>ORGANIZED BY SELF DEVELOPMENT CLUB // KONGU ENGINEERING COLLEGE</span>
                </div>
            </motion.div>

            {/* MAIN CONTENT WRAPPER (Scrollable) */}
            <div className="w-full flex flex-col items-center pt-32 pb-20 px-6">

                {/* ⏳ INTERSTELLAR COUNTDOWN */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex flex-col items-center gap-4 backdrop-blur-xl px-10 py-6 rounded-sm bg-black/20 border border-[#00d2ff]/10 shadow-[0_0_50px_rgba(0,210,255,0.05)] mb-12"
                >
                    <div className="flex items-center gap-2 text-[#00d2ff] font-mono text-[10px] tracking-[0.4em] uppercase opacity-70">
                        <Timer size={14} className="animate-pulse" />
                        SYNCING EVENT HORIZON
                    </div>
                    <div className="grid grid-cols-4 gap-6 md:gap-12 font-orbitron">
                        <div className="text-center">
                            <p className="text-3xl md:text-5xl font-bold tracking-tighter">{String(timeLeft.days).padStart(2, '0')}</p>
                            <p className="text-[9px] text-[#00d2ff]/40 uppercase mt-2">Days</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-5xl font-bold tracking-tighter">{String(timeLeft.hours).padStart(2, '0')}</p>
                            <p className="text-[9px] text-[#00d2ff]/40 uppercase mt-2">Hrs</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-5xl font-bold tracking-tighter">{String(timeLeft.minutes).padStart(2, '0')}</p>
                            <p className="text-[9px] text-[#00d2ff]/40 uppercase mt-2">Min</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl md:text-5xl font-bold tracking-tighter text-[#00d2ff] animate-pulse">{String(timeLeft.seconds).padStart(2, '0')}</p>
                            <p className="text-[9px] text-[#00d2ff]/40 uppercase mt-2">Sec</p>
                        </div>
                    </div>
                </motion.div>

                {/* CENTRAL TITLE */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-[#00d2ff] font-mono text-xs md:text-sm tracking-[0.8em] uppercase opacity-50 mb-6">KEC PRESENTS</h2>
                    <h1 className="text-6xl md:text-9xl font-orbitron tracking-tighter font-black leading-none mb-6">
                        SDC FEST<span className="text-[#00d2ff] animate-pulse">'26</span>
                    </h1>
                    <p className="text-white/40 font-mono text-xs md:text-sm tracking-[0.5em] uppercase max-w-2xl mx-auto leading-relaxed">
                        TECHNICAL SYMPOSIUM EXPLORATION
                    </p>
                </motion.div>

                {/* START MISSION BUTTON */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 4.5 }}
                >
                    <button
                        onClick={handleInitiate}
                        className="shining-effect group relative px-16 py-6 bg-transparent border border-[#00d2ff] text-[#00d2ff] font-orbitron text-xl uppercase tracking-[0.8em] transition-all hover:bg-[#00d2ff]/10 hover:text-[#00d2ff] overflow-hidden mb-32"
                    >
                        <span className="relative z-10 transition-transform group-hover:scale-110 inline-block">🚀 START MISSION</span>
                    </button>
                </motion.div>

                {/* DASHBOARD GRID (BOTTOM ROW) */}
                <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-auto">

                    {/* STAFF COORDINATORS */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="hud-border p-8 bg-black/40 backdrop-blur-xl border-t-2 border-t-[#00d2ff] space-y-6"
                    >
                        <h4 className="text-[#00d2ff] font-mono text-[11px] tracking-[0.4em] uppercase flex items-center gap-3">
                            <Briefcase size={16} /> STAFF CO-ORDINATORS
                        </h4>
                        <div className="space-y-4 text-white font-mono text-sm uppercase">
                            <div className="group">
                                <p className="font-bold text-[#00d2ff] group-hover:translate-x-1 transition-transform">Dr.N.PRAKASH</p>
                                <p className="opacity-40 text-[10px]">Assistant Professor (MBA)</p>
                            </div>
                            <div className="group border-t border-white/5 pt-4">
                                <p className="font-bold text-[#00d2ff] group-hover:translate-x-1 transition-transform">Dr.S.KAVITHA BHARATHI</p>
                                <p className="opacity-40 text-[10px]">Associate Professor (CT-UG)</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* OVERALL COORDINATORS (Including NAVEEN B) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="hud-border p-8 bg-black/40 backdrop-blur-xl border-t-2 border-t-[#00d2ff] space-y-6"
                    >
                        <h4 className="text-[#00d2ff] font-mono text-[11px] tracking-[0.4em] uppercase flex items-center gap-3">
                            <Phone size={16} /> OVERALL COORDINATORS
                        </h4>
                        <div className="space-y-4 text-white font-mono text-sm uppercase">
                            <div className="flex justify-between items-center group">
                                <span className="font-bold group-hover:text-[#00d2ff] transition-colors">SANIYA MARAN S</span>
                                <span className="text-[#00d2ff] text-xs">9363372877</span>
                            </div>
                            <div className="flex justify-between items-center group border-t border-white/5 pt-4">
                                <span className="font-bold group-hover:text-[#00d2ff] transition-colors">AAKASH R</span>
                                <span className="text-[#00d2ff] text-xs">8778043839</span>
                            </div>
                            <div className="flex justify-between items-center group border-t border-white/5 pt-4">
                                <span className="font-bold group-hover:text-[#00d2ff] transition-colors text-white">NAVEEN B</span>
                                <span className="text-[#00d2ff] text-xs">7639122618</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* SDC PROFILE & CREATOR */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="hud-border p-8 bg-black/60 backdrop-blur-xl border-t-2 border-t-[#00d2ff] flex flex-col justify-between gap-8"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="space-y-3">
                                <h4 className="text-[#00d2ff] font-orbitron text-[11px] tracking-[0.3em] uppercase">Club Directive</h4>
                                <p className="text-white font-mono text-[12px] leading-relaxed font-bold italic uppercase">
                                    "BELIEVE IN YOURSELF ALWAYS GROW"
                                </p>
                            </div>
                            <div className="w-14 h-14 relative rounded-sm overflow-hidden bg-white border border-[#00d2ff]/30 p-1 flex-shrink-0">
                                <Image src="/sdc-logo.jpeg" alt="SDC LOGO" fill className="object-contain" />
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[#00d2ff] font-mono text-[9px] uppercase tracking-[0.3em] mb-1 opacity-60">Created By</p>
                                    <p className="text-white font-orbitron text-sm font-bold uppercase tracking-[0.2em]">MEHARUNSHIYA S</p>
                                </div>
                                <div className="flex gap-4">
                                    <a href="https://github.com/MeharunshiyaSudhakar" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00d2ff] hover:scale-125 transition-all"><Github size={18} /></a>
                                    <a href="https://www.linkedin.com/in/meharunshiya-s-136a0b32b" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-[#00d2ff] hover:scale-125 transition-all"><Linkedin size={18} /></a>
                                </div>
                            </div>
                            <p className="text-[8px] text-white/20 font-mono tracking-widest uppercase">Copy Right © 2026 KONGU ENGINEERING COLLEGE</p>
                        </div>
                    </motion.div>
                </div>

            </div>

            {/* SPACED FOOTER FOR MOBILE */}
            <footer className="w-full py-12 mt-10 text-center flex flex-col items-center justify-center gap-4 bg-black/40 border-t border-white/5 relative z-10 backdrop-blur-md">
                <div className="w-24 h-[1px] bg-[#00d2ff]/20 mb-4"></div>
                <p className="text-[#00d2ff] font-orbitron text-[10px] md:text-sm tracking-[0.5em] uppercase">
                    INTERSTELLAR SYMPOSIUM EXPLORATION
                </p>
                <p className="text-white/40 font-mono text-[8px] md:text-[10px] tracking-[0.3em] uppercase">
                    KONGU ENGINEERING COLLEGE // SOL-224
                </p>
                <p className="text-white/20 font-mono text-[8px] tracking-[0.2em] uppercase mt-2">
                    ALL SYSTEMS NOMINAL
                </p>
            </footer>

            {/* Cinematic Boot Overlay */}
            <AnimatePresence>
                {phase === "booting" && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[1000] flex items-center justify-center bg-black"
                    >
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-48 h-[1px] bg-white/10 overflow-hidden relative">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-[#00d2ff]"
                                />
                            </div>
                            <p className="text-[#00d2ff] font-mono tracking-[1.5em] text-[10px] uppercase pl-[1.5em]">
                                INITIALIZING SDC RELAY...
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
