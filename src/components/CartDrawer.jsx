import React, { useState } from "react";
import { soundManager } from "../utils/soundEffects";

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
}) {
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  if (!isOpen) return null;

  // Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const packagingFee = subtotal >= 2000 || subtotal === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discountAmount + packagingFee);

  const freePackingThreshold = 2000;
  const packingProgress = Math.min(
    100,
    Math.round((subtotal / freePackingThreshold) * 100)
  );

  const applyCoupon = () => {
    soundManager.playSparkleChime();
    const clean = couponCode.trim().toUpperCase();
    if (clean === "DIWALI2026" || clean === "DIWALI50") {
      setDiscountPercent(20);
      setCouponSuccess("🎉 20% Festive Discount Applied!");
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code. Try 'DIWALI2026'");
      setCouponSuccess("");
    }
  };

  // Generate formatted WhatsApp checkout message
  const handleWhatsAppCheckout = () => {
    soundManager.playSparkleChime();
    let msg = `*🎇 SIVAKASI FESTIVE FIREWORKS ORDER 2026 🎇*\n`;
    msg += `----------------------------------------\n`;
    cartItems.forEach((it, idx) => {
      msg += `${idx + 1}. *${it.name}* (x${it.qty}) - ₹${it.price * it.qty}\n`;
    });
    msg += `----------------------------------------\n`;
    msg += `Subtotal: ₹${subtotal}\n`;
    if (discountAmount > 0) {
      msg += `Festive Discount (20%): -₹${discountAmount}\n`;
    }
    msg += `Packaging: ${packagingFee === 0 ? "FREE" : "₹" + packagingFee}\n`;
    msg += `*Grand Total: ₹${grandTotal}*\n`;
    msg += `----------------------------------------\n`;
    msg += `Please confirm my order and send payment / dispatch details!`;

    const url = `https://wa.me/918904303697?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <div
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="cart-header">
          <div className="d-flex align-items-center gap-2">
            <i className="bi bi-bag-check-fill text-warning fs-4"></i>
            <div>
              <h4>Your Diwali Cart</h4>
              <small>{cartItems.length} unique products selected</small>
            </div>
          </div>
          <button className="btn-cart-close" onClick={onClose}>
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {/* Free Packaging Tracker */}
        <div className="packing-progress-bar">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="prog-text">
              {subtotal >= freePackingThreshold ? (
                <span className="text-success fw-bold">
                  ✨ You unlocked FREE Sivakasi Corrugated Packing!
                </span>
              ) : (
                <span>
                  Add <b>₹{freePackingThreshold - subtotal}</b> more for FREE
                  Heavy Packaging!
                </span>
              )}
            </span>
            <span className="prog-percent">{packingProgress}%</span>
          </div>
          <div className="prog-track">
            <div
              className="prog-fill"
              style={{ width: `${packingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="cart-items-container">
          {cartItems.length === 0 ? (
            <div className="empty-cart-view text-center py-5">
              <i className="bi bi-cart-x text-warning display-2 mb-3"></i>
              <h4>Your Cart is Empty</h4>
              <p>Add some sparkling crackers to celebrate Diwali with joy!</p>
              <button
                className="btn-hero-primary mt-3"
                onClick={() => {
                  onClose();
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Browse Fireworks
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item) => (
                <div className="cart-item-row" key={item.id}>
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />

                  <div className="cart-item-info">
                    <h6>{item.name}</h6>
                    <span className="cart-cat">{item.category}</span>
                    <div className="cart-price-line">
                      <strong>₹{item.price}</strong>
                      {item.oldPrice && <del>₹{item.oldPrice}</del>}
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="qty-selector">
                      <button
                        onClick={() => {
                          soundManager.playSparkleChime();
                          onUpdateQty(item.id, Math.max(1, (item.qty || 1) - 1));
                        }}
                      >
                        -
                      </button>
                      <span>{item.qty || 1}</span>
                      <button
                        onClick={() => {
                          soundManager.playSparkleChime();
                          onUpdateQty(item.id, (item.qty || 1) + 1);
                        }}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="btn-remove-item"
                      onClick={() => {
                        soundManager.playSparkleChime();
                        onRemoveItem(item.id);
                      }}
                      title="Remove from cart"
                    >
                      <i className="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <div className="cart-footer">
            {/* Coupon Code Row */}
            <div className="cart-coupon-box">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Coupon Code (DIWALI2026)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button className="btn btn-warning" onClick={applyCoupon}>
                  Apply
                </button>
              </div>
              {couponSuccess && (
                <small className="text-success mt-1 d-block">
                  {couponSuccess}
                </small>
              )}
              {couponError && (
                <small className="text-danger mt-1 d-block">
                  {couponError}
                </small>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="cart-summary-breakdown">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="summary-row text-success">
                  <span>Festive Discount ({discountPercent}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Safe Corrugated Packing</span>
                <span>{packagingFee === 0 ? "FREE" : `₹${packagingFee}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Grand Total</span>
                <span className="grand-price">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <button
              className="btn-checkout-wa"
              onClick={handleWhatsAppCheckout}
            >
              <i className="bi bi-whatsapp"></i> Instant WhatsApp Order • ₹
              {grandTotal}
            </button>

            <button
              className="btn-clear-all"
              onClick={() => {
                if (window.confirm("Clear all items from your cart?")) {
                  onClearCart();
                }
              }}
            >
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
