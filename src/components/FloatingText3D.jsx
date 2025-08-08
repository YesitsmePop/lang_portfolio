import { Canvas } from "@react-three/fiber";
import { Text3D, Center } from "@react-three/drei";

export default function FloatingText3D({ text }) {
  return (
    <div className="floating-text-canvas">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight />
        <directionalLight position={[5, 5, 5]} />
        <Center>
          <Text3D font="/fonts/helvetiker_regular.typeface.json" size={1.5} height={0.3}>
            {text}
            <meshStandardMaterial color="#00e5ff" />
          </Text3D>
        </Center>
      </Canvas>
    </div>
  );
}
