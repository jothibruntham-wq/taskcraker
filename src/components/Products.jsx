import React, { useState } from "react";
import ProductQuickView from "./ProductQuickView";
import { soundManager } from "../utils/soundEffects";

import cracker1 from "../assets/images/cracker1.jpg";
import crakers2 from "../assets/images/crakers2.jpg";
import crakers3 from "../assets/images/crakers3.jpg";

export const PRODUCTS_DATA = [
  {
    id: "p1",
    name: "Sivakasi Royal Flower Pots Special",
    category: "Flower Pots",
    price: 240,
    oldPrice: 380,
    rating: 4.9,
    reviewsCount: 142,
    image: cracker1,
    tag: "BEST SELLER",
    soundType: "Visual Shower",
    piecesPerBox: "Box of 10",
    safeDistance: "5 Meters",
    ecoCertified: true,
    description:
      "Classic Sivakasi special terracotta flower pots producing tall dazzling golden showers and crackling sparks with low smoke emissions.",
  },
  {
    id: "p2",
    name: "Golden Sparkling Anaar (Koti Jumbo)",
    category: "Flower Pots",
    price: 320,
    oldPrice: 480,
    rating: 4.8,
    reviewsCount: 98,
    image: crakers2,
    tag: "PREMIUM",
    soundType: "Crackling Whistle",
    piecesPerBox: "Box of 5 (Jumbo)",
    safeDistance: "6 Meters",
    ecoCertified: true,
    description:
      "Jumbo size earthen Anaars that reach up to 18 feet with three stages of color transitions: ruby red to silver, ending in golden rain.",
  },
  {
    id: "p3",
    name: "Zamin Chakkar Deluxe (10 Pcs)",
    category: "Ground Crackers",
    price: 180,
    oldPrice: 280,
    rating: 4.7,
    reviewsCount: 116,
    image: "https://images.unsplash.com/photo-1509005084666-3cbc75184cbb?w=600",
    tag: "POPULAR",
    soundType: "Smooth Hiss",
    piecesPerBox: "Box of 10",
    safeDistance: "3 Meters",
    ecoCertified: true,
    description:
      "Flawless balanced ground spinners that ignite smoothly and swirl at 800+ RPM creating a golden circular disc of festive sparks.",
  },
  {
    id: "p4",
    name: "Whistling Spinning Chakkar Special",
    category: "Ground Crackers",
    price: 260,
    oldPrice: 390,
    rating: 4.9,
    reviewsCount: 84,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600",
    tag: "TRENDING",
    soundType: "Whistling Sound",
    piecesPerBox: "Box of 10",
    safeDistance: "4 Meters",
    ecoCertified: true,
    description:
      "A thrilling upgrade to the classic chakkar that releases rhythmic whistling notes as it spins through multiple color layers.",
  },
  {
    id: "p5",
    name: "30cm Giant Gold Sparklers",
    category: "Sparklers",
    price: 140,
    oldPrice: 220,
    rating: 5.0,
    reviewsCount: 220,
    image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?w=600",
    tag: "KIDS FAVORITE",
    soundType: "Silent Visual",
    piecesPerBox: "Box of 10 Sticks",
    safeDistance: "1 Meter",
    ecoCertified: true,
    description:
      "Extra-long 30cm sparklers with extended 90-second burning duration. 100% child safe when used with parental supervision.",
  },
  {
    id: "p6",
    name: "Electric Multi-Color Sparklers",
    category: "Sparklers",
    price: 160,
    oldPrice: 250,
    rating: 4.8,
    reviewsCount: 130,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
    tag: "HOT",
    soundType: "Silent Visual",
    piecesPerBox: "Box of 10 Sticks",
    safeDistance: "1 Meter",
    ecoCertified: true,
    description:
      "Brilliant sparkling sticks emitting alternating red, green, and silver crackles. Minimal smoke formulation certified by CSIR-NEERI.",
  },
  {
    id: "p7",
    name: "Sivakasi Royal Skyrocket (Box of 10)",
    category: "Rockets",
    price: 360,
    oldPrice: 520,
    rating: 4.9,
    reviewsCount: 175,
    image: crakers3,
    tag: "3D FEATURED",
    soundType: "Mega Boom",
    piecesPerBox: "Box of 10 Rockets",
    safeDistance: "15 Meters",
    ecoCertified: true,
    description:
      "High altitude bamboo-guided aerial rocket soaring 120+ feet before detonating into a glittering umbrella canopy of titanium palms.",
  },
  {
    id: "p8",
    name: "2-Stage Parachute Rocket with Flare",
    category: "Rockets",
    price: 450,
    oldPrice: 650,
    rating: 4.9,
    reviewsCount: 65,
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
    tag: "SPECIALTY",
    soundType: "Pop & Flare",
    piecesPerBox: "Box of 5 Rockets",
    safeDistance: "15 Meters",
    ecoCertified: true,
    description:
      "Ascends skyward, releases a mini parachute that floats slowly while burning an ultra-bright suspended night flare.",
  },
  {
    id: "p9",
    name: "12-Shot Aerial Sky Night Show",
    category: "Aerial Crackers",
    price: 490,
    oldPrice: 750,
    rating: 4.8,
    reviewsCount: 190,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    tag: "BEST SELLER",
    soundType: "Multi Aerial Boom",
    piecesPerBox: "1 Single Repeat Box",
    safeDistance: "20 Meters",
    ecoCertified: true,
    description:
      "Automatic sequential multi-shot repeat cake. Fires 12 high-altitude shell bursts with crackling willow and brocade crowns.",
  },
  {
    id: "p10",
    name: "30-Shot Multi-Color Glitter Skyburst",
    category: "Aerial Crackers",
    price: 980,
    oldPrice: 1450,
    rating: 5.0,
    reviewsCount: 110,
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600",
    tag: "FESTIVAL HIT",
    soundType: "Multi Aerial Boom",
    piecesPerBox: "1 Large Multi-Shot Cake",
    safeDistance: "25 Meters",
    ecoCertified: true,
    description:
      "Continuous 45-second sky spectacle. Features synchronized multi-color crossette stars, golden palm trees, and crackling finale.",
  },
  {
    id: "p11",
    name: "120-Shot Grand Sivakasi Sky Show",
    category: "Aerial Crackers",
    price: 2450,
    oldPrice: 3800,
    rating: 5.0,
    reviewsCount: 88,
    image: "https://images.unsplash.com/photo-1531306728370-e2ebd9d7bb99?w=600",
    tag: "VIP LUXURY",
    soundType: "Grand Finale",
    piecesPerBox: "1 Heavy Professional Cake",
    safeDistance: "30 Meters",
    ecoCertified: true,
    description:
      "The ultimate festival centerpiece. 120 rapid-fire shots transforming the entire night sky into a royal fireworks choreography.",
  },
  {
    id: "p12",
    name: "1000 Wala Traditional Red Garland",
    category: "Sound Crackers",
    price: 420,
    oldPrice: 620,
    rating: 4.7,
    reviewsCount: 140,
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600",
    tag: "TRADITIONAL",
    soundType: "Loud Crackling",
    piecesPerBox: "1 Full Garland Roll",
    safeDistance: "10 Meters",
    ecoCertified: true,
    description:
      "Traditional Sivakasi red paper crackers linked in a long festive roll for auspicious puja inaugurations and Diwali morning celebrations.",
  },
  {
    id: "p13",
    name: "5000 Wala Grand Festival Garland",
    category: "Sound Crackers",
    price: 1350,
    oldPrice: 1950,
    rating: 4.8,
    reviewsCount: 72,
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600",
    tag: "ROYAL SOUND",
    soundType: "Mega Garland",
    piecesPerBox: "1 Jumbo Roll with Box",
    safeDistance: "15 Meters",
    ecoCertified: true,
    description:
      "Extended 5000-shot garland with thunderous rhythmic crackles and heavy bass salute finale. Sivakasi direct factory sealed.",
  },
  {
    id: "p14",
    name: "5-Color Daylight Celebration Smoke",
    category: "Fancy Crackers",
    price: 280,
    oldPrice: 420,
    rating: 4.8,
    reviewsCount: 95,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    tag: "NEW ARRIVAL",
    soundType: "Zero Sound",
    piecesPerBox: "Pack of 5 Colors",
    safeDistance: "2 Meters",
    ecoCertified: true,
    description:
      "Vibrant high-density non-toxic color smoke tubes in yellow, crimson, green, sky blue, and violet. Ideal for daytime photo celebrations.",
  },
  {
    id: "p15",
    name: "Magic Pop Pop & Flash Novelty (Kids)",
    category: "Fancy Crackers",
    price: 90,
    oldPrice: 150,
    rating: 4.9,
    reviewsCount: 310,
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
    tag: "100% KIDS SAFE",
    soundType: "Gentle Pop",
    piecesPerBox: "Box of 50 Snappers",
    safeDistance: "Handheld",
    ecoCertified: true,
    description:
      "Drop on the ground or step to create fun mini snaps. Zero fire, zero burn risk, pure joy for toddlers and young kids.",
  },
  {
    id: "p16",
    name: "Sivakasi Diamond Family Combo Box (45 Items)",
    category: "Gift Boxes",
    price: 2899,
    oldPrice: 5500,
    rating: 5.0,
    reviewsCount: 420,
    image: cracker1,
    tag: "50% OFF COMBO",
    soundType: "Complete Assortment",
    piecesPerBox: "Mega Box (45 Varieties)",
    safeDistance: "Assorted",
    ecoCertified: true,
    description:
      "All-in-one family festive box containing sparklers, chakkars, flowerpots, rockets, sky shots, pencils, and novelty items at 50% factory discount.",
  },
];

