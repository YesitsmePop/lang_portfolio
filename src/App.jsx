import React, { useState, useRef, useMemo } from "react";
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

// Sidebar
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

function DenseParticles() {
  const count = 5000; 
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 200;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 200;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    return arr;
  }, [count]);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const hue = 0.55 + Math.random() * 0.15;
      const sat = 1;
      const light = 0.6 + Math.random() * 0.2;
      const c = new THREE.Color();
      c.setHSL(hue, sat, light);
      arr[i * 3] = c.r;
      arr[i * 3 + 1] = c.g;
      arr[i * 3 + 2] = c.b;
    }
    return arr;
  }, [count]);

  const ref = useRef();
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.elapsedTime * 0.02;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.05) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} colors={colors} stride={3}>
      <PointMaterial
        transparent
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        opacity={0.85}
        vertexColors
      />
    </Points>
  );
}

function SpinningGrids() {
  const floorRef = useRef();
  const ceilingRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 0.1;
    floorRef.current.rotation.z = t;
    ceilingRef.current.rotation.z = -t;
  });

  return (
    <>
      {/* Floor grid */}
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -12, 0]}>
        <planeGeometry args={[400, 400, 80, 80]} />
        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.25}
          color="#00faff"
        />
      </mesh>

      {/* Ceiling grid */}
      <mesh ref={ceilingRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]}>
        <planeGeometry args={[400, 400, 80, 80]} />
        <meshBasicMaterial
          wireframe
          transparent
          opacity={0.25}
          color="#7c3aed"
        />
      </mesh>
    </>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [selectedPost, setSelectedPost] = useState(null);

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

  const visibleTabs =
    activePage === "New Blog" || activePage === "Blog Post"
      ? ["blog"]
      : ["home", "about", "blog", "visual", "formal", "creative", "professional"];

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
        active={activePage.toLowerCase().replace(/\s+/g, "")}
        setActive={(tabId) => setActivePage(tabIdToPage[tabId])}
        visibleTabs={visibleTabs}
      />

      <main className="main-content" role="main">
        <PageComponent />
      </main>

      <Canvas
        className="background-3d"
        camera={{ position: [0, 0, 35], fov: 65 }}
        gl={{ alpha: true }}
      >
        <fog attach="fog" args={["#0a0f2d", 50, 150]} />
        <ambientLight intensity={0.6} />
        <pointLight position={[30, 20, 20]} intensity={2} color="#00faff" />
        <pointLight position={[-30, -20, -10]} intensity={1.5} color="#7c3aed" />

        <DenseParticles />
        <SpinningGrids />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>
    </div>
  );
}
