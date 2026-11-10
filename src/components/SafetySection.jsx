import React, { useState } from "react";
import { soundManager } from "../utils/soundEffects";

const SAFETY_TIPS = [
  {
    icon: "bi-arrows-fullscreen",
    title: "Light in Open Grounds",
    desc: "Always ignite fireworks in open outdoor spaces away from buildings, overhead cables, trees, and dry foliage.",
  },
  {
    icon: "bi-shield-check",
    title: "Maintain Arm's Distance",
    desc: "Use long incense sticks (agarbatti) or safety lighters. Never lean directly over fireworks while lighting.",
  },
  {
    icon: "bi-droplet-half",
    title: "Keep Water & Sand Ready",
    desc: "Always have two buckets of clean water and dry sand on standby. Dispose used sparklers into water buckets.",
  },
  {
    icon: "bi-people-fill",
    title: "Adult Supervision",
    desc: "Ensure children only handle safe sparklers and novelty snaps under continuous supervision of an adult.",
  },
];

export default function SafetySection() {
  const [checklist, setChecklist] = useState({
    water: false,
    cotton: false,
    open: false,
    supervision: false,
  });

  const toggleCheck = (key) => {
    soundManager.playSparkleChime();
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const allChecked = Object.values(checklist).every(Boolean);

  return (
    <section className="cracker-safety-section" id="safety">
      <div className="container">
        <div className="row gy-5 align-items-center">
          {/* Left Column: Green Crackers Info */}
          <div className="col-lg-6" data-aos="fade-right">
            <span className="badge-festive">✦ CSIR-NEERI APPROVED ✦</span>
            <h2>
              100% Certified <b>Green Crackers</b>
              <br />
              Safe For Families & Nature
            </h2>
            <p className="safety-lead">
              Our fireworks strictly follow the Government of India PESO and
              CSIR-NEERI guidelines. Manufactured with 30-35% lower particulate
              matter emissions, zero barium, and eco-friendly raw materials.
            </p>

            <div className="green-badges-grid">
              <div className="green-badge-item">
                <div className="badge-icon">
                  <i className="bi bi-droplet-fill"></i>
                </div>
                <div>
                  <h5>SWAS Formulation</h5>
                  <p>Safe Water Releaser releasing water vapor to suppress dust.</p>
                </div>
              </div>

              <div className="green-badge-item">
                <div className="badge-icon">
                  <i className="bi bi-stars"></i>
                </div>
                <div>
                  <h5>STAR Technology</h5>
                  <p>Safe Thermite Cracker with reduced sound and clean air burn.</p>
                </div>
              </div>

              <div className="green-badge-item">
                <div className="badge-icon">
                  <i className="bi bi-qr-code-scan"></i>
                </div>
                <div>
                  <h5>QR Code Verification</h5>
                  <p>Every box carries an authentic PESO NEERI QR verification label.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Safety Guidelines & Interactive Checklist */}
          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="150">
            <div className="safety-checklist-card">
              <div className="card-header-safety">
                <i className="bi bi-shield-lock-fill text-warning"></i>
                <div>
                  <h4>Diwali Safety Checklist</h4>
                  <p>Verify your family is 100% celebration ready:</p>
                </div>
              </div>

              <div className="checklist-items">
                <label
                  className={`check-item ${checklist.open ? "checked" : ""}`}
                  onClick={() => toggleCheck("open")}
                >
                  <input
                    type="checkbox"
                    checked={checklist.open}
                    readOnly
                  />
                  <div className="check-text">
                    <strong>Designated Open Celebration Area</strong>
                    <span>Chosen an open ground with no vehicles or balconies overhead.</span>
                  </div>
                </label>

                <label
                  className={`check-item ${checklist.water ? "checked" : ""}`}
                  onClick={() => toggleCheck("water")}
                >
                  <input
                    type="checkbox"
                    checked={checklist.water}
                    readOnly
                  />
                  <div className="check-text">
                    <strong>Water & First-Aid Ready</strong>
                    <span>Two full buckets of water placed nearby for safely soaking sparklers.</span>
                  </div>
                </label>

                <label
                  className={`check-item ${checklist.cotton ? "checked" : ""}`}
                  onClick={() => toggleCheck("cotton")}
                >
                  <input
                    type="checkbox"
                    checked={checklist.cotton}
                    readOnly
                  />
                  <div className="check-text">
                    <strong>Wear Snug Cotton Clothes</strong>
                    <span>Wearing comfortable pure cotton clothing and covered footwear.</span>
                  </div>
                </label>

                <label
                  className={`check-item ${checklist.supervision ? "checked" : ""}`}
                  onClick={() => toggleCheck("supervision")}
                >
                  <input
                    type="checkbox"
                    checked={checklist.supervision}
                    readOnly
                  />
                  <div className="check-text">
                    <strong>Adult Supervision for Kids</strong>
                    <span>Ensured an adult is always present when children light sparklers.</span>
                  </div>
                </label>
              </div>

              <div className={`checklist-status-badge ${allChecked ? "all-ready" : ""}`}>
                <i
                  className={`bi ${
                    allChecked ? "bi-check-circle-fill text-success" : "bi-info-circle-fill"
                  }`}
                ></i>
                <span>
                  {allChecked
                    ? "✨ Congratulations! You are 100% Celebration Safe!"
                    : "Check all 4 steps to certify your safe celebration"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="row g-4 mt-5">
          {SAFETY_TIPS.map((tip, idx) => (
            <div
              className="col-xl-3 col-md-6"
              key={tip.title}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="safety-guideline-card">
                <div className="tip-icon-box">
                  <i className={`bi ${tip.icon}`}></i>
                </div>
                <h4>{tip.title}</h4>
                <p>{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
