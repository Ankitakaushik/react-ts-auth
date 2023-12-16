// src/pages/DashboardPage.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../Slice/AuthSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../component/ConfirmationModal';

const DashboardPage: React.FC = () => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userDetails = useSelector((state : any) => state.auth.userDetails)
  const getUserDetailsFromLocalStorage =  localStorage.getItem('userDetails')
  const user = userDetails || JSON.parse(getUserDetailsFromLocalStorage || '{}')

  const handleLogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userDetails')
    dispatch(signOut())
    navigate('/signin')
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">My Dashboard App</h1>
        <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 ml-auto" onClick={() => setShowConfirmationModal(true)}>Log Out</button>
      </header>
      <div className="min-h-screen flex bg-gray-100">
      <aside className="w-64 bg-gray-800 p-4">
        <h1 className="text-white text-2xl font-semibold">Dashboard</h1>
      </aside>

      <main className="flex-1 p-4">
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Welcome to the Dashboard</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">User Email</h3>
              <span className="font-semibold">{user?.email}</span>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">User Login Time</h3>
              <span className="font-semibold">{user?.loginTime}</span>
            </div>
          </div>
        </div>
        <ConfirmationModal
          isOpen={showConfirmationModal}
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleLogOut}
          title='Log Out Confirmation'
          message='Are you sure you want to Log Out?'
        />
      </main>
    </div>
      <footer className="bg-gray-300 text-gray-600 p-4 text-center">
        &copy; 2023 My Dashboard App
      </footer>
    </div>
  );
};

export default DashboardPage;
