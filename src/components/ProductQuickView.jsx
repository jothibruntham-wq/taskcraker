import React, { useState } from "react";
import { soundManager } from "../utils/soundEffects";

export default function ProductQuickView({ product, onClose, onAddToCart }) {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );

  const handleAdd = () => {
    soundManager.playCartPop();
    for (let i = 0; i < qty; i++) {
      onAddToCart(product);
    }
    onClose();
  };

  return (
    <div className="quickview-backdrop" onClick={onClose}>
      <div
        className="quickview-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="quickview-close-btn" onClick={onClose}>
          <i className="bi bi-x-lg"></i>
        </button>

        <div className="row g-4 align-items-center">
          {/* Image Column */}
          <div className="col-md-5">
            <div className="quickview-image-wrapper">
              <img src={product.image} alt={product.name} />
              <span className="badge-discount">-{discountPercent}% OFF</span>
              {product.ecoCertified && (
                <span className="badge-green-cert">
                  <i className="bi bi-tree"></i> Green Certified
                </span>
              )}
            </div>
          </div>

          {/* Details Column */}
          <div className="col-md-7">
            <div className="quickview-details">
              <span className="product-category-crumb">
                {product.category}
              </span>

              <h3>{product.name}</h3>

              <div className="d-flex align-items-center gap-2 mb-3">
                <div className="rating-stars">
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-fill"></i>
                  <i className="bi bi-star-half"></i>
                </div>
                <span className="rating-text">
                  {product.rating} ({product.reviewsCount} verified reviews)
                </span>
              </div>

              <div className="quickview-price-row">
                <span className="current-price">₹{product.price}</span>
                <del className="old-price">₹{product.oldPrice}</del>
                <span className="savings-chip">
                  Save ₹{product.oldPrice - product.price}
                </span>
              </div>

              <p className="product-modal-desc">{product.description}</p>

              {/* Specs List */}
              <div className="product-quick-specs">
                <div className="spec-item">
                  <i className="bi bi-box-seam"></i>
                  <span>Packaging: <b>{product.piecesPerBox || "Box Pack"}</b></span>
                </div>
                <div className="spec-item">
                  <i className="bi bi-volume-up"></i>
                  <span>Sound Level: <b>{product.soundType || "Medium"}</b></span>
                </div>
                <div className="spec-item">
                  <i className="bi bi-shield-check"></i>
                  <span>Safe Distance: <b>{product.safeDistance || "5 Meters"}</b></span>
                </div>
              </div>

              {/* Actions */}
              <div className="d-flex align-items-center gap-3 mt-4 flex-wrap">
                <div className="qty-picker">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    disabled={qty <= 1}
                  >
                    -
                  </button>
                  <span>{qty}</span>
                  <button onClick={() => setQty(qty + 1)}>+</button>
                </div>

                <button className="btn-add-quickview flex-grow-1" onClick={handleAdd}>
                  <i className="bi bi-cart-plus-fill"></i> Add ({qty}) to Cart • ₹
                  {product.price * qty}
                </button>
              </div>

              {/* WhatsApp direct buy */}
              <a
                href={`https://wa.me/918904303697?text=Hello%20Sivakasi%20Crackers%2C%20I%20want%20to%20order%20${encodeURIComponent(
                  product.name
                )}%20(${qty}%20boxes)`}
                target="_blank"
                rel="noreferrer"
                className="quick-wa-btn mt-3 d-flex align-items-center justify-content-center gap-2"
              >
                <i className="bi bi-whatsapp"></i> Instant WhatsApp Order
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
