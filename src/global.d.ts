declare module "@react-three/fiber";
declare module "@react-three/drei";
declare module "three";

// global.d.ts
import * as THREE from "three";

declare module "three" {
  export class ShaderMaterial extends THREE.Material {
    uniforms: { [key: string]: { value: unknown } };
  }

  export class Clock {
    getElapsedTime(): number;
  }
}