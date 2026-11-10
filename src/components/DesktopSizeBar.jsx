import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundEffects";

const DESKTOP_PRESETS = [
  { label: "Fluid (100%)", width: "100%", desc: "Adaptive to current screen" },
  { label: "1024px", width: "1024px", desc: "Compact Desktop / 12\" Laptop" },
  { label: "1366px", width: "1366px", desc: "Standard HD Laptop (14\"/15\")" },
  { label: "1920px", width: "1920px", desc: "Full HD 1080p Desktop Monitor" },
  { label: "2560px", width: "2560px", desc: "2K QHD Gaming & Designer Display" },
  { label: "3840px", width: "3840px", desc: "4K UHD Ultra-Wide / TV Display" },
];

export default function DesktopSizeBar({ currentMode, onSelectMode }) {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getViewportClassification = (w) => {
    if (w >= 3840) return "4K Ultra-Wide Desktop (3840px+)";
    if (w >= 2560) return "2K QHD Display (2560px+)";
    if (w >= 1920) return "Full HD 1080p Desktop (1920px)";
    if (w >= 1366) return "Standard HD Laptop (1366px)";
    if (w >= 1024) return "Compact Desktop / Laptop (1024px)";
    return "Tablet / Mobile";
  };

  return (
    <div className={`desktop-size-toolbar ${collapsed ? "collapsed" : ""}`}>
      <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap gap-2">
        {/* Left: Viewport Status Indicator */}
        <div className="d-flex align-items-center gap-3">
          <div className="viewport-pill">
            <span className="live-dot"></span>
            <i className="bi bi-display"></i>
            <strong>Desktop Viewport:</strong> {getViewportClassification(windowWidth)}
            <span className="dimension-badge">{windowWidth}px wide</span>
          </div>

          <span className="guide-note d-none d-lg-inline">
            ✦ Preview in all desktop screen sizes:
          </span>
        </div>

        {/* Center / Right: Desktop Size Buttons */}
        <div className="d-flex align-items-center gap-1 flex-wrap">
          {DESKTOP_PRESETS.map((preset) => {
            const isActive = currentMode === preset.width;
            return (
              <button
                key={preset.width}
                className={`desktop-size-btn ${isActive ? "active" : ""}`}
                onClick={() => {
                  soundManager.playSparkleChime();
                  onSelectMode(preset.width);
                }}
                title={preset.desc}
              >
                <i
                  className={`bi ${
                    preset.width === "100%"
                      ? "bi-aspect-ratio"
                      : preset.width >= "2560px"
                      ? "bi-tv"
                      : "bi-laptop"
                  }`}
                ></i>
                <span>{preset.label}</span>
              </button>
            );
          })}

          {/* Minimize / Toggle */}
          <button
            className="toggle-collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand Desktop Size Bar" : "Collapse"}
          >
            <i className={`bi ${collapsed ? "bi-chevron-down" : "bi-chevron-up"}`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
