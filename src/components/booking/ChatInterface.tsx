'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/hooks/useChat';
import { Message } from '@/types';
import PixelRestaurant from './PixelMonster';

export default function ChatInterface() {
  const { messages, loading, sendMessage } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Keep chat interface in view when page loads/refreshes
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    await sendMessage(input);
    setInput('');
  };

  return (
    <div className="main-content">
      <div 
        ref={chatContainerRef}
        className="rounded-lg overflow-hidden flex flex-col h-[500px] border border-cyan-700 bg-black text-cyan-400"
        id="chat-interface"
      >
        <div className="p-4 border-b border-cyan-700">
          <h2 className="text-xl font-semibold text-cyan-400">Restaurant Assistant</h2>
          <p className="text-sm text-cyan-300">
            Ask about table availability or make a reservation
          </p>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-900">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-cyan-400">
                <p>How can I help you today?</p>
                <p className="text-sm mt-2">
                  Try saying: "What tables are available at 7pm?" or "I'd like to book a table for 2 people at 8pm"
                </p>
                <p className="text-sm mt-4 text-cyan-300 border-t border-cyan-800 pt-4">
                  Once your booking is confirmed, click the "Refresh Data" button to see your reservation in the table.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`rounded-lg px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-cyan-800 text-cyan-100'
                        : 'bg-gray-900 text-cyan-400 border border-cyan-700'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t border-cyan-700 bg-black">
          <form onSubmit={handleSubmit} className="flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-cyan-700 rounded-l-md bg-black text-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-cyan-700 text-cyan-100 px-4 py-2 rounded-r-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-50"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-cyan-100 border-t-transparent rounded-full animate-spin" />
              ) : (
                'Send'
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Pixel Restaurant */}
      <div className="w-full max-w-full">
        <PixelRestaurant />
      </div>
    </div>
  );
} 