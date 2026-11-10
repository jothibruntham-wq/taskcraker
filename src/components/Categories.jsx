import React from "react";
import { soundManager } from "../utils/soundEffects";

const CATEGORY_ITEMS = [
  {
    id: "Ground Crackers",
    name: "Ground Chakkars",
    tagline: "High-speed whirling golden wheels",
    icon: "bi-arrow-clockwise",
    count: "18 Items",
    color: "#ff9f1c",
  },
  {
    id: "Flower Pots",
    name: "Flower Pots & Anaar",
    tagline: "Glittering multi-color fountains",
    icon: "bi-flower1",
    count: "24 Items",
    color: "#e71d36",
  },
  {
    id: "Aerial Crackers",
    name: "Multi Sky Shots",
    tagline: "12 to 240 dazzling aerial bursts",
    icon: "bi-moon-stars-fill",
    count: "32 Items",
    color: "#2ec4b6",
  },
  {
    id: "Rockets",
    name: "Rockets & Missiles",
    tagline: "High altitude sonic whistlers",
    icon: "bi-rocket-takeoff-fill",
    count: "15 Items",
    color: "#ffbf69",
  },
  {
    id: "Sparklers",
    name: "Sparklers & Twinklers",
    tagline: "Classic 10cm, 15cm & 30cm electric",
    icon: "bi-stars",
    count: "22 Items",
    color: "#cbf3f0",
  },
  {
    id: "Sound Crackers",
    name: "Sound Crackers & Walas",
    tagline: "Traditional festive roar & crackers",
    icon: "bi-speaker-fill",
    count: "19 Items",
    color: "#e63946",
  },
  {
    id: "Fancy Crackers",
    name: "Kids Novelty & Smoke",
    tagline: "Safe, visual & colorful celebration",
    icon: "bi-cloud-sun-fill",
    count: "20 Items",
    color: "#9d4edd",
  },
  {
    id: "Gift Boxes",
    name: "Diwali Family Combos",
    tagline: "Handpicked mega budget gift boxes",
    icon: "bi-gift-fill",
    count: "12 Items",
    color: "#f77f00",
  },
];

export default function Categories({ onSelectCategory }) {
  return (
    <section className="cracker-categories-section" id="categories">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading text-center" data-aos="fade-up">
          <span className="badge-festive">✦ SIVAKASI TREASURES ✦</span>
          <h2>
            Explore By <b>Fireworks Category</b>
          </h2>
          <p>
            From child-safe visual sparklers to spectacular 240-shot night sky
            celebrations, find exactly what fits your family's festival.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="row g-4">
          {CATEGORY_ITEMS.map((cat, idx) => (
            <div
              className="col-xl-3 col-lg-4 col-md-6"
              key={cat.id}
              data-aos="zoom-in"
              data-aos-delay={(idx % 4) * 100}
            >
              <div
                className="category-showcase-card"
                onClick={() => {
                  soundManager.playSparkleChime();
                  if (onSelectCategory) onSelectCategory(cat.id);
                  const el = document.getElementById("products");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <div className="card-top-row">
                  <div
                    className="category-icon-box"
                    style={{ "--accent-color": cat.color }}
                  >
                    <i className={`bi ${cat.icon}`}></i>
                  </div>
                  <span className="category-count">{cat.count}</span>
                </div>

                <div className="card-body-content">
                  <h4>{cat.name}</h4>
                  <p>{cat.tagline}</p>
                </div>

                <div className="card-footer-action">
                  <span>Explore Items</span>
                  <i className="bi bi-arrow-right"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
