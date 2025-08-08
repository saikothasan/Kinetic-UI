"use client";

import { useRef, useState, useMemo, type FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture, OrbitControls, Stars, Html } from "@react-three/drei";
import { motion3d } from "framer-motion-3d";
import * as THREE from "three";

interface Point {
  lat: number;
  lon: number;
  city: string;
  country: string;
}

interface InteractiveGlobeProps {
  points?: Point[];
  globeRadius?: number;
  markerColor?: string;
  markerHoverColor?: string;
}

function GlobeMesh({ radius }: { radius: number }) {
  const texture = useTexture("/assets/3d/texture_earth.png");
  const globeRef = useRef<THREE.Mesh>(null);

  // This useFrame is for the auto-rotation when not being controlled by the user
  useFrame((_, delta) => {
    if (globeRef.current) {
      // This rotation is handled by OrbitControls autoRotate, so we can remove this to avoid conflict
      // globeRef.current.rotation.y += 0.05 * delta;
    }
  });

  return (
    <mesh ref={globeRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function Marker({
  position,
  data,
  color,
  hoverColor,
}: {
  position: [number, number, number];
  data: Point;
  color: string;
  hoverColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion3d.mesh
      position={position}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
      animate={{ scale: isHovered ? 1.5 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={isHovered ? hoverColor : color} emissive={isHovered ? hoverColor : color} emissiveIntensity={isHovered ? 2 : 0} />
      {isHovered && (
        <Html distanceFactor={10} zIndexRange={[100, 0]}>
          <div className="p-2 rounded-lg bg-black/50 text-white text-xs backdrop-blur-sm whitespace-nowrap pointer-events-none">
            <p className="font-bold">{data.city}</p>
            <p>{data.country}</p>
          </div>
        </Html>
      )}
    </motion3d.mesh>
  );
}

const InteractiveGlobe: FC<InteractiveGlobeProps> = ({
  points = [],
  globeRadius = 3,
  markerColor = "#EC4899",
  markerHoverColor = "#F472B6",
}) => {
  const markers = useMemo(() => {
    return points.map((point) => {
      const phi = (90 - point.lat) * (Math.PI / 180);
      const theta = (point.lon + 180) * (Math.PI / 180);
      const x = -(globeRadius * Math.sin(phi) * Math.cos(theta));
      const z = globeRadius * Math.sin(phi) * Math.sin(theta);
      const y = globeRadius * Math.cos(phi);
      return { position: [x, y, z] as [number, number, number], data: point };
    });
  }, [points, globeRadius]);

  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[3, 3, 3]} intensity={2} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      <GlobeMesh radius={globeRadius} />
      
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          data={marker.data}
          color={markerColor}
          hoverColor={markerHoverColor}
        />
      ))}
      
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI - Math.PI / 3} />
    </Canvas>
  );
};

export default InteractiveGlobe;
