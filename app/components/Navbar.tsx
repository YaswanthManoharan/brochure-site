import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <ul className="flex justify-around py-4">
        <li>
          <Link href="/" className="text-gray-800 hover:text-blue-500">Home</Link>
        </li>
        <li>
          <Link href="/products" className="text-gray-800 hover:text-blue-500">Products</Link>
        </li>
        <li>
          <Link href="/reviews" className="text-gray-800 hover:text-blue-500">Reviews</Link>
        </li>
        <li>
          <Link href="/contact-us" className="text-gray-800 hover:text-blue-500">Contact Us</Link>
        </li>
        <li>
          <Link href="/feedback" className="text-gray-800 hover:text-blue-500">Feedback</Link>
        </li>
      </ul>
    </nav>
  );
}
