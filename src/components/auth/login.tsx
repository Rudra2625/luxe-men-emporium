import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../../services/api';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useToast } from '../ui/use-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/authslice';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();
    const dispatch = useDispatch();
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            console.log('Attempting login with:', { email }); // Don't log password
            const data = await userAPI.login(email, password);
            console.log('Login response in component:', data);
            
            if (data && data.token && data.user) {
                console.log('Login successful, setting up auth...', {
                    token: data.token,
                    user: data.user
                });
                
                // Update Auth Context with token and user data
                login(data.token, data.user);
                
                // Update Redux state
                dispatch(setUser(data.user));
                
                toast({
                    title: 'Success',
                    description: 'Logged in successfully',
                });
                
                // Navigate after state updates
                navigate('/products');
            } else {
                console.error('Invalid login response:', data);
                throw new Error('Invalid login response');
            }
        } catch (error: any) {
            console.error('Login error details:', {
                message: error.message,
                response: error.response?.data,
                status: error.response?.status
            });
            
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.response?.data?.message || error.message || 'Invalid email or password',
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
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <Input
                                type="email"
                                required
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mb-4"
                            />
                        </div>
                        <div>
                            <Input
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                    
                    <div className="text-center mt-4">
                        <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login; 