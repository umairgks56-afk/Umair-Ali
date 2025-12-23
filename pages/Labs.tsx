
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoogleGenAI } from '@google/genai';

const Labs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'image' | 'video' | 'background'>('chat');
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<any>(null);
  const [history, setHistory] = useState<{role: 'user' | 'model', text: string, links?: {uri: string, title: string}[]}[]>([]);

  const handleGenerateImage = async (size: "1K" | "2K" | "4K" = "1K") => {
    // Fixed: Properly await key selection check and prompt user if needed when using Pro models
    if (!(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
    }
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: { parts: [{ text: prompt }] },
        config: { 
          imageConfig: { 
            aspectRatio: "16:9", 
            imageSize: size 
          } 
        }
      });
      
      const part = response.candidates[0].content.parts.find(p => p.inlineData);
      if (part) {
        setOutput(`data:image/png;base64,${part.inlineData.data}`);
      }
    } catch (e) {
      console.error(e);
      alert('Neural Sequence Interrupted.');
    }
    setLoading(false);
  };

  const handleGenerateVideo = async () => {
    // Fixed: Properly await key selection check for Veo models
    if (!(await window.aistudio.hasSelectedApiKey())) {
      await window.aistudio.openSelectKey();
    }
    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt,
        config: { 
          numberOfVideos: 1, 
          resolution: '720p', 
          aspectRatio: '16:9' 
        }
      });
      
      while (!operation.done) {
        await new Promise(r => setTimeout(r, 10000));
        operation = await ai.operations.getVideosOperation({ operation });
      }
      
      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
      const blob = await response.blob();
      setOutput(URL.createObjectURL(blob));
    } catch (e) {
      console.error(e);
      alert('Veo Sequence Failed.');
    }
    setLoading(false);
  };

  const handleChat = async () => {
    if (!prompt.trim()) return;
    const userMsg = prompt;
    setPrompt('');
    setHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: [...history, { role: 'user', text: userMsg }].map(h => ({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        config: { 
          thinkingConfig: { thinkingBudget: 32768 },
          tools: [{ googleSearch: {} }]
        }
      });

      // Fixed: Extract website URLs from groundingChunks as required by search grounding guidelines
      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter(chunk => chunk.web)
        ?.map(chunk => ({
          uri: chunk.web.uri,
          title: chunk.web.title
        })) || [];

      setHistory(prev => [...prev, { 
        role: 'model', 
        text: response.text || '',
        links: links.length > 0 ? links : undefined
      }]);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-48 min-h-screen relative z-10 bg-white selection:bg-red-600 text-black">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-20">
          <h1 className="text-8xl md:text-[10vw] font-black mb-6 tracking-tighter text-red-600 leading-none">LABS.</h1>
          <p className="text-gray-500 max-w-3xl text-2xl font-light leading-relaxed">
            Collaborative visual prototyping powered by Gemini 3.0 Pro.
          </p>
        </motion.div>

        <div className="flex space-x-8 mb-20 overflow-x-auto pb-6 no-scrollbar">
          {['chat', 'image', 'video', 'background'].map((tab) => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab as any); setOutput(null); }}
              className={`px-14 py-5 rounded-full border-2 transition-all uppercase tracking-[0.3em] text-xs font-black shrink-0 ${activeTab === tab ? 'bg-black border-black text-white shadow-xl scale-105' : 'border-gray-100 text-gray-400 hover:border-red-500/30 hover:text-red-500'}`}
            >
              {tab === 'background' ? 'BG GEN' : tab}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4 space-y-10">
            <div className="bg-gray-50 p-12 rounded-[4rem] border border-gray-100 shadow-xl">
              <h3 className="text-3xl font-black mb-10 uppercase tracking-tighter text-red-600">I/O CONFIG</h3>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Neural input required..."
                className="w-full bg-white border border-gray-200 rounded-[2.5rem] p-8 min-h-[220px] focus:outline-none focus:border-red-600 mb-10 transition-all text-black text-xl placeholder:text-gray-200"
              />
              <button
                onClick={activeTab === 'chat' ? handleChat : (activeTab === 'background' ? () => handleGenerateImage("4K") : () => handleGenerateImage("1K"))}
                disabled={loading}
                className="w-full py-8 bg-red-600 text-white font-black rounded-[2.5rem] hover:bg-black transition-all disabled:opacity-50 shadow-2xl uppercase tracking-widest text-lg"
              >
                {loading ? 'SIMULATING...' : `EXECUTE ${activeTab.toUpperCase()}`}
              </button>
            </div>
          </div>

          <div className="md:col-span-8">
            <div className="bg-gray-50 border border-gray-100 rounded-[5rem] min-h-[700px] flex items-center justify-center overflow-hidden relative shadow-inner">
              {loading && (
                <div className="absolute inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center">
                   <div className="relative w-32 h-32">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
                        className="absolute inset-0 border-[6px] border-red-600 border-t-transparent rounded-full"
                      />
                   </div>
                  <p className="font-black tracking-[0.5em] text-red-600 mt-12 animate-pulse uppercase text-sm">Synthesizing</p>
                </div>
              )}

              {activeTab === 'chat' ? (
                <div className="w-full h-full p-16 flex flex-col overflow-y-auto max-h-[750px] space-y-10 no-scrollbar">
                  {history.map((msg, i) => (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      key={i} 
                      className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[90%] p-10 rounded-[3.5rem] border ${msg.role === 'user' ? 'bg-black text-white border-black shadow-xl' : 'bg-white border-gray-100 text-gray-700'}`}>
                        <p className="text-xl leading-relaxed whitespace-pre-wrap font-light">{msg.text}</p>
                        {msg.links && (
                          <div className="mt-6 pt-6 border-t border-gray-100/10 flex flex-col gap-2">
                            <p className="text-[10px] font-black uppercase tracking-widest text-red-600 mb-2">Sources:</p>
                            {msg.links.map((link, idx) => (
                              <a 
                                key={idx} 
                                href={link.uri} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-xs text-red-500 hover:underline flex items-center gap-2"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                {link.title || link.uri}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : output ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full h-full flex items-center justify-center p-8">
                  <img src={output} className="w-full h-full object-contain rounded-[3rem] shadow-2xl" />
                </motion.div>
              ) : (
                <div className="text-center opacity-10">
                   <div className="text-[12vw] mb-8 text-black">⚛</div>
                   <p className="font-black tracking-[0.6em] uppercase text-xs">Idle Signal</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Labs;
