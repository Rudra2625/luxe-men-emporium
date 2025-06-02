import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authslice'
import { USER_API_END_POINT } from '../utils/constant';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ Send form data to the backend
      const res = await axios.post(`${USER_API_END_POINT}login`, formData);
      console.log('Login success:', res.data);
      localStorage.setItem('token', res.data.token);
      dispatch(setUser(res.data.user));
      // Redirect on success
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f8f6f4] to-[#f1e9dd] px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-luxe-navy font-serif mb-6">Welcome Back</h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-luxe-navy mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-luxe-gold transition-all duration-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-luxe-navy mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl mt-1 focus:outline-none focus:ring-2 focus:ring-luxe-gold transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-luxe-gold text-white font-semibold rounded-xl mt-4 hover:bg-yellow-600 transition-all duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-luxe-gold font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
  