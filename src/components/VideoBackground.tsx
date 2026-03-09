"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8;
        }
    }, []);

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90"
            >
                <source src="/space-bg.mp4" type="video/mp4" />
                <source src="/bg-video.mp4" type="video/mp4" />
            </video>
            {/* Ambient Dark Overlays for Depth */}
            <div className="absolute inset-0 bg-black/40 z-[1]" />
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-[2]" />
        </div>
    );
}
