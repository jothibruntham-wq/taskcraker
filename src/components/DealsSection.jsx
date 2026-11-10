import React, { useState, useEffect } from "react";
import { soundManager } from "../utils/soundEffects";

const COMBOS = [
  {
    id: "combo-kids",
    title: "Kids Magic & Safety Pack",
    itemsCount: "25 Items",
    originalPrice: 2200,
    price: 899,
    savings: "60% OFF",
    highlight: "100% Child Friendly",
    icon: "bi-emoji-laughing-fill",
    items: [
      "10x 15cm Gold Sparklers",
      "5x Color Electric Sparklers",
      "4x Color Smoke Tubes",
      "2x Pop Pop Magic Snappers",
      "4x Whistling Ground Chakkars",
    ],
  },
  {
    id: "combo-family",
    title: "Grand Family Diwali Box",
    itemsCount: "35 Items",
    originalPrice: 4200,
    price: 1899,
    savings: "55% OFF",
    highlight: "Most Popular Family Choice",
    icon: "bi-heart-fill",
    popular: true,
    items: [
      "10x Flower Pots (Anaar)",
      "10x Zamin Chakkars Deluxe",
      "10x 30cm Giant Sparklers",
      "2x 12-Shot Aerial Cakes",
      "2x Sivakasi Skyrockets",
      "1x 1000 Wala Traditional Garland",
    ],
  },
  {
    id: "combo-royal",
    title: "Royal Maharaja Sky Spectacle",
    itemsCount: "55 Items",
    originalPrice: 9500,
    price: 4499,
    savings: "52% OFF",
    highlight: "VIP Sky Show Finale",
    icon: "bi-gem",
    items: [
      "1x 120-Shot Grand Sky Show Cake",
      "2x 30-Shot Multi-Color Glitter Cakes",
      "10x 2-Stage Aerial Skyrockets",
      "10x Jumbo Earthen Anaars",
      "10x Deluxe Whirl Chakkars",
      "1x 5000 Wala Royal Garland",
      "Plus Free Sivakasi Sparkler Gift Pack",
    ],
  },
];

export default function DealsSection({ onAddToCart }) {
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    soundManager.playSparkleChime();
    navigator.clipboard.writeText("DIWALI2026");
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2500);
  };

  return (
    <section className="cracker-deals-section" id="deals">
      <div className="container">
        {/* Banner Card */}
        <div className="deals-banner-card" data-aos="flip-up">
          <div className="row align-items-center gy-4">
            <div className="col-lg-7">
              <span className="badge-festive-deal">🔥 FESTIVE EARLY BIRD OFFER</span>
              <h2 className="banner-title">
                Diwali 2026 Mega Saver Combos
                <br />
                <span className="highlight-text">Flat 50% - 60% Factory Discount</span>
              </h2>
              <p className="banner-subtext">
                Pre-book your family cracker boxes directly from Sivakasi and
                enjoy guaranteed dispatch before the festive rush.
              </p>

              {/* Countdown Timer */}
              <div className="countdown-wrapper">
                <span className="countdown-label">Offer Ends In:</span>
                <div className="timer-boxes">
                  <div className="timer-box">
                    <span className="val">{timeLeft.days}</span>
                    <span className="lbl">Days</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="timer-box">
                    <span className="val">{timeLeft.hours}</span>
                    <span className="lbl">Hours</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="timer-box">
                    <span className="val">{timeLeft.minutes}</span>
                    <span className="lbl">Mins</span>
                  </div>
                  <span className="colon">:</span>
                  <div className="timer-box">
                    <span className="val">{timeLeft.seconds}</span>
                    <span className="lbl">Secs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coupon Box */}
            <div className="col-lg-5 text-lg-end">
              <div className="coupon-promo-card">
                <span className="coupon-tag">EXTRA 20% DISCOUNT CODE</span>
                <div className="coupon-code-box">
                  <code>DIWALI2026</code>
                  <button className="btn-copy-code" onClick={handleCopyCode}>
                    <i
                      className={`bi ${
                        copiedCoupon ? "bi-check2-circle text-success" : "bi-clipboard"
                      }`}
                    ></i>
                    {copiedCoupon ? "Copied!" : "Copy"}
                  </button>
                </div>
                <small className="coupon-terms">
                  * Valid on orders above ₹2,999. Applied automatically at checkout.
                </small>
              </div>
            </div>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div className="row g-4 mt-2">
          {COMBOS.map((combo, idx) => (
            <div
              className="col-lg-4 col-md-6"
              key={combo.id}
              data-aos="fade-up"
              data-aos-delay={idx * 120}
            >
              <div className={`combo-card ${combo.popular ? "featured-combo" : ""}`}>
                {combo.popular && (
                  <div className="combo-ribbon">
                    <span>MOST POPULAR</span>
                  </div>
                )}

                <div className="combo-card-header">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <span className="combo-highlight">
                      <i className={`bi ${combo.icon}`}></i> {combo.highlight}
                    </span>
                    <span className="combo-discount-badge">{combo.savings}</span>
                  </div>
                  <h3>{combo.title}</h3>
                  <span className="combo-item-count">{combo.itemsCount} Included</span>
                </div>

                <div className="combo-items-list">
                  <ul>
                    {combo.items.map((it, i) => (
                      <li key={i}>
                        <i className="bi bi-check-circle-fill text-warning"></i>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="combo-card-footer">
                  <div className="combo-price-wrap">
                    <span className="current-price">₹{combo.price}</span>
                    <del className="old-price">₹{combo.originalPrice}</del>
                  </div>

                  <button
                    className="btn-combo-add"
                    onClick={() => {
                      soundManager.playCartPop();
                      if (onAddToCart) {
                        onAddToCart({
                          id: combo.id,
                          name: combo.title,
                          price: combo.price,
                          oldPrice: combo.originalPrice,
                          category: "Gift Boxes",
                          image:
                            "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
                        });
                      }
                    }}
                  >
                    <i className="bi bi-cart-plus-fill"></i> Add Combo Box
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
