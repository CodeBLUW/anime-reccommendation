import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimeCard from '../components/AnimeCard';
import axios from 'axios';

interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
    };
  };
  genres: Array<{ name: string }>;
  score: number;
  aired: {
    from: string;
    to: string;
  };
  synopsis: string;
}

const Browse: React.FC = () => {
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeList = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://api.jikan.moe/v4/anime');
        setAnimeList(response.data.data);
      } catch (error) {
        console.error('Error fetching anime list:', error);
        setError('Failed to fetch anime list. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnimeList();
  }, []);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag);
  };

  const filteredAndSortedAnimeList = animeList
    .filter(anime =>
      anime.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedTag ? anime.genres.some(genre => genre.name === selectedTag) : true)
    )
    .sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'rating') {
        return b.score - a.score;
      }
      return 0;
    });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Browse Catalog</h1>
      <div className="mb-4 flex space-x-4">
        <input
          type="text"
          placeholder="Search titles..."
          className="flex-grow p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>
      {selectedTag && (
        <div className="mb-4">
          <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 px-2 py-1 rounded-md text-sm">
            {selectedTag} <button onClick={() => setSelectedTag('')}>×</button>
          </span>
        </div>
      )}
      {isLoading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredAndSortedAnimeList.map((anime) => (
          <AnimeCard
            key={anime.mal_id}
            title={anime.title}
            image={anime.images.jpg.image_url}
            genre={anime.genres[0]?.name || 'N/A'}
            rating={anime.score}
            releaseDate={anime.aired.from ? new Date(anime.aired.from).toLocaleDateString() : 'N/A'}
            endDate={anime.aired.to ? new Date(anime.aired.to).toLocaleDateString() : 'Ongoing'}
            tags={anime.genres.map(g => g.name)}
            synopsis={anime.synopsis}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Browse;