import React from "react";

const REVIEWS = [
  {
    id: 1,
    name: "Karthik Subramanian",
    location: "Chennai, Tamil Nadu",
    rating: 5,
    tag: "Family Order (₹4,800)",
    review:
      "Ordered the Grand Family Diwali Box. Direct delivery from Sivakasi was remarkably fast and every single flowerpot and 12-shot aerial cake performed with vibrant, pure colors. Zero duds!",
    date: "Diwali Season",
  },
  {
    id: 2,
    name: "Pooja Deshmukh",
    location: "Bengaluru, Karnataka",
    rating: 5,
    tag: "Wholesale & Friends Combo",
    review:
      "The 3D interactive viewer on this site helped us pick the exact skyrocket we wanted! The green crackers had noticeably lower smoke which was great for our society's kids. Outstanding quality.",
    date: "Verified Buyer",
  },
  {
    id: 3,
    name: "Venkatesh Rao",
    location: "Hyderabad, Telangana",
    rating: 5,
    tag: "Sivakasi Diamond Pack",
    review:
      "The wholesale pricing saved us almost ₹3,000 compared to local roadside retail stalls. Sturdy corrugated packaging and clear Tamil/English safety instructions on each box.",
    date: "Verified Buyer",
  },
  {
    id: 4,
    name: "Anand Rajan",
    location: "Coimbatore, Tamil Nadu",
    rating: 5,
    tag: "120-Shot Sky Show",
    review:
      "The 120-shot grand sky cake was the showstopper of our street celebration! The multi-color brocade and titanium palm shells lit up the entire sky. Truly authentic Sivakasi craft.",
    date: "Verified Buyer",
  },
];

export default function ReviewsSection() {
  return (
    <section className="cracker-reviews-section" id="reviews">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading text-center" data-aos="fade-up">
          <span className="badge-festive">✦ HAPPY CELEBRATIONS ✦</span>
          <h2>
            Loved By <b>50,000+ Families</b>
          </h2>
          <p>
            Read authentic feedback from families and wholesale buyers who trust
            our direct Sivakasi fireworks every festive season.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="row g-4">
          {REVIEWS.map((rev, idx) => (
            <div
              className="col-lg-3 col-md-6"
              key={rev.id}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="review-card">
                <div className="review-card-top">
                  <div className="stars">
                    {[...Array(rev.rating)].map((_, i) => (
                      <i className="bi bi-star-fill text-warning" key={i}></i>
                    ))}
                  </div>
                  <span className="review-tag">{rev.tag}</span>
                </div>

                <p className="review-text">"{rev.review}"</p>

                <div className="review-author">
                  <div className="avatar-initials">
                    {rev.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h5>{rev.name}</h5>
                    <small>
                      <i className="bi bi-geo-alt-fill text-danger"></i> {rev.location}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
