import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import Portrait from "./Portrait.jsx";
import ConcaveBackground from "./ConcaveBackground.jsx";
import { FaSpotify } from "react-icons/fa";

const MainContent = () => {
  return (
    <main style={{ width: "100%", height: "100vh", position: "relative" }}>
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 3] }}
        shadows
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <ambientLight intensity={0.25} color="#fffce8" />
        <directionalLight
          position={[2, 2, 2]}
          intensity={0.8}
          color="#ffe8c2"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight
          position={[0, 3, 2]}
          angle={0.4}
          penumbra={0.5}
          intensity={1.2}
          color="#ffdca8"
          castShadow
          shadow-bias={-0.0001}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[0, -1, 2]} intensity={0.4} color="#ffeac4" />

        <Suspense fallback={null}>
          <Environment preset="sunset" background={false} />
          <ConcaveBackground />
          <Portrait />
        </Suspense>

        <ContactShadows
          position={[0, -0.3, 0]}
          opacity={0.25}
          scale={2}
          blur={2}
          far={0.8}
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 2 - 0.1}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>

      {/* Login Button */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <button
          className="text-white px-6 py-3 rounded-xl
     shadow-lg transition-all duration-300 
     animate-woodDust bg-[length:200%_200%] bg-gradient-to-r from-[#a47551] to-[#cbb69b] border border-[#a47551] hover:scale-110 flex items-center"
        >
          <FaSpotify className="inline mr-2 text-2xl" />
          Login with Spotify
        </button>
      </div>
    </main>
  );
};

export default MainContent;
