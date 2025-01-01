'use client';
import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Define the type for feedback
type Feedback = {
  id: string;
  product: string;
  feedback: string;
  verified: boolean;
};

export default function AdminDashboard() {
  // Explicitly type the state as an array of Feedback objects
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(collection(db, 'feedback'));
      setFeedbacks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Feedback)); // Type assertion here
    };
    fetchFeedbacks();
  }, []);

  const verifyFeedback = async (id: string) => {
    const feedbackDoc = doc(db, 'feedback', id);
    await updateDoc(feedbackDoc, { verified: true });
    alert('Feedback verified!');
    setFeedbacks(feedbacks.map((f) => (f.id === id ? { ...f, verified: true } : f)));
  };

  return (
    <div>
      <h3 className="text-2xl">Admin Dashboard</h3>
      <ul>
        {feedbacks.map((feedback) => (
          <li key={feedback.id} className="border-b border-gray-300 py-2">
            <p><strong>{feedback.product}:</strong> {feedback.feedback}</p>
            <button
              onClick={() => verifyFeedback(feedback.id)}
              disabled={feedback.verified}
              className={`px-4 py-2 ${feedback.verified ? 'bg-gray-500' : 'bg-blue-500 text-white'}`}
            >
              {feedback.verified ? 'Verified' : 'Verify'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