const CATEGORIES = [
  "All",
  "Flower Pots",
  "Ground Crackers",
  "Sparklers",
  "Aerial Crackers",
  "Rockets",
  "Sound Crackers",
  "Fancy Crackers",
  "Gift Boxes",
];

export default function Products({ onAddToCart, activeCategory, setActiveCategory }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("featured");
  const [soundFilter, setSoundFilter] = useState("all");
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Filter products
  const filtered = PRODUCTS_DATA.filter((item) => {
    const matchesCat =
      activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSound =
      soundFilter === "all"
        ? true
        : soundFilter === "kids"
        ? item.soundType.toLowerCase().includes("silent") ||
          item.soundType.toLowerCase().includes("visual") ||
          item.soundType.toLowerCase().includes("kids") ||
          item.soundType.toLowerCase().includes("zero")
        : soundFilter === "mega"
        ? item.soundType.toLowerCase().includes("mega") ||
          item.soundType.toLowerCase().includes("grand") ||
          item.soundType.toLowerCase().includes("loud")
        : true;

    return matchesCat && matchesSearch && matchesSound;
  });

  // Sort products
  const sorted = [...filtered].sort((a, b) => {
    if (selectedSort === "price-low") return a.price - b.price;
    if (selectedSort === "price-high") return b.price - a.price;
    if (selectedSort === "rating") return b.rating - a.rating;
    return 0; // featured default
  });

  return (
    <section className="cracker-products-section" id="products">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading text-center" data-aos="fade-up">
          <span className="badge-festive">✦ SIVAKASI DIRECT CATALOG ✦</span>
          <h2>
            Our Premium <b>Crackers Collection</b>
          </h2>
          <p>
            Choose from authentic, CSIR-NEERI certified green fireworks. Factory
            tested for vibrant brilliance, safety, and joyous celebrations.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="products-control-bar" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-3 align-items-center">
            {/* Search Input */}
            <div className="col-lg-5 col-md-6">
              <div className="search-input-box">
                <i className="bi bi-search"></i>
                <input
                  type="text"
                  placeholder="Search flower pots, rockets, chakkars, sparklers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    className="btn-clear-search"
                    onClick={() => setSearchQuery("")}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                )}
              </div>
            </div>

            {/* Sound Filter Pills */}
            <div className="col-lg-4 col-md-6">
              <div className="sound-filter-group d-flex align-items-center gap-1">
                <span className="sound-label d-none d-sm-inline">Sound:</span>
                <button
                  className={`sound-btn ${soundFilter === "all" ? "active" : ""}`}
                  onClick={() => setSoundFilter("all")}
                >
                  All Types
                </button>
                <button
                  className={`sound-btn ${soundFilter === "kids" ? "active" : ""}`}
                  onClick={() => setSoundFilter("kids")}
                >
                  <i className="bi bi-emoji-smile"></i> Kids/Visual
                </button>
                <button
                  className={`sound-btn ${soundFilter === "mega" ? "active" : ""}`}
                  onClick={() => setSoundFilter("mega")}
                >
                  <i className="bi bi-fire"></i> Mega Boom
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="col-lg-3 col-md-12 text-lg-end">
              <div className="sort-box d-inline-flex align-items-center gap-2">
                <span className="sort-label">Sort:</span>
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="sort-select"
                >
                  <option value="featured">Featured Fireworks</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="category-tabs-scroll mt-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-pill-btn ${
                  activeCategory === cat ? "active" : ""
                }`}
                onClick={() => {
                  soundManager.playSparkleChime();
                  setActiveCategory(cat);
                }}
              >
                {cat}
                {cat === "All" && (
                  <span className="pill-count">{PRODUCTS_DATA.length}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="results-counter d-flex justify-content-between align-items-center mb-4">
          <span className="count-text">
            Showing <b>{sorted.length}</b> festive fireworks
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </span>
          <span className="wholesale-hint d-none d-sm-inline">
            <i className="bi bi-check2-circle text-warning"></i> 100% Genuine Sivakasi Dispatch
          </span>
        </div>

        {/* Products Grid */}
        <div className="row g-4">
          {sorted.map((item, idx) => {
            const discount = Math.round(
              ((item.oldPrice - item.price) / item.oldPrice) * 100
            );

            return (
              <div
                className="col-xl-3 col-lg-4 col-md-6"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={(idx % 4) * 80}
              >
                <div className="cracker-product-card">
                  {/* Card Image Area */}
                  <div className="product-image-container">
                    <img src={item.image} alt={item.name} loading="lazy" />

                    {/* Top Badges */}
                    <div className="card-badge-layer">
                      <span className="badge-tag">{item.tag}</span>
                      <span className="badge-discount">-{discount}%</span>
                    </div>

                    {/* Hover Quick Overlay */}
                    <div className="product-hover-actions">
                      <button
                        className="btn-quick-view"
                        onClick={() => {
                          soundManager.playSparkleChime();
                          setQuickViewProduct(item);
                        }}
                      >
                        <i className="bi bi-eye"></i> Quick View
                      </button>

                      <a
                        href="#3d-studio"
                        className="btn-3d-jump"
                        title="View similar 3D Model"
                      >
                        <i className="bi bi-box"></i> 3D View
                      </a>
                    </div>
                  </div>

                  {/* Card Details Area */}
                  <div className="product-content">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <span className="product-cat-label">{item.category}</span>
                      <span className="sound-indicator-chip">
                        <i className="bi bi-soundwave"></i> {item.soundType}
                      </span>
                    </div>

                    <h3 className="product-title">{item.name}</h3>

                    <p className="product-desc-snippet">{item.description}</p>

                    {/* Rating and Pack info */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="rating-pill">
                        <i className="bi bi-star-fill"></i>
                        <span>{item.rating}</span>
                        <small>({item.reviewsCount})</small>
                      </div>
                      <span className="pack-info">
                        <i className="bi bi-box2"></i> {item.piecesPerBox}
                      </span>
                    </div>

                    {/* Price and Add to Cart */}
                    <div className="product-card-bottom">
                      <div className="price-stack">
                        <span className="current-price">₹{item.price}</span>
                        <del className="original-price">₹{item.oldPrice}</del>
                      </div>

                      <button
                        className="btn-add-cart"
                        onClick={() => {
                          soundManager.playCartPop();
                          onAddToCart(item);
                        }}
                      >
                        <i className="bi bi-cart-plus"></i> Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {sorted.length === 0 && (
          <div className="empty-catalog-state text-center py-5">
            <i className="bi bi-search display-3 text-warning mb-3"></i>
            <h3>No matching crackers found</h3>
            <p>Try searching for "flower pot", "rocket", "chakkar" or "sparkler".</p>
            <button
              className="btn-hero-primary mt-3"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
                setSoundFilter("all");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <ProductQuickView
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </section>
  );
}
