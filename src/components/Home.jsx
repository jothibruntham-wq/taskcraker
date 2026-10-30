import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../assets/style/style.css";

const crackers = [
  {
    name: "Flower Pots",
    price: "₹250",
    image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
    description: "Beautiful colorful sparkling flower pots.",
    tag: "BEST SELLER",
  },
  {
    name: "Sparklers",
    price: "₹150",
    image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?w=600",
    description: "Bright and shining sparklers for everyone.",
    tag: "POPULAR",
  },
  {
    name: "Ground Chakkar",
    price: "₹180",
    image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?w=600",
    description: "Enjoy amazing spinning fireworks.",
    tag: "TRENDING",
  },
  {
    name: "Color Smoke",
    price: "₹300",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600",
    description: "Colorful festive celebration effects.",
    tag: "NEW ARRIVAL",
  },
];

export default function Home() {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="cracker-home">

      {/* HERO SECTION */}

      <section className="cracker-hero">

        <div className="hero-overlay"></div>

        <div className="hero-content" data-aos="fade-up">

          <span className="hero-label">
            ✨ THE FESTIVAL OF LIGHTS ✨
          </span>

          <h1>
            LIGHT UP YOUR
            <br />
            <span>CELEBRATIONS</span>
          </h1>

          <p>
            Make every moment magical with our premium
            collection of crackers and fireworks.
          </p>

          <div className="hero-buttons">
            <a href="#products" className="hero-btn">
              see more collcetion <i className="bi bi-arrow-right"></i>
            </a>

          
          </div>

          <div className="hero-stats">
            <div>
              <h3>100+</h3>
              <span>Products</span>
            </div>

            <div>
              <h3>50K+</h3>
              <span>Happy Customers</span>
            </div>

            <div>
              <h3>100%</h3>
              <span>Quality Focus</span>
            </div>
          </div>

        </div>

       

      </section>


      {/* CATEGORY SECTION */}

      <section className="category-section">

        <div className="section-heading" data-aos="fade-up">
          <span>OUR COLLECTION</span>
          <h2>Celebrate With <b>Brilliance</b></h2>
          <p>Discover our exciting festive collection.</p>
        </div>

        <div className="container">
          <div className="row g-4">

            {[
              ["Flower Pots", "bi-flower1", "01"],
              ["Sparklers", "bi-stars", "02"],
              ["Rockets", "bi-rocket-takeoff", "03"],
              ["Fancy Crackers", "bi-magic", "04"],
            ].map((item, index) => (

              <div
                className="col-lg-3 col-md-6"
                key={item[0]}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <div className="category-card">
                  <span className="category-number">{item[2]}</span>
                  <i className={`bi ${item[1]}`}></i>
                  <h4>{item[0]}</h4>
                  <a href="#products">Explore Collection ↗</a>
                </div>
              </div>

            ))}

          </div>
        </div>

      </section>


      {/* FLIP PRODUCT CARDS */}

      <section className="products-section" id="products">

        <div className="section-heading" data-aos="fade-up">
          <span>HANDPICKED FOR YOU</span>
          <h2>Our Popular <b>Crackers</b></h2>
          <p>Hover over the cards to discover more!</p>
        </div>

        <div className="container">
          <div className="row g-4">

            {crackers.map((item, index) => (

              <div
                className="col-lg-3 col-md-6"
                key={item.name}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >

                <div className="flip-card">

                  <div className="flip-card-inner">

                    {/* FRONT */}

                    <div className="flip-card-front">

                      <img src={item.image} alt={item.name} />

                      <span className="product-tag">
                        {item.tag}
                      </span>

                      <div className="product-info">
                        <h3>{item.name}</h3>
                        <h4>{item.price}</h4>
                        <span>Hover to discover ↗</span>
                      </div>

                    </div>

                    {/* BACK */}

                    <div className="flip-card-back">

                      <div className="back-icon">
                        <i className="bi bi-stars"></i>
                      </div>

                      <span>GUHAAZONE COLLECTION</span>

                      <h3>{item.name}</h3>

                      <p>{item.description}</p>

                      <h2>{item.price}</h2>

                      <a href="/products">
                        View Product <i className="bi bi-arrow-right"></i>
                      </a>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>
        </div>

      </section>


      {/* OFFER SECTION */}

      <section className="offer-section">

        <div className="container">
          <div className="offer-content" data-aos="zoom-in">

            <span>🎉 FESTIVE SPECIAL</span>

            <h2>
              MAKE YOUR DIWALI
              <br />
              <b>MORE BRIGHTER!</b>
            </h2>

            <p>
              Explore our festive collection and make
              your celebrations unforgettable.
            </p>

            <a href="/products" className="offer-btn">
              Explore Products ↗
            </a>

          </div>
        </div>

      </section>

    </div>
  );
}