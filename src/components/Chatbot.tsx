import { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Initialize Gemini API
// Note: In a real app, you should handle the API key more securely if possible,
// but for this demo we use the environment variable directly.
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

interface ChatbotProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Chatbot({ isOpen, setIsOpen }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Welcome to Aether Dynamics. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Determine if we should use thinking mode based on query length/complexity heuristic
      // or just default to it as requested for "complex queries".
      // The prompt asked to "Think more when needed".
      // We'll enable it for queries > 10 words or if it contains "why", "how", "explain".
      const isComplex = userMessage.split(' ').length > 10 || 
                        /why|how|explain|analyze|compare/i.test(userMessage);

      const config: any = {
        thinkingConfig: isComplex ? { thinkingLevel: ThinkingLevel.HIGH } : undefined
      };

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: [
          ...messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config
      });

      const responseText = response.text || "I apologize, but I couldn't generate a response.";
      
      setMessages(prev => [...prev, { role: 'model', text: responseText, isThinking: isComplex }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I encountered an error processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        className="fixed bottom-8 right-8 z-50 p-4 text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:bg-white/20 transition-all"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-8 z-50 w-96 h-[500px] flex flex-col bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white font-sans tracking-wide">Aether AI</span>
              </div>
              <div className="text-[10px] uppercase tracking-wider text-white/40">Gemini 3.1 Pro</div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-white/20 text-white rounded-br-none'
                        : 'bg-white/5 text-gray-200 rounded-bl-none border border-white/5'
                    }`}
                  >
                    {msg.isThinking && (
                      <div className="flex items-center gap-1 mb-2 text-xs text-blue-300/70">
                        <Sparkles className="w-3 h-3" />
                        <span>Deep Thinking</span>
                      </div>
                    )}
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl rounded-bl-none border border-white/5">
                    <Loader2 className="w-4 h-4 text-white/50 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about our technology..."
                  className="w-full px-4 py-3 pr-10 text-sm text-white bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:bg-black/40 transition-all placeholder:text-white/20"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 p-1.5 text-white/70 hover:text-white disabled:opacity-30 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
