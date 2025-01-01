'use client';
import { useEffect, useState } from 'react';
import { db } from '../utils/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

// Define the Review type
type Review = {
  product: string;
  feedback: string;
};

export default function Reviews() {
  // Explicitly type the state as an array of Review objects
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const q = query(collection(db, 'feedback'), where('verified', '==', true));
      const querySnapshot = await getDocs(q);

      // Use type assertion to treat doc.data() as Review
      setReviews(querySnapshot.docs.map((doc) => doc.data() as Review));
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <h3 className="text-2xl">Verified Reviews</h3>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} className="border-b border-gray-300 py-2">
            <p><strong>{review.product}:</strong> {review.feedback}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
