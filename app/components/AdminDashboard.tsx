'use client';
import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

type Feedback = {
  id: string;
  name?: string;
  type: 'product' | 'general';
  product: string;
  feedback: string;
  verified: boolean;
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

export default function AdminDashboard({ userId }: { userId: string }) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [activeSection, setActiveSection] = useState<'reviews' | 'addOrRemoveRoles' | 'customers'>('reviews');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);

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

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-yellow-500 text-black fixed top-0 left-0 h-screen shadow-lg">
        <nav className="flex flex-col h-full">
          {['reviews', 'customers', ...(isSuperAdmin ? ['addOrRemoveRoles'] : [])].map((section) => (
            <button
              key={section}
              className={`p-4 text-left font-medium transition-all duration-300 hover:bg-yellow-400 ${activeSection === section ? 'bg-yellow-400 border-l-4 border-black' : ''
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
              ))}
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
    </div>
  );
}