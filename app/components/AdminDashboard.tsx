'use client';
import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

// Define the type for feedback
type Feedback = {
  id: string;
  name?: string;
  type: 'product' | 'general';
  product: string;
  feedback: string;
  verified: boolean;
};

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [activeSection, setActiveSection] = useState<'reviews' | 'addAdmin' | 'customers'>('reviews');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(collection(db, 'feedback'));
      setFeedbacks(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Anonymous', // Default to "Anonymous" if name is missing
            type: data.type || 'general', // Ensure type defaults to 'general' if missing
            ...data,
          } as Feedback;
        })
      );
    };
    fetchFeedbacks();
  }, []);

  const verifyFeedback = async (id: string) => {
    const feedbackDoc = doc(db, 'feedback', id);
    await updateDoc(feedbackDoc, { verified: true });
    alert('Feedback verified!');
    setFeedbacks(feedbacks.map((f) => (f.id === id ? { ...f, verified: true } : f)));
  };

  const unverifyFeedback = async (id: string) => {
    const feedbackDoc = doc(db, 'feedback', id);
    await updateDoc(feedbackDoc, { verified: false });
    alert('Feedback unverified!');
    setFeedbacks(feedbacks.map((f) => (f.id === id ? { ...f, verified: false } : f)));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-500 text-black fixed top-0 left-0 h-screen shadow-lg">
        <nav className="flex flex-col h-full">
          {['reviews', 'addAdmin', 'customers'].map((section) => (
            <button
              key={section}
              className={`p-4 text-left font-medium transition-all duration-300 hover:bg-yellow-400 ${
                activeSection === section ? 'bg-yellow-400 border-l-4 border-black' : ''
              }`}
              onClick={() => setActiveSection(section as typeof activeSection)}
            >
              {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeSection === 'reviews' && (
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-6">Reviews</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.map((feedback) => (
                <div
                  key={feedback.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-700 mb-1">{feedback.product}</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">By:</span> {feedback.name || 'Anonymous'} |{' '}
                    <span className="capitalize">{feedback.type}</span>
                  </p>
                  <p className="text-gray-600 mb-4">{feedback.feedback}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => verifyFeedback(feedback.id)}
                      disabled={feedback.verified}
                      className={`px-4 py-2 rounded text-sm ${
                        feedback.verified
                          ? 'bg-gray-500 cursor-not-allowed text-white'
                          : 'bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300'
                      }`}
                    >
                      {feedback.verified ? 'Verified' : 'Verify'}
                    </button>
                    {feedback.verified && (
                      <button
                        onClick={() => unverifyFeedback(feedback.id)}
                        className="px-4 py-2 bg-red-500 text-white hover:bg-red-400 rounded text-sm transition-all duration-300"
                      >
                        Unverify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeSection === 'addAdmin' && (
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Add Admin</h3>
            <p>Feature coming soon!</p>
          </div>
        )}
        {activeSection === 'customers' && (
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Customers</h3>
            <p>Feature coming soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}