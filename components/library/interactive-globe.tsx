"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, Points, PointMaterial, Tube } from "@react-three/drei";
import { useRef, useMemo, type FC } from "react";
import * as THREE from "three";

interface InteractiveGlobeProps {
  pointColor?: string;
  arcColor?: string;
  globeRadius?: number;
  pointsCount?: number;
  arcsCount?: number;
  arcMaxAltitude?: number;
  autoRotateSpeed?: number;
}

const Globe: FC<InteractiveGlobeProps> = ({
  pointColor = "#6366f1", // indigo-500
  arcColor = "#a855f7", // purple-500
  globeRadius = 2.5,
  pointsCount = 5000,
  arcsCount = 10,
  arcMaxAltitude = 1.5,
  autoRotateSpeed = 0.2,
}) => {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * autoRotateSpeed;
    }
  });

  const points = useMemo(() => {
    const p = new Array(pointsCount).fill(0).map(() => {
      const phi = Math.acos(-1 + 2 * Math.random());
      const theta = Math.sqrt(pointsCount * Math.PI) * phi;
      const x = globeRadius * Math.cos(theta) * Math.sin(phi);
      const y = globeRadius * Math.sin(theta) * Math.sin(phi);
      const z = globeRadius * Math.cos(phi);
      return new THREE.Vector3(x, y, z);
    });
    return new THREE.BufferGeometry().setFromPoints(p);
  }, [pointsCount, globeRadius]);

  const arcs = useMemo(() => {
    const a = [];
    for (let i = 0; i < arcsCount; i++) {
      const start = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * globeRadius,
        (Math.random() - 0.5) * 2 * globeRadius,
        (Math.random() - 0.5) * 2 * globeRadius
      ).normalize().multiplyScalar(globeRadius);

      const end = new THREE.Vector3(
        (Math.random() - 0.5) * 2 * globeRadius,
        (Math.random() - 0.5) * 2 * globeRadius,
        (Math.random() - 0.5) * 2 * globeRadius
      ).normalize().multiplyScalar(globeRadius);

      const altitude = Math.random() * arcMaxAltitude + 0.2;
      const mid = start.clone().lerp(end, 0.5).normalize().multiplyScalar(globeRadius + altitude);
      
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      a.push(curve);
    }
    return a;
  }, [arcsCount, globeRadius, arcMaxAltitude]);

  return (
    <group ref={globeRef}>
      <Sphere args={[globeRadius, 64, 64]}>
        <meshStandardMaterial color="#111827" roughness={0.9} metalness={0.1} />
      </Sphere>
      <Points geometry={points}>
        <PointMaterial transparent color={pointColor} size={0.015} sizeAttenuation={true} depthWrite={false} />
      </Points>
      {arcs.map((curve, i) => (
        <Tube key={i} args={[curve, 64, 0.01, 8, false]}>
          <meshBasicMaterial color={arcColor} toneMapped={false} />
        </Tube>
      ))}
    </group>
  );
};

const InteractiveGlobe: FC<InteractiveGlobeProps> = (props) => {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <ambientLight color="#ffffff" intensity={0.2} />
      <directionalLight color="#ffffff" intensity={1} position={[2, 2, 2]} />
      <Globe {...props} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
};

export default InteractiveGlobe;
