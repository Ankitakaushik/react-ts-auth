import React, { useState } from 'react';
import { authService } from '../Services/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken, setUserDetails } from '../Slice/AuthSlice';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async (event: { preventDefault: () => void; }) => {
    event.preventDefault()
    try {
      const response = await authService.signUp({ email, password });
      const { token } = response;
      if (token) {
        const details = {
          email,
          loginTime:new Date(Date.now()).toLocaleString()
        }
        dispatch(setToken(token));
        dispatch(setUserDetails(details));
        localStorage.setItem('token', token);
        localStorage.setItem('userDetails', JSON.stringify(details));
        navigate('/dashboard')
      } else alert('Unable to Sign Up. Please try agin!')
    } catch (error) {
      console.error('Sign Up Error:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSignUp} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
         required
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <div className='flex items-center flex-col'>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Sign Up
          </button>
          <span className='text-blue-500 py-2 cursor-pointer' onClick={() => navigate('/signin')}>Sign In</span>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
