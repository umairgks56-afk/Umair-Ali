
import React from 'react';
import { motion } from 'framer-motion';
import { SERVICES, SOFTWARE_STACK } from '../constants';
import AnimatedHeading from '../components/AnimatedHeading';

const Services: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="pt-40 pb-40 relative z-10 bg-white min-h-screen text-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-32"
        >
          <AnimatedHeading 
            text="GRAPHIC MASTERY" 
            className="text-7xl md:text-[10vw] font-black leading-none tracking-tighter mb-12 text-black"
          />
          <p className="text-2xl text-gray-500 max-w-3xl font-light leading-relaxed">
            From initial concept to final production, Umair Ali provides a full spectrum of graphic design services tailored for high-impact brand presence.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-20 mb-40">
          {SERVICES.map((service, i) => (
            <motion.div 
              key={service.id}
              {...fadeInUp}
              className="p-16 bg-gray-50 border border-gray-100 rounded-[4rem] group hover:border-red-600 transition-all duration-700 shadow-sm hover:shadow-2xl"
            >
              <div className="w-24 h-24 bg-red-600/10 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 group-hover:bg-red-600 transition-all duration-500">
                 <svg className="w-10 h-10 text-red-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={service.icon} />
                 </svg>
              </div>
              <h3 className="text-5xl font-black mb-6 tracking-tighter uppercase">{service.title}</h3>
              <p className="text-xl text-gray-500 leading-relaxed font-light">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="pt-20 border-t border-gray-100">
          <h2 className="text-4xl font-black mb-16 tracking-tighter text-red-600 uppercase">Mastery Toolkit</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
            {SOFTWARE_STACK.map((tool, i) => (
              <motion.div 
                key={tool}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-default"
              >
                <p className="text-lg font-bold text-gray-400 group-hover:text-black transition-colors">{tool}</p>
                <div className="h-0.5 bg-red-600 w-0 group-hover:w-full transition-all duration-500 mt-2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;