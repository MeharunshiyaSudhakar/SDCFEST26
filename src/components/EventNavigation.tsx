"use client";

import { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    MeshDistortMaterial,
    Text,
    Billboard,
    Environment,
    MeshWobbleMaterial,
    Instances,
    Instance,
    ContactShadows,
    PerspectiveCamera,
    BakeShadows,
    Trail
} from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import gsap from "gsap";

// --- BUILDING REPRESENTATIONS ---

function LabBuilding({ color }: { color: string }) {
    const cubeRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        cubeRef.current.rotation.y += 0.01;
        cubeRef.current.rotation.z += 0.005;
    });

    return (
        <group>
            {/* Central Glass Structure */}
            <mesh>
                <boxGeometry args={[1.5, 3, 1.5]} />
                <meshStandardMaterial color={color} transparent opacity={0.3} wireframe />
            </mesh>
            {/* Floating data cubes */}
            <group ref={cubeRef}>
                {[...Array(6)].map((_, i) => (
                    <mesh key={i} position={[Math.cos(i) * 1.5, Math.sin(i) * 1.5, Math.sin(i * 2) * 1.5]}>
                        <boxGeometry args={[0.3, 0.3, 0.3]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                    </mesh>
                ))}
            </group>
            {/* Central Light Beam */}
            <mesh position={[0, 5, 0]}>
                <cylinderGeometry args={[0.05, 0.5, 10, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.2} />
            </mesh>
        </group>
    );
}

function FactoryBuilding({ color }: { color: string }) {
    const gearsRef = useRef<THREE.Group>(null!);
    useFrame((state) => {
        gearsRef.current.children.forEach((gear, i) => {
            gear.rotation.y += (i % 2 === 0 ? 0.02 : -0.02);
        });
    });

    return (
        <group>
            {/* Heavy base */}
            <mesh position={[0, -0.5, 0]}>
                <cylinderGeometry args={[1.8, 2, 0.5, 6]} />
                <meshStandardMaterial color="#222" metalness={1} roughness={0.2} />
            </mesh>
            {/* Spinning Gears */}
            <group ref={gearsRef} position={[0, 1, 0]}>
                {[...Array(4)].map((_, i) => (
                    <mesh key={i} position={[0, i * 0.6, 0]} rotation={[Math.PI / 2, 0, 0]}>
                        <torusGeometry args={[1 - i * 0.2, 0.1, 16, 6]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                    </mesh>
                ))}
            </group>
        </group>
    );
}

function MatrixPortal({ color }: { color: string }) {
    return (
        <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[1.5, 0.1, 16, 100]} />
                <MeshWobbleMaterial color={color} speed={3} factor={1} emissive={color} emissiveIntensity={5} />
            </mesh>
            {/* Falling particles inside portal */}
            <PointsCloud count={100} color={color} size={0.05} />
        </group>
    );
}

function StadiumBuilding({ color }: { color: string }) {
    return (
        <group>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[2.5, 2.5, 0.4, 32, 1, true]} />
                <meshStandardMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
            </mesh>
            {/* Floodlights */}
            {[...Array(4)].map((_, i) => (
                <group key={i} rotation={[0, (i / 4) * Math.PI * 2, 0]}>
                    <pointLight position={[2, 2, 0]} intensity={10} color={color} distance={5} />
                    <mesh position={[2, 1, 0]}>
                        <cylinderGeometry args={[0.1, 0.1, 2]} />
                        <meshStandardMaterial color="#333" />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

function Island({ position, title, route, color, children, onSelect }: any) {
    const groupRef = useRef<THREE.Group>(null!);
    const [hovered, setHovered] = (useState(false));

    useFrame((state) => {
        groupRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.005;
    });

    return (
        <group
            position={position}
            ref={groupRef}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={() => onSelect(groupRef.current, route)}
        >
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
                {/* The Rock Base - Low Poly/Crystalline */}
                <mesh position={[0, -1.5, 0]}>
                    <dodecahedronGeometry args={[2.2, 0]} />
                    <meshStandardMaterial
                        color="#111"
                        roughness={0.9}
                        emissive={hovered ? color : "#000"}
                        emissiveIntensity={0.2}
                    />
                </mesh>

                {/* The Building on top */}
                <group position={[0, 1, 0]}>
                    {children}
                </group>

                {/* Billboard UI */}
                <Billboard position={[0, 5, 0]}>
                    <Text
                        fontSize={0.6}
                        color={hovered ? "white" : color}
                        font="/fonts/orbitron.ttf"
                        outlineWidth={0.02}
                        outlineColor="#000"
                    >
                        {title}
                    </Text>
                </Billboard>
            </Float>

            {/* Interactive Light */}
            <pointLight position={[0, 2, 0]} intensity={hovered ? 50 : 10} color={color} distance={15} />
        </group>
    );
}

// Utility for portal particles
function PointsCloud({ count, color, size }: any) {
    const particles = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 2.5;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 2.5;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
        }
        return pos;
    }, [count]);

    const ref = useRef<THREE.Points>(null!);
    useFrame((state) => {
        ref.current.rotation.y += 0.02;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[particles, 3]} />
            </bufferGeometry>
            <pointsMaterial size={size} color={color} transparent opacity={0.8} />
        </points>
    );
}

// --- MAIN WORLD CONTAINER ---

function World() {
    const router = useRouter();

    const handleSelect = (object: THREE.Group, route: string) => {
        // Cinematic Zoom and Transition
        gsap.to(object.scale, {
            x: 3, y: 3, z: 3, duration: 1, ease: "power4.in"
        });
        // Add heavy bloom transition effect? 
        document.getElementById('world-overlay')!.style.opacity = '1';
        setTimeout(() => router.push(route), 1000);
    };

    return (
        <>
            <color attach="background" args={["#050505"]} />
            <fog attach="fog" args={["#050505", 20, 60]} />
            <Environment preset="night" />

            {/* Lighting for the whole scene */}
            <ambientLight intensity={0.1} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ff0000" />
            <pointLight position={[0, 30, 0]} intensity={2} color="#00f3ff" />

            {/* Floating Rocks / Islands */}
            <Island title="PROJECT LAB" position={[-15, 2, -10]} route="/events/project" color="#00f3ff" onSelect={handleSelect}>
                <LabBuilding color="#00f3ff" />
            </Island>

            <Island title="CAD FACTORY" position={[0, 5, -20]} route="/events/cad" color="#ff5e00" onSelect={handleSelect}>
                <FactoryBuilding color="#ff5e00" />
            </Island>

            <Island title="CODE CLASH VORTEX" position={[15, -2, -10]} route="/events/code" color="#00ff00" onSelect={handleSelect}>
                <MatrixPortal color="#00ff00" />
            </Island>

            <Island title="IPL STADIUM" position={[-12, -5, 5]} route="/events/ipl" color="#ff0000" onSelect={handleSelect}>
                <StadiumBuilding color="#ff0000" />
            </Island>

            <Island title="TREASURE ISLAND" position={[12, 3, 10]} route="/events/treasure" color="#ffff00" onSelect={handleSelect}>
                <mesh>
                    <octahedronGeometry args={[1]} />
                    <meshStandardMaterial color="#ffff00" wireframe />
                </mesh>
            </Island>

            <Island title="SHARK TANK" position={[0, -4, 15]} route="/events/sharktank" color="#ff00ff" onSelect={handleSelect}>
                <mesh>
                    <coneGeometry args={[1, 3, 4]} />
                    <meshStandardMaterial color="#ff00ff" wireframe />
                </mesh>
            </Island>

            {/* Atmospheric Vines - connecting islands */}
            <mesh rotation={[0, 0, Math.PI / 4]}>
                <torusGeometry args={[30, 0.05, 8, 100]} />
                <MeshWobbleMaterial color="#111" factor={2} speed={1} />
            </mesh>
            <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
                <torusGeometry args={[25, 0.05, 8, 100]} />
                <MeshWobbleMaterial color="#111" factor={1.5} speed={0.5} />
            </mesh>

            <ContactShadows opacity={0.4} scale={100} blur={2} far={40} />
            <BakeShadows />
        </>
    );
}

export default function EventNavigation() {
    return (
        <div className="w-full h-full relative group">
            {/* 3D Scene */}
            <Canvas shadows dpr={[1, 2]}>
                <PerspectiveCamera makeDefault position={[0, 10, 40]} fov={50} />
                <World />
            </Canvas>

            {/* Screen Overlay for transition flicker */}
            <div
                id="world-overlay"
                className="fixed inset-0 bg-neon-red opacity-0 pointer-events-none transition-opacity duration-1000 z-[1000] mix-blend-overlay"
            />

            {/* Controls Overlay UI */}
            <div className="absolute top-10 w-full flex flex-col items-center pointer-events-none">
                <h2 className="text-5xl font-creepster text-neon-red tracking-[0.4em] drop-shadow-[0_0_20px_#ff0000]">
                    CHOOSE YOUR TRIAL
                </h2>
                <div className="mt-4 flex gap-8 font-orbitron text-gray-500 text-xs tracking-widest uppercase">
                    <span>[ LEFT CLICK: ROTATE ]</span>
                    <span>[ MOUSE WHEEL: ZOOM ]</span>
                    <span>[ CLICK ISLAND: ENTER ]</span>
                </div>
            </div>
        </div>
    );
}
