
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import AnimatedHeading from '../components/AnimatedHeading';
import { ThemeContext } from '../App';
import { CONTACT_EMAIL } from '../constants';

const About: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const umairImage = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop";

  return (
    <div className={`pt-40 pb-40 relative z-10 min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}>
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(239,68,68,0.02)_0%,_transparent_40%)] z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-24 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
            <AnimatedHeading text="SENIOR GRAPHIC" className={`text-6xl md:text-[7vw] font-black mb-4 leading-[0.85] tracking-tighter ${isDark ? 'text-white' : 'text-black'}`} />
            <AnimatedHeading text="DESIGNER" className="text-6xl md:text-[7vw] font-black mb-16 leading-[0.85] tracking-tighter text-red-600" delay={0.1} />
            
            <div className="space-y-10">
              <p className={`text-2xl ${isDark ? 'text-gray-300' : 'text-gray-800'} font-light leading-relaxed`}>
                I’m a creative and detail-focused graphic designer with a passion for turning ideas into strong, visually engaging designs. I specialize in branding, logo design, social media graphics, banners, and print materials that help businesses stand out and communicate clearly.
              </p>
              
              <p className={`text-xl ${isDark ? 'text-gray-500' : 'text-gray-500'} font-light leading-relaxed`}>
                I pay close attention to color, typography, and layout to make sure every design looks professional and impactful. I believe in clear communication, quick turnaround, and delivering high-quality work that meets my clients’ goals. Whether it’s building a brand from scratch or refreshing an existing design, I focus on creating visuals that truly represent the message behind them.
              </p>
              
              <div className={`p-8 border-l-4 border-red-600 ${isDark ? 'bg-red-950/20' : 'bg-red-50'} rounded-r-3xl`}>
                <p className="text-xl italic text-red-600">
                  "Umair completely transformed our brand identity. His attention to detail and ability to capture our vision in a professional, modern design exceeded all expectations. A truly elite graphic designer."
                </p>
                <p className="text-sm font-black text-red-500 mt-4 uppercase tracking-widest">— TechVision Global</p>
              </div>

              <div className="grid grid-cols-2 gap-12 pt-10">
                <div>
                  <h4 className="font-black text-red-500 uppercase tracking-widest text-sm mb-4">Core Discipline</h4>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Branding & Identity</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Logo Design</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Print Media</p>
                </div>
                <div>
                  <h4 className="font-black text-red-500 uppercase tracking-widest text-sm mb-4">Mastery Tools</h4>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Adobe Suite Mastery</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>Figma Branding</p>
                  <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>3D Visualization</p>
                </div>
              </div>
              
              <div className="pt-10">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-red-600 font-black text-2xl border-b-2 border-red-600 hover:text-black transition-colors">{CONTACT_EMAIL}</a>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9, x: 50 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ duration: 1.5, ease: "easeOut" }} className="relative">
             <div className="aspect-[4/5] rounded-[4rem] overflow-hidden border-4 border-white shadow-[0_40px_100px_rgba(0,0,0,0.1)] relative">
                <img src={umairImage} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Umair Ali Portrait" />
             </div>
             
             <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }} className="absolute -bottom-10 -right-10 bg-black p-12 rounded-[3rem] max-w-sm shadow-2xl z-20">
                <p className="text-white font-black text-3xl italic tracking-tighter leading-tight">"IDEAS INTO STRONG, VISUAL REALITY."</p>
                <p className="text-red-500 mt-4 uppercase font-bold text-xs tracking-widest">— UMAIR ALI</p>
             </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
