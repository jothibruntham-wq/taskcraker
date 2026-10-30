import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../assets/style/style.css";

export default function Navbar() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 50,
    });
  }, []);

  return (
    <nav className="cracker-navbar navbar navbar-expand-lg">
      <div className="container">

        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <span className="logo-icon">
            <i className="bi bi-stars"></i>
          </span>

          <span className="logo-text">
            Guhaa<span>ZONE</span>
            <small>CRACKERS & FIREWORKS</small>
          </span>
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#crackerMenu"
          aria-controls="crackerMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation */}
        <div
          className="collapse navbar-collapse"
          id="crackerMenu"
          data-aos="fade-down"
        >
          <ul className="navbar-nav mx-auto">

            <li className="nav-item">
              <Link className="nav-link " to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#about">
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#products">
                Products
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#offers">
                Special Offers
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#gallery">
                Gallery
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="#contact">
                Contact
              </Link>
            </li>

          </ul>

          {/* Right Side */}
          <div className="nav-right d-flex align-items-center gap-3">

            <Link to="/cart" className="cart-icon">
              <i className="bi bi-bag"></i>
              <span className="cart-count">0</span>
            </Link>

            <Link to="/products" className="shop-btn">
              Shop Now
              <i className="bi bi-arrow-up-right"></i>
            </Link>

          </div>
        </div>
      </div>
    </nav>
  );
}