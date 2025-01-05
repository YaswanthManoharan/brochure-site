'use client';
import { useState } from 'react';
import { db } from '../utils/firebase'; // Firebase setup
import { collection, addDoc } from 'firebase/firestore';

const FeedbackForm = () => {
  const [type, setType] = useState<string>('general');
  const [productName, setProductName] = useState<string>('');
  const [generalCategory, setGeneralCategory] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // Sample products array
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I'];

  // Subcategories for 'general' type feedback
  const generalCategories = ['Experience', 'Price', 'Quality'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the feedback data
    const feedbackData = {
      type,
      product: type === 'product' ? productName : null,
      feedback,
      generalCategory: type === 'general' ? generalCategory : null,
      verified: false, // Add default verification status
    };

    // Send feedback data to Firestore
    try {
      await addDoc(collection(db, 'feedback'), feedbackData);
      alert('Thank you for your valuable feedback!');
      setType('general'); // Reset type to 'general'
      setProductName(''); // Clear product name
      setGeneralCategory(''); // Clear general category
      setFeedback(''); // Clear feedback text
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('There was an error submitting your feedback. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Feedback</h2>
      <p className="text-gray-600 mb-6">
        Please fill in the form below to share your valuable thoughts.
      </p>

      {/* Feedback Type Selection */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Feedback Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="general">General / Experience</option>
          <option value="product">Product</option>
        </select>
      </div>

      {/* Product Name (only visible if type is 'product') */}
      {type === 'product' && (
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">Product Name</label>
          <select
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            {products.map((product, index) => (
              <option key={index} value={product}>
                {product}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* General Category (only visible if type is 'general') */}
      {type === 'general' && (
        <div className="mb-4">
          <label htmlFor="generalCategory" className="block text-sm font-medium text-gray-700">Category</label>
          <select
            id="generalCategory"
            value={generalCategory}
            onChange={(e) => setGeneralCategory(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          >
            {generalCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Feedback Text */}
      <div className="mb-4">
        <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">Your Feedback</label>
        <textarea
          id="feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={4}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        ></textarea>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-md shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        Submit Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;