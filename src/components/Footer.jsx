import React from "react";
import { soundManager } from "../utils/soundEffects";

export default function Footer() {
  const scrollToTop = () => {
    soundManager.playSparkleChime();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="cracker-footer-wrapper">
      {/* Decorative Fireworks Garland Wave */}
      <div className="footer-firework-wave"></div>

      <div className="container">
        <div className="row gy-5">
          {/* Column 1: Brand & Factory Details */}
          <div className="col-xl-4 col-lg-4 col-md-6">
            <div className="footer-brand">
              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="footer-logo-icon">
                  <i className="bi bi-fire"></i>
                </div>
                <div>
                  <h3 className="footer-logo-title">
                    SPARK<span>ZONE</span>
                  </h3>
                  <small className="footer-logo-sub">SIVAKASI CRACKERS</small>
                </div>
              </div>

              <p className="footer-about-text">
                Your direct bridge to Sivakasi's finest fireworks artisans.
                Crafting certified green crackers with authentic chemical
                purity, stunning night sky artistry, and safe family joy since 1998.
              </p>

              {/* Social Icons */}
              <div className="footer-social-links d-flex align-items-center gap-2 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="YouTube"
                >
                  <i className="bi bi-youtube"></i>
                </a>
                <a
                  href="https://wa.me/918904303697"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                >
                  <i className="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="col-xl-2 col-lg-2 col-md-6 col-6">
            <h5 className="footer-heading">Navigation</h5>
            <ul className="footer-nav-list">
              <li>
                <a href="#hero">Home</a>
              </li>
              <li>
                <a href="#3d-studio">3D Cracker Studio</a>
              </li>
              <li>
                <a href="#categories">Categories</a>
              </li>
              <li>
                <a href="#products">Products Catalog</a>
              </li>
              <li>
                <a href="#deals">Diwali Combos</a>
              </li>
              <li>
                <a href="#safety">Green Safety Rules</a>
              </li>
              <li>
                <a href="#contact">Contact & FAQs</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Firework Categories */}
          <div className="col-xl-3 col-lg-3 col-md-6 col-6">
            <h5 className="footer-heading">Categories</h5>
            <ul className="footer-nav-list">
              <li>
                <a href="#products">Flower Pots & Anaar</a>
              </li>
              <li>
                <a href="#products">Ground Whirling Chakkars</a>
              </li>
              <li>
                <a href="#products">Bamboo Skyrockets</a>
              </li>
              <li>
                <a href="#products">12 to 240 Shot Sky Displays</a>
              </li>
              <li>
                <a href="#products">Electric & Gold Sparklers</a>
              </li>
              <li>
                <a href="#products">Color Smoke & Novelty</a>
              </li>
              <li>
                <a href="#deals">Gift Assortment Packs</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Factory Info & Trust Badges */}
          <div className="col-xl-3 col-lg-3 col-md-6">
            <h5 className="footer-heading">Factory Dispatch</h5>
            <div className="footer-contact-items">
              <p>
                <i className="bi bi-geo-alt-fill text-warning me-2"></i>
                7/142 Bypass Road, Sivakasi, Tamil Nadu - 626123
              </p>
              <p>
                <i className="bi bi-telephone-fill text-warning me-2"></i>
                +91 8904303697 (WhatsApp Desk)
              </p>
              <p>
                <i className="bi bi-envelope-fill text-warning me-2"></i>
                support@sparkzonecrackers.com
              </p>
            </div>

            <div className="footer-trust-box mt-3">
              <span className="badge-legal">
                <i className="bi bi-shield-check"></i> PESO & NEERI Certified
              </span>
              <p className="mt-2 mb-0 small text-white-50">
                Safe Transport Packing in 5-ply cartons. Licensed Indian
                Fireworks Manufacturer.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Partner Icons */}
        <div className="footer-payment-strip mt-5 pt-4">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
            <div className="d-flex align-items-center gap-2 text-white-50 small">
              <i className="bi bi-lock-fill text-warning"></i>
              <span>100% Secure Payment Gateways & Direct UPI Verified</span>
            </div>

            <div className="payment-badges-row d-flex align-items-center gap-3">
              <span className="pay-pill">UPI</span>
              <span className="pay-pill">Google Pay</span>
              <span className="pay-pill">PhonePe</span>
              <span className="pay-pill">Paytm</span>
              <span className="pay-pill">Net Banking</span>
              <span className="pay-pill">Cards</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar mt-4 pt-3">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <p className="mb-0">
              © 2026 SparkZone Sivakasi Fireworks. All Rights Reserved. Wishing
              you a sparkling and prosperous Diwali!
            </p>

            <button className="btn-back-to-top" onClick={scrollToTop}>
              <span>Back to Top</span>
              <i className="bi bi-arrow-up-short"></i>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
