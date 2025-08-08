import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useMemo } from "react";

export default function BackgroundScene() {
  // Generate particle positions
  const particles = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 2000; i++) {
      positions.push((Math.random() - 0.5) * 50);
      positions.push((Math.random() - 0.5) * 50);
      positions.push((Math.random() - 0.5) * 50);
    }
    return new Float32Array(positions);
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.7} />

      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh>
          <torusKnotGeometry args={[1, 0.3, 128, 16]} />
          <meshStandardMaterial color="#00e5ff" metalness={0.5} roughness={0.2} />
        </mesh>
      </Float>

      <Points positions={particles} frustumCulled>
        <PointMaterial
          transparent
          color="#00e5ff"
          size={0.03}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
