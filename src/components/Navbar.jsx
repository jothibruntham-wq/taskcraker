import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundEffects";

export default function Navbar({ cartCount, onOpenCart }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggleSound = () => {
    const nextState = soundManager.toggleSound();
    setSoundEnabled(nextState);
    if (nextState) {
      soundManager.playSparkleChime();
    }
  };

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "3D Studio", href: "#3d-studio", badge: "3D" },
    { label: "Categories", href: "#categories" },
    { label: "Products", href: "#products" },
    { label: "Deals & Combos", href: "#deals", badge: "50% OFF" },
    { label: "Green Safety", href: "#safety" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`cracker-navbar-wrapper ${scrolled ? "scrolled" : ""}`}>
      {/* Top Sivakasi Wholesale Marquee / Announcement */}
      <div className="navbar-top-announcement">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="announcement-text">
            <span>✨ SIVAKASI DIRECT WHOLESALE & RETAIL ✨</span>
            <span className="divider">|</span>
            <span>DIWALI 2026 MEGA BOOKING OPEN</span>
            <span className="divider">|</span>
            <span className="tag-green">100% PESO APPROVED GREEN CRACKERS</span>
          </div>

          <div className="announcement-right d-none d-md-flex align-items-center gap-3">
            <span>📞 Direct Factory Hotline: +91 8904303697</span>
            <a
              href="https://wa.me/918904303697?text=Hello%20Sivakasi%20Crackers%2C%20I%20want%20to%20place%20an%20order"
              target="_blank"
              rel="noreferrer"
              className="quick-wa-link"
            >
              <i className="bi bi-whatsapp"></i> WhatsApp Order
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar navbar-expand-xl cracker-main-nav" data-aos="fade-down">
        <div className="container-fluid px-lg-4">
          {/* Brand Logo */}
          <a className="navbar-brand d-flex align-items-center gap-3" href="#hero">
            <div className="logo-icon-box">
              <i className="bi bi-fire"></i>
              <span className="spark-halo"></span>
            </div>
            <div className="logo-brand-text">
              <span className="brand-title">
                SPARK<span>ZONE</span>
              </span>
              <span className="brand-subtitle">SIVAKASI CRACKERS & FIREWORKS</span>
            </div>
          </a>

          {/* Mobile Toggler */}
          <div className="d-flex align-items-center gap-2 d-xl-none">
            {/* Sound Toggle */}
            <button
              className={`sound-toggle-btn ${soundEnabled ? "on" : "off"}`}
              onClick={handleToggleSound}
              title={soundEnabled ? "Mute Festive Sounds" : "Enable Festive Sounds"}
            >
              <i className={`bi ${soundEnabled ? "bi-volume-up-fill" : "bi-volume-mute-fill"}`}></i>
            </button>

            {/* Cart Trigger */}
            <button className="cart-trigger-btn" onClick={onOpenCart}>
              <i className="bi bi-bag-fill"></i>
              <span className="cart-badge">{cartCount}</span>
            </button>

            <button
              className="navbar-toggler"
              type="button"
              onClick={() => setNavOpen(!navOpen)}
              aria-label="Toggle navigation"
            >
              <i className={`bi ${navOpen ? "bi-x-lg" : "bi-list"}`}></i>
            </button>
          </div>

          {/* Nav Links */}
          <div className={`collapse navbar-collapse ${navOpen ? "show" : ""}`}>
            <ul className="navbar-nav mx-auto mb-2 mb-xl-0 align-items-xl-center">
              {navLinks.map((link) => (
                <li className="nav-item" key={link.label}>
                  <a
                    className="nav-link"
                    href={link.href}
                    onClick={() => {
                      setNavOpen(false);
                      soundManager.playSparkleChime();
                    }}
                  >
                    {link.label}
                    {link.badge && <span className="nav-pill-badge">{link.badge}</span>}
                  </a>
                </li>
              ))}
            </ul>

            {/* Right Action Icons */}
            <div className="nav-action-buttons d-none d-xl-flex align-items-center gap-3">
              {/* Sound Toggle Button */}
              <button
                className={`sound-toggle-btn ${soundEnabled ? "on" : "off"}`}
                onClick={handleToggleSound}
                title={soundEnabled ? "Festive Sound ON (Click to Mute)" : "Festive Sound MUTED (Click to Enable)"}
              >
                <i className={`bi ${soundEnabled ? "bi-volume-up-fill" : "bi-volume-mute-fill"}`}></i>
                <span>{soundEnabled ? "Audio ON" : "Audio Muted"}</span>
              </button>

              {/* Cart Drawer Trigger */}
              <button
                className="cart-trigger-btn"
                onClick={() => {
                  soundManager.playCartPop();
                  onOpenCart();
                }}
              >
                <div className="cart-icon-wrapper">
                  <i className="bi bi-bag-check-fill"></i>
                  <span className="cart-badge">{cartCount}</span>
                </div>
                <div className="cart-btn-label">
                  <span className="label-top">My Cart</span>
                  <span className="label-bottom">{cartCount} Items</span>
                </div>
              </button>

              {/* Direct WhatsApp Call */}
              <a
                href="#products"
                className="btn-order-cta"
                onClick={() => soundManager.playSparkleChime()}
              >
                <span>Shop Diwali Crackers</span>
                <i className="bi bi-arrow-right-short"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
