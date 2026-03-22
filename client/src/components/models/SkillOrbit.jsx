import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
    OrbitControls,
    Stars,
    Sparkles,
    Text,
    Float,
    MeshDistortMaterial,
    MeshWobbleMaterial,
    ContactShadows,
    Environment
} from '@react-three/drei';
import * as THREE from 'three';

const planets = [
    { name: 'Python', color: '#3776AB', distance: 6, speed: 0.4, size: 0.5, hasRing: false, emissive: '#1e3c5a' },
    { name: 'React', color: '#61DAFB', distance: 9, speed: 0.25, size: 0.7, hasRing: true, emissive: '#2d6a7a' },
    { name: 'AI Models', color: '#FF6E14', distance: 13, speed: 0.15, size: 0.9, hasRing: false, emissive: '#b34d0e' },
    { name: 'Cloud', color: '#0056D2', distance: 17, speed: 0.1, size: 0.8, hasRing: true, emissive: '#003a8c' },
    { name: 'DevOps', color: '#2496ED', distance: 21, speed: 0.07, size: 0.6, hasRing: false, emissive: '#114a75' },
    { name: 'UI/UX', color: '#F24E1E', distance: 25, speed: 0.05, size: 0.55, hasRing: true, emissive: '#a13514' },
];

const Nebula = () => {
    return (
        <group>
            <mesh scale={[100, 100, 100]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshBasicMaterial color="#05000a" side={THREE.BackSide} />
            </mesh>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={200} scale={50} size={2} speed={0.2} color="#4b0082" />
            <Sparkles count={100} scale={60} size={3} speed={0.1} color="#ff8c00" opacity={0.3} />
        </group>
    );
};

function Planet({ data }) {
    const ref = useRef();
    const { name, color, distance, speed, size, hasRing, emissive } = data;

    // Create an elliptical path
    const ellipsePath = useMemo(() => {
        const xRadius = distance;
        const yRadius = distance * 0.85; // Slightly less elliptical for better visibility
        const curve = new THREE.EllipseCurve(0, 0, xRadius, yRadius, 0, 2 * Math.PI, false, 0);
        const points = curve.getPoints(128).map(p => new THREE.Vector3(p.x, 0, p.y));
        return { curve, points };
    }, [distance]);

    const [randomValues] = React.useState(() => ({
        initialAngle: Math.random() * Math.PI * 2,
        tilt: (Math.random() - 0.5) * 0.3
    }));

    const { initialAngle, tilt } = randomValues;

    useFrame(({ clock }) => {
        // Higher resolution time for smoother motion
        const t = (clock.getElapsedTime() * speed * 0.5 + initialAngle) % 1;
        const point = ellipsePath.curve.getPoint(t);
        if (ref.current) {
            ref.current.position.set(point.x, Math.sin(clock.getElapsedTime() * 0.4) * 0.15, point.y);
            ref.current.rotation.y += 0.01;
        }
    });

    return (
        <group rotation={[tilt, 0, tilt]}>
            {/* Primary Glowing Orbit Line */}
            <line>
                <bufferGeometry attach="geometry">
                    <float32BufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(ellipsePath.points.flatMap(p => [p.x, p.y, p.z])), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    attach="material"
                    color={color}
                    transparent
                    opacity={0.4}
                    linewidth={2}
                    blending={THREE.AdditiveBlending}
                />
            </line>

            {/* Subtle Bloom Layer for Orbit */}
            <line scale={[1.02, 1, 1.02]}>
                <bufferGeometry attach="geometry">
                    <float32BufferAttribute
                        attach="attributes-position"
                        args={[new Float32Array(ellipsePath.points.flatMap(p => [p.x, p.y, p.z])), 3]}
                    />
                </bufferGeometry>
                <lineBasicMaterial
                    attach="material"
                    color={color}
                    transparent
                    opacity={0.15}
                    linewidth={5}
                    blending={THREE.AdditiveBlending}
                />
            </line>

            <group ref={ref}>
                {/* Planet Body */}
                <mesh>
                    <sphereGeometry args={[size, 64, 64]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={emissive}
                        emissiveIntensity={2.5}
                        metalness={0.9}
                        roughness={0.05}
                    />
                </mesh>

                {/* Atmospheric Glow */}
                <mesh scale={[1.25, 1.25, 1.25]}>
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshBasicMaterial
                        color={color}
                        transparent
                        opacity={0.15}
                        side={THREE.BackSide}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>

                {hasRing && (
                    <mesh rotation={[Math.PI / 2.5, 0, 0]}>
                        <ringGeometry args={[size * 1.5, size * 2.4, 64]} />
                        <meshStandardMaterial
                            color={color}
                            transparent
                            opacity={0.4}
                            side={THREE.DoubleSide}
                            emissive={color}
                            emissiveIntensity={1}
                            blending={THREE.AdditiveBlending}
                        />
                    </mesh>
                )}

                <Text
                    position={[0, size + 1, 0]}
                    fontSize={0.45}
                    fontWeight="bold"
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {name}
                </Text>
            </group>
        </group>
    );
}

function Sun() {
    const sunRef = useRef();
    const coronaRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (sunRef.current) {
            const s = 1 + Math.sin(t * 1.2) * 0.04;
            sunRef.current.scale.set(s, s, s);
            sunRef.current.rotation.y += 0.003;
        }
        if (coronaRef.current) {
            coronaRef.current.rotation.z -= 0.001;
            coronaRef.current.scale.setScalar(1.15 + Math.sin(t * 1.8) * 0.06);
        }
    });

    return (
        <group>
            <mesh ref={sunRef}>
                <sphereGeometry args={[3.8, 128, 128]} />
                <MeshDistortMaterial
                    color="#FF8C00"
                    speed={3.5}
                    distort={0.45}
                    radius={1}
                    emissive="#FF4500"
                    emissiveIntensity={6}
                />
            </mesh>

            <mesh ref={coronaRef}>
                <sphereGeometry args={[4.2, 64, 64]} />
                <meshBasicMaterial
                    color="#FFD700"
                    transparent
                    opacity={0.25}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            <pointLight intensity={15} distance={100} color="#FF6E14" />
            <pointLight position={[0, 0, 0]} intensity={60} distance={15} color="#FFD700" />
            <pointLight position={[10, 10, 10]} intensity={5} color="#4b0082" /> {/* Subtle blue/purple fill */}

            <Sparkles count={150} scale={10} size={6} speed={0.4} color="#FFD700" />
            <Sparkles count={80} scale={15} size={3} speed={0.6} color="#FF4136" />
        </group>
    );
}

