
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface WelcomeScreenProps {
  onComplete: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 20);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div 
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 overflow-hidden"
        >
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
            UMAIR <span className="text-red-600">ALI</span>
          </h1>
          <p className="text-center text-[10px] tracking-[1em] text-gray-500 uppercase mt-4">
            Senior Graphic Designer
          </p>
        </motion.div>

        <div className="w-64 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-red-600"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 font-mono text-[10px] text-red-600">
          {progress}% SYNCED
        </div>
      </div>
      
      <div className="absolute bottom-10 left-10 text-[8px] font-black tracking-widest text-white/20 uppercase">
        PORTFOLIO v2.5.0 // 2024
      </div>
    </motion.div>
  );
};

export default WelcomeScreen;