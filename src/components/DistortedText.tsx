"use client";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Text3D, Center, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// ✅ Custom Shader Material for Distortion & Glow Effect
const DistortionMaterial = shaderMaterial(
  {
    time: { value: 0 },
    amplitude: { value: 0.3 },
    frequency: { value: 5.0 },
    speed: { value: 2.0 },
    color: { value: new THREE.Color(0.6, 0.8, 1.0) }, // Light blue color
    distortionFactor: { value: 1.0 },
    opacity: { value: 0.9 }, // Soft transparency
  },
  // Vertex Shader with Settling Animation
  `
  uniform float time;
  uniform float amplitude;
  uniform float frequency;
  uniform float speed;
  uniform float distortionFactor;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Controlled distortion that settles
    float wave = sin(pos.x * frequency + time * speed) * amplitude * distortionFactor;
    pos.y += wave;
    pos.x += cos(pos.y * frequency + time * speed) * amplitude * distortionFactor;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
  `,
  // Fragment Shader (Adds a Glow & Transparency)
  `
  uniform vec3 color;
  uniform float opacity;
  varying vec2 vUv;
  
  void main() {
    float glow = abs(sin(vUv.y * 3.1415)); // Glow effect
    gl_FragColor = vec4(color * glow, opacity); // Adjust transparency
  }
  `
);

// ✅ Register the custom material in Three.js
extend({ DistortionMaterial });

// ✅ TypeScript Declaration Fix
declare module "@react-three/fiber" {
  interface ThreeElements {
    distortionMaterial: {
      ref?: React.Ref<THREE.ShaderMaterial>;
      attach?: string;
      uniforms?: {
        time: { value: number };
        amplitude: { value: number };
        frequency: { value: number };
        speed: { value: number };
        distortionFactor: { value: number };
        opacity: { value: number };
      };
    };
  }
}

// ✅ Animated Text Component
function AnimatedText() {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      const elapsed = clock.getElapsedTime();

      // Smooth cycle of animation (wave in, settle, repeat)
      let distortionFactor = Math.sin(elapsed * Math.PI * 0.25) * 0.5 + 0.5; // Smooth wave distortion
      materialRef.current.uniforms.time.value = elapsed;
      materialRef.current.uniforms.distortionFactor.value = distortionFactor;
    }
  });

  return (
    <Center>
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={0.5} // Slightly bigger text
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.03}
        height={0.1} // Adds 3D depth
      >
        Welcome to My Portfolio
        <distortionMaterial
          ref={materialRef}
          attach="material"
          uniforms={{
            time: { value: 0 },
            amplitude: { value: 0.3 },
            frequency: { value: 5.0 },
            speed: { value: 2.0 },
            distortionFactor: { value: 1.0 },
            opacity: { value: 0.9 }, // ✅ Slight transparency
          }}
        />
      </Text3D>
    </Center>
  );
}

// ✅ Main Distorted Text Component
export default function DistortedText() {
  return (
    <Canvas
      className="absolute inset-0"
      style={{ background: "transparent" }} // ✅ Transparent Canvas
      shadows
    >
      <ambientLight intensity={0.8} /> {/* Brighter ambient light */}
      <directionalLight position={[2, 5, 5]} intensity={1.2} castShadow />{" "}
      {/* Adds shadows */}
      <AnimatedText />
    </Canvas>
  );
}
