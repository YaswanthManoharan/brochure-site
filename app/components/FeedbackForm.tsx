'use client';
import { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function FeedbackForm() {
  const [form, setForm] = useState({ product: '', feedback: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'feedback'), { ...form, verified: false });
    alert('Thank you for your valuable feedback!');
    setForm({ product: '', feedback: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Submit Your Feedback</h2>
      <p className="text-gray-600 mb-6">
        Please fill in the form below to share your valuable thoughts.
      </p>
      <input
        type="text"
        placeholder="Product Name"
        value={form.product}
        onChange={(e) => setForm({ ...form, product: e.target.value })}
        className="p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />
      <textarea
        placeholder="Feedback"
        value={form.feedback}
        onChange={(e) => setForm({ ...form, feedback: e.target.value })}
        className="p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-md shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        Submit Feedback
      </button>
    </form>
  );
}