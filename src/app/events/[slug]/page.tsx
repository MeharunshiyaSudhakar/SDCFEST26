"use client";

import { use, useMemo } from "react";
import { eventsData } from "@/lib/events";
import { notFound, useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float, Stars, Sparkles, PerspectiveCamera } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";

export default function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const router = useRouter();
    const { slug } = use(params);
    const event = eventsData[slug as keyof typeof eventsData];

    if (!event) {
        notFound();
    }

    return (
        <div className="w-full h-screen relative overflow-hidden bg-[#050505]">
            {/* Cinematic Flash Intro on Page Load - Changed to Thematic Blue */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "circIn" }}
                className="fixed inset-0 bg-[#00d2ff] z-[999] pointer-events-none mix-blend-screen"
            />

            {/* Return Navigation */}
            <button
                onClick={() => router.push("/#event-map")}
                className="absolute top-8 left-8 z-[100] text-gray-500 font-orbitron uppercase flex items-center gap-3 hover:text-white transition-all group"
            >
                <span className="p-2 border border-white/20 rounded group-hover:border-neon-red group-hover:text-neon-red">&larr;</span>
                <span className="tracking-[0.5em] text-sm group-hover:tracking-[0.8em] transition-all">LEAVE REALITY</span>
            </button>

            {/* 3D THEMED ENVIRONMENT */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <Canvas shadows>
                    <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />
                    <ambientLight intensity={0.1} />
                    <pointLight position={[0, 0, -5]} intensity={5} color={event.color} />
                    <spotLight position={[0, 10, 5]} angle={0.2} penumbra={1} intensity={10} color={event.color} shadow-mapSize={1024} />

                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Sparkles count={100} scale={20} size={2} speed={0.5} opacity={0.2} color={event.color} />

                    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                        {/* The "Floor" or Energy Foundation */}
                        <mesh position={[0, -8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[100, 100]} />
                            <meshStandardMaterial color={event.color} transparent opacity={0.05} wireframe />
                        </mesh>

                        {/* Background "Wall" Grid */}
                        <group position={[0, 0, -20]}>
                            <mesh>
                                <planeGeometry args={[100, 100]} />
                                <meshStandardMaterial color={event.color} wireframe transparent opacity={0.05} />
                            </mesh>
                            <PointsCloud count={200} color={event.color} />
                        </group>
                    </Float>

                    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                </Canvas>
            </div>

            {/* HOLOGRAPHIC DATA PANELS */}
            <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-around p-10 md:p-20 overflow-y-auto pt-28">

                {/* Detail Panel */}
                <motion.div
                    initial={{ opacity: 0, x: -100, rotateY: 30 }}
                    animate={{ opacity: 1, x: 0, rotateY: 15 }}
                    transition={{ duration: 1.5, type: "spring", bounce: 0.2 }}
                    className="bg-black/60 backdrop-blur-3xl p-10 rounded-2xl border-l-[6px] w-full lg:w-[45%] shadow-[0_0_100px_-20px_rgba(0,0,0,1)] perspective-[2000px] border-white/5"
                    style={{ borderLeftColor: event.color }}
                >
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-6xl md:text-8xl font-creepster mb-6 tracking-widest uppercase drop-shadow-[0_0_15px_#000000]"
                        style={{ color: event.color, textShadow: `0 0 30px ${event.color}55` }}
                    >
                        {event.title}
                    </motion.h1>

                    <div className="bg-black/40 border border-white/10 p-6 rounded-xl space-y-4">
                        <p className="text-2xl font-orbitron text-gray-300 leading-relaxed tracking-wider">
                            {event.description}
                        </p>
                        <div className="flex gap-4 pt-4 border-t border-white/5">
                            <div className="flex-1">
                                <span className="text-gray-500 font-orbitron text-xs block mb-1">CHRONO COORD</span>
                                <span className="text-xl font-orbitron text-white">{event.time}</span>
                            </div>
                            <div className="flex-1">
                                <span className="text-gray-500 font-orbitron text-xs block mb-1">LOC COORD</span>
                                <span className="text-xl font-orbitron text-white">{event.venue}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Rules & Actions Panel */}
                <motion.div
                    initial={{ opacity: 0, x: 100, rotateY: -30 }}
                    animate={{ opacity: 1, x: 0, rotateY: -15 }}
                    transition={{ duration: 1.5, delay: 0.3, type: "spring", bounce: 0.2 }}
                    className="bg-black/80 backdrop-blur-3xl p-10 rounded-2xl border-r-[6px] w-full lg:w-[35%] shadow-[0_0_100px_-20px_rgba(0,0,0,1)] border-white/5"
                    style={{ borderRightColor: event.color }}
                >
                    <h3 className="text-3xl font-orbitron font-black mb-8 text-white tracking-[0.3em] uppercase pb-4 border-b border-white/10" style={{ color: event.color }}>
                        SURVIVAL DIRECTIVES
                    </h3>

                    <ul className="space-y-6 mb-12">
                        {event.rules.map((rule, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1 + idx * 0.1 }}
                                className="flex gap-4 text-xl text-gray-400 font-orbitron hover:text-white transition-colors cursor-default"
                            >
                                <span className="text-2xl" style={{ color: event.color }}>⚡</span>
                                {rule}
                            </motion.li>
                        ))}
                    </ul>

                    <motion.button
                        whileHover={{ scale: 1.05, boxShadow: `0 0 50px ${event.color}` }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full py-6 uppercase tracking-[0.5em] font-orbitron text-2xl font-black rounded-lg transition-all"
                        style={{
                            backgroundColor: `${event.color}11`,
                            color: event.color,
                            border: `2px solid ${event.color}`,
                            boxShadow: `0 0 20px ${event.color}33`
                        }}
                    >
                        [ INITIATE SEQUENCE ]
                    </motion.button>
                </motion.div>
            </div>

            {/* Screen CRT Scanlines Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIiAvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMykiIC8+Cjwvc3ZnPg==')] opacity-40 z-50"></div>
            <div className="pointer-events-none absolute inset-0 bg-radial-gradient(circle_at_center, transparent 0%, black 100%) opacity-60 z-40"></div>
        </div>
    );
}

function PointsCloud({ count, color }: any) {
    const points = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
            pos[i * 3 + 2] = 0;
        }
        return pos;
    }, [count]);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[points, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.1} color={color} transparent opacity={0.3} />
        </points>
    );
}
