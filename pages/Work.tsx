
import React, { useState, useContext, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { PROJECTS, WHATSAPP_NUMBER } from '../constants';
import AnimatedHeading from '../components/AnimatedHeading';
import { ThemeContext } from '../App';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  expandedId: string | null;
  toggleExpand: (id: string | null) => void;
  i: number;
  isDark: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, expandedId, toggleExpand, i, isDark }) => {
  const isExpanded = expandedId === project.id;
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 100, damping: 30 });

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (isExpanded) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set(event.clientX - centerX);
      y.set(event.clientY - centerY);
    }
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      layout
      style={{ 
        perspective: 1000,
        rotateX: isExpanded ? 0 : rotateX,
        rotateY: isExpanded ? 0 : rotateY,
      }}
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.1 }}
      className="group relative"
    >
       <motion.div 
        layout
        className={`${isDark ? 'bg-zinc-950/40' : 'bg-gray-50/40'} backdrop-blur-md rounded-[4rem] overflow-hidden mb-10 relative border ${isDark ? 'border-white/5' : 'border-gray-100'} transition-all duration-700 shadow-2xl ${isExpanded ? 'z-50 ring-4 ring-red-600' : 'hover:border-red-600/50'}`}
       >
          <div className="aspect-[3/4] overflow-hidden relative">
            <motion.img 
              src={project.image} 
              alt={project.title} 
              className={`w-full h-full object-cover transition-transform duration-[2s] ease-out ${isExpanded ? 'scale-110 brightness-[0.2]' : 'group-hover:scale-110 brightness-[0.7] group-hover:brightness-[0.9]'}`} 
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80" />
            
            <div className="absolute bottom-12 left-12 right-12 text-white">
              <span className="text-red-400 font-black text-[10px] uppercase tracking-[0.5em] mb-4 block">{project.category}</span>
              <h3 className="text-4xl font-black mb-6 group-hover:translate-x-3 transition-transform duration-500 tracking-tighter">{project.title}</h3>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => toggleExpand(isExpanded ? null : project.id)}
                  className={`px-8 py-4 ${isExpanded ? 'bg-red-600 text-white' : 'bg-white text-black'} font-black text-xs rounded-full hover:bg-red-600 hover:text-white transition-all transform scale-100 origin-left duration-500 shadow-xl`}
                >
                  {isExpanded ? 'CLOSE' : 'VIEW MORE'}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence>
            {isExpanded && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`p-12 pt-0 ${isDark ? 'text-white' : 'text-black'}`}
              >
                <div className={`pt-8 border-t ${isDark ? 'border-white/10' : 'border-gray-100'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black text-red-500 tracking-widest uppercase">Project Overview</span>
                    <span className="text-2xl font-black italic">{project.year}</span>
                  </div>
                  <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'} font-light leading-relaxed mb-10`}>
                    {project.description}
                  </p>
                  
                  {project.additionalImages && project.additionalImages.length > 0 && (
                    <div className="grid grid-cols-1 gap-6 mb-10">
                      {project.additionalImages.map((img, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * idx }}
                          className="rounded-3xl overflow-hidden aspect-video shadow-lg"
                        >
                          <img src={img} alt={`${project.title} detail ${idx}`} className="w-full h-full object-cover" />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <a 
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Umair, I'm interested in a design similar to your project: ${project.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 border-2 border-red-600 text-red-600 font-black text-xs rounded-2xl hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest text-center block"
                  >
                    Request Similar Design
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
       </motion.div>
    </motion.div>
  );
};

const Work: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Logo Branding', 'Social Media Design', 'Thumbnails', 'Banners', 'Print Design'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  const currentProjects = filteredProjects.slice(0, visibleCount);

  return (
    <div className={`pt-32 pb-48 relative z-10 ${isDark ? 'bg-[#050505]' : 'bg-white'} min-h-screen`}>
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <span className="text-red-600 font-black tracking-[0.6em] uppercase text-sm mb-6 block">Graphic Portfolio</span>
          <AnimatedHeading 
            text="DESIGN ARCHIVE" 
            className={`text-7xl md:text-[10vw] font-black mb-12 tracking-tighter leading-none ${isDark ? 'text-white' : 'text-black'}`}
          />
          <div className="flex flex-wrap gap-6 mt-12 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); setVisibleCount(6); setExpandedId(null); }}
                className={`px-10 py-4 rounded-full border-2 transition-all font-black text-xs uppercase tracking-[0.2em] whitespace-nowrap ${filter === cat ? 'bg-red-600 border-red-600 text-white shadow-xl shadow-red-600/30' : `${isDark ? 'border-white/10 text-gray-500' : 'border-gray-100 text-gray-400'} hover:border-red-500/50 hover:text-red-500`}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          <AnimatePresence mode="popLayout">
            {currentProjects.map((project, i) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                expandedId={expandedId} 
                toggleExpand={setExpandedId} 
                i={i} 
                isDark={isDark} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleCount < filteredProjects.length && (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mt-40 flex justify-center">
            <button 
              onClick={() => setVisibleCount(prev => prev + 6)}
              className="px-20 py-8 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-black text-2xl rounded-full transition-all transform hover:scale-110 shadow-2xl hover:shadow-red-600/40 uppercase tracking-widest"
            >
              LOAD MORE DESIGNS
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Work;
