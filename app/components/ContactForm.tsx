'use client';
import { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

const defaultFormState = { name: '', email: '', message: '', contacted_status: false };

export default function ContactForm() {
  const [form, setForm] = useState(defaultFormState);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'contactUs'), form);
    alert('Thank you! We will contact you within 24 hours.');
    setForm(defaultFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
      <p className="text-gray-600 mb-6">
        Leave your details and message. We’ll get back to you as soon as possible.
      </p>
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      />
      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="p-3 w-full rounded-md border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
        required
      ></textarea>
      <button
        type="submit"
        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-md shadow hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
      >
        Send Message
      </button>
    </form>
  );
}