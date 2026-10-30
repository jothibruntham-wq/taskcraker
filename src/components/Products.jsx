import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/style/style.css";

import cracker1 from "../assets/images/cracker1.jpg";
import crakers2 from "../assets/images/crakers2.jpg";
import crakers3 from "../assets/images/crakers3.jpg";


const products = [
  {
    id: 1,
    name: "Flower Pots",
    category: "Ground Crackers",
    price: 250,
    oldPrice: 350,
    image: cracker1,
    tag: "BEST SELLER",
    icon: "bi-flower1",
    description: "Beautiful colorful sparkling flower pots."
  },
  {
    id: 2,
    name: "Golden Sparklers",
    category: "Sparklers",
    price: 150,
    oldPrice: 200,
    image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?w=600",
    tag: "POPULAR",
    icon: "bi-stars",
    description: "Bright golden sparkling celebration."
  },
  {
    id: 3,
    name: "Rocket Bomb",
    category: "Aerial Crackers",
    price: 350,
    oldPrice: 450,
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600",
    tag: "TRENDING",
    icon: "bi-rocket-takeoff",
    description: "Enjoy a beautiful festive sky display."
  },
  {
    id: 4,
    name: "Color Smoke",
    category: "Fancy Crackers",
    price: 300,
    oldPrice: 400,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    tag: "NEW",
    icon: "bi-cloud",
    description: "A colorful celebration experience."
  },
  {
    id: 5,
    name: "Chakkar Deluxe",
    category: "Ground Crackers",
    price: 180,
    oldPrice: 250,
    image: "https://images.unsplash.com/photo-1509005084666-3cbc75184cbb?w=600",
    tag: "HOT",
    icon: "bi-arrow-repeat",
    description: "Exciting spinning ground crackers."
  },
  {
    id: 6,
    name: "Electric Sparklers",
    category: "Sparklers",
    price: 220,
    oldPrice: 300,
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600",
    tag: "POPULAR",
    icon: "bi-lightning",
    description: "Bright sparkling festive effects."
  },
  {
    id: 7,
    name: "Fancy Fountain",
    category: "Fancy Crackers",
    price: 450,
    oldPrice: 550,
    image: crakers2,
    tag: "PREMIUM",
    icon: "bi-stars",
    description: "A beautiful fountain-style display."
  },
  {
    id: 8,
    name: "Sky Celebration",
    category: "Aerial Crackers",
    price: 500,
    oldPrice: 650,
    image: crakers3,
    tag: "SPECIAL",
    icon: "bi-moon-stars",
    description: "Colorful sky celebration collection."
  }
];

const categories = [
  "All",
  "Ground Crackers",
  "Sparklers",
  "Aerial Crackers",
  "Fancy Crackers"
];

export default function Products() {

  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 70
    });
  }, []);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter(
          item => item.category === activeCategory
        );

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <div className="products-page">

      {/* HERO */}

      <section className="products-hero">
        <div className="products-hero-content" data-aos="zoom-in">

          <span>✦ SPARKZONE COLLECTION ✦</span>

          <h1>
            OUR <b>PRODUCTS</b>
          </h1>

          <p>
            Discover the magic of celebration with our
            exclusive festive collection.
          </p>

          <a href="#product-list" className="product-explore">
            Explore Products <i className="bi bi-arrow-down"></i>
          </a>

        </div>
      </section>


      {/* PRODUCTS */}

      <section className="product-list-section" id="product-list">

        <div className="container">

          <div className="product-heading" data-aos="fade-up">

            <span>EXPLORE OUR COLLECTION</span>

            <h2>
              Find Your <b>Perfect Crackers</b>
            </h2>

            <p>Choose your favorite festive collection.</p>

          </div>


          {/* FILTER BUTTONS */}

          <div className="product-filters" data-aos="fade-up">

            {categories.map(category => (

              <button
                key={category}
                className={
                  activeCategory === category
                    ? "filter-btn active"
                    : "filter-btn"
                }
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>

            ))}

          </div>


          {/* CART INFO */}

          <div className="cart-info">
            <span>
              <i className="bi bi-bag-check"></i>
              Cart Items: {cart.length}
            </span>
          </div>


          {/* PRODUCT CARDS */}

          <div className="row g-4">

            {filteredProducts.map((item, index) => (

              <div
                className="col-lg-3 col-md-6"
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={(index % 4) * 100}
              >

                <div className="shop-product-card">

                  {/* IMAGE */}

                  <div className="shop-product-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span className="shop-product-tag">
                      {item.tag}
                    </span>

                    <div className="product-hover-overlay">
                      <div className="quick-view">
                        <i className={`bi ${item.icon}`}></i>
                        <h4>{item.name}</h4>
                        <p>{item.description}</p>
                        <span>SPARKZONE PREMIUM</span>
                      </div>
                    </div>

                  </div>


                  {/* DETAILS */}

                  <div className="shop-product-details">

                    <span className="product-category">
                      {item.category}
                    </span>

                    <h3>{item.name}</h3>

                    <div className="product-rating">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                      <small>Premium</small>
                    </div>

                    <div className="product-price">
                      <h4>₹{item.price}</h4>
                      <del>₹{item.oldPrice}</del>
                    </div>

                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      <i className="bi bi-bag-plus"></i>
                      Add To Cart
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-white">
              No products found.
            </p>
          )}

        </div>

      </section>

    </div>
  );
}