
import React, { createContext, useContext, useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';

// Define types for our context
export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export interface FinancialData {
  revenue: {
    total: number;
    aeronautical: number;
    nonAeronautical: number;
    breakdown: Array<{ name: string; amount: number }>;
  };
  expenses: {
    total: number;
    breakdown: Array<{ name: string; amount: number }>;
  };
  profit: {
    total: number;
    margin: number;
  };
}

interface ChatbotContextType {
  messages: Message[];
  addMessage: (content: string, sender: 'user' | 'ai') => void;
  clearMessages: () => void;
  isLoading: boolean;
  isChatOpen: boolean;
  toggleChat: () => void;
  financialData: FinancialData | null;
  addFinancialData: (data: FinancialData) => void;
  searchData: (query: string) => Promise<string>;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

export const ChatbotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      content: "Hello! I'm Air-Buddy, your airport assistant. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [financialData, setFinancialData] = useState<FinancialData | null>(null);
  const { toast } = useToast();

  const toggleChat = useCallback(() => {
    setIsChatOpen(prev => !prev);
  }, []);

  const addMessage = useCallback((content: string, sender: 'user' | 'ai') => {
    const newMessage = {
      id: uuidv4(),
      content,
      sender,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    if (sender === 'user') {
      setIsLoading(true);
      
      // Simulate AI processing
      setTimeout(async () => {
        try {
          let response = '';
          
          // Process user query
          const lowerContent = content.toLowerCase();
          
          if (
            lowerContent.includes('profit') || 
            lowerContent.includes('revenue') || 
            lowerContent.includes('expense') || 
            lowerContent.includes('financial') || 
            lowerContent.includes('money') || 
            lowerContent.includes('income')
          ) {
            response = await searchData(content);
          } else if (lowerContent.includes('weather')) {
            response = "The current weather at Air-Buddy Airport is partly cloudy with a temperature of 72°F. Wind speed is 8 mph from the southwest. Visibility is good at 10 miles. All flights are currently able to land and take off normally.";
          } else if (lowerContent.includes('hello') || lowerContent.includes('hi')) {
            response = "Hello! How can I assist you with Air-Buddy airport operations today?";
          } else if (lowerContent.includes('search') || lowerContent.includes('find')) {
            if (lowerContent.includes('flight')) {
              response = "I found 3 matching flights. Flight AB123 departing at 14:30 to New York, Flight AB456 departing at 15:45 to London, and Flight AB789 departing at 16:20 to Tokyo.";
            } else if (lowerContent.includes('passenger')) {
              response = "I found passenger information. Would you like to see details about check-in status, boarding status, or baggage information?";
            } else {
              response = "I can search for flights, passengers, baggage, gates, and other airport information. Please specify what you're looking for.";
            }
          } else {
            response = "I'm here to help with questions about Air-Buddy airport operations, financial data, weather conditions, flights, and passenger information. How can I assist you today?";
          }
          
          addMessage(response, 'ai');
        } catch (error) {
          console.error('Error processing message:', error);
          addMessage("I'm sorry, I encountered an error processing your request. Please try again.", 'ai');
          toast({
            title: "Error",
            description: "Failed to process the request",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
        }
      }, 1000);
    }
  }, [toast]);

  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: uuidv4(),
        content: "Hello! I'm Air-Buddy, your airport assistant. How can I help you today?",
        sender: 'ai',
        timestamp: new Date()
      }
    ]);
  }, []);

  const addFinancialData = useCallback((data: FinancialData) => {
    setFinancialData(data);
  }, []);

  const searchData = useCallback(async (query: string): Promise<string> => {
    if (!financialData) {
      return "I don't have the latest financial data available. Please check the Analytics dashboard for up-to-date information.";
    }

    const lowerQuery = query.toLowerCase();
    
    // Process financial queries
    if (lowerQuery.includes('profit')) {
      const profit = financialData.profit.total;
      return `The current airport profit is ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(profit)}. This represents a profit margin of ${(profit / financialData.revenue.total * 100).toFixed(1)}% of total revenue.`;
    }

    if (lowerQuery.includes('revenue')) {
      const revenue = financialData.revenue.total;
      const aeroRevenue = financialData.revenue.aeronautical;
      const nonAeroRevenue = financialData.revenue.nonAeronautical;
      
      return `The total airport revenue is ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(revenue)}. This consists of ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(aeroRevenue)} in aeronautical revenue (${(aeroRevenue / revenue * 100).toFixed(1)}%) and ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(nonAeroRevenue)} in non-aeronautical revenue (${(nonAeroRevenue / revenue * 100).toFixed(1)}%).`;
    }

    if (lowerQuery.includes('expense') || lowerQuery.includes('cost')) {
      const expenses = financialData.expenses.total;
      
      return `The total airport expenses amount to ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(expenses)}. The largest expense categories are Infrastructure (${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(financialData.expenses.breakdown[0].amount)}) and Salaries (${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(financialData.expenses.breakdown[3].amount)}).`;
    }

    if (lowerQuery.includes('financial summary') || lowerQuery.includes('financial overview')) {
      const revenue = financialData.revenue.total;
      const expenses = financialData.expenses.total;
      const profit = financialData.profit.total;
      
      return `Financial Summary for Air-Buddy Airport:\nTotal Revenue: ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(revenue)}\nTotal Expenses: ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(expenses)}\nNet Profit: ${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
      }).format(profit)}\nProfit Margin: ${(profit / revenue * 100).toFixed(1)}%`;
    }
    
    // Generic financial response
    return "I can provide information about airport revenue, expenses, profit margins, and financial performance. Please ask a specific financial question.";
  }, [financialData]);

  return (
    <ChatbotContext.Provider
      value={{
        messages,
        addMessage,
        clearMessages,
        isLoading,
        isChatOpen,
        toggleChat,
        financialData,
        addFinancialData,
        searchData
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
};
