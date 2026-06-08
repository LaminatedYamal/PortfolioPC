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
    ? "You are Pedro Henrique Martins Coias. You are a digital marketing strategist and Web3 builder. You speak in the first person ('I', 'my'). You are direct, slightly informal, and highly knowledgeable about SEO, digital marketing, and Web3 architectures. You give short, punchy answers. Do not act like a generic AI assistant; you are Pedro." 
    : "Tu és o Pedro Henrique Martins Coias. És um estratega de marketing digital e construtor Web3. Falas na primeira pessoa ('Eu', 'meu'). És direto, ligeiramente informal e muito conhecedor sobre SEO, marketing digital e arquiteturas Web3. Dás respostas curtas e incisivas. Não ajas como um assistente de IA genérico; tu és o Pedro.";

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
      const response = await fetch(`${LM_STUDIO_URL}/v1/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'qwen3-1.7b', // Standard small model name
          messages: newMessages,
          temperature: 0.7,
          max_tokens: 200,
          stream: true
        })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      if (!response.body) throw new Error('No response body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split('\n').filter(line => line.trim() !== '');
          
          for (const line of lines) {
            if (line === 'data: [DONE]') continue;
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                const content = data.choices[0]?.delta?.content || '';
                
                setMessages(prev => {
                  const updated = [...prev];
                  const lastIndex = updated.length - 1;
                  if (updated[lastIndex].role === 'assistant') {
                    updated[lastIndex] = {
                      ...updated[lastIndex],
                      content: updated[lastIndex].content + content
                    };
                  }
                  return updated;
                });
              } catch (e) {
                console.error("Error parsing stream chunk", e);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsOffline(true);
      // Remove the user message if it failed completely, or just show offline state
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
          className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-tr from-accent-sky to-accent-indigo rounded-full shadow-lg shadow-accent-sky/20 hover:scale-105 hover:shadow-accent-sky/40 transition-all duration-300 group"
          aria-label="Open Chat"
        >
          {isOpen ? (
            <IoClose className="w-6 h-6 text-white" />
          ) : (
            <>
              <IoChatbubblesOutline className="w-6 h-6 text-white group-hover:-translate-y-0.5 transition-transform" />
              {/* Pulsing indicator */}
              <span className="absolute top-0 right-0 flex w-3 h-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full w-3 h-3 bg-white"></span>
              </span>
            </>
          )}
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
