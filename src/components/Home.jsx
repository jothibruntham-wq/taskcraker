import React from "react";
import Hero from "./Hero";
import Cracker3DSection from "./Cracker3DSection";
import Categories from "./Categories";
import Products from "./Products";
import DealsSection from "./DealsSection";
import SafetySection from "./SafetySection";
import ReviewsSection from "./ReviewsSection";
import ContactSection from "./ContactSection";

export default function Home({ onAddToCart, activeCategory, setActiveCategory, onOpenCart }) {
  return (
    <main className="cracker-home-content">
      <Hero onOpenCart={onOpenCart} />
      <Cracker3DSection onAddToCart={onAddToCart} />
      <Categories onSelectCategory={(catId) => setActiveCategory(catId)} />
      <Products
        onAddToCart={onAddToCart}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <DealsSection onAddToCart={onAddToCart} />
      <SafetySection />
      <ReviewsSection />
      <ContactSection />
    </main>
  );
}
