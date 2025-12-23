
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, className, delay = 0 }) => {
  const words = text.split(' ');

  return (
    <div className={`flex flex-wrap gap-x-6 gap-y-4 cursor-default select-none ${className}`} style={{ perspective: '2000px' }}>
      {words.map((word, wordIdx) => (
        <div key={wordIdx} className="flex flex-wrap">
          {word.split('').map((char, charIdx) => {
            const charDelay = delay + (wordIdx * 0.1) + (charIdx * 0.03);
            return (
              <motion.span
                key={charIdx}
                initial={{ 
                  y: 150, 
                  opacity: 0, 
                  rotateX: -110, 
                  z: -500,
                  filter: 'blur(25px)' 
                }}
                whileInView={{ 
                  y: 0, 
                  opacity: 1, 
                  rotateX: 0, 
                  z: 0,
                  filter: 'blur(0px)',
                }}
                transition={{
                  duration: 1.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: charDelay,
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.3, 
                  color: '#ef4444',
                  z: 100,
                  rotateY: [0, -15, 15, 0],
                  transition: { duration: 0.4, ease: "easeOut" }
                }}
                className="font-black tracking-tight inline-block will-change-transform"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default AnimatedHeading;
