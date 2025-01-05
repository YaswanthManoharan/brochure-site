'use client';
import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase'; // Assuming you have initialized Firebase Auth in utils/firebase.js

type Feedback = {
  id: string;
  name?: string;
  type: 'product' | 'general';
  product: string[];
  feedback: string;
  verified: boolean;
  generalCategory: string;
  formattedtime: string;
};

type Contact = {
  id: string;
  name: string;
  email: string;
  message: string;
  contacted_status: boolean;
};

type User = {
  id: string;
  email: string;
  isAdmin: boolean;
  isSuperAdmin: boolean;
};

type FirestoreTimestamp = {
  seconds: number;
  nanoseconds: number;
};

export default function AdminDashboard({ userId }: { userId: string }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<'reviews' | 'addOrRemoveRoles' | 'customers'>('reviews');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false); // State for menu toggling

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const querySnapshot = await getDocs(collection(db, 'feedback'));
      setFeedbacks(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Anonymous',
            type: data.type || 'general',
            formattedtime: convertTimestampToDate(data.timestamp) || 'Date Unknown',
            ...data,
          } as Feedback;
        })
      );
    };

    const fetchContacts = async () => {
      const querySnapshot = await getDocs(collection(db, 'contactUs'));
      setContacts(
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Anonymous',
            email: data.email,
            message: data.message,
            contacted_status: data.contacted_status || false,
          } as Contact;
        })
      );
    };

    const convertTimestampToDate = (timestamp: FirestoreTimestamp | undefined) => {
      if (!timestamp || typeof timestamp.seconds === 'undefined') {
        return 'Unknown date'; // Handle missing or invalid timestamp
      }
      const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
      return date.toLocaleString(); // Convert to a human-readable string
    };

    // Example usage:
    const timestamp = { seconds: 1736080554, nanoseconds: 723000000 };
    const formattedDate = convertTimestampToDate(timestamp);
    console.log(formattedDate); // Outputs: "1/5/2025, 6:05:54 PM" (format depends on locale)


    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userDocs = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email,
          isAdmin: data.isAdmin || false,
          isSuperAdmin: data.isSuperAdmin || false,
        } as User;
      });

      setUsers(userDocs);

      // Assuming the logged-in user has an id 'currentUserId', fetch their details
      const currentUser = userDocs.find((user) => user.id === userId);
      if (currentUser) {
        setIsSuperAdmin(currentUser.isSuperAdmin);
      }
    };

    fetchFeedbacks();
    fetchContacts();
    fetchUsers();
  }, [userId]);

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

  const changeContactStatus = async (id: string, status: boolean) => {
    const contactDoc = doc(db, 'contactUs', id);
    await updateDoc(contactDoc, { contacted_status: !status });
    setContacts(
      contacts.map((c) =>
        c.id === id ? { ...c, contacted_status: !status } : c
      )
    );
    alert(`Contact status changed to ${!status ? 'Contacted' : 'Not yet contacted'}`);
  };

  const updateUserRole = async (id: string, isAdmin: boolean) => {
    const userDoc = doc(db, 'users', id);
    await updateDoc(userDoc, { isAdmin });
    setUsers(users.map((u) => (u.id === id ? { ...u, isAdmin } : u)));
    alert(`User role updated to ${isAdmin ? 'Admin' : 'User'}`);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert('You have successfully logged out.');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  return (
    <div className="w-full flex flex-col h-full">
      {/* Navbar */}
      <header className="bg-yellow-500 text-black p-4 shadow-md">
        <nav className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <div className="flex space-x-4 lg:hidden">
            {/* Hamburger Menu for small screens */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-black text-2xl">
              &#9776;
            </button>
          </div>
          {/* Menu for larger screens */}
          <div className="hidden lg:flex space-x-4">
            {['reviews', 'customers', ...(isSuperAdmin ? ['addOrRemoveRoles'] : [])].map((section) => (
              <button
                key={section}
                className={`text-black font-medium transition-all duration-300 hover:bg-yellow-400 p-2 rounded ${activeSection === section ? 'bg-yellow-400 border-b-4 border-black' : ''
                  }`}
                onClick={() => setActiveSection(section as typeof activeSection)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="text-black font-medium transition-all duration-300 hover:bg-red-400 p-2 rounded"
            >
              Logout
            </button>
          </div>
        </nav>
        {/* Collapsible menu for small screens */}
        {menuOpen && (
          <div className="lg:hidden mt-4 bg-yellow-500 p-4">
            {['reviews', 'customers', ...(isSuperAdmin ? ['addOrRemoveRoles'] : [])].map((section) => (
              <button
                key={section}
                className={`block text-black font-medium transition-all duration-300 hover:bg-yellow-400 p-2 rounded ${activeSection === section ? 'bg-yellow-400 border-b-4 border-black' : ''
                  }`}
                onClick={() => {
                  setActiveSection(section as typeof activeSection);
                  setMenuOpen(false); // Close menu after selection
                }}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
              </button>
            ))}
            {/* Logout Button for mobile */}
            <button
              onClick={handleLogout}
              className="block text-black font-medium transition-all duration-300 hover:bg-red-400 p-2 rounded"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {activeSection === 'reviews' && (
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-6">Reviews</h3>

            {/* Product Reviews Section */}
            <h4 className="text-xl font-bold text-gray-700 mb-4">Product Reviews</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.filter((feedback) => feedback.type === 'product').length === 0 ? (
                <p className="text-center text-gray-500 col-span-full">No Product reviews yet...</p>
              ) : (
                feedbacks
                  .filter((feedback) => feedback.type === 'product')
                  .sort((a, b) => Number(a.verified) - Number(b.verified)) // Convert boolean to number for sorting
                  .map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-lg font-semibold text-gray-700 mb-1">{feedback.name || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-medium">Products:</span> {feedback.product.join(', ')}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        <span className="font-medium">Recorded Time: </span>{feedback.formattedtime}
                      </p>
                      <p className="text-gray-600 mb-4">{feedback.feedback}</p>
                      <div className="flex justify-between items-center space-x-4">
                        <button
                          onClick={() => verifyFeedback(feedback.id)}
                          disabled={feedback.verified}
                          className={`w-full px-4 py-2 rounded text-sm ${feedback.verified
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : 'bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300'
                            }`}
                        >
                          {feedback.verified ? 'Verified' : 'Verify'}
                        </button>
                        {feedback.verified && (
                          <button
                            onClick={() => unverifyFeedback(feedback.id)}
                            className="w-full px-4 py-2 bg-red-500 text-white hover:bg-red-400 rounded text-sm transition-all duration-300"
                          >
                            Unverify
                          </button>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>

            {/* Divider */}
            <div className="border-t-2 border-yellow-600 my-6"></div>

            {/* General Reviews Section */}
            <h4 className="text-xl font-bold text-gray-700 mt-8 mb-4">General Reviews</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {feedbacks.filter((feedback) => feedback.type === 'general').length === 0 ? (
                <p className="text-center text-gray-500 col-span-full">No General reviews yet...</p>
              ) : (
                feedbacks
                  .filter((feedback) => feedback.type === 'general')
                  .sort((a, b) => Number(a.verified) - Number(b.verified)) // Convert boolean to number for sorting
                  .map((feedback) => (
                    <div
                      key={feedback.id}
                      className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                    >
                      <h4 className="text-lg font-semibold text-gray-700 mb-1">{feedback.name || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-500 mb-4">
                        <span className="font-medium">Category:</span> {feedback.generalCategory}
                      </p>
                      <p className="text-gray-500 text-sm mb-2">
                        <span className="font-medium">Recorded Time: </span>{feedback.formattedtime}
                      </p>
                      <p className="text-gray-600 mb-4">{feedback.feedback}</p>
                      <div className="flex justify-between items-center space-x-4">
                        <button
                          onClick={() => verifyFeedback(feedback.id)}
                          disabled={feedback.verified}
                          className={`w-full px-4 py-2 rounded text-sm ${feedback.verified
                            ? 'bg-gray-500 cursor-not-allowed text-white'
                            : 'bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300'
                            }`}
                        >
                          {feedback.verified ? 'Verified' : 'Verify'}
                        </button>
                        {feedback.verified && (
                          <button
                            onClick={() => unverifyFeedback(feedback.id)}
                            className="w-full px-4 py-2 bg-red-500 text-white hover:bg-red-400 rounded text-sm transition-all duration-300"
                          >
                            Unverify
                          </button>
                        )}
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        )}

        {activeSection === 'customers' && (
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-6">Customers</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="text-lg font-semibold text-gray-700 mb-1">{contact.name}</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    <span className="font-medium">Email:</span> {contact.email}
                  </p>
                  <p className="text-gray-600 mb-4">{contact.message}</p>
                  <div className="flex justify-between items-center space-x-4">
                    <button
                      disabled={contact.contacted_status}
                      className={`w-full px-4 py-2 rounded text-sm ${contact.contacted_status
                        ? 'bg-green-600 cursor-not-allowed text-white'
                        : 'bg-gray-400 text-black transition-all duration-300'
                        }`}
                    >
                      {contact.contacted_status ? 'Contacted' : 'Not yet contacted'}
                    </button>
                    <button
                      onClick={() => changeContactStatus(contact.id, contact.contacted_status)}
                      className="w-full px-4 py-2 bg-blue-500 text-white hover:bg-blue-400 rounded text-sm transition-all duration-300"
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isSuperAdmin && activeSection === 'addOrRemoveRoles' && (
          <div>
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">Add or Remove Roles</h3>
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">Current Admins</h4>
              <ul className="list-disc pl-5">
                {users.filter((user) => user.isAdmin).map((user) => (
                  <li key={user.id} className="text-gray-600">
                    {user.email}
                    {user.isSuperAdmin && <span className="text-sm text-yellow-600 ml-2">(SuperAdmin)</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Add Admin</h4>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                >
                  <option value="">Select a user</option>
                  {users.filter((user) => !user.isAdmin).map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.email}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => updateUserRole(selectedUser, true)}
                  className="w-full px-4 py-2 bg-green-500 text-white hover:bg-green-400 rounded-md"
                >
                  Add Admin
                </button>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-700 mb-2">Remove Admin</h4>
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
                >
                  <option value="">Select an admin</option>
                  {users
                    .filter((user) => user.isAdmin && !user.isSuperAdmin)
                    .map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.email}
                      </option>
                    ))}
                </select>
                <button
                  onClick={() => updateUserRole(selectedUser, false)}
                  className="w-full px-4 py-2 bg-red-500 text-white hover:bg-red-400 rounded-md"
                >
                  Remove Admin
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-yellow-400 text-black py-4 mt-6">
        <div className="text-center">
          <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}