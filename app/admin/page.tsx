'use client';
import { useState, useEffect } from 'react';
import { User, signInWithPopup } from 'firebase/auth';
import { auth, GoogleAuthProvider, db } from '../utils/firebase';
import { doc, getDoc } from 'firebase/firestore';
import AdminDashboard from '../components/AdminDashboard';

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  // Use Firebase's onAuthStateChanged to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          setUser(currentUser);
          setIsAdmin(userData.isAdmin);
        } else {
          setUser(currentUser);
          setIsAdmin(false); // If no user data, assume non-admin
        }
      } else {
        setUser(null);
        setIsAdmin(null);
      }
      setLoading(false); // Set loading to false once the authentication state is checked
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

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

  // Show loading UI while authentication state is being checked
  if (loading) {
    return (
      <section className="h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-bold">Loading...</div> {/* Explicit Loading UI */}
      </section>
    );
  }

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
