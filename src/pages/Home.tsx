import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimeScene3D from '../components/3DAnimeScene';

const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="text-center"
    >
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to AnimeRec</h1>
      <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">Discover your next favorite anime, manga, manhwa, or webtoon!</p>
      <AnimeScene3D />
      <div className="space-x-4 mt-8">
        <Link to="/recommendations" className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition duration-300">
          Get Recommendations
        </Link>
        <Link to="/browse" className="bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300">
          Browse Catalog
        </Link>
      </div>
    </motion.div>
  );
};

export default Home;