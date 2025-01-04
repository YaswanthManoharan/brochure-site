'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="sticky top-0 bg-white border-b-2 border-yellow-400 shadow-md z-50">
      {/* Desktop Menu */}
      <ul className="hidden md:flex justify-around py-4">
        <li>
          <Link href="/" className="text-yellow-900 font-semibold hover:text-yellow-700 transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="text-yellow-900 font-semibold hover:text-yellow-700 transition">
            Products
          </Link>
        </li>
        <li>
          <Link href="/reviews" className="text-yellow-900 font-semibold hover:text-yellow-700 transition">
            Reviews
          </Link>
        </li>
        <li>
          <Link href="/contact-us" className="text-yellow-900 font-semibold hover:text-yellow-700 transition">
            Contact Us
          </Link>
        </li>
        <li>
          <Link href="/feedback" className="text-yellow-900 font-semibold hover:text-yellow-700 transition">
            Feedback
          </Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden flex items-center justify-between py-4 px-6">
        {/* Hamburger Icon */}
        <button onClick={toggleMenu} className="text-yellow-900 focus:outline-none">
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      {/* Menu Items for Mobile */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white border-t-2 border-yellow-400`}>
        <ul className="flex flex-col items-center py-4">
          <li>
            <Link href="/" onClick={closeMenu} className="text-yellow-900 font-semibold hover:text-yellow-700 transition py-2">
              Home
            </Link>
          </li>
          <li>
            <Link href="/products" onClick={closeMenu} className="text-yellow-900 font-semibold hover:text-yellow-700 transition py-2">
              Products
            </Link>
          </li>
          <li>
            <Link href="/reviews" onClick={closeMenu} className="text-yellow-900 font-semibold hover:text-yellow-700 transition py-2">
              Reviews
            </Link>
          </li>
          <li>
            <Link href="/contact-us" onClick={closeMenu} className="text-yellow-900 font-semibold hover:text-yellow-700 transition py-2">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/feedback" onClick={closeMenu} className="text-yellow-900 font-semibold hover:text-yellow-700 transition py-2">
              Feedback
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
