import React, { useEffect, useState } from 'react';
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

const Recommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Anime[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // For now, we'll just fetch top anime as recommendations
        const response = await axios.get('https://api.jikan.moe/v4/top/anime');
        setRecommendations(response.data.data.slice(0, 10)); // Limit to top 10
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        setError('Failed to fetch recommendations. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Your Recommendations</h1>
      <p className="mb-4 text-gray-700 dark:text-gray-300">Based on top-rated anime, we think you'll love these titles:</p>
      {isLoading && <p className="text-center">Loading recommendations...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((anime) => (
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
          />
        ))}
      </div>
    </motion.div>
  );
};

export default Recommendations;