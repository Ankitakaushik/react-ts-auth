import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from '../Services/api';
import { setToken, setUserDetails } from '../Slice/AuthSlice';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    try {
      const response = await authService.signIn({ email, password });
      const { token  } = response;
      if (token) {
        const details = {
          email,
          loginTime: new Date(Date.now()).toLocaleString()
        }
        dispatch(setToken(token));
        dispatch(setUserDetails(details));
        localStorage.setItem('token', token)
        localStorage.setItem('userDetails', JSON.stringify(details));
        navigate('/dashboard')
      } else alert('Unable to Sign In. Please try agin!')
    } catch (error) {
      alert(`Sign In Error: ${error}`);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn} className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <label className="block text-sm font-medium text-gray-700">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <div className='flex items-center flex-col'>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Sign In
          </button>
          <span className='text-blue-500 py-2 cursor-pointer' onClick={() => navigate('/signup')}>Sign Up</span>
        </div>
      </form>
    </div>
  );
};

export default SignInPage;
