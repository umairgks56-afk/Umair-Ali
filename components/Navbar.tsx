
import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../App';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ${isScrolled ? `py-4 ${isDark ? 'bg-black/80 border-white/5' : 'bg-white/90 border-gray-100'} backdrop-blur-xl border-b shadow-sm` : 'py-10 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className={`absolute inset-0 border-2 border-red-500 rounded-full border-t-transparent`} 
            />
            <div className={`absolute inset-0 flex items-center justify-center font-black text-xl ${isDark ? 'text-white' : 'text-black'}`}>
              <span className="text-red-600">G</span>C
            </div>
          </div>
          <div className="flex flex-col leading-none">
            <span className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>GRAPHIC C</span>
            <span className="text-[8px] font-black tracking-[0.4em] text-red-600 uppercase">Architecture</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-12 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path} 
              className={`text-[10px] uppercase tracking-[0.4em] font-black transition-all hover:text-red-500 ${location.pathname === link.path ? 'text-red-500' : (isDark ? 'text-gray-400' : 'text-black')}`}
            >
              {link.name}
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full border ${isDark ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'} transition-colors`}
            aria-label="Toggle Theme"
          >
            {isDark ? (
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
            ) : (
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
            )}
          </button>

          <Link to="/contact" className={`px-8 py-3 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} hover:bg-red-600 hover:text-white rounded-full text-[10px] font-black tracking-widest transition-all transform hover:scale-105 active:scale-95 shadow-md`}>
            LET'S TALK
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 ${isDark ? 'text-white' : 'text-black'} focus:outline-none flex items-center gap-4`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 relative flex flex-col justify-between">
            <motion.span animate={isMobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`} />
            <motion.span animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }} className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`} />
            <motion.span animate={isMobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} className={`w-full h-0.5 ${isDark ? 'bg-white' : 'bg-black'} rounded-full`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className={`fixed inset-0 ${isDark ? 'bg-black' : 'bg-white'} z-[110] p-10 flex flex-col justify-center space-y-8 md:hidden`}
          >
            <div className="absolute top-10 right-10 flex items-center gap-6">
              <button onClick={toggleTheme} className={`p-4 border ${isDark ? 'border-white/10 text-white' : 'border-black/10 text-black'} rounded-full font-black text-xs`}>
                {isDark ? 'LIGHT MODE' : 'DARK MODE'}
              </button>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-red-500 font-black">CLOSE</button>
            </div>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-5xl font-black ${isDark ? 'text-white' : 'text-black'} tracking-tighter hover:text-red-500 transition-colors`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
