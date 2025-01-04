'use client';
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "/images/product-1.jpg", // Replace with actual image paths
    "/images/product-2.jpg",
    "/images/product-3.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex items-center justify-between px-10">
      {/* Left Side: Intro Section */}
      <div className="w-1/2 space-y-4">
        <h1 className="text-5xl font-extrabold text-blue-900">
          Welcome to Cotton Haven
        </h1>
        <p className="text-lg text-gray-700">
          Discover the finest cotton products that combine comfort, quality, and
          sustainability. Explore our range of handcrafted goods designed to
          bring softness and elegance into your life.
        </p>
        <Link href="/products">
          <button className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition">
            Explore Our Products
          </button>
        </Link>
      </div>

      {/* Right Side: Slideshow */}
      <div className="w-1/2 h-2/3 overflow-hidden rounded-lg shadow-lg relative">
        <div
          className="flex transition-transform duration-1000 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>
      </div>
    </section>
  );
}