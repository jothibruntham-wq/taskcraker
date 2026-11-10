import React, { useState } from "react";
import Cracker3DViewer from "./Cracker3DViewer";
import { soundManager } from "../utils/soundEffects";

const MODEL_PRESETS = [
  {
    id: "rocket",
    name: "Sivakasi Royal Skyrocket",
    category: "Aerial Display",
    icon: "bi-rocket-takeoff-fill",
    desc: "Single-stick bamboo skyrocket with high-thrust propellant that ascends 120ft before delivering a dazzling golden titanium palm burst.",
    specs: {
      altitude: "120 Feet",
      burstDiameter: "45 Feet",
      soundRating: "Mega Boom",
      safeDistance: "15 Meters",
      packaging: "Box of 10",
      price: "₹380",
    },
  },
  {
    id: "flowerpot",
    name: "Royal Golden Anaar (Flower Pot)",
    category: "Ground Fountain",
    icon: "bi-flower1",
    desc: "Specially formulated terracotta flowerpot emitting a continuous 15-foot cascading shower of glittering golden and multi-color crackling sparks.",
    specs: {
      height: "15 Feet Fountain",
      duration: "45 Seconds",
      soundRating: "Crackling Whistle",
      safeDistance: "5 Meters",
      packaging: "Box of 5 (Jumbo)",
      price: "₹290",
    },
  },
  {
    id: "chakkar",
    name: "Special Zamin Chakkar Deluxe",
    category: "Ground Spinner",
    icon: "bi-arrow-clockwise",
    desc: "High-rpm ground spinning wheel creating a brilliant spiral vortex of ruby red and emerald green lights with smooth zero-wobble rotation.",
    specs: {
      diameter: "10 Feet Whirl",
      spinSpeed: "850 RPM",
      soundRating: "Pleasant Hiss",
      safeDistance: "3 Meters",
      packaging: "Box of 10",
      price: "₹210",
    },
  },
];

const COLOR_OPTIONS = [
  { label: "Golden Spark", hex: "#ffb703" },
  { label: "Crimson Ruby", hex: "#e63946" },
  { label: "Emerald Green", hex: "#2a9d8f" },
  { label: "Electric Cyan", hex: "#00b4d8" },
  { label: "Royal Violet", hex: "#9d4edd" },
];

export default function Cracker3DSection({ onAddToCart }) {
  const [activeModel, setActiveModel] = useState("rocket");
  const [activeColor, setActiveColor] = useState("#ffb703");
  const [autoRotate, setAutoRotate] = useState(true);
  const [totalBursts, setTotalBursts] = useState(0);

  const selectedPreset =
    MODEL_PRESETS.find((m) => m.id === activeModel) || MODEL_PRESETS[0];

  const handleBurst = (type) => {
    setTotalBursts((prev) => prev + 1);
  };

  const handleSelectModel = (id) => {
    setActiveModel(id);
    soundManager.playSparkleChime();
  };

  return (
    <section className="cracker-3d-section" id="3d-studio">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading text-center" data-aos="fade-up">
          <span className="badge-festive">✦ REAL-TIME 3D SHOWCASE ✦</span>
          <h2>
            Interactive <b>3D Cracker Studio</b>
          </h2>
          <p>
            Inspect our handcrafted Sivakasi fireworks in full 360° 3D.
            Customize firework colors, rotate freely, and press <b>IGNITE</b> to
            experience virtual Diwali bursts!
          </p>
        </div>

        {/* 3D Showcase Card */}
        <div className="studio-card" data-aos="zoom-in" data-aos-delay="100">
          <div className="row g-0 align-items-center">
            {/* Left Column: 3D Canvas Viewer */}
            <div className="col-xl-7 col-lg-7">
              <div className="studio-canvas-container">
                <Cracker3DViewer
                  modelType={activeModel}
                  particleColor={activeColor}
                  autoRotate={autoRotate}
                  height="480px"
                  onBurst={handleBurst}
                />

                {/* Studio Canvas Controls Toolbar */}
                <div className="canvas-bottom-bar">
                  <div className="color-picker-row">
                    <span className="picker-label">Spark Color:</span>
                    {COLOR_OPTIONS.map((c) => (
                      <button
                        key={c.hex}
                        className={`color-dot ${
                          activeColor === c.hex ? "active" : ""
                        }`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => {
                          setActiveColor(c.hex);
                          soundManager.playSparkleChime();
                        }}
                        title={c.label}
                      />
                    ))}
                  </div>

                  <button
                    className={`autorotate-toggle ${autoRotate ? "active" : ""}`}
                    onClick={() => setAutoRotate(!autoRotate)}
                  >
                    <i className="bi bi-arrow-repeat"></i>
                    {autoRotate ? "Pause Spin" : "Auto Spin"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Model Selector & Specifications */}
            <div className="col-xl-5 col-lg-5">
              <div className="studio-info-panel">
                {/* Model Selector Tabs */}
                <div className="model-tabs">
                  {MODEL_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      className={`model-tab-btn ${
                        activeModel === preset.id ? "active" : ""
                      }`}
                      onClick={() => handleSelectModel(preset.id)}
                    >
                      <i className={`bi ${preset.icon}`}></i>
                      <span>{preset.name.split(" ")[1] || preset.name}</span>
                    </button>
                  ))}
                </div>

                {/* Model Details */}
                <div className="model-details-header">
                  <span className="category-pill">{selectedPreset.category}</span>
                  <h3>{selectedPreset.name}</h3>
                  <p className="model-desc">{selectedPreset.desc}</p>
                </div>

                {/* Technical Specifications Grid */}
                <div className="specs-grid">
                  {Object.entries(selectedPreset.specs).map(([key, val]) => (
                    <div className="spec-card" key={key}>
                      <span className="spec-label">
                        {key.replace(/([A-Z])/g, " $1")}
                      </span>
                      <strong className="spec-val">{val}</strong>
                    </div>
                  ))}
                </div>

                {/* Pricing & Cart Action */}
                <div className="studio-action-row">
                  <div className="price-tag">
                    <span className="label">Festival Price</span>
                    <h4>{selectedPreset.specs.price}</h4>
                  </div>

                  <button
                    className="btn-studio-cart"
                    onClick={() => {
                      soundManager.playCartPop();
                      if (onAddToCart) {
                        onAddToCart({
                          id: selectedPreset.id,
                          name: selectedPreset.name,
                          price: parseInt(selectedPreset.specs.price.replace(/[^\d]/g, "")),
                          category: selectedPreset.category,
                          image:
                            "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
                        });
                      }
                    }}
                  >
                    <i className="bi bi-cart-plus-fill"></i> Add 3D Model to Cart
                  </button>
                </div>

                {/* Burst Counter Footer */}
                <div className="burst-stat-footer">
                  <i className="bi bi-stars"></i>
                  <span>
                    Celebration Bursts Triggered: <b>{totalBursts}</b>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
