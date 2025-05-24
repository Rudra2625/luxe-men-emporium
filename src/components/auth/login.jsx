import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Replace this with your real login API logic
        console.log('Logging in with:', formData);

        // Redirect after login (simulate success)
        navigate('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f8f6f4] to-[#f1e9dd] px-4">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl transition-all duration-500 ease-in-out">
                <h2 className="text-3xl font-bold text-center text-luxe-navy font-serif mb-6">Welcome Back</h2>
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

                    {/* ✅ Added mt-4 to push button down */}
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
