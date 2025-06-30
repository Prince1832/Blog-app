import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ArrowLeft, LogOut, Menu } from 'lucide-react';

const AdminNavbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    router.push('/');
  };

  const handleBack = () => {
    router.back();
  };

  // Disable background scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-sm bg-gradient-to-r from-white via-blue-50 to-slate-300 border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          href="/admin"
          className="text-xl sm:text-2xl font-semibold text-blue-600 tracking-tight"
        >
          Admin Dashboard
        </Link>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex gap-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white px-4 py-2 rounded-md hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-300"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 p-2 rounded-md hover:bg-gray-200 transition"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu with animation */}
      <div
        className={`sm:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'
        }`}
      >
        <div className="px-4 pb-3 flex flex-col gap-2 bg-gradient-to-r from-white via-blue-50 to-slate-300 border-t border-gray-200">
          <button
            onClick={handleBack}
            className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md text-gray-800 hover:bg-gray-100"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-md text-red-600 hover:bg-red-100"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
