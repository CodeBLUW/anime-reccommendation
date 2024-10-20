import React from 'react';
import { Link } from 'react-router-dom';
import { Tv, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, signIn, signOut } = useAuth();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="bg-indigo-600 dark:bg-indigo-900 text-white shadow-md"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Tv size={24} />
          <span className="text-xl font-bold">AnimeRec</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-indigo-200">Home</Link></li>
            <li><Link to="/recommendations" className="hover:text-indigo-200">Recommendations</Link></li>
            <li><Link to="/browse" className="hover:text-indigo-200">Browse</Link></li>
            <li><Link to="/profile" className="hover:text-indigo-200">Profile</Link></li>
          </ul>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-800">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          {user ? (
            <button onClick={signOut} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
              Sign Out
            </button>
          ) : (
            <button onClick={signIn} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
              Sign In
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  );
};

export default Header;