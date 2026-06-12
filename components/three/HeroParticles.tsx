"use client";

import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";

const COUNT = 2200;

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSeed;
  varying float vAlpha;

  // Cheap pseudo-curl drift: layered sines per-particle, seeded.
  void main() {
    vec3 p = position;
    float t = uTime * 0.12;
    p.x += sin(t * 1.7 + aSeed * 12.9) * 0.55 + cos(t * 0.6 + aSeed * 4.1) * 0.35;
    p.y += cos(t * 1.3 + aSeed * 7.7) * 0.45 + sin(t * 0.8 + aSeed * 9.3) * 0.30;
    p.z += sin(t * 0.9 + aSeed * 5.3) * 0.40;

    // Mouse parallax: gentle, depth-weighted shift
    p.x += uMouse.x * (0.6 + p.z * 0.15);
    p.y += uMouse.y * (0.4 + p.z * 0.10);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (26.0 / -mv.z);

    // Fade with depth and a slow per-particle breath
    vAlpha = smoothstep(-9.0, -2.0, mv.z) * (0.45 + 0.55 * sin(uTime * 0.5 + aSeed * 20.0));
  }
`;

const FRAGMENT = /* glsl */ `
  precision mediump float;
  varying float vAlpha;

  void main() {
    // Soft round sprite with a hot gold core
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float glow = 1.0 - smoothstep(0.0, 0.5, d);
    vec3 gold = mix(vec3(0.72, 0.58, 0.16), vec3(0.92, 0.78, 0.38), glow);
    gl_FragColor = vec4(gold, glow * glow * vAlpha * 0.85);
  }
`;

interface Props {
  /** Called once after the first frame renders so the parent can crossfade. */
  onReady?: () => void;
}

/**
 * Gold particle constellation for the dark hero. Plain three.js, one Points
 * mesh, custom shader. Pauses off-screen and on hidden tabs; disposes fully
 * on unmount.
 */
export default function HeroParticles({ onReady }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const onReadyRef = useRef(onReady);

  useEffect(() => {
    onReadyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(55, 1, 0.1, 40);
    camera.position.z = 7;

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "low-power",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    host.appendChild(renderer.domElement);

    // Seeded deterministic layout — wide slab behind the headline
    const positions = new Float32Array(COUNT * 3);
    const scales = new Float32Array(COUNT);
    const seeds = new Float32Array(COUNT);
    let s = 42;
    const rand = () => {
      s = (s * 16807) % 2147483647;
      return (s - 1) / 2147483646;
    };
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (rand() - 0.5) * 18;
      positions[i * 3 + 1] = (rand() - 0.5) * 10;
      positions[i * 3 + 2] = (rand() - 0.5) * 6;
      scales[i] = 0.5 + rand() * 1.6;
      seeds[i] = rand();
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new BufferAttribute(scales, 1));
    geometry.setAttribute("aSeed", new BufferAttribute(seeds, 1));

    const material = new ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: { x: 0, y: 0 } },
        uPixelRatio: { value: dpr },
      },
    });
    scene.add(new Points(geometry, material));

    // Lerped mouse parallax
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    // Time accumulates only while rendering, so pauses don't cause jumps.
    let elapsed = 0;
    let last = performance.now();
    let rafId = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    let firstFrame = true;

    const frame = () => {
      rafId = 0;
      if (!visible || !pageVisible) return;
      const now = performance.now();
      elapsed += Math.min(now - last, 100) / 1000;
      last = now;
      mouse.x += (target.x - mouse.x) * 0.04;
      mouse.y += (target.y - mouse.y) * 0.04;
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uMouse.value.x = mouse.x;
      material.uniforms.uMouse.value.y = mouse.y;
      renderer.render(scene, camera);
      if (firstFrame) {
        firstFrame = false;
        onReadyRef.current?.();
      }
      rafId = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!rafId && visible && pageVisible) rafId = requestAnimationFrame(frame);
    };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        last = performance.now();
        start();
      }
    });
    io.observe(host);

    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("mousemove", onMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} className="hero-particles" aria-hidden="true" />;
}
