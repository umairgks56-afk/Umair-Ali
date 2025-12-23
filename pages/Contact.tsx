
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { ThemeContext } from '../App';
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from '../constants';

const Contact: React.FC = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <div className={`pt-40 pb-40 relative z-10 min-h-screen ${isDark ? 'bg-[#050505] text-white' : 'bg-white text-black'}`}>
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-32">
          <span className="text-red-600 font-black tracking-[0.6em] uppercase text-sm mb-6 block text-center md:text-left">Inquiry Channel</span>
          <h1 className="text-7xl md:text-[8vw] font-black tracking-tighter mb-8 leading-none text-center md:text-left">CONNECT<br /><span className="text-red-600 italic">NOW.</span></h1>
          <p className={`text-2xl ${isDark ? 'text-gray-400' : 'text-gray-500'} max-w-3xl font-light leading-relaxed text-center md:text-left`}>
            Umair Ali is accepting new collaborations for high-fidelity graphic design and 3D branding projects.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-32 items-start">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-20">
            <div>
               <h3 className="text-red-500 uppercase text-xs tracking-[0.6em] font-black mb-10">CHANNEL 01 (MAIL)</h3>
               <a href={`mailto:${CONTACT_EMAIL}`} className={`text-4xl md:text-5xl font-black tracking-tighter hover:text-red-500 transition-colors block mb-4 ${isDark ? 'text-white' : 'text-black'}`}>{CONTACT_EMAIL}</a>
               <p className="text-gray-400 text-lg">Response Latency: &lt; 24h</p>
            </div>

            <div>
               <h3 className="text-red-500 uppercase text-xs tracking-[0.6em] font-black mb-10">CHANNEL 02 (INSTANT)</h3>
               <div className="flex flex-col items-start gap-10">
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-6 px-12 py-8 bg-red-600 text-white hover:bg-black rounded-[2rem] text-3xl font-black transition-all shadow-[0_20px_60px_rgba(220,38,38,0.2)]">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.631 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    <span>TEXT ON WHATSAPP</span>
                  </a>
                  <p className={`text-3xl font-black ${isDark ? 'text-white/50' : 'text-black/50'} tracking-tighter`}>+{WHATSAPP_NUMBER}</p>
               </div>
            </div>
          </motion.div>

          <motion.form initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }} className={`space-y-12 p-16 ${isDark ? 'bg-zinc-900/50 border-white/5' : 'bg-gray-50 border-gray-100'} rounded-[4rem] border backdrop-blur-3xl shadow-lg`}>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.6em] font-black text-red-600 mb-6">Subject</label>
              <input type="text" className={`w-full ${isDark ? 'bg-black/40 text-white' : 'bg-white text-black'} border border-gray-200 rounded-2xl p-6 text-xl focus:border-red-600 transition-all placeholder:text-gray-300`} placeholder="Project Title" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.6em] font-black text-red-600 mb-6">Email Node</label>
              <input type="email" className={`w-full ${isDark ? 'bg-black/40 text-white' : 'bg-white text-black'} border border-gray-200 rounded-2xl p-6 text-xl focus:border-red-600 transition-all placeholder:text-gray-300`} placeholder="youremail@domain.com" />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.6em] font-black text-red-600 mb-6">Context</label>
              <textarea rows={6} className={`w-full ${isDark ? 'bg-black/40 text-white' : 'bg-white text-black'} border border-gray-200 rounded-2xl p-6 text-xl focus:border-red-600 transition-all placeholder:text-gray-300 resize-none`} placeholder="Brief summary..." />
            </div>
            <button className="w-full py-8 bg-black text-white hover:bg-red-600 rounded-3xl font-black text-2xl transition-all shadow-xl uppercase tracking-widest">DEPLOY MESSAGE</button>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Contact;