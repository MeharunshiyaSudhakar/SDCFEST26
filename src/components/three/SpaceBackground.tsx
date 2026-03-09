"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stars, Sparkles } from "@react-three/drei";

export default function SpaceBackground({ speed = 1 }) {
    const starsRef = useRef<THREE.Points>(null!);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (starsRef.current) {
            starsRef.current.rotation.y = t * 0.05 * speed;
            starsRef.current.rotation.x = t * 0.02 * speed;
        }
    });

    return (
        <>
            {/* Minimal overlays for depth - but let the VIDEO shine */}
            <Stars
                ref={starsRef}
                radius={100}
                depth={50}
                count={2000} // Lower count to avoid cluttering the black hole video
                factor={4}
                saturation={0}
                fade
                speed={1}
            />
            <Sparkles
                count={50}
                scale={40}
                size={4}
                speed={0.5}
                opacity={0.05} // Almost invisible, just a hint of space dust
                color="#ffffff"
            />
        </>
    );
}
