"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Vines() {
    const group = useRef<THREE.Group>(null!);

    const vineInstances = useMemo(() => {
        return [...Array(20)].map(() => ({
            position: [(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40],
            rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
            scale: 0.5 + Math.random() * 2,
        }));
    }, []);

    useFrame((state) => {
        if (group.current) {
            group.current.children.forEach((child, i) => {
                child.rotation.x += Math.sin(state.clock.elapsedTime + i) * 0.005;
                child.rotation.y += Math.cos(state.clock.elapsedTime + i) * 0.005;
            });
        }
    });

    return (
        <group ref={group}>
            {vineInstances.map((vine, i) => (
                <mesh key={i} position={vine.position as any} rotation={vine.rotation as any} scale={vine.scale}>
                    <torusGeometry args={[2, 0.05, 8, 50, Math.PI]} />
                    <meshStandardMaterial color="#1a0505" roughness={1} />
                </mesh>
            ))}
        </group>
    );
}

function Spores() {
    const count = 1500;
    const mesh = useRef<THREE.Points>(null!);

    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            // distribute them in a box
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }
        return positions;
    }, [count]);

    useFrame((state) => {
        if (mesh.current) {
            mesh.current.rotation.y = state.clock.elapsedTime * 0.1;
            mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[particlesPosition, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color="#ff003c"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
                sizeAttenuation
            />
        </points>
    );
}

export default function UpsideDownAtmosphere() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 20] }}>
                <fog attach="fog" args={["#050505", 10, 50]} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ff003c" />
                <Spores />
                <Vines />
            </Canvas>
        </div>
    );
}
