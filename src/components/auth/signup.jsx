
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearError } from '../redux/slices/authSlice';
import { selectAuthLoading, selectAuthError } from '../redux/authSelector';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [form, setForm] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearError());

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const result = await dispatch(registerUser({
        fullname: form.fullname,
        email: form.email,
        phonenumber: form.phonenumber,
        password: form.password,
      })).unwrap();

      console.log('Registration success:', result);
      navigate('/');
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-3xl font-serif font-bold text-center text-luxe-navy mb-6">
          Create <span className="text-luxe-gold">Account</span>
        </h2>

        {error && (
          <div className="text-red-600 text-sm mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-luxe-navy font-medium">Full Name</label>
            <input
              type="text"
              name="fullname"
              value={form.fullname}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-luxe-navy font-medium">Phone Number</label>
            <input
              type="tel"
              name="phonenumber"
              value={form.phonenumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-luxe-navy font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-luxe-navy font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-luxe-navy font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-luxe-navy text-white font-semibold py-2 rounded-lg hover:bg-luxe-gold hover:text-luxe-navy transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-sm text-center text-luxe-navy mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-luxe-gold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
