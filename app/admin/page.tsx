'use client';
import { useState } from 'react';
import { User, signInWithPopup } from 'firebase/auth';
import { auth, GoogleAuthProvider, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isAdmin) {
          setUser(user);
          setIsAdmin(true);
        } else {
          setUser(user);
          setIsAdmin(false);
        }
      } else {
        setUser(user);
        setIsAdmin(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsAdmin(false);
    }
  };

  if (user && isAdmin === true) {
    return (
      <section className="h-screen bg-gray-100 flex items-center justify-center">
        <AdminDashboard userId={user.uid} />
      </section>
    );
  }

  return (
    <section className="h-screen bg-gray-100 flex items-center justify-center">
      {!user ? (
        <button onClick={handleLogin} className="bg-blue-500 text-white p-3 rounded">
          Login with Google
        </button>
      ) : (
        <p className="text-red-500 font-bold">
          {isAdmin === false ? 'You are not authorized to access this page. Only admins can access the admin dashboard.' : 'Loading...'}
        </p>
      )}
    </section>
  );
}