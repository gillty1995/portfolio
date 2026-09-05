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
    point = fract(point * vec2(123.34, 456.21));
    point += dot(point, point + 45.32);
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

  float fbm(vec2 point) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 octaveRotation = mat2(0.80, 0.60, -0.60, 0.80);

    for (int octave = 0; octave < 5; octave++) {
      value += amplitude * noise(point);
      point = octaveRotation * point * 2.03 + 17.17;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = v_uv;
    vec2 point = uv - 0.5;
    point.x *= u_resolution.x / max(u_resolution.y, 1.0);

    float angle = -0.12;
    mat2 rotation = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
    point = rotation * point * 0.88;

    float time = u_time * 0.085;
    vec2 firstWarp = vec2(
      fbm(point * 0.58 + vec2(time, -time * 0.22)),
      fbm(point * 0.58 + vec2(5.20 - time * 0.18, 1.30 + time * 0.30))
    );
    vec2 secondWarp = vec2(
      fbm(point * 0.78 + 2.35 * firstWarp + vec2(1.70, time * 0.20)),
      fbm(point * 0.78 + 2.35 * firstWarp + vec2(8.30, -time * 0.22))
    );

    vec2 warpedPoint = point + (firstWarp - 0.5) * 1.42 + (secondWarp - 0.5) * 0.64;
    float field = fbm(warpedPoint * 0.82 + vec2(-time * 0.13, time * 0.08));
    float detail = fbm(warpedPoint * 1.18 - secondWarp * 0.55 + vec2(time * 0.08, 3.40));

    float liquidBody = smoothstep(0.33, 0.70, field);
    float mainEdge = 1.0 - smoothstep(0.035, 0.175, abs(field - 0.515));
    float secondaryFlow = 1.0 - smoothstep(0.025, 0.135, abs(detail - 0.535));
    float liquidEdge = clamp(mainEdge * 0.72 + secondaryFlow * 0.12, 0.0, 1.0);

    vec3 coolWhite = vec3(0.905, 0.918, 0.932);
    vec3 pearl = vec3(0.995, 0.992, 0.976);
    vec3 silver = vec3(0.455, 0.525, 0.605);
    vec3 frost = vec3(0.755, 0.800, 0.840);

    vec3 color = mix(coolWhite, pearl, liquidBody * 0.90);
    color = mix(color, frost, secondaryFlow * 0.07);
    color = mix(color, silver, liquidEdge * 0.54);

    float centerLight = 1.0 - smoothstep(0.18, 0.92, length(point * vec2(0.78, 1.08)));
    color = mix(color, pearl, centerLight * 0.16);
    color += (noise(uv * u_resolution * 0.18) - 0.5) * 0.008;

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

export default function LiquidHeroBackground() {
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
      className="liquid-hero-background"
      data-active="true"
    >
      <canvas ref={canvasRef} className="liquid-hero-canvas" />
      <div className="liquid-hero-sheen" />
      <div className="liquid-hero-grain" />
      <div className="liquid-hero-bottom-blend" />
    </div>
  );
}
