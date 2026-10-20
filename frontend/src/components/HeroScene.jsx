import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** One carefully art-directed scene, shared across the portfolio. */
function HeroPolyhedron({ mouseRef, reducedMotion, activeSection }) {
  const rootRef = useRef();
  const wireRef = useRef();
  const coreRef = useRef();
  const ringARef = useRef();
  const ringBRef = useRef();
  const solidMaterialRef = useRef();
  const { size } = useThree();
  const isMobile = size.width < 768;

  const { geometry, innerGeometry, ringGeometry, colors } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.58, 1);
    const positions = geo.attributes.position;
    const vertex = new THREE.Vector3();
    for (let index = 0; index < positions.count; index += 1) {
      vertex.fromBufferAttribute(positions, index);
      const noise = Math.sin(vertex.x * 2.4 + vertex.y * 1.7)
        * Math.cos(vertex.y * 2.1 - vertex.z * 1.9) * 0.035;
      vertex.addScaledVector(vertex.clone().normalize(), noise);
      positions.setXYZ(index, vertex.x, vertex.y, vertex.z);
    }
    positions.needsUpdate = true;
    geo.computeVertexNormals();
    return {
      geometry: geo,
      innerGeometry: new THREE.OctahedronGeometry(0.66, 0),
      ringGeometry: new THREE.TorusGeometry(1.65, 0.008, 8, 80),
      colors: { home: new THREE.Color("#182337"), content: new THREE.Color("#0c1622") },
    };
  }, []);

  useEffect(() => () => {
    geometry.dispose();
    innerGeometry.dispose();
    ringGeometry.dispose();
  }, [geometry, innerGeometry, ringGeometry]);

  useFrame((state, delta) => {
    if (!rootRef.current) return;
    const elapsed = reducedMotion ? 0 : state.clock.elapsedTime;
    const dt = Math.min(delta, 0.05);
    const sectionIsHome = activeSection === "home";
    const targetWireOpacity = sectionIsHome ? 0.28 : 0.12;
    const targetCoreOpacity = sectionIsHome ? 0.42 : 0.18;
    const pointer = mouseRef.current;
    const targetX = reducedMotion || isMobile ? 0 : pointer.y * 0.18;
    const targetY = reducedMotion || isMobile ? 0 : -pointer.x * 0.2;
    const targetScale = isMobile ? 0.7 : 0.9;

    rootRef.current.rotation.x = THREE.MathUtils.damp(
      rootRef.current.rotation.x,
      targetX + (reducedMotion ? 0 : Math.sin(elapsed * 0.32) * 0.025),
      4,
      dt,
    );
    rootRef.current.rotation.y = THREE.MathUtils.damp(
      rootRef.current.rotation.y,
      (reducedMotion ? 0.28 : elapsed * (isMobile ? 0.08 : 0.13)) + targetY,
      4,
      dt,
    );
    rootRef.current.position.y = reducedMotion ? 0 : Math.sin(elapsed * 0.5) * 0.075;
    const entryScale = reducedMotion ? targetScale : targetScale * Math.min(1, 0.72 + elapsed * 0.22);
    rootRef.current.scale.setScalar(entryScale);

    if (wireRef.current) wireRef.current.material.opacity = THREE.MathUtils.damp(wireRef.current.material.opacity, targetWireOpacity, 4, dt);
    if (coreRef.current) coreRef.current.material.opacity = THREE.MathUtils.damp(coreRef.current.material.opacity, targetCoreOpacity, 4, dt);
    if (ringARef.current && ringBRef.current) {
      ringARef.current.rotation.x = Math.PI * 0.31 + (reducedMotion ? 0 : elapsed * 0.04);
      ringARef.current.rotation.y = -0.4 + (reducedMotion ? 0 : elapsed * 0.03);
      ringBRef.current.rotation.x = -0.8;
      ringBRef.current.rotation.y = 0.55 - (reducedMotion ? 0 : elapsed * 0.035);
    }
    if (solidMaterialRef.current) {
      solidMaterialRef.current.color.lerp(sectionIsHome ? colors.home : colors.content, 0.025);
    }
  });

  return (
    <>
      <ambientLight color="#1A1A2E" intensity={0.5} />
      <directionalLight position={[4, 5, 5]} color="#22D3EE" intensity={1.65} />
      <directionalLight position={[-4, -2, 3]} color="#8B5CF6" intensity={0.95} />
      <pointLight position={[0, 2, -4]} color="#F0F0F3" intensity={0.55} />
      <pointLight position={[2, -2, 3]} color="#06B6D4" intensity={0.35} />

      <group ref={rootRef}>
        <mesh geometry={geometry}>
          <meshPhysicalMaterial ref={solidMaterialRef} color="#111827" metalness={0.52} roughness={0.2} clearcoat={1} clearcoatRoughness={0.1} />
        </mesh>
        <mesh geometry={geometry} scale={1.014}>
          <meshBasicMaterial ref={wireRef} color="#67E8F9" wireframe transparent opacity={0.28} />
        </mesh>
        <mesh ref={coreRef} geometry={innerGeometry}>
          <meshBasicMaterial color="#A5F3FC" wireframe transparent opacity={0.42} />
        </mesh>
        <mesh ref={ringARef} geometry={ringGeometry} scale={[1.15, 1.45, 1]}>
          <meshBasicMaterial color="#22D3EE" transparent opacity={0.42} />
        </mesh>
        <mesh ref={ringBRef} geometry={ringGeometry} scale={[1.5, 1.1, 1]}>
          <meshBasicMaterial color="#A78BFA" transparent opacity={0.3} />
        </mesh>
        <mesh position={[1.94, 0.35, 0.25]}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#67E8F9" />
        </mesh>
        <mesh position={[-1.85, -0.45, -0.2]}>
          <sphereGeometry args={[0.04, 10, 10]} />
          <meshBasicMaterial color="#C4B5FD" />
        </mesh>
      </group>
    </>
  );
}

export default function HeroScene({ className = "", activeSection = "home" }) {
  const mouseRef = useRef({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);
    setWebglUnavailable(!(window.WebGLRenderingContext || window.WebGL2RenderingContext));
    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (reducedMotion || window.matchMedia("(hover: none), (pointer: coarse)").matches) {
      mouseRef.current = { x: 0, y: 0 };
      return undefined;
    }
    const handleMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    const resetPointer = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };
    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", resetPointer);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", resetPointer);
    };
  }, [reducedMotion]);

  return (
    <div className={className} role="img" aria-label="Decorative cyan and violet 3D geometric sculpture">
      {webglUnavailable ? (
        <div className="hero-scene-fallback" aria-hidden="true" />
      ) : (
        <Canvas
          fallback={<div className="hero-scene-fallback" />}
          camera={{ position: [0, 0, 6.8], fov: 42 }}
          dpr={[1, Math.min(window.devicePixelRatio || 1, window.matchMedia("(max-width: 767px)").matches ? 1 : 1.5)]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop={reducedMotion ? "demand" : "always"}
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          <HeroPolyhedron mouseRef={mouseRef} reducedMotion={reducedMotion} activeSection={activeSection} />
        </Canvas>
      )}
    </div>
  );
}
