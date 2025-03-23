import React, { createContext, useContext, useState, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

interface ChatbotContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
  isTyping: boolean;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

const initialMessages: Message[] = [
  {
    id: uuidv4(),
    text: "Hello! I'm your virtual assistant. How can I help you today?",
    sender: 'assistant',
    timestamp: new Date().toISOString(),
  },
];

export const ChatbotProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      text: "Hello! I'm your virtual assistant. How can I help you today?",
      sender: 'assistant',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getLatestMessage = (): Message | undefined => {
    return messages.length > 0 ? messages[messages.length - 1] : undefined;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      text,
      sender: 'user',
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate API call
    setTimeout(() => {
      const botResponses = [
        "I'm processing your request.",
        "Let me check that for you.",
        "I understand your question about airport operations.",
        "Here's what I found about your flight status.",
        "I can help you with that aviation query.",
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        id: uuidv4(),
        text: randomResponse,
        sender: 'assistant',
        timestamp: new Date().toISOString(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      
      toast({
        title: "New Message",
        content: "You have received a new message from Air-Buddy assistant.",
      });
    }, 1500);
  };

  const contextValue: ChatbotContextType = {
    messages,
    sendMessage,
    isTyping,
  };

  return (
    <ChatbotContext.Provider value={contextValue}>
      {children}
    </ChatbotContext.Provider>
  );
};

export const useChatbot = (): ChatbotContextType => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error("useChatbot must be used within a ChatbotProvider");
  }
  return context;
};
