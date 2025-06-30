import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Link from 'next/link';
import { User, Mail, Lock, Loader2 } from 'lucide-react';


const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      toast.error('All fields are required!');
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('/api/auth/register', formData);
      const { token } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', 'true');
      toast.success('Registered successfully!');
      router.push('/admin');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">

      
          <div className="relative">
            {/* <label className="block mb-1 text-gray-700">Username</label> */}
            <span className="absolute left-3 top-3 text-gray-500">
              <User size={18} />
            </span>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        
          <div className="relative">
            {/* <label className="block mb-1 text-gray-700">Email</label> */}
            <span className="absolute left-3 top-3 text-gray-500">
              <Mail size={18} />
            </span>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            {/* <label className="block mb-1 text-gray-700">Password</label> */}
            <span className="absolute left-3 top-3 text-gray-500">
              <Lock size={18} />
            </span>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all duration-300 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>


        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
