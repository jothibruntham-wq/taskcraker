import React, { useEffect, useRef } from "react";
import Cracker3DViewer from "./Cracker3DViewer";
import { soundManager } from "../utils/soundEffects";

export default function Hero({ onOpenCart }) {
  const canvasRef = useRef(null);

  // Background floating festive sparkler particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const sparks = [];
    const sparkCount = 65;

    for (let i = 0; i < sparkCount; i++) {
      sparks.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -Math.random() * 1.5 - 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        decay: Math.random() * 0.008 + 0.003,
        color:
          Math.random() > 0.3
            ? `255, ${Math.floor(Math.random() * 80 + 175)}, 50`
            : "255, 255, 255",
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let s of sparks) {
        s.x += s.speedX;
        s.y += s.speedY;
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.y < 0) {
          s.x = Math.random() * canvas.width;
          s.y = canvas.height + 10;
          s.alpha = Math.random() * 0.9 + 0.1;
          s.speedY = -Math.random() * 1.5 - 0.3;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color}, ${s.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${s.color}, 0.8)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <section className="cracker-hero-section" id="hero">
      {/* Background Sparkler Particle Canvas */}
      <canvas ref={canvasRef} className="hero-spark-canvas" />

      {/* Hero Ambient Glow Blobs */}
      <div className="hero-ambient-glow glow-1"></div>
      <div className="hero-ambient-glow glow-2"></div>

      <div className="container position-relative z-2">
        <div className="row align-items-center gy-5">
          {/* Left Column: Headline, Description & CTAs */}
          <div className="col-xl-6 col-lg-6" data-aos="fade-right">
            <div className="hero-badge-pill">
              <span className="festive-star">✨</span>
              <span>DIRECT SIVAKASI FACTORY OUTLET</span>
              <span className="badge-year">2026</span>
            </div>

            <h1 className="hero-headline">
              LIGHT UP YOUR <br />
              <span className="gradient-gold">DIWALI CELEBRATIONS</span> <br />
              WITH <b>AUTHENTIC FIREWORKS</b>
            </h1>

            <p className="hero-lead">
              Experience the unmatched sparkle of genuine Sivakasi crackers.
              Featuring 100% PESO-certified Green Crackers, lower emissions,
              breathtaking aerial sky displays, and wholesale prices directly to
              your doorstep.
            </p>

            {/* Quick Feature Badges */}
            <div className="hero-feature-tags">
              <div className="feature-tag">
                <i className="bi bi-shield-check"></i> 100% Genuine Sivakasi
              </div>
              <div className="feature-tag">
                <i className="bi bi-tree"></i> Eco Green Certified
              </div>
              <div className="feature-tag">
                <i className="bi bi-truck"></i> Safe Doorstep Dispatch
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hero-action-buttons">
              <a
                href="#products"
                className="btn-hero-primary"
                onClick={() => soundManager.playSparkleChime()}
              >
                <i className="bi bi-fire"></i>
                <span>Shop Best Sellers</span>
              </a>

              <a
                href="#3d-studio"
                className="btn-hero-secondary"
                onClick={() => soundManager.playSparkleChime()}
              >
                <i className="bi bi-box"></i>
                <span>Interactive 3D Studio</span>
              </a>

              <a
                href="https://wa.me/918904303697?text=Please%20send%20me%20the%20Diwali%202026%20wholesale%20price%20list"
                target="_blank"
                rel="noreferrer"
                className="btn-hero-outline"
              >
                <i className="bi bi-whatsapp"></i> Price List
              </a>
            </div>

            {/* Sivakasi Trust Indicators */}
            <div className="hero-stats-row">
              <div className="stat-item">
                <h3>150+</h3>
                <p>Crackers Variety</p>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <h3>50,000+</h3>
                <p>Happy Families</p>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <h3>100%</h3>
                <p>PESO Approved</p>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <h3>Direct</h3>
                <p>Factory Pricing</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero 3D Interactive Model Card */}
          <div className="col-xl-6 col-lg-6" data-aos="fade-left" data-aos-delay="150">
            <div className="hero-3d-card">
              <div className="hero-3d-header">
                <div className="d-flex align-items-center gap-2">
                  <span className="live-indicator"></span>
                  <span className="title">Virtual 3D Skyrocket Preview</span>
                </div>
                <span className="sub-tag">Touch & Rotate 360°</span>
              </div>

              {/* Embedded 3D Viewer in Hero */}
              <div className="hero-3d-body">
                <Cracker3DViewer
                  modelType="rocket"
                  particleColor="#ffb300"
                  autoRotate={true}
                  height="420px"
                />
              </div>

              {/* Hero 3D Card Footer */}
              <div className="hero-3d-footer">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <span className="label">Featured Model</span>
                    <h5>Sivakasi Royal Bamboo Rocket</h5>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                    <span className="hero-price">₹380 <del>₹550</del></span>
                    <a href="#3d-studio" className="btn-mini-studio">
                      Open Studio ↗
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
