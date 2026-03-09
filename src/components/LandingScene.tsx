"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

export default function LandingScene({ onEnter }: { onEnter: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // Portal throb effect
        gsap.to(portalRef.current, {
            scale: 1.05,
            opacity: 0.9,
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
        });

        // Lightning effect
        const flash = () => {
            if (!containerRef.current) return;
            gsap.to(containerRef.current, {
                backgroundColor: "rgba(255, 0, 60, 0.4)",
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                onComplete: () => {
                    gsap.to(containerRef.current, { backgroundColor: "transparent", duration: 0.5 });
                    setTimeout(flash, Math.random() * 5000 + 3000);
                }
            });
        };
        const timer = setTimeout(flash, 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleEnterClick = () => {
        // Cinematic Zoom into portal
        gsap.to(portalRef.current, {
            scale: 20,
            opacity: 0,
            duration: 1.5,
            ease: "power2.in",
            onComplete: onEnter
        });

        gsap.to(textRef.current, {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
        });
    };

    return (
        <section
            ref={containerRef}
            className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
        >
            {/* 3D-ish Portal representing the Upside Down rift */}
            <div
                ref={portalRef}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-[500px] border-[5px] border-neon-red rounded-full blur-[2px] shadow-[0_0_50px_#ff003c,inset_0_0_50px_#ff003c] mix-blend-screen overflow-hidden"
                style={{ background: 'radial-gradient(circle, rgba(255,0,60,0.2) 0%, rgba(5,5,5,1) 70%)' }}
            ></div>

            <div className="z-10 text-center flex flex-col items-center gap-10">
                <h1
                    ref={textRef}
                    className="text-5xl md:text-7xl font-creepster tracking-widest text-[#ff003c] uppercase drop-shadow-[0_0_20px_#ff003c] glitch-text"
                    style={{ fontFamily: 'var(--font-creepster)' }}
                >
                    Enter the<br />Symposium Dimension
                </h1>

                <motion.button
                    onClick={handleEnterClick}
                    whileHover={{ scale: 1.1, boxShadow: "0 0 25px #00f3ff, inset 0 0 10px #00f3ff" }}
                    whileTap={{ scale: 0.9 }}
                    className="px-8 py-4 font-orbitron text-xl uppercase tracking-widest text-neon-blue border border-neon-blue rounded-md bg-transparent hover:bg-[rgba(0,243,255,0.1)] transition-all duration-300"
                >
                    [ Enter Event ]
                </motion.button>
            </div>

            {/* Overlay Fog overlay gradients */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]"></div>
        </section>
    );
}
