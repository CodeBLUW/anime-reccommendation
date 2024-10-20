import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AnimeCardProps {
  title: string;
  image: string;
  genre: string;
  rating: number;
  releaseDate: string;
  endDate: string;
  tags: string[];
  synopsis: string;
  onTagClick: (tag: string) => void;
}

const AnimeCard: React.FC<AnimeCardProps> = ({
  title,
  image,
  genre,
  rating,
  releaseDate,
  endDate,
  tags,
  synopsis,
  onTagClick
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden relative"
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{genre} • {rating.toFixed(1)}/10</p>
      </div>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black bg-opacity-75 p-4 text-white overflow-y-auto"
        >
          <h4 className="font-bold mb-2">{title}</h4>
          <p className="text-sm mb-2">Released: {releaseDate} - {endDate}</p>
          <p className="text-sm mb-2">Rating: {rating.toFixed(1)}/10</p>
          <div className="mb-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => onTagClick(tag)}
                className="inline-block bg-indigo-500 rounded-full px-2 py-1 text-xs mr-2 mb-2 hover:bg-indigo-600"
              >
                {tag}
              </button>
            ))}
          </div>
          <p className="text-sm">{synopsis}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimeCard;