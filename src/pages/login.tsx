import { useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data;
      try {
        data = await res.json();
      } catch {
        toast.error('Invalid server response');
        return;
      }

      if (!res.ok) {
        toast.error(data.message || 'Login failed');
        return;
      }

      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      toast.success('Login successful');
      setEmail('');
      setPassword('');
      router.push('/admin');
    } catch (error) {
      toast.error('An error occurred during login');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Admin Login</h2>

        <div className="relative mb-4">
          <span className="absolute left-3 top-3 text-gray-500">
            <Mail size={18} />
          </span>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>


        <div className="relative mb-6">
          <span className="absolute left-3 top-3 text-gray-500">
            <Lock size={18} />
          </span>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div
            className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>


        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              Logging in...
            </>
          ) : (
            'Login'
          )}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{' '}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
