import React from "react";
import { Link } from "react-router-dom";
import "../assets/style/style.css";

export default function Footer() {
  return (
    <footer className="cracker-footer">
      <div className="container">
        <div className="row gy-4">

          {/* Brand */}
          <div className="col-lg-4 col-md-6">
            <h2 className="footer-logo">
               GUHAA<span>ZONE</span>
            </h2>
            <p className="footer-description">
              Celebrate every special moment with our amazing
              collection of crackers. Light up your celebrations
              with happiness and joy!
            </p>

            <div className="footer-social">
              <a href="#facebook">f</a>
              <a href="#instagram">◎</a>
              <a href="#youtube">▶</a>
              <a href="#twitter">𝕏</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-lg-3 col-md-6">
            <h4>Our Categories</h4>
            <ul>
              <li><a href="#sparklers">Sparklers</a></li>
              <li><a href="#rockets">Rockets</a></li>
              <li><a href="#flowerpots">Flower Pots</a></li>
              <li><a href="#fountains">Fountains</a></li>
              <li><a href="#giftboxes">Gift Boxes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-3 col-md-6">
            <h4>Contact Us</h4>
            <p>📍 Sivakasi, Tamil Nadu</p>
            <p>📞 +91 8904303697</p>
            <p>✉️ sparkzone@gmail.com</p>
            <p>🕒 Mon - Sat: 9 AM - 8 PM</p>
          </div>

        </div>

        <hr className="footer-line" />

        <div className="footer-bottom">
          <p>© 2026 SparkZone Crackers. All Rights Reserved.</p>
          <p>Made with ❤️ for your celebrations</p>
        </div>
      </div>

    </footer>
  );
}
