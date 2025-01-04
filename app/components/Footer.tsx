export default function Footer() {
  return (
    <footer className="bg-white text-yellow-900 py-8 mt-12">
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
                <a href="/" className="text-yellow-700 hover:text-yellow-900 transition">Home</a>
              </li>
              <li>
                <a href="/products" className="text-yellow-700 hover:text-yellow-900 transition">Products</a>
              </li>
              <li>
                <a href="/reviews" className="text-yellow-700 hover:text-yellow-900 transition">Reviews</a>
              </li>
              <li>
                <a href="/contact-us" className="text-yellow-700 hover:text-yellow-900 transition">Contact Us</a>
              </li>
              <li>
                <a href="/feedback" className="text-yellow-700 hover:text-yellow-900 transition">Feedback</a>
              </li>
            </ul>
          </div>

          {/* Right Section: Social Media */}
          <div className="text-center">
            <h3 className="text-lg font-medium mb-2">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              <a href="https://facebook.com" className="text-yellow-700 hover:text-yellow-900 transition">
                <i className="fab fa-facebook-f"></i> {/* Add appropriate icon */}
              </a>
              <a href="https://twitter.com" className="text-yellow-700 hover:text-yellow-900 transition">
                <i className="fab fa-twitter"></i> {/* Add appropriate icon */}
              </a>
              <a href="https://instagram.com" className="text-yellow-700 hover:text-yellow-900 transition">
                <i className="fab fa-instagram"></i> {/* Add appropriate icon */}
              </a>
              <a href="https://linkedin.com" className="text-yellow-700 hover:text-yellow-900 transition">
                <i className="fab fa-linkedin-in"></i> {/* Add appropriate icon */}
              </a>
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