
import React from 'react';
import { motion } from 'framer-motion';

interface GravityTextProps {
  text: string;
  className?: string;
}

const GravityText: React.FC<GravityTextProps> = ({ text, className }) => {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap gap-x-4 ${className}`}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block cursor-default"
          whileHover={{ 
            y: [0, -20, 10, -5, 0],
            rotate: [0, 5, -5, 2, 0],
            transition: { duration: 0.5 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
};

export default GravityText;
