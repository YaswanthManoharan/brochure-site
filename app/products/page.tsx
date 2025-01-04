'use client';
import ProductCard from '../components/ProductCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { useState } from 'react';

// Dummy product data
const products = [
  { id: 1, name: 'Product A', price: 1500, image: '/images/product-1.jpg' },
  { id: 2, name: 'Product B', price: 3000, image: '/images/product-2.jpg' },
  { id: 3, name: 'Product C', price: 2000, image: '/images/product-3.jpg' },
  { id: 4, name: 'Product D', price: 500, image: '/images/product-1.jpg' },
  { id: 5, name: 'Product E', price: 1000, image: '/images/product-3.jpg' },
  { id: 6, name: 'Product F', price: 30000, image: '/images/product-1.jpg' },
  { id: 7, name: 'Product G', price: 20000, image: '/images/product-2.jpg' },
  { id: 8, name: 'Product H', price: 5000, image: '/images/product-3.jpg' },
  { id: 9, name: 'Product I', price: 7000, image: '/images/product-1.jpg' },
];

export default function ProductsPage() {
  // Ensure type safety
  const [searchQuery, setSearchQuery] = useState<string>(''); // Updated with explicit type
  const [priceFilter, setPriceFilter] = useState<string | null>(null); // Updated with explicit type

  // Filter products based on search and price filter
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice =
      priceFilter === 'below2000'
        ? product.price < 2000
        : priceFilter === 'above2000'
        ? product.price >= 2000
        : true;
    return matchesSearch && matchesPrice;
  });

  return (
    <section className="min-h-screen bg-green-100 p-6">
      <h2 className="text-4xl font-bold text-center mb-6">Our Products</h2>
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
