import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white border-b-2 border-yellow-400 shadow-md z-50">
      <ul className="flex justify-around py-4">
        <li>
          <Link
            href="/"
            className="text-yellow-900 font-semibold hover:text-yellow-700 transition"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/products"
            className="text-yellow-900 font-semibold hover:text-yellow-700 transition"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/reviews"
            className="text-yellow-900 font-semibold hover:text-yellow-700 transition"
          >
            Reviews
          </Link>
        </li>
        <li>
          <Link
            href="/contact-us"
            className="text-yellow-900 font-semibold hover:text-yellow-700 transition"
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Link
            href="/feedback"
            className="text-yellow-900 font-semibold hover:text-yellow-700 transition"
          >
            Feedback
          </Link>
        </li>
      </ul>
    </nav>
  );
}
