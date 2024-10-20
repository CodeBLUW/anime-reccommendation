import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Profile: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="text-center text-gray-900 dark:text-white"
      >
        <h1 className="text-3xl font-bold mb-4">Please sign in to view your profile</h1>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <img src={user.photoURL || ''} alt={user.displayName || 'User'} className="w-16 h-16 rounded-full mr-4" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.displayName}</h2>
            <p className="text-gray-600 dark:text-gray-400">Joined: {user.metadata.creationTime}</p>
          </div>
        </div>
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Your Preferences</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-md text-sm">Action</span>
          <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-md text-sm">Romance</span>
          <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-md text-sm">Sci-Fi</span>
        </div>
        <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">Recently Viewed</h3>
        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li>Anime Title 1</li>
          <li>Manga Title 2</li>
          <li>Webtoon Title 3</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Profile;