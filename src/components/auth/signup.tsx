import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phonenumber: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await userAPI.signup(formData);
            toast({
                title: 'Success',
                description: 'Account created successfully',
            });
            navigate('/login');
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || 'Something went wrong',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <Input
                                type="text"
                                name="name"
                                required
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mb-4"
                            />
                        </div>
                        <div>
                            <Input
                                type="email"
                                name="email"
                                required
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="mb-4"
                            />
                        </div>
                        <div>
                            <Input
                                type="tel"
                                name="phonenumber"
                                required
                                placeholder="Phone Number"
                                value={formData.phonenumber}
                                onChange={handleChange}
                                className="mb-4"
                                minLength={10}
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                minLength={6}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </Button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-blue-600 hover:text-blue-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup; 