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

      console.log(user);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.isAdmin) {
          setUser(user);
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
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
        <AdminDashboard />
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
        <p>{isAdmin === false ? 'You are not authorized.' : 'Loading...'}</p>
      )}
    </section>
  );
}
