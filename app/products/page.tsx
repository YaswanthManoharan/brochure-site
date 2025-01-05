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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number } | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());

    // Check for price range filtering
    const matchesPrice =
      priceFilter
        ? product.price >= priceFilter.min && product.price <= priceFilter.max
        : true; // If no price filter, include all products

    return matchesSearch && matchesPrice;
  });

  const handleFilterApply = () => {
    // Here you can perform additional actions if needed after applying the filter
    console.log('Filter applied', { searchQuery, priceFilter });
  };

  return (
    <section className="min-h-screen bg-yellow-100 p-6">
      <h2 className="text-4xl font-extrabold text-yellow-800 text-center mb-6">Our Products</h2>
      <SearchFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        //onFilterApply={handleFilterApply} // Pass filter apply handler
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}