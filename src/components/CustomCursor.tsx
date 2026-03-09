"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorX = useSpring(-100, springConfig);
    const cursorY = useSpring(-100, springConfig);

    const trailSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
    const trailX = useSpring(-100, trailSpringConfig);
    const trailY = useSpring(-100, trailSpringConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 10);
            cursorY.set(e.clientY - 10);
            trailX.set(e.clientX - 20);
            trailY.set(e.clientY - 20);
            setPosition({ x: e.clientX, y: e.clientY });
        };

        const handleHoverStart = () => setIsHovering(true);
        const handleHoverEnd = () => setIsHovering(false);

        window.addEventListener("mousemove", moveCursor);

        // Simplistic hover detection for interactive elements
        const linksAndButtons = document.querySelectorAll("a, button");
        linksAndButtons.forEach(el => {
            el.addEventListener("mouseenter", handleHoverStart);
            el.addEventListener("mouseleave", handleHoverEnd);
        });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            linksAndButtons.forEach(el => {
                el.removeEventListener("mouseenter", handleHoverStart);
                el.removeEventListener("mouseleave", handleHoverEnd);
            });
        };
    }, [cursorX, cursorY, trailX, trailY]);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 rounded-full bg-neon-red shadow-[0_0_15px_#ff003c] pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isHovering ? 1.5 : 1,
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-neon-blue shadow-[0_0_10px_#00f3ff,inset_0_0_10px_#00f3ff] pointer-events-none z-[9998] mix-blend-screen"
                style={{
                    x: trailX,
                    y: trailY,
                    scale: isHovering ? 1.2 : 0.8,
                    opacity: 0.5,
                }}
            />
        </>
    );
}
