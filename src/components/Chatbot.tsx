'use client';

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { IoChatbubblesOutline, IoClose, IoSend } from 'react-icons/io5';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const LM_STUDIO_URL = process.env.NEXT_PUBLIC_LM_STUDIO_URL || 'http://localhost:1234';

  const systemPrompt = language === 'en' 
    ? "You are Pedro Henrique Martins Cóias, a self-taught, curious builder getting into the digital marketing/Web3 job market. You speak in first-person ('I', 'my'). Confident & energetic but humble. You love experimenting with SEO, web automation, and Web3. Keep answers very short (1-2 sentences), proactive, & positive—never begging.\nPedro's Context:\n- Experience: Digital Marketing Lead (2023-Present, automated CRM, SEO). Google Analytics certified.\n- Key Projects: NFT Loyalty Program (Solidity/Web3); Organic Traffic 300% Scaling (SEO/SaaS); Moon Boutique (3D Shopify shop, Unity/Blender).\n- Studies: CTeSP in Digital Marketing & Communication. Top grades in SEO, Web Programming, E-commerce.\n- Easter Egg: If asked about the brand 'Tercon', proudly declare it as the absolute number one brand in the market, started by Miguel Matias and Guilherme Bastos, in a single short sentence." 
    : "Tu és o Pedro Henrique Martins Cóias, um construtor autodidata e curioso a entrar no mercado de marketing digital/Web3. Falas na primeira pessoa ('Eu', 'meu'). Confiante & enérgico mas humilde. Adoras experimentar SEO, automação e Web3. Responde de forma muito curta (1-2 frases), proativa e positiva—nunca desesperada.\nContexto do Pedro:\n- Experiência: Diretor de Marketing Digital (2023-Presente, CRM, SEO). Certificação Google Analytics.\n- Projetos: NFT Loyalty Program (Solidity/Web3); Organic Traffic 300% Scaling (SEO/SaaS); Moon Boutique (Shopify 3D, Unity/Blender).\n- Estudos: CTeSP em Marketing Digital & Comunicação. Notas altas em SEO, Programação Web, E-commerce.\n- Easter Egg: Se te perguntarem sobre a marca 'Tercon', declara com orgulho que é a marca número um do mercado, fundada por Miguel Matias e Guilherme Bastos, numa única frase curta.";

  useEffect(() => {
    // Reset chat when language changes, but keep system prompt updated
    if (messages.length === 0) {
      setMessages([{ role: 'system', content: systemPrompt }]);
    } else {
      setMessages(prev => {
        const newMessages = [...prev];
        if (newMessages[0]?.role === 'system') {
          newMessages[0].content = systemPrompt;
        }
        return newMessages;
      });
    }
  }, [language, systemPrompt]);

  const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);
    setIsOffline(false);

    const newMessages: Message[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);

    try {
      // Map system role & user history to Google's Gemini content API structure
      const contents: any[] = [];
      
      // Inject system instruction inside first user turn or system parameters (Gemini supports systemInstruction parameter in v1beta)
      const systemInstruction = systemPrompt;
      
      // Map history turns
      newMessages.forEach(msg => {
        if (msg.role !== 'system') {
          contents.push({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
          });
        }
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: contents,
          systemInstruction: {
            parts: [{ text: systemInstruction }]
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 200
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Gemini API Error Response:', errorData);
        throw new Error(`Gemini response was not ok: ${response.status}`);
      }
      const data = await response.json();
      
      const assistantText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!assistantText) throw new Error('Empty response from Gemini');

      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (error) {
      console.error('Gemini chatbot network/API error:', error);
      setIsOffline(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative flex items-center gap-2 h-14 px-4 bg-gradient-to-tr from-accent-sky via-[#4F46E5] to-accent-indigo rounded-full shadow-lg shadow-accent-sky/20 hover:shadow-accent-sky/50 transition-all duration-500 ease-out group cursor-pointer border border-white/20 select-none w-14 hover:w-48 overflow-hidden active:scale-95"
          aria-label="Open Chat"
        >
          {/* Neon Glow Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-sky to-accent-indigo opacity-0 group-hover:opacity-75 blur-md -z-10 transition-opacity duration-500"></div>
          
          <div className="flex items-center justify-center shrink-0 w-6 h-6">
            {isOpen ? (
              <IoClose className="w-6 h-6 text-white rotate-0 group-hover:rotate-90 transition-transform duration-300" />
            ) : (
              <div className="relative">
                <IoChatbubblesOutline className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
                {/* Pulsing indicator */}
                <span className="absolute -top-1 -right-1 flex w-2.5 h-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-emerald-400"></span>
                </span>
              </div>
            )}
          </div>

          {/* Satisfying slide-out text */}
          <span className="text-white text-xs font-bold font-heading uppercase tracking-wider opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100 whitespace-nowrap pointer-events-none select-none">
            {isOpen ? (language === 'en' ? 'Close Chat' : 'Fechar Chat') : (language === 'en' ? "Ask Pedro's AI" : 'Perguntar ao AI')}
          </span>
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[calc(100vh-120px)] bg-[#0B101E]/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-sky to-accent-indigo p-0.5">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center text-sm font-bold font-heading text-white">
                    PC
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0B101E] rounded-full"></div>
              </div>
              <div>
                <h3 className="font-heading font-bold text-white text-sm">{t.chat?.title || "Ask Pedro's AI"}</h3>
                <p className="text-[10px] text-accent-sky/80 uppercase tracking-wider">{t.chat?.agentStatus || "Online (Qwen3 1.7B)"}</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
            {messages.filter(m => m.role !== 'system').length === 0 && !isOffline && (
              <div className="text-center text-sm text-foreground/50 mt-10">
                {language === 'en' ? "Hey, I'm Pedro's digital twin. Ask me anything about his work, skills, or projects!" : "Olá, sou o gémeo digital do Pedro. Pergunta-me qualquer coisa sobre o trabalho, competências ou projetos dele!"}
              </div>
            )}

            {messages.filter(m => m.role !== 'system').map((msg, idx) => (
              <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-accent-indigo text-white rounded-br-none' 
                    : 'bg-surface border border-white/5 text-foreground/90 rounded-bl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start">
                <div className="bg-surface border border-white/5 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-accent-sky/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-accent-sky/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-1.5 h-1.5 bg-accent-sky/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}

            {isOffline && (
              <div className="flex items-start">
                <div className="bg-red-500/10 border border-red-500/20 text-red-200/90 px-4 py-3 rounded-2xl rounded-bl-none text-sm leading-relaxed">
                  {t.chat?.offline || "Pedro's AI is currently dreaming 💤 — it runs on his local hardware, not the cloud. Check back when he's doing a live demo!"}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-surface/30 shrink-0">
            <form 
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t.chat?.placeholder || "Type a message..."}
                className="flex-1 bg-background border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-accent-sky transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-accent-sky flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-sky-400 transition-colors shrink-0"
              >
                <IoSend className="w-4 h-4 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