const SkillOrbit = () => {
    return (
        <div style={{
            width: '100%',
            height: '850px',
            background: 'radial-gradient(circle at center, #080010 0%, #000 100%)',
            borderRadius: '60px',
            overflow: 'hidden',
            boxShadow: '0 0 150px rgba(75, 0, 130, 0.15)',
            position: 'relative',
            border: '2px solid rgba(255, 255, 255, 0.03)'
        }}>
            <Canvas
                camera={{ position: [0, 30, 50], fov: 40 }}
                gl={{
                    antialias: true,
                    toneMapping: THREE.ACESFilmicToneMapping,
                    powerPreference: "high-performance"
                }}
                shadows
            >

                <Nebula />

                <ambientLight intensity={0.3} />

                <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
                    <Sun />
                </Float>

                {planets.map((p, i) => (
                    <Planet key={i} data={p} />
                ))}

                <ContactShadows
                    opacity={0.3}
                    scale={60}
                    blur={2.5}
                    far={25}
                    resolution={512}
                    color="#000000"
                />

                <OrbitControls
                    enableZoom={false}
                    maxPolarAngle={Math.PI / 1.7}
                    minPolarAngle={Math.PI / 6}
                    autoRotate
                    autoRotateSpeed={0.2}
                />
            </Canvas>

            <div style={{
                position: 'absolute',
                top: '40px',
                left: '40px',
                pointerEvents: 'none',
                fontFamily: 'monospace',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '11px',
                letterSpacing: '3px',
                textTransform: 'uppercase'
            }}>
                [ Skill System Integration : Active ]<br />
                [ Neural Cluster : Synced ]<br />
                [ Visualization : Enhanced ]
            </div>
        </div>
    );
};

export default SkillOrbit;
