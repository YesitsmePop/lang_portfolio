import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import "./styles/theme.css";

// Pages
import Home from "./pages/Homepage";
import About from "./pages/About";
import PersonalBlog from "./pages/PersonalBlog";
import VisualAnalysis from "./pages/VisualAnalysis";
import FormalWriting from "./pages/FormalWriting";
import CreativeWriting from "./pages/CreativeWriting";
import Professional from "./pages/Professional";

// Sidebar component
import Sidebar from "./components/Sidebar";

const pages = {
  Home,
  "About the Author": About,
  "Personal Blog": PersonalBlog,
  "Visual Analysis": VisualAnalysis,
  "Formal Writing": FormalWriting,
  "Creative Writing": CreativeWriting,
  Professional,
};

function Particles() {
  const count = 1200;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

    const hue = 250 + Math.random() * 35;
    const color = new THREE.Color();
    color.setHSL(hue / 360, 0.85, 0.65);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  return (
    <Points positions={positions} colors={colors} stride={3}>
      <PointMaterial
        vertexColors
        transparent
        size={0.045}
        sizeAttenuation
        depthWrite={false}
        opacity={0.9}
      />
    </Points>
  );
}

function RotatingSharpShapes() {
  const group = useRef();
  useFrame(({ clock }) => {
    group.current.rotation.x = clock.elapsedTime * 0.3;
    group.current.rotation.y = clock.elapsedTime * 0.6;
  });
  return (
    <group ref={group}>
      <mesh position={[5, 3, -10]}>
        <octahedronGeometry args={[1.8, 0]} />
        <meshStandardMaterial
          color="#7c3aed"
          roughness={0.1}
          metalness={0.8}
          emissive="#5b21b6"
          emissiveIntensity={0.6}
        />
      </mesh>

      <mesh position={[-6, -4, -8]}>
        <tetrahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#4c1d95"
          roughness={0.05}
          metalness={0.9}
          emissive="#6d28d9"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh position={[-3, 5, -12]} rotation={[Math.PI / 5, Math.PI / 3, 0]}>
        <icosahedronGeometry args={[1.6, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          roughness={0.2}
          metalness={0.7}
          emissive="#a78bfa"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedPost, setSelectedPost] = useState(null);

  // Map pages to components with props
  const pageComponents = {
    ...pages,
    "Personal Blog": () => (
      <PersonalBlog
        setActivePage={setActivePage}
        setSelectedPost={setSelectedPost}
      />
    ),
  };

  const PageComponent = pageComponents[activePage];

  // Determine which sidebar tabs are visible
  const visibleTabs =
    activePage === "New Blog" || activePage === "Blog Post"
      ? ["blog"] // only show Personal Blog tab
      : ["home", "about", "blog", "visual", "formal", "creative", "professional"];

  // Map tab IDs to activePage names
  const tabIdToPage = {
    home: "Home",
    about: "About the Author",
    blog: "Personal Blog",
    visual: "Visual Analysis",
    formal: "Formal Writing",
    creative: "Creative Writing",
    professional: "Professional",
  };

  return (
    <div className="app-container">
      <Sidebar
        active={activePage.toLowerCase().replace(/\s+/g, "")} // convert activePage to match tab id
        setActive={(tabId) => setActivePage(tabIdToPage[tabId])}
        visibleTabs={visibleTabs}
      />

      <main className="main-content" role="main">
        <PageComponent />
      </main>

      <Canvas
        className="background-3d"
        camera={{ position: [0, 0, 18], fov: 55 }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <Particles />
        <RotatingSharpShapes />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate />
      </Canvas>
    </div>
  );
}
