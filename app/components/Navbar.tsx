import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md z-50">
      <ul className="flex justify-around py-4">
        <li>
          <Link href="/">
            <a className="text-gray-800 hover:text-blue-500">Home</a>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <a className="text-gray-800 hover:text-blue-500">Products</a>
          </Link>
        </li>
        <li>
          <Link href="/reviews">
            <a className="text-gray-800 hover:text-blue-500">Reviews</a>
          </Link>
        </li>
        <li>
          <Link href="/contact-us">
            <a className="text-gray-800 hover:text-blue-500">Contact Us</a>
          </Link>
        </li>
        <li>
          <Link href="/feedback">
            <a className="text-gray-800 hover:text-blue-500">Feedback</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
