import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/style/style.css";

import DesktopSizeBar from "./components/DesktopSizeBar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { soundManager } from "./utils/soundEffects";

function App() {
  const [cart, setCart] = useState([
    {
      id: "p1",
      name: "Sivakasi Royal Flower Pots Special",
      category: "Flower Pots",
      price: 240,
      oldPrice: 380,
      qty: 2,
      image: "https://images.unsplash.com/photo-1498931299472-f7a63a5a1cfa?w=600",
    },
    {
      id: "p5",
      name: "30cm Giant Gold Sparklers",
      category: "Sparklers",
      price: 140,
      oldPrice: 220,
      qty: 3,
      image: "https://images.unsplash.com/photo-1533236897111-3e94666b2edf?w=600",
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [desktopMode, setDesktopMode] = useState("100%");
  const [activeCategory, setActiveCategory] = useState("All");

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
    });
  }, []);

  // Refresh AOS when desktop viewport mode changes
  useEffect(() => {
    const timer = setTimeout(() => {
      AOS.refresh();
    }, 400);
    return () => clearTimeout(timer);
  }, [desktopMode]);

  // Cart operations
  const handleAddToCart = (product) => {
    soundManager.playCartPop();
    setCart((prevCart) => {
      const existing = prevCart.find((it) => it.id === product.id);
      if (existing) {
        return prevCart.map((it) =>
          it.id === product.id ? { ...it, qty: (it.qty || 1) + 1 } : it
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const handleUpdateQty = (productId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((it) => (it.id === productId ? { ...it, qty: newQty } : it))
    );
  };

  const handleRemoveItem = (productId) => {
    setCart((prev) => prev.filter((it) => it.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const totalCartItemsCount = cart.reduce((acc, it) => acc + (it.qty || 1), 0);

  return (
    <div className="cracker-shop-app">
      {/* 1. Desktop Screen Size Viewport Switcher Toolbar */}
      <DesktopSizeBar
        currentMode={desktopMode}
        onSelectMode={(mode) => setDesktopMode(mode)}
      />

      {/* 2. Responsive Site Master Container (Supports Fluid 100% and Simulated Desktop Sizes) */}
      <div
        className={`site-master-wrapper ${
          desktopMode !== "100%" ? "simulated-desktop" : ""
        }`}
        style={{
          width: desktopMode,
          maxWidth: "100%",
        }}
      >
        {/* Navigation */}
        <Navbar
          cartCount={totalCartItemsCount}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Full Store Content */}
        <Home
          onAddToCart={handleAddToCart}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Footer */}
        <Footer />
      </div>

      {/* Slide-out Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

export default App;
