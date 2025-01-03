'use client';
// pages/admin.tsx
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, GoogleAuthProvider, db } from '../utils/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
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

  // Return the admin dashboard if the user is an admin
  if (user && isAdmin === true) {
    return (
      <section className="h-screen bg-gray-100 flex items-center justify-center">
        <AdminDashboard />
      </section>
    );
  }

  // Return the login button or an error message
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
