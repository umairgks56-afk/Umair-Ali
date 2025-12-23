
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../constants';

const GraphicCLogo = ({ isDark }: { isDark: boolean }) => (
  <div className="flex items-center space-x-4 group">
    <div className="relative w-16 h-16">
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className={`absolute inset-0 border-2 border-dashed ${isDark ? 'border-red-600/40' : 'border-red-600/20'} rounded-full`} 
      />
      <div className={`absolute inset-0 flex items-center justify-center font-black text-3xl ${isDark ? 'text-white' : 'text-black'}`}>
        <span className="text-red-600">G</span>C
      </div>
      <motion.div 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)]"
      />
    </div>
    <div className="flex flex-col">
      <span className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-black'}`}>GRAPHIC C</span>
      <span className="text-[10px] font-bold tracking-[0.6em] text-red-600 uppercase">Architecture</span>
    </div>
  </div>
);

const Footer: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const socials = [
    { name: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}`, icon: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/> },
    { name: 'Instagram', href: '#', icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.149 3.251-1.667 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.667-4.919-4.919-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.251 1.667-4.771 4.919-4.919 1.265-.057 1.644-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.28-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/> },
    { name: 'Email', href: `mailto:${CONTACT_EMAIL}`, icon: <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 8.138h-18.745l5.479-8.133zm8.23-1.259l4.623-3.746v9.458l-4.623-5.712z"/> }
  ];

  return (
    <footer className={`py-32 ${isDark ? 'bg-black/95 border-white/5' : 'bg-gray-50 border-gray-100'} border-t relative z-10 transition-colors duration-1000`}>
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-16 md:space-y-0">
          <div className="max-w-md">
            <GraphicCLogo isDark={isDark} />
            <p className={`mt-8 ${isDark ? 'text-gray-400' : 'text-gray-600'} text-lg font-light leading-relaxed`}>
              Premium graphic design and architectural brand building for visionaries. Transforming complex identity requirements into timeless visual systems.
            </p>
          </div>
          <div className="flex flex-col space-y-6">
            <h4 className={`text-sm font-black tracking-widest uppercase ${isDark ? 'text-white' : 'text-black'}`}>Channels</h4>
            <div className="flex space-x-10">
              {socials.map((social) => (
                <motion.a 
                  key={social.name} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.2, color: '#ef4444' }} 
                  className={`${isDark ? 'text-gray-400' : 'text-gray-400'} transition-colors w-8 h-8 flex items-center justify-center`}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">{social.icon}</svg>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
        <div className={`mt-32 pt-10 border-t ${isDark ? 'border-white/5' : 'border-gray-200'} flex flex-col md:flex-row justify-between items-center ${isDark ? 'text-gray-600' : 'text-gray-500'} text-[10px] font-black tracking-[0.5em] uppercase`}>
          <p>© 2024 GRAPHIC C STUDIO • ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-12 mt-6 md:mt-0">
            <a href="#" className="hover:text-red-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-red-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-red-500 transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
