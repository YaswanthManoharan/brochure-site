'use client';
import { useState } from 'react';
import { db } from '../utils/firebase'; // Firebase setup
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Select from 'react-select';

const FeedbackForm = () => {
  const [name, setName] = useState<string>(''); // New name field
  const [type, setType] = useState<string>(''); // Default to empty string, to ensure user selects a valid option
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]); // Array for multiple product selections
  const [generalCategory, setGeneralCategory] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  // Sample products array
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E', 'Product F', 'Product G', 'Product H', 'Product I'];

  // Convert products array to objects for react-select
  const productOptions = products.map((product) => ({
    label: product,
    value: product,
  }));

  const handleProductChange = (newValue: any) => {
    setSelectedProducts(newValue || []); // newValue is of type MultiValue<any>
  };

  // Subcategories for 'general' type feedback
  const generalCategories = ['Experience', 'Price', 'Quality'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all required fields are filled before submitting
    if (!type || !feedback || (type === 'product' && selectedProducts.length === 0) || (type === 'general' && !generalCategory)) {
      alert('Please fill in all required fields.');
      return;
    }

    // Prepare the feedback data
    const feedbackData = {
      name: name || null, // If name is provided, it will be sent, else null
      type,
      product: type === 'product' ? selectedProducts.map((item) => item.value) : null, // Store products as an array if multiple selected
      feedback,
      generalCategory: type === 'general' ? generalCategory : null,
      verified: false, // Add default verification status
      timestamp: serverTimestamp(), // Add timestamp when the record is submitted
    };

    // Send feedback data to Firestore
    try {
      await addDoc(collection(db, 'feedback'), feedbackData);
      alert('Thank you for your valuable feedback!');
      setName(''); // Clear name field
      setType(''); // Reset type to empty
      setSelectedProducts([]); // Clear selected products
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

      {/* Name (optional) */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name (Optional)</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        />
      </div>

      {/* Feedback Type Selection */}
      <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Feedback Type</label>
        <select
          id="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          required
        >
          <option value="" disabled>Select Feedback Type</option> {/* Placeholder */}
          <option value="general">General / Experience</option>
          <option value="product">Product</option>
        </select>
      </div>

      {/* Multi-Select Dropdown for Products (only visible if type is 'product') */}
      {type === 'product' && (
        <div className="mb-4">
          <label htmlFor="products" className="block text-sm font-medium text-gray-700">Select Products</label>
          <Select
            id="products"
            isMulti
            options={productOptions}
            value={selectedProducts}
            onChange={handleProductChange}
            className="w-full"
            placeholder="Select Product(s)"
            required
          />
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
            <option value="" disabled>Select Category</option> {/* Placeholder */}
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