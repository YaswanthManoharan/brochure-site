import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <ul className="flex justify-around py-4">
        <li><a href="/" className="text-gray-800 hover:text-blue-500">Home</a></li>
        <li><a href="/products" className="text-gray-800 hover:text-blue-500">Products</a></li>
        <li><a href="/reviews" className="text-gray-800 hover:text-blue-500">Reviews</a></li>
        <li><a href="/contact-us" className="text-gray-800 hover:text-blue-500">Contact Us</a></li>
        <li><a href="/feedback" className="text-gray-800 hover:text-blue-500">Feedback</a></li>
      </ul>
    </nav>
  );
}