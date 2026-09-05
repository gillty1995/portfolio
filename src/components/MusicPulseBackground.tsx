"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;

  float hash(vec2 point) {
    point = fract(point * vec2(127.1, 311.7));
    point += dot(point, point + 34.5);
    return fract(point.x * point.y);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = fract(point);
    local = local * local * (3.0 - 2.0 * local);

    float a = hash(cell);
    float b = hash(cell + vec2(1.0, 0.0));
    float c = hash(cell + vec2(0.0, 1.0));
    float d = hash(cell + vec2(1.0, 1.0));
    return mix(mix(a, b, local.x), mix(c, d, local.x), local.y);
  }

  float ribbon(vec2 point, vec2 center, float radius, float width, float phase) {
    vec2 offset = point - center;
    float angle = atan(offset.y, offset.x);
    float distortion = sin(angle * 2.0 + phase) * 0.055;
    vec2 circularNoise = vec2(cos(angle), sin(angle)) * 1.35;
    circularNoise += vec2(phase * 0.08, phase * 0.05);
    distortion += (noise(circularNoise) - 0.5) * 0.11;
    float distanceToArc = abs(length(offset) - radius - distortion);
    return exp(-distanceToArc * distanceToArc / max(width * width, 0.0001));
  }

  void main() {
    vec2 uv = v_uv;
    vec2 point = uv - 0.5;
    float aspect = u_resolution.x / max(u_resolution.y, 1.0);
    point.x *= aspect;
    float portrait = 1.0 - smoothstep(0.72, 1.0, aspect);
    float layoutScale = mix(1.0, 0.56, portrait);

    float time = u_time * 0.18;
    vec2 drift = vec2(
      (noise(vec2(time * 0.16, 2.1)) - 0.5) * 0.12,
      (noise(vec2(7.4, time * 0.13)) - 0.5) * 0.10
    );
    vec2 warped = point + drift;
    warped.y += sin(warped.x * 1.35 + time * 0.45) * 0.035;

    float lowerSweep = ribbon(
      warped,
      vec2(0.04, -1.12) * layoutScale,
      (1.28 + sin(time * 0.22) * 0.035) * layoutScale,
      0.021 * layoutScale,
      time
    );
    float upperLeft = ribbon(
      warped,
      vec2(-1.15, 0.64) * layoutScale,
      (0.88 + sin(time * 0.19 + 1.2) * 0.045) * layoutScale,
      0.030 * layoutScale,
      -time * 0.82
    );
    float upperRight = ribbon(
      warped,
      vec2(1.18, 0.46) * layoutScale,
      (0.82 + sin(time * 0.17 + 2.4) * 0.04) * layoutScale,
      0.026 * layoutScale,
      time * 0.76
    );
    float sidePulse = ribbon(
      warped,
      vec2(-1.43, -0.18) * layoutScale,
      (0.72 + sin(time * 0.25 + 0.7) * 0.035) * layoutScale,
      0.018 * layoutScale,
      time * 1.1
    );

    float pulse = clamp(
      lowerSweep * 0.92 +
      upperLeft * 0.66 +
      upperRight * 0.72 +
      sidePulse * 0.48,
      0.0,
      1.0
    );
    float glow = clamp(
      lowerSweep * 0.48 + upperLeft * 0.30 + upperRight * 0.34,
      0.0,
      1.0
    );

    vec3 pearl = vec3(0.970, 0.972, 0.974);
    vec3 ice = vec3(0.810, 0.842, 0.872);
    vec3 silver = vec3(0.520, 0.590, 0.665);
    float softField = noise(point * 0.62 + vec2(time * 0.035, -time * 0.02));
    vec3 color = mix(pearl, ice, softField * 0.16);
    color = mix(color, ice, glow * 0.42);
    color = mix(color, silver, pulse * 0.58);

    float centerQuiet = smoothstep(0.16, 0.72, length(point * vec2(0.72, 1.0)));
    color = mix(pearl, color, 0.20 + centerQuiet * 0.80);
    color += (noise(uv * u_resolution * 0.12) - 0.5) * 0.005;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function createShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export default function MusicPulseBackground() {
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const background = backgroundRef.current;
    const canvas = canvasRef.current;
    if (!background || !canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(
      gl,
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    const buffer = gl.createBuffer();
    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    if (!buffer || positionLocation < 0 || !resolutionLocation || !timeLocation) {
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      return;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.useProgram(program);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    let prefersReducedMotion = reducedMotionQuery.matches;
    let isVisible = true;
    let animationFrame = 0;
    let elapsed = 0;
    let previousTime = performance.now();

    const resizeCanvas = () => {
      const bounds = background.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = Math.max(1, Math.round(bounds.width * pixelRatio));
      const height = Math.max(1, Math.round(bounds.height * pixelRatio));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
    };

    const paint = () => {
      resizeCanvas();
      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, elapsed / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const render = (now: number) => {
      animationFrame = 0;
      elapsed += Math.min(now - previousTime, 50);
      previousTime = now;
      paint();
      if (isVisible && !prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const startAnimation = () => {
      previousTime = performance.now();
      if (!animationFrame && isVisible && !prefersReducedMotion) {
        animationFrame = window.requestAnimationFrame(render);
      } else {
        paint();
      }
    };

    const stopAnimation = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        background.dataset.active = String(isVisible);
        if (isVisible) startAnimation();
        else stopAnimation();
      },
      { rootMargin: "80px" }
    );
    const resizeObserver = new ResizeObserver(() => paint());
    const handleReducedMotionChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
      if (prefersReducedMotion) {
        stopAnimation();
        paint();
      } else {
        startAnimation();
      }
    };

    visibilityObserver.observe(background);
    resizeObserver.observe(background);
    reducedMotionQuery.addEventListener("change", handleReducedMotionChange);
    paint();
    startAnimation();

    return () => {
      stopAnimation();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      reducedMotionQuery.removeEventListener("change", handleReducedMotionChange);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <div
      ref={backgroundRef}
      aria-hidden="true"
      className="music-pulse-background"
      data-active="true"
    >
      <canvas ref={canvasRef} className="music-pulse-canvas" />
      <div className="music-pulse-sheen" />
      <div className="music-pulse-bottom-blend" />
    </div>
  );
}
