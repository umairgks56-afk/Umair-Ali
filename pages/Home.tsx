
import React, { useRef, useState, useEffect, useContext } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PROJECTS, SERVICES, SOFTWARE_STACK, WHATSAPP_NUMBER } from '../constants';
import AnimatedHeading from '../components/AnimatedHeading';
import { ThemeContext } from '../App';

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2000&auto=format&fit=crop", 
  "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2000&auto=format&fit=crop"
];

const BackgroundSlider = () => {
  const { isDark } = useContext(ThemeContext);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: isDark ? 0.3 : 0.06, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          <img 
            src={HERO_IMAGES[index]} 
            alt="Design Context" 
            className={`w-full h-full object-cover grayscale transition-all duration-1000 ${isDark ? 'brightness-100 opacity-100' : 'brightness-[2.2] contrast-[1.4]'}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent ${isDark ? 'to-[#050505]' : 'to-white'} transition-colors duration-1000`} />
    </div>
  );
};

const Home: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const mouseX = useMotionValue(window.innerWidth / 2);
  const mouseY = useMotionValue(window.innerHeight / 2);

  const springConfig = { stiffness: 35, damping: 20, mass: 1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const textX = useTransform(smoothMouseX, [0, window.innerWidth], [-20, 20]);
  const textY = useTransform(smoothMouseY, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <main className={`relative z-10 selection:bg-red-600 min-h-screen transition-colors duration-1000 ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <BackgroundSlider />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            style={{ x: textX, y: textY }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto text-center"
          >
            <motion.div variants={itemVariants} className="flex items-center justify-center space-x-4 mb-10">
              <span className="w-12 h-px bg-red-600" />
              <span className="text-[10px] font-black tracking-[0.8em] uppercase text-red-600">Pure Graphic Architecture</span>
              <span className="w-12 h-px bg-red-600" />
            </motion.div>

            <div className="mb-16">
              <AnimatedHeading 
                text="UMAIR ALI" 
                className={`text-[12vw] md:text-[9vw] font-black leading-[0.75] tracking-tighter justify-center ${isDark ? 'text-white' : 'text-black'}`} 
              />
              <AnimatedHeading 
                text="GRAPHIC DESIGNER" 
                className="text-[10vw] md:text-[7.5vw] font-black leading-[0.75] tracking-tighter text-red-600 mt-6 justify-center" 
                delay={0.4} 
              />
            </div>

            <motion.p variants={itemVariants} className={`text-2xl md:text-3xl ${isDark ? 'text-gray-300' : 'text-black'} max-w-4xl mx-auto font-light leading-relaxed mb-16`}>
              I am Umair Ali, a senior graphic designer focused on the structural integrity of brands. I transform complex visions into authoritative visual identities.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-10">
              <Link to="/work" className={`px-16 py-6 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} rounded-full font-black text-sm tracking-[0.2em] hover:bg-red-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95`}>
                VIEW PORTFOLIO
              </Link>
              <Link to="/about" className={`px-16 py-6 border-2 ${isDark ? 'border-white/20 text-white' : 'border-black/30 text-black'} hover:border-red-600 hover:text-white hover:bg-red-600 rounded-full font-black text-sm tracking-[0.2em] transition-all hover:scale-105 active:scale-95`}>
                MORE ABOUT ME
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} className="absolute bottom-10 left-1/2 -translate-x-1/2 text-red-600 opacity-50">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </section>

      {/* About Link Section */}
      <section className={`py-48 relative overflow-hidden transition-colors duration-1000 ${isDark ? 'bg-black' : 'bg-gray-50'}`}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="order-2 lg:order-1">
              <span className="text-red-600 font-black tracking-[0.6em] uppercase text-sm mb-6 block">The Designer's Story</span>
              <h2 className={`text-6xl md:text-7xl font-black mb-10 tracking-tighter ${isDark ? 'text-white' : 'text-black'}`}>
                PASSION IN <br /><span className="text-red-600 italic">EVERY PIXEL.</span>
              </h2>
              <p className={`text-2xl ${isDark ? 'text-gray-400' : 'text-black'} font-light leading-relaxed mb-12`}>
                "I'm Umair, a passionate graphic designer who believes every design should tell a story. My journey is about turning complex ideas into simple, beautiful visual experiences."
              </p>
              <Link to="/about" className="inline-flex items-center space-x-4 text-red-600 font-black text-xl hover:translate-x-4 transition-transform duration-500">
                <span>READ MY FULL BIO</span>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="order-1 lg:order-2 aspect-video rounded-[4rem] overflow-hidden shadow-2xl border-2 border-red-600/30 relative bg-black">
              <iframe className="w-full h-full object-cover" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=0&loop=1&playlist=dQw4w9WgXcQ" title="Branding Video" frameBorder="0" allowFullScreen></iframe>
            </motion.div>
          </div>
        </div>
      </section>

      <section className={`py-48 transition-colors duration-1000 ${isDark ? 'bg-zinc-950' : 'bg-white'} relative overflow-hidden`}>
        <div className="container mx-auto px-6 text-center">
           <AnimatedHeading text="GRAPHIC SERVICES" className={`text-6xl font-black mb-20 tracking-tighter justify-center ${isDark ? 'text-white' : 'text-black'}`} />
           <div className="grid md:grid-cols-4 gap-12">
              {SERVICES.map((s, i) => (
                <motion.div key={s.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`p-10 rounded-[3rem] ${isDark ? 'bg-black/50 border-white/5' : 'bg-gray-50 border-gray-100'} border shadow-sm hover:border-red-600 transition-all`}>
                  <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-red-600">{s.title}</h4>
                  <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-black'} font-medium`}>{s.description}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-72 relative overflow-hidden text-center">
          <AnimatedHeading text="START A DESIGN?" className={`text-[10vw] font-black mb-24 tracking-tighter justify-center ${isDark ? 'text-white' : 'text-black'}`} />
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <Link to="/contact" className={`px-24 py-12 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} hover:bg-red-600 hover:text-white rounded-full text-4xl font-black transition-all transform hover:scale-110 shadow-2xl uppercase`}>HIRE ME</Link>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="px-12 py-6 border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-full text-2xl font-black transition-all">WHATSAPP CHAT</a>
          </div>
      </section>
    </main>
  );
};

export default Home;
