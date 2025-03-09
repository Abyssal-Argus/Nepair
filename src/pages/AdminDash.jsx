import React, { useState, useEffect } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase"; // Import Firestore instance
import './AdminDash.css';
import Navbar from '../components/Navbar';  // As you're going one level up



const AdminDash = () => {
  const [users, setUsers] = useState([]); // State for users
  const [pendingAdmins, setPendingAdmins] = useState([]); // State for pending admins

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(usersData);
  };

  // Fetch pending admins from Firestore
  const fetchPendingAdmins = async () => {
    const adminsCollection = collection(db, 'users');
    const adminsSnapshot = await getDocs(adminsCollection);
    const adminsData = adminsSnapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => user.role === 'admin' && user.status === 'pending'); // Filter pending admins
    setPendingAdmins(adminsData);
  };

  // Approve a pending admin
  const handleApprove = async (id) => {
    const adminDoc = doc(db, 'users', id);
    await updateDoc(adminDoc, { status: 'approved' }); // Update status in Firestore
    setPendingAdmins(pendingAdmins.filter(admin => admin.id !== id)); // Remove from local state
    alert('Admin approved!');
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUsers();
    fetchPendingAdmins();
  }, []);

  return (
    <div >
      <Navbar /> {/* Include the Navbar component here */}
      <div className='admin-dashboard'>
      <h1>Admin Dashboard</h1>

{/* Display number of users signed up */}
<div className="stats">
  <h2>Number of Users Signed Up: {users.length}</h2>
</div>

{/* Display full names of users in a table */}
<div className="user-table">
  <h2>Users</h2>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Display pending admins with email and approve button */}
<div className="pending-admins">
  <h2>Pending Admins: {pendingAdmins.length}</h2>
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {pendingAdmins.map(admin => (
        <tr key={admin.id}>
          <td>{admin.email}</td>
          <td>
            <button onClick={() => handleApprove(admin.id)}>Approve</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default AdminDash;