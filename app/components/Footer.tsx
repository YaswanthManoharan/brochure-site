import Link from 'next/link';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <footer className="bg-white text-yellow-900 border-t-2 border-yellow-200 py-8 mt-6">
      <div className="container mx-auto px-4">
        {/* Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Left Section */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Cotton Haven</h2>
            <p className="text-yellow-700 mb-4">
              Your trusted source for premium cotton products crafted with love and care.
            </p>
          </div>

          {/* Middle Section: Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-yellow-700 hover:text-yellow-900 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-yellow-700 hover:text-yellow-900 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="text-yellow-700 hover:text-yellow-900 transition">
                  Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-yellow-700 hover:text-yellow-900 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-yellow-700 hover:text-yellow-900 transition">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section: Social Media */}
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <Link href="https://facebook.com" className="text-yellow-700 hover:text-yellow-900 transition" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i> {/* Facebook icon */}
              </Link>
              <Link href="https://twitter.com" className="text-yellow-700 hover:text-yellow-900 transition" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i> {/* Twitter icon */}
              </Link>
              <Link href="https://instagram.com" className="text-yellow-700 hover:text-yellow-900 transition" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i> {/* Instagram icon */}
              </Link>
              <Link href="https://www.linkedin.com/in/yaswanth-manoharan/" className="text-yellow-700 hover:text-yellow-900 transition" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i> {/* LinkedIn icon */}
              </Link>
            </div>

          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t-2 border-yellow-300 pt-4">
          <p className="text-yellow-600 text-sm text-center">
            © 2025 Cotton Haven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}