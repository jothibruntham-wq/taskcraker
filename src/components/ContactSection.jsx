import React, { useState } from "react";
import { soundManager } from "../utils/soundEffects";

const FAQS = [
  {
    q: "Are these fireworks genuine Sivakasi Green Crackers?",
    a: "Yes, 100%. Every firework is manufactured in Sivakasi in strict adherence to CSIR-NEERI and PESO guidelines, utilizing SWAS and STAR formulations with low smoke and zero banned chemicals.",
  },
  {
    q: "How are the fireworks packed for safe transit?",
    a: "We utilize heavy-duty 5-ply export-grade corrugated cartons lined with moisture-resistant thermal wraps and shock-absorbing honeycomb partitions to eliminate friction during road transit.",
  },
  {
    q: "Is there a minimum order amount for wholesale factory prices?",
    a: "No strict minimum! Individual family orders start from as low as ₹500. For retail resale orders above ₹15,000, we provide special dealer slab discounts.",
  },
  {
    q: "Can I place an order directly through WhatsApp?",
    a: "Absolutely! You can use our interactive cart to assemble your items and click 'Instant WhatsApp Order' to send your list directly to our Sivakasi factory dispatch desk.",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    orderType: "Family Celebration",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundManager.playSparkleChime();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        city: "",
        orderType: "Family Celebration",
        message: "",
      });
    }, 4000);
  };

  return (
    <section className="cracker-contact-section" id="contact">
      <div className="container">
        {/* Section Heading */}
        <div className="section-heading text-center" data-aos="fade-up">
          <span className="badge-festive">✦ SIVAKASI DIRECT CONNECT ✦</span>
          <h2>
            Contact Our <b>Factory Desk & FAQs</b>
          </h2>
          <p>
            Have questions regarding wholesale booking, custom family combos, or
            express transport delivery? Reach our Sivakasi specialists directly.
          </p>
        </div>

        <div className="row gy-5">
          {/* Left Column: Factory Details & FAQ Accordion */}
          <div className="col-lg-6" data-aos="fade-right">
            {/* Quick Contact Cards */}
            <div className="contact-cards-grid mb-4">
              <div className="contact-info-card">
                <i className="bi bi-geo-alt-fill text-danger"></i>
                <div>
                  <h5>Factory & Dispatch Outlet</h5>
                  <p>7/142 Bypass Road, Sivakasi, Tamil Nadu - 626123</p>
                </div>
              </div>

              <div className="contact-info-card">
                <i className="bi bi-telephone-fill text-warning"></i>
                <div>
                  <h5>Factory Direct Hotline</h5>
                  <p>+91 8904303697 / +91 9443210987</p>
                </div>
              </div>

              <div className="contact-info-card">
                <i className="bi bi-envelope-fill text-info"></i>
                <div>
                  <h5>Official Email</h5>
                  <p>orders@sparkzonecrackers.com</p>
                </div>
              </div>

              <div className="contact-info-card">
                <i className="bi bi-clock-fill text-success"></i>
                <div>
                  <h5>Diwali Booking Hours</h5>
                  <p>Monday - Sunday: 8:00 AM - 10:30 PM</p>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <h4 className="faq-section-title mb-3">
              <i className="bi bi-question-circle text-warning"></i> Frequently Asked Questions
            </h4>
            <div className="faq-accordion">
              {FAQS.map((faq, idx) => (
                <div
                  className={`faq-item ${activeFaq === idx ? "active" : ""}`}
                  key={idx}
                  onClick={() => setActiveFaq(activeFaq === idx ? -1 : idx)}
                >
                  <div className="faq-question">
                    <span>{faq.q}</span>
                    <i
                      className={`bi ${
                        activeFaq === idx ? "bi-chevron-up" : "bi-chevron-down"
                      }`}
                    ></i>
                  </div>
                  {activeFaq === idx && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Direct Factory Inquiry Form */}
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="150">
            <div className="inquiry-form-card">
              <div className="form-card-header">
                <h3>Request Festival Price Quotation</h3>
                <p>
                  Fill out your requirements below and our Sivakasi dispatch
                  coordinator will WhatsApp you the complete price PDF within 15 minutes.
                </p>
              </div>

              {submitted ? (
                <div className="inquiry-success-message text-center py-5">
                  <i className="bi bi-check-circle-fill text-success display-2 mb-3"></i>
                  <h4>Thank You, {formData.name || "Celebrant"}!</h4>
                  <p>
                    Your inquiry has been received at our Sivakasi desk. Our
                    representative will WhatsApp the Diwali catalog and best
                    quote shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="inquiry-form">
                  <div className="mb-3">
                    <label className="form-label">Your Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Ramesh Kumar"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">WhatsApp Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        placeholder="e.g. 9876543210"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Delivery City / Town *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="e.g. Chennai, Bangalore"
                        required
                        value={formData.city}
                        onChange={(e) =>
                          setFormData({ ...formData, city: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Order Requirement Type</label>
                    <select
                      className="form-select"
                      value={formData.orderType}
                      onChange={(e) =>
                        setFormData({ ...formData, orderType: e.target.value })
                      }
                    >
                      <option value="Family Celebration">
                        Family Celebration Pack (₹1,500 - ₹5,000)
                      </option>
                      <option value="Apartment Society">
                        Apartment / Community Bulk Order (₹10,000+)
                      </option>
                      <option value="Retail Reseller">
                        Retail Store / Wholesale Reseller (₹25,000+)
                      </option>
                      <option value="Custom Gift Box">
                        Custom Corporate Gift Boxes
                      </option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">Special Requests / Notes</label>
                    <textarea
                      rows="3"
                      className="form-control"
                      placeholder="Specific crackers needed, preferred delivery date, etc."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-submit-inquiry w-100">
                    <i className="bi bi-send-fill me-2"></i> Submit & Receive Price
                    Catalog
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
