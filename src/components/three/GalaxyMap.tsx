"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
    Float,
    Text,
    Billboard,
    MeshDistortMaterial,
    Trail,
    CubicBezierLine
} from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";
import gsap from "gsap";

function Planet({ position, title, route, color, type, onSelect }: any) {
    const meshRef = useRef<THREE.Mesh>(null!);
    const [hovered, setHovered] = useState(false);
    const router = useRouter();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
            meshRef.current.rotation.x += 0.005;
        }
    });

    const handlePlanetClick = () => {
        onSelect(position, route);
    };

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <mesh
                    ref={meshRef}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                    onClick={handlePlanetClick}
                >
                    <sphereGeometry args={[2, 32, 32]} />
                    <MeshDistortMaterial
                        color={color}
                        distort={0.4}
                        speed={2}
                        roughness={0.5}
                        metalness={0.8}
                        emissive={hovered ? color : "#000"}
                        emissiveIntensity={0.5}
                    />
                </mesh>

                {/* Planet Atmosphere Glow */}
                <mesh scale={[1.1, 1.1, 1.1]}>
                    <sphereGeometry args={[2, 32, 32]} />
                    <meshStandardMaterial color={color} transparent opacity={0.1} side={THREE.BackSide} />
                </mesh>

                <Billboard position={[0, 4.5, 0]}>
                    <Text
                        fontSize={0.8}
                        color="#fff"
                        outlineWidth={0.05}
                        outlineColor="#000"
                    >
                        {title}
                    </Text>
                    <Text
                        fontSize={0.3}
                        color={color}
                        position={[0, -0.8, 0]}
                    >
                        {type}
                    </Text>
                </Billboard>
            </Float>

            {/* Orbit Rings if appropriate */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[3, 3.1, 64]} />
                <meshBasicMaterial color={color} opacity={0.2} transparent side={THREE.DoubleSide} />
            </mesh>

            <pointLight
                intensity={hovered ? 30 : 5}
                color={color}
                distance={20}
                decay={2}
            />
        </group>
    );
}

// Utility to create a wormhole tunnel effect
function WormholeTunnel({ count = 50 }) {
    const points = useMemo(() => {
        const list = [];
        for (let i = 0; i < count; i++) {
            list.push({
                pos: [
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 5,
                    (Math.random() - 0.5) * 50
                ]
            });
        }
        return list;
    }, [count]);

    return (
        <group>
            {points.map((p, i) => (
                <mesh key={i} position={p.pos as any}>
                    <boxGeometry args={[0.02, 0.02, 10]} />
                    <meshBasicMaterial color="#00d2ff" transparent opacity={0.5} />
                </mesh>
            ))}
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
        if (ref.current) ref.current.rotation.y += 0.02;
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

export default function GalaxyMap({ planets, onSelectPlanet }: any) {
    return (
        <>
            <fog attach="fog" args={["#000000", 20, 100]} />
            <ambientLight intensity={0.1} />
            <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" />

            {Object.entries(planets).map(([key, data]: [string, any]) => (
                <Planet
                    key={key}
                    position={data.position}
                    title={data.title}
                    type={data.type}
                    color={data.color}
                    onSelect={onSelectPlanet}
                />
            ))}

            {/* Adding some asteroid belt vibes */}
            <Float speed={1} rotationIntensity={2} floatIntensity={1}>
                {[...Array(100)].map((_, i) => (
                    <mesh key={i} position={[(Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100]}>
                        <dodecahedronGeometry args={[0.2, 0]} />
                        <meshStandardMaterial color="#444" roughness={1} />
                    </mesh>
                ))}
            </Float>
        </>
    );
}
