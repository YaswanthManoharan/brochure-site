'use client';
import { useState } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addDoc(collection(db, 'contactUs'), form);
    alert('Message sent!');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="p-2 border border-gray-300"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="p-2 border border-gray-300"
        required
      />
      <textarea
        placeholder="Message"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="p-2 border border-gray-300"
        required
      ></textarea>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Send</button>
    </form>
  );
}