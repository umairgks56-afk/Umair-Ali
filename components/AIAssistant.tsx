
import React, { useState, useRef, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';
import { ThemeContext } from '../App';
import { PROJECTS, SERVICES, CONTACT_EMAIL } from '../constants';

const AIAssistant: React.FC = () => {
  const { isDark } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hello! I'm Umair's Creative AI. Want to see his latest branding work or inquire about a logo project?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const contextPrompt = `
        You are the official AI Assistant for Umair Ali, a world-class Senior Graphic Designer.
        Information about Umair:
        - Expertise: Branding, Logo Design, Social Media Graphics (Thumbnails, Banners), Print Design.
        - Skills: Adobe Suite (Photoshop, Illustrator, InDesign), Figma, 3D Visualization.
        - Portfolio Highlights: Modern Fintech Logos, Viral Gaming Thumbnails, Luxury Packaging.
        - Contact: ${CONTACT_EMAIL}, WhatsApp: +923089689181.
        - Style: Authoritative, minimalist, architectural, and structural design.
        
        Keep responses concise, professional, and helpful. If asked about pricing, suggest contacting Umair directly via WhatsApp for a custom quote.
        
        User: ${userText}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: contextPrompt,
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "I'm having trouble connecting to my creative core. Please try again or message Umair directly!" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm experiencing a bit of a glitch. You can reach out to Umair via the contact form!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, y: 50, filter: 'blur(10px)' }}
            className={`absolute bottom-24 right-0 w-[350px] md:w-[400px] h-[500px] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border ${isDark ? 'bg-black/90 border-white/10' : 'bg-white/95 border-gray-200'} backdrop-blur-2xl`}
          >
            {/* Header */}
            <div className="p-6 bg-red-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-black text-xs">UA</span>
                </div>
                <div>
                  <h4 className="text-white font-black text-xs uppercase tracking-widest">Creative Concierge</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[8px] text-white/70 font-bold uppercase">Online & Thinking</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((msg, i) => (
                <motion.div
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  key={i}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-red-600 text-white' : (isDark ? 'bg-white/5 text-gray-200' : 'bg-gray-100 text-black')}`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`p-4 rounded-2xl ${isDark ? 'bg-white/5' : 'bg-gray-100'} flex gap-1`}>
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1 h-1 bg-red-600 rounded-full" />
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1 h-1 bg-red-600 rounded-full" />
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1 h-1 bg-red-600 rounded-full" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className={`p-6 border-t ${isDark ? 'border-white/5' : 'border-gray-100'}`}>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about design..."
                  className={`w-full py-3 pl-4 pr-12 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-600 transition-all ${isDark ? 'bg-white/5 text-white' : 'bg-gray-100 text-black'}`}
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-red-600 hover:scale-110 transition-transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl relative"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-red-600 rounded-full opacity-30"
        />
        <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </motion.button>
    </div>
  );
};

export default AIAssistant;
