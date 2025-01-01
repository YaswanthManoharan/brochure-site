'use client';
import { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function FeedbackForm() {
  const [form, setForm] = useState({ product: '', feedback: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'feedback'), { ...form, verified: false });
    alert('Feedback submitted!');
    setForm({ product: '', feedback: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={form.product}
        onChange={(e) => setForm({ ...form, product: e.target.value })}
        className="p-2 border border-gray-300"
        required
      />
      <textarea
        placeholder="Feedback"
        value={form.feedback}
        onChange={(e) => setForm({ ...form, feedback: e.target.value })}
        className="p-2 border border-gray-300"
        required
      ></textarea>
      <button type="submit" className="bg-green-500 text-white px-4 py-2">Submit</button>
    </form>
  );
}