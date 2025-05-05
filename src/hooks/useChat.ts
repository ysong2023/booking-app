'use client';

import { useState, useCallback } from 'react';
import { Message } from '@/types';
import { useBooking } from './useBooking';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const { createBooking, availableSlots, tables } = useBooking();

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = { role: 'user', content };
    setMessages(prev => [...prev, userMessage]);
    
    setLoading(true);
    try {
      // Add the message to the array first
      const currentMessages = [...messages, userMessage];
      
      // Prepare available slots and tables data
      const contextData = {
        availableSlots,
        tables
      };
      
      // Format the messages for Claude API
      const formattedMessages = currentMessages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Call Claude API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: formattedMessages,
          contextData
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
      
      const data = await response.json();
      
      // Add assistant response to chat
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.response 
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Check if there's a booking action to perform
      if (data.action === 'book_table' && data.parameters) {
        const { timeSlotId, tableId, reservationName } = data.parameters;
        await createBooking(timeSlotId, tableId, reservationName);
        
        // Confirm booking to the user
        const confirmationMessage: Message = {
          role: 'assistant',
          content: `Your reservation for ${reservationName} has been confirmed!`
        };
        
        setMessages(prev => [...prev, confirmationMessage]);
      }
      
      return data.response;
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  }, [messages, createBooking, availableSlots, tables]);

  const clearChat = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    loading,
    sendMessage,
    clearChat
  };
}