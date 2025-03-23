
import React, { useEffect } from 'react';
import { useChatbot } from '@/contexts/ChatbotContext';

const Chatbot: React.FC = () => {
  const { messages, sendMessage } = useChatbot();
  
  useEffect(() => {
    document.title = 'Chatbot | Air-Buddy';
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Chatbot</h1>
      <p className="text-muted-foreground">Chat with Air-Buddy assistant.</p>
      
      <div className="p-6 bg-card text-card-foreground rounded-lg border shadow h-[calc(100vh-300px)] flex flex-col">
        <div className="flex-1 overflow-auto mb-4">
          {messages.map((msg, index) => (
            <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-3 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                sendMessage(e.currentTarget.value);
                e.currentTarget.value = '';
              }
            }}
          />
          <button 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            onClick={() => {
              const input = document.querySelector('input') as HTMLInputElement;
              if (input.value.trim()) {
                sendMessage(input.value);
                input.value = '';
              }
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Chatbot);
