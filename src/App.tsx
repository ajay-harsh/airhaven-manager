
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ChatbotProvider } from './contexts/ChatbotContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Operations from './pages/Operations';
import Users from './pages/Users';
import Chatbot from './pages/Chatbot';
import AppLayout from './layouts/AppLayout';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <NotificationProvider>
          <ChatbotProvider>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="operations" element={<Operations />} />
                <Route path="chatbot" element={<Chatbot />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </ChatbotProvider>
        </NotificationProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
