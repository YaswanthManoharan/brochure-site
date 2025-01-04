'use client';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import ReviewCard from './ReviewCard';

type Review = {
  name?: string;
  product: string;
  feedback: string;
  type: 'product' | 'general';
};

export default function Reviews() {
  const [productReviews, setProductReviews] = useState<Review[]>([]);
  const [generalFeedback, setGeneralFeedback] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'feedback'), where('verified', '==', true));
      const querySnapshot = await getDocs(q);

      const reviews = querySnapshot.docs.map((doc) => doc.data() as Review);

      setProductReviews(reviews.filter((review) => review.type === 'product'));
      setGeneralFeedback(reviews.filter((review) => review.type === 'general'));
    };

    fetchReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 to-yellow-200 flex flex-col md:flex-row">
      {/* Left Section */}
      <div className="md:w-1/3 p-6 bg-gradient-to-b from-yellow-400 to-yellow-300 flex flex-col items-center justify-center text-gray-900 rounded-b-lg md:rounded-r-lg md:rounded-bl-none shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4">What Customers Say</h2>
        <p className="text-lg text-center mb-6 text-gray-800">
          Real voices of our satisfied customers. Discover how our products and services have made a difference in their lives.
        </p>
        <div className="text-5xl text-yellow-600 drop-shadow-lg">💬</div>
      </div>

      {/* Right Section */}
      <div className="md:w-2/3 flex flex-col gap-10 p-6">
        {/* Product Reviews */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Product Reviews</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.length > 0 ? (
              productReviews.map((review, index) => (
                <ReviewCard
                  key={`product-${index}`}
                  name={review.name || 'Anonymous'}
                  product={review.product}
                  feedback={review.feedback}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No product reviews available yet.
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-1 bg-yellow-300"></div>

        {/* General Feedback */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            Customer Experience
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalFeedback.length > 0 ? (
              generalFeedback.map((review, index) => (
                <ReviewCard
                  key={`general-${index}`}
                  name={review.name || 'Anonymous'}
                  product={review.product}
                  feedback={review.feedback}
                />
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No customer feedback available yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
