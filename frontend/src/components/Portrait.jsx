import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const Portrait = () => {
  const { scene } = useGLTF("/models/frame.glb");
  const texture = new THREE.TextureLoader().load("/image.jpg");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const customMaterial = child.material.clone();
        customMaterial.color = new THREE.Color("#8A6B3A");
        customMaterial.roughness = 0.8;
        customMaterial.metalness = 0;
        customMaterial.envMapIntensity = 0.3;
        child.material = customMaterial;
      }
    });
  }, [scene]);

  return (
    <group scale={10.5} position={[0, 0.15, 0]}>

      {/* Frame */}
      <primitive object={scene} position={[0, 0, 0]} />

      {/* Image */}
      <mesh position={[0, 0, 0.032]} castShadow receiveShadow>
        <planeGeometry args={[0.125, 0.15]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Backboard */}
      <mesh position={[0, 0, 0.023]} castShadow receiveShadow>
        <boxGeometry args={[0.14, 0.16, 0.0012]} />
        <meshStandardMaterial color="#4A391C" roughness={1} metalness={0} />
      </mesh>
    </group>
  );
};

export default Portrait;
