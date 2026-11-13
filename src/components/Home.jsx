import { useEffect, useRef, useState, Suspense, Component } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lottie } from "lottie-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, Environment, ContactShadows, useGLTF, Center } from "@react-three/drei";
import burst from "./firework.json";
import rocketUrl from "../assets/rocket.glb?url";
import "../assets/style/style.css";


import flower from "../assets/images/flower.jpg";
import ground from "../assets/images/ground.jpg";
import bomb  from "../assets/images/bomb.jpg";
import multishot from "../assets/images/multishot.jpg";
import skyrockts from "../assets/images/skyrockts.jpg";
import sparkls from "../assets/images/sparkls.jpg";
import kids from "../assets/images/kids.jpg";
import family from "../assets/images/family.jpg";
import night from "../assets/images/night.jpg";


gsap.registerPlugin(ScrollTrigger);

/* ---------- 3D ROCKET (procedural). To use your own model instead:
   1) put rocket.glb in /public
   2) replace <Rocket /> with <Model /> below ---------- */
function Rocket(){
  const ref = useRef();
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.6;
  });
  return (
    <group ref={ref} rotation={[0.15, 0, -0.18]}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.45, 0.45, 2.2, 32]} />
        <meshStandardMaterial color="#E0245E" roughness={0.45} />
      </mesh>
      {[-0.6, 0.6].map((y) => (
        <mesh key={y} position={[0, y, 0]}>
          <cylinderGeometry args={[0.465, 0.465, 0.22, 32]} />
          <meshStandardMaterial color="#FFC83D" metalness={0.5} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[0, 1.55, 0]}>
        <coneGeometry args={[0.45, 0.9, 32]} />
        <meshStandardMaterial color="#FF6B1A" roughness={0.4} />
      </mesh>
      <mesh position={[0, -1.35, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
        <meshStandardMaterial color="#8B6B3E" />
      </mesh>
      <mesh position={[0, 2.12, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#fff" emissive="#FFC83D" emissiveIntensity={3} />
      </mesh>
    </group>
  );
}

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn("3D scene error:", error);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const MODEL_PATH = rocketUrl || `${import.meta.env.BASE_URL}rocket.glb`;

function Model() {
  const { scene } = useGLTF(MODEL_PATH);
  const ref = useRef();
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.6;
    }
  });
  return (
    <group ref={ref} rotation={[0.15, 0, -0.1]}>
      <Center>
        <primitive object={scene} scale={0.75} />
      </Center>
    </group>
  );
}

try {
  useGLTF.preload(MODEL_PATH);
} catch {
  // safe fallback
}

const products = [
  { name: "Flower Pots", price: 180, note: "Fountain, 10 pcs", color: "#FFC83D", images: flower },
  { name: "Sky Rockets", price: 240, note: "Whistling, 5 pcs", color: "#E0245E", images: skyrockts },
  { name: "Sparklers", price: 90, note: "Gold, 10 sticks", color: "#FF6B1A", images: sparkls },
  { name: "Ground Chakras", price: 120, note: "Spinning, 10 pcs", color: "#7C5CFF", images: ground },
  { name: "Atom Bombs", price: 150, note: "Loud, 1 box", color: "#2FC4B2", images: bomb },
  { name: "Multi-Shot", price: 520, note: "30 shots, 1 pc", color: "#FF8FB1", images: multishot },
];

const combos = [
  { name: "Family Pack", price: 999, items: "24 items", tag: "Most picked", images: family },
  { name: "Kids Safe Pack", price: 499, items: "14 items, low noise", images: kids },
  { name: "Grand Night Pack", price: 2499, items: "42 items + 2 multi-shots", images: night },
];


export default function Home() {
  const [cart, setCart] = useState({});
  const [open, setOpen] = useState(false);
  const root = useRef(null);

  const add = (name, price) =>
    setCart((c) => ({ ...c, [name]: { price, qty: (c[name]?.qty || 0) + 1 } }));
  const remove = (name) =>
    setCart((c) => {
      const n = { ...c };
      if (n[name].qty <= 1) delete n[name];
      else n[name] = { ...n[name], qty: n[name].qty - 1 };
      return n;
    });
  const count = Object.values(cart).reduce((a, b) => a + b.qty, 0);
  const total = Object.values(cart).reduce((a, b) => a + b.qty * b.price, 0);

  /* GSAP: hero intro timeline + scroll-driven sections */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-line", { yPercent: 110, duration: 1, stagger: 0.12 })
        .from(".hero-sub, .hero-cta", { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .from(".hero-stage", { scale: 0.8, opacity: 0, duration: 1.1 }, 0.2);

      gsap.from(".product", {
        scrollTrigger: { trigger: ".products", start: "top 75%" },
        y: 60,
        opacity: 0,
        rotate: 2,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.4)",
      });

      gsap.from(".safety li", {
        scrollTrigger: { trigger: ".safety", start: "top 70%" },
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
      });

      gsap.to(".hero-glow", {
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        y: 180,
        opacity: 0.2,
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <div className="cr" ref={root}>
      {/* NAV */}
      <header className="nav">
        <a className="brand" href="#top">Sri Murugan Crackers</a>
        <nav>
          <a href="#products">Crackers</a>
          <a href="#combos">Combo packs</a>
          <a href="#safety">Safety</a>
        </nav>
        <motion.button
          className="cart-btn"
          whileTap={{ scale: 0.92 }}
          onClick={() => setOpen(true)}
          aria-label="Open cart"
        >
          Cart
          <AnimatePresence mode="popLayout">
            <motion.span
              key={count}
              className="badge"
              initial={{ scale: 0.4, y: -8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </header>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero-glow" />
        <div className="hero-copy">
          <h1>
            <span className="mask"><span className="hero-line">Light up</span></span>
            <span className="mask"><span className="hero-line">your Diwali</span></span>
            <span className="mask"><span className="hero-line">night.</span></span>
          </h1>
          <p className="hero-sub">
            Factory-direct crackers from Sivakasi. Pick a pack, pay online, collect or get it
            delivered before the festival.
          </p>
          <div className="hero-cta">
            <motion.a
              href="#combos"
              className="btn primary"
              whileHover={{ y: -3, boxShadow: "0 10px 0 #7a2d00" }}
              whileTap={{ y: 2, boxShadow: "0 2px 0 #7a2d00" }}
            >
              Shop combo packs
            </motion.a>
            <a href="#products" className="btn ghost">Browse crackers</a>
          </div>
        </div>

        <div className="hero-stage">
          <Lottie src={burst} loop autoplay className="burst b-center" />
          <Lottie src={burst} loop autoplay className="burst b1" />
          <Lottie src={burst} loop autoplay className="burst b2" />
          <CanvasErrorBoundary fallback={null}>
            <Canvas camera={{ position: [0, 0.5, 6], fov: 40 }} dpr={[1, 2]}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[4, 5, 3]} intensity={2.2} />
              <pointLight position={[-3, -1, 2]} intensity={25} color="#FF6B1A" />
              <Suspense fallback={<Rocket />}>
                <Float speed={2} rotationIntensity={0.3} floatIntensity={1.2}>
                  <CanvasErrorBoundary fallback={<Rocket />}>
                    <Model />
                  </CanvasErrorBoundary>
                </Float>
                <ContactShadows position={[0, -2.1, 0]} opacity={0.5} blur={2.5} scale={8} />
                <Environment preset="night" />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </CanvasErrorBoundary>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section products" id="products">
        <h2>Pick your crackers</h2>
        <p className="section-sub">Prices per box. Add to cart and adjust quantities there.</p>
        <div className="grid">
          {products.map((p) => (
            <motion.article
              key={p.name}
              className="product"
              style={{ "--c": p.color }}
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            >
              <div className="product-art">
                {p.images ? (
                  <img src={p.images} alt={p.name} loading="lazy" />
                ) : (
                  <motion.div
                    className="art-shape"
                    whileHover={{ scale: 1.15, rotate: 12 }}
                  />
                )}
              </div>
              <h3>{p.name}</h3>
              <p>{p.note}</p>
              <div className="row">
                <strong>₹{p.price}</strong>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => add(p.name, p.price)}>
                  Add to cart
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* COMBOS */}
      <section className="section combos" id="combos">
        <h2>Combo packs</h2>
        <p className="section-sub">Ready-made boxes, packed and sealed at the factory.</p>
        <div className="combo-list">
          {combos.map((c, i) => (
            <motion.div
              key={c.name}
              className="combo"
              initial={{ opacity: 0, x: i % 2 ? 60 : -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="combo-left">
                {c.images && (
                  <div className="combo-art">
                    <img src={c.images} alt={c.name} loading="lazy" />
                  </div>
                )}
                <div>
                  <h3>{c.name}</h3>
                  <p>{c.items}</p>
                  {c.tag && <span className="tag">{c.tag}</span>}
                </div>
              </div>
              <div className="combo-buy">
                <strong>₹{c.price}</strong>
                <motion.button whileTap={{ scale: 0.92 }} onClick={() => add(c.name, c.price)}>
                  Add to cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SAFETY */}
      <section className="section safety" id="safety">
        <h2>Burst them safely</h2>
        <ul>
          <li>Light crackers outdoors, in an open area, away from houses and dry leaves.</li>
          <li>Keep a bucket of water nearby and light one cracker at a time.</li>
          <li>Never relight a cracker that did not go off. Soak it in water.</li>
          <li>Children light crackers only with an adult standing next to them.</li>
        </ul>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <p className="footer-brand">Sri Murugan Crackers</p>
          <p>Licensed Sivakasi Retail Shop · Direct Factory Quality · 100% Genuine & Safe</p>
          <p className="footer-contact">Call or WhatsApp: <strong>+91 90000 00000</strong> · Open 9 AM to 9 PM</p>
          <p className="footer-copy">© 2026 Sri Murugan Crackers · Light up your celebrations responsibly</p>
        </div>
      </footer>

      {/* CART DRAWER */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
            >
              <div className="drawer-head">
                <h3>Your cart</h3>
                <button onClick={() => setOpen(false)} aria-label="Close cart">Close</button>
              </div>
              {count === 0 ? (
                <p className="empty">Your cart is empty. Add a combo pack to start.</p>
              ) : (
                <ul className="lines">
                  <AnimatePresence>
                    {Object.entries(cart).map(([name, l]) => (
                      <motion.li
                        key={name}
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        <span>{name}</span>
                        <span className="qty">
                          <button onClick={() => remove(name)} aria-label={`Remove one ${name}`}>−</button>
                          {l.qty}
                          <button onClick={() => add(name, l.price)} aria-label={`Add one ${name}`}>+</button>
                        </span>
                        <span>₹{l.qty * l.price}</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
              <div className="drawer-foot">
                <div className="total"><span>Total</span><strong>₹{total}</strong></div>
                <button className="btn primary full" disabled={!count}>Place order on WhatsApp</button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>









  );
}