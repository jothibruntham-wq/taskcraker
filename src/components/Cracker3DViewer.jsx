import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { soundManager } from "../utils/soundEffects";

export default function Cracker3DViewer({
  modelType = "rocket", // "rocket" | "flowerpot" | "chakkar"
  particleColor = "#ffb300",
  autoRotate = true,
  height = "420px",
  interactive = true,
  onBurst = null,
}) {
  const mountRef = useRef(null);
  const [isIgnited, setIsIgnited] = useState(false);
  const [burstCount, setBurstCount] = useState(0);

  // References to keep animation loop clean
  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    modelGroup: null,
    fuseSparks: null,
    explosionParticles: null,
    isIgnited: false,
    modelType,
    particleColor,
    autoRotate,
    isDragging: false,
    prevPointer: { x: 0, y: 0 },
    rotationSpeed: { x: 0.005, y: 0.01 },
    animFrameId: null,
    burstProgress: 0,
    rocketFlightY: 0,
    chakkarSpin: 0,
  });

  // Update refs when props change
  useEffect(() => {
    stateRef.current.modelType = modelType;
    stateRef.current.particleColor = particleColor;
    stateRef.current.autoRotate = autoRotate;
    buildModel();
  }, [modelType, particleColor, autoRotate]);

  // Helper to create a procedural festive texture
  const createFestiveTexture = (colorHex) => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Base gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, "#8a0e0e");
    grad.addColorStop(0.5, colorHex);
    grad.addColorStop(1, "#1c0505");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Golden decorative bands
    ctx.fillStyle = "#ffdf79";
    for (let i = 40; i < 512; i += 90) {
      ctx.fillRect(0, i, 512, 8);
    }

    // Sparkle star patterns
    ctx.fillStyle = "#fff8d6";
    ctx.font = "bold 26px sans-serif";
    for (let x = 30; x < 500; x += 100) {
      for (let y = 75; y < 500; y += 90) {
        ctx.fillText("✦", x, y);
      }
    }

    // Traditional text stamp
    ctx.fillStyle = "#ffd700";
    ctx.font = "900 24px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SIVAKASI ROYAL ✦ 2026", 256, 260);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  };

  const buildModel = () => {
    const { scene, modelGroup } = stateRef.current;
    if (!scene || !modelGroup) return;

    // Clear previous children
    while (modelGroup.children.length > 0) {
      const child = modelGroup.children[0];
      if (child.geometry) child.geometry.dispose();
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach((m) => m.dispose());
        } else {
          child.material.dispose();
        }
      }
      modelGroup.remove(child);
    }

    const color = new THREE.Color(stateRef.current.particleColor);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xffd24d,
      metalness: 0.85,
      roughness: 0.25,
    });

    const bodyTexture = createFestiveTexture(stateRef.current.particleColor);
    const bodyMat = new THREE.MeshStandardMaterial({
      map: bodyTexture,
      roughness: 0.35,
      metalness: 0.2,
    });

    if (stateRef.current.modelType === "rocket") {
      // 1. Nose Cone
      const coneGeo = new THREE.ConeGeometry(0.85, 1.8, 32);
      const coneMat = new THREE.MeshStandardMaterial({
        color: 0xd61c28,
        metalness: 0.6,
        roughness: 0.3,
      });
      const cone = new THREE.Mesh(coneGeo, coneMat);
      cone.position.y = 2.1;
      modelGroup.add(cone);

      // Nose ring
      const ringGeo = new THREE.TorusGeometry(0.85, 0.08, 16, 32);
      const ring = new THREE.Mesh(ringGeo, goldMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = 1.2;
      modelGroup.add(ring);

      // 2. Rocket Payload Body
      const cylinderGeo = new THREE.CylinderGeometry(0.85, 0.85, 2.8, 32);
      const cylinder = new THREE.Mesh(cylinderGeo, bodyMat);
      cylinder.position.y = -0.2;
      modelGroup.add(cylinder);

      // Base ring
      const baseRing = new THREE.Mesh(ringGeo, goldMat);
      baseRing.rotation.x = Math.PI / 2;
      baseRing.position.y = -1.6;
      modelGroup.add(baseRing);

      // 3. Bamboo guide stick
      const stickGeo = new THREE.CylinderGeometry(0.08, 0.08, 5.0, 16);
      const stickMat = new THREE.MeshStandardMaterial({
        color: 0xd4a373,
        roughness: 0.9,
      });
      const stick = new THREE.Mesh(stickGeo, stickMat);
      stick.position.set(-0.75, -2.8, 0);
      modelGroup.add(stick);

      // Fastener band for stick
      const bandGeo = new THREE.TorusGeometry(0.88, 0.06, 8, 32);
      const bandMat = new THREE.MeshStandardMaterial({ color: 0x333333 });
      const band1 = new THREE.Mesh(bandGeo, bandMat);
      band1.rotation.x = Math.PI / 2;
      band1.position.y = -0.5;
      modelGroup.add(band1);

      // 4. Fuse wick
      const fuseCurve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(0, -1.6, 0),
        new THREE.Vector3(0.2, -1.9, 0.1),
        new THREE.Vector3(-0.1, -2.3, 0.2),
        new THREE.Vector3(0.3, -2.6, 0)
      );
      const fuseGeo = new THREE.TubeGeometry(fuseCurve, 20, 0.05, 8, false);
      const fuseMat = new THREE.MeshStandardMaterial({
        color: 0x6e6358,
        roughness: 1.0,
      });
      const fuse = new THREE.Mesh(fuseGeo, fuseMat);
      modelGroup.add(fuse);

      // Glowing Fuse tip
      const tipGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const tipMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.set(0.3, -2.6, 0);
      tip.name = "fuseTip";
      modelGroup.add(tip);

      modelGroup.position.set(0, 0.4, 0);
    } else if (stateRef.current.modelType === "flowerpot") {
      // Flower pot (Anaar cone)
      const potGeo = new THREE.CylinderGeometry(0.4, 1.6, 3.2, 32);
      const potMat = new THREE.MeshStandardMaterial({
        color: 0xa84824,
        roughness: 0.7,
        metalness: 0.15,
      });
      const pot = new THREE.Mesh(potGeo, potMat);
      modelGroup.add(pot);

      // Ornamental decorative wrapper
      const wrapGeo = new THREE.CylinderGeometry(0.55, 1.45, 2.0, 32);
      const wrap = new THREE.Mesh(wrapGeo, bodyMat);
      wrap.position.y = -0.2;
      modelGroup.add(wrap);

      // Pot top cap (silver/gold foil seal)
      const capGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.15, 32);
      const cap = new THREE.Mesh(capGeo, goldMat);
      cap.position.y = 1.65;
      modelGroup.add(cap);

      // Clay base ring
      const baseRimGeo = new THREE.CylinderGeometry(1.68, 1.72, 0.3, 32);
      const rim = new THREE.Mesh(baseRimGeo, goldMat);
      rim.position.y = -1.6;
      modelGroup.add(rim);

      // Fuse string
      const tipGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const tipMat = new THREE.MeshBasicMaterial({ color: 0xff8800 });
      const tip = new THREE.Mesh(tipGeo, tipMat);
      tip.position.set(0, 1.75, 0);
      tip.name = "fuseTip";
      modelGroup.add(tip);

      modelGroup.position.set(0, 0, 0);
    } else if (stateRef.current.modelType === "chakkar") {
      // Ground Chakkar / Spinner Disc
      const discGeo = new THREE.CylinderGeometry(2.0, 2.0, 0.4, 48);
      const disc = new THREE.Mesh(discGeo, bodyMat);
      modelGroup.add(disc);

      // Center Hub Dome
      const hubGeo = new THREE.SphereGeometry(0.7, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.5);
      const hub = new THREE.Mesh(hubGeo, goldMat);
      hub.position.y = 0.2;
      modelGroup.add(hub);

      // Gold outer ring
      const rimGeo = new THREE.TorusGeometry(2.02, 0.08, 16, 48);
      const rim = new THREE.Mesh(rimGeo, goldMat);
      rim.rotation.x = Math.PI / 2;
      modelGroup.add(rim);

      // Ignition nozzle / fuse point on perimeter
      const nozzleGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.5, 16);
      const nozzle = new THREE.Mesh(nozzleGeo, goldMat);
      nozzle.rotation.z = Math.PI / 2;
      nozzle.position.set(2.0, 0, 0);
      nozzle.name = "fuseTip";
      modelGroup.add(nozzle);

      modelGroup.position.set(0, 0, 0);
    }
  };

  // Trigger explosive ignition
  const handleIgnite = () => {
    if (stateRef.current.isIgnited) return;

    soundManager.playFuseSizzle();
    setIsIgnited(true);
    stateRef.current.isIgnited = true;
    stateRef.current.burstProgress = 0;

    // Small delay to simulate fuse burning down, then boom!
    setTimeout(() => {
      if (stateRef.current.modelType === "rocket") {
        soundManager.playRocketLaunch();
      }
      setTimeout(() => {
        soundManager.playCrackerBurst();
        triggerFireworksExplosion();
        if (onBurst) onBurst(stateRef.current.modelType);
      }, stateRef.current.modelType === "rocket" ? 450 : 250);
    }, 700);
  };

  // Spawn dazzling 3D explosion particles in scene
  const triggerFireworksExplosion = () => {
    const { scene } = stateRef.current;
    if (!scene) return;

    // Remove previous explosion particles if any
    if (stateRef.current.explosionParticles) {
      scene.remove(stateRef.current.explosionParticles);
    }

    const particleCount = 450;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(stateRef.current.particleColor);
    const altColor = new THREE.Color("#ffd700");

    for (let i = 0; i < particleCount; i++) {
      // Origin based on model type
      positions[i * 3] = 0;
      positions[i * 3 + 1] = stateRef.current.modelType === "flowerpot" ? 1.8 : 0;
      positions[i * 3 + 2] = 0;

      // Spherical explosion velocity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 0.08 + Math.random() * 0.16;

      velocities[i * 3] = speed * Math.sin(phi) * Math.cos(theta);
      velocities[i * 3 + 1] =
        stateRef.current.modelType === "flowerpot"
          ? Math.abs(speed * Math.sin(phi) * Math.sin(theta)) * 1.5 + 0.05
          : speed * Math.sin(phi) * Math.sin(theta);
      velocities[i * 3 + 2] = speed * Math.cos(phi);

      const mixed = Math.random() > 0.4 ? baseColor : altColor;
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1.0,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    particles.userData = {
      velocities,
      life: 1.0,
      decay: 0.018,
    };

    scene.add(particles);
    stateRef.current.explosionParticles = particles;
    setBurstCount((prev) => prev + 1);

    // Auto-reset ignition state after 2.2 seconds
    setTimeout(() => {
      setIsIgnited(false);
      stateRef.current.isIgnited = false;
      stateRef.current.rocketFlightY = 0;
      if (stateRef.current.modelGroup) {
        stateRef.current.modelGroup.position.y =
          stateRef.current.modelType === "rocket" ? 0.4 : 0;
      }
    }, 2400);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 100);
    camera.position.set(0, 0.5, 7.5);
    stateRef.current.camera = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfffaed, 2.0);
    dirLight1.position.set(5, 8, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xff8800, 1.2);
    dirLight2.position.set(-5, -3, 3);
    scene.add(dirLight2);

    // Subtle festival ground glow
    const pointLight = new THREE.PointLight(0xffa200, 2.5, 12);
    pointLight.position.set(0, -2.5, 2);
    scene.add(pointLight);

    // 5. Model Group
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    stateRef.current.modelGroup = modelGroup;

    // 6. Build Initial Model
    buildModel();

    // 7. Ambient Floating Sparkles
    const sparkCount = 80;
    const sparkGeo = new THREE.BufferGeometry();
    const sparkPos = new Float32Array(sparkCount * 3);
    for (let i = 0; i < sparkCount * 3; i += 3) {
      sparkPos[i] = (Math.random() - 0.5) * 8;
      sparkPos[i + 1] = (Math.random() - 0.5) * 8;
      sparkPos[i + 2] = (Math.random() - 0.5) * 6;
    }
    sparkGeo.setAttribute("position", new THREE.BufferAttribute(sparkPos, 3));
    const sparkMat = new THREE.PointsMaterial({
      color: 0xffdd66,
      size: 0.06,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const ambientSparks = new THREE.Points(sparkGeo, sparkMat);
    scene.add(ambientSparks);

    // 8. Animation Loop
    let lastTime = performance.now();

    const animate = (time) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Auto-rotation when not dragging
      if (stateRef.current.autoRotate && !stateRef.current.isDragging) {
        if (stateRef.current.modelType === "chakkar") {
          modelGroup.rotation.y += 0.02;
        } else {
          modelGroup.rotation.y += 0.008;
        }
      }

      // Sparkles floating animation
      ambientSparks.rotation.y += 0.002;
      ambientSparks.rotation.x += 0.001;

      // Handle ignited rocket lift off
      if (stateRef.current.isIgnited && stateRef.current.modelType === "rocket") {
        stateRef.current.rocketFlightY += 0.08;
        modelGroup.position.y += 0.08;
        modelGroup.rotation.z = Math.sin(time * 0.015) * 0.1;
      }

      // Handle chakkar high-speed spin
      if (stateRef.current.isIgnited && stateRef.current.modelType === "chakkar") {
        modelGroup.rotation.y += 0.35;
      }

      // Update explosion particles
      const exp = stateRef.current.explosionParticles;
      if (exp) {
        const positions = exp.geometry.attributes.position.array;
        const vels = exp.userData.velocities;
        const count = positions.length / 3;

        for (let i = 0; i < count; i++) {
          positions[i * 3] += vels[i * 3];
          positions[i * 3 + 1] += vels[i * 3 + 1];
          positions[i * 3 + 2] += vels[i * 3 + 2];

          // Gravity on particles
          vels[i * 3 + 1] -= 0.0025;
          // Air resistance
          vels[i * 3] *= 0.985;
          vels[i * 3 + 1] *= 0.985;
          vels[i * 3 + 2] *= 0.985;
        }

        exp.geometry.attributes.position.needsUpdate = true;
        exp.userData.life -= exp.userData.decay;
        exp.material.opacity = Math.max(0, exp.userData.life);

        if (exp.userData.life <= 0) {
          scene.remove(exp);
          stateRef.current.explosionParticles = null;
        }
      }

      renderer.render(scene, camera);
      stateRef.current.animFrameId = requestAnimationFrame(animate);
    };

    stateRef.current.animFrameId = requestAnimationFrame(animate);

    // 9. Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (stateRef.current.animFrameId) {
        cancelAnimationFrame(stateRef.current.animFrameId);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Pointer Drag Handlers (Interactive 360 Orbit)
  const onPointerDown = (e) => {
    if (!interactive) return;
    stateRef.current.isDragging = true;
    stateRef.current.prevPointer = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    if (!interactive || !stateRef.current.isDragging) return;
    const dx = e.clientX - stateRef.current.prevPointer.x;
    const dy = e.clientY - stateRef.current.prevPointer.y;

    if (stateRef.current.modelGroup) {
      stateRef.current.modelGroup.rotation.y += dx * 0.01;
      stateRef.current.modelGroup.rotation.x += dy * 0.01;
      // Clamp X rotation to avoid flipping upside down
      stateRef.current.modelGroup.rotation.x = Math.max(
        -Math.PI / 3,
        Math.min(Math.PI / 3, stateRef.current.modelGroup.rotation.x)
      );
    }

    stateRef.current.prevPointer = { x: e.clientX, y: e.clientY };
  };

  const onPointerUp = () => {
    stateRef.current.isDragging = false;
  };

  const onWheel = (e) => {
    if (!interactive || !stateRef.current.camera) return;
    stateRef.current.camera.position.z = Math.max(
      4.5,
      Math.min(11, stateRef.current.camera.position.z + e.deltaY * 0.005)
    );
  };

  return (
    <div className="cracker-3d-wrapper" style={{ position: "relative", width: "100%", height }}>
      {/* 3D Canvas Mount Point */}
      <div
        ref={mountRef}
        className="cracker-3d-canvas"
        style={{
          width: "100%",
          height: "100%",
          cursor: interactive ? "grab" : "default",
          touchAction: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onWheel={onWheel}
      />

      {/* Floating 3D HUD & Action Badge */}
      <div className="cracker-3d-hud">
        <span className="badge-3d-live">
          <i className="bi bi-badge-3d-fill"></i> 3D Interactive Model
        </span>

        {/* Ignite Trigger Button */}
        <button
          className={`ignite-btn ${isIgnited ? "ignited" : ""}`}
          onClick={handleIgnite}
          disabled={isIgnited}
          title="Light the fuse and watch fireworks!"
        >
          <i className={`bi ${isIgnited ? "bi-fire" : "bi-lightning-charge-fill"}`}></i>
          {isIgnited ? "BURSTING!" : "IGNITE CRACKER"}
        </button>
      </div>

      {/* Helper drag tip */}
      <div className="cracker-3d-tooltip">
        <i className="bi bi-arrow-repeat"></i> Drag to rotate 360° | Scroll to Zoom
      </div>
    </div>
  );
}
