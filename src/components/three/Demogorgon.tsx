"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

export function DemogorgonHead() {
    const group = useRef<THREE.Group>(null!);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
            group.current.position.y = Math.sin(state.clock.elapsedTime * 4) * 0.1;
        }
    });

    return (
        <group ref={group}>
            {/* Central "Face" Sphere */}
            <Sphere args={[1, 32, 32]}>
                <MeshDistortMaterial
                    color="#2a0505"
                    speed={5}
                    distort={0.4}
                    roughness={1}
                />
            </Sphere>

            {/* Petals (The mouth opening) */}
            {[...Array(5)].map((_, i) => (
                <group key={i} rotation={[0, 0, (i / 5) * Math.PI * 2]}>
                    <mesh position={[0, 1, 0.5]} rotation={[-0.5, 0, 0]}>
                        <coneGeometry args={[0.5, 2, 4]} />
                        <meshStandardMaterial color="#4a0000" />
                        {/* Teeth */}
                        {[...Array(10)].map((_, j) => (
                            <mesh key={j} position={[0, -0.1 * j, 0.2]} scale={0.05}>
                                <sphereGeometry />
                                <meshStandardMaterial color="white" />
                            </mesh>
                        ))}
                    </mesh>
                </group>
            ))}
        </group>
    );
}
