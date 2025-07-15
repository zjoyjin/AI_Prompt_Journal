import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import { BookOpen, Send, Sparkles, User, Bot, Heart, Calendar, Moon, Sun } from 'lucide-react';
import './App.css';

function App() {
  const [diaryEntry, setDiaryEntry] = useState('');
  const [userName, setUserName] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Load saved entries from localStorage
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setJournalEntries(JSON.parse(savedEntries));
    }
    
    // Load saved name
    const savedName = localStorage.getItem('userName');
    if (savedName) {
      setUserName(savedName);
    }

    // Load theme preference
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  const saveEntry = (entry, response) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      entry: entry,
      response: response,
      userName: userName
    };
    
    const updatedEntries = [newEntry, ...journalEntries];
    setJournalEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!diaryEntry.trim()) return;

    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/journal-response', {
        diaryEntry: diaryEntry.trim(),
        userName: userName || 'friend'
      });

      if (response.data.success) {
        setAiResponse(response.data.response);
        saveEntry(diaryEntry.trim(), response.data.response);
        setDiaryEntry('');
        
        // Save name to localStorage
        if (userName) {
          localStorage.setItem('userName', userName);
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setAiResponse('I apologize, but I encountered an error while processing your entry. Please try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <div className="container">
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <BookOpen size={32} />
              <h1>AI Journal</h1>
            </div>
            <button className="theme-toggle" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <p className="subtitle">
            Your compassionate digital companion for daily reflection and emotional support
          </p>
        </header>

        <main className="main">
          <div className="journal-card">
            <div className="card-header">
              <Sparkles size={24} />
              <h2>Share Your Thoughts</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="journal-form">
              <div className="input-group">
                <User size={20} />
                <input
                  type="text"
                  placeholder="What's your name? (optional)"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="name-input"
                />
              </div>

              <div className="textarea-container">
                <TextareaAutosize
                  placeholder="Dear Journal, today I felt... What's on your mind? Share your thoughts, feelings, or experiences."
                  value={diaryEntry}
                  onChange={(e) => setDiaryEntry(e.target.value)}
                  minRows={4}
                  maxRows={12}
                  className="diary-textarea"
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                disabled={!diaryEntry.trim() || isLoading}
                className="submit-btn"
              >
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Getting response...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Share with AI
                  </>
                )}
              </button>
            </form>

            {aiResponse && (
              <div className="ai-response">
                <div className="response-header">
                  <Bot size={20} />
                  <span>AI Companion Response</span>
                  <Heart size={16} className="heart-icon" />
                </div>
                <div className="response-content">
                  {aiResponse}
                </div>
              </div>
            )}
          </div>

          {journalEntries.length > 0 && (
            <div className="journal-history">
              <h3>
                <Calendar size={20} />
                Your Journal History
              </h3>
              <div className="entries-grid">
                {journalEntries.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="entry-card">
                    <div className="entry-date">
                      {formatDate(entry.date)} at {formatTime(entry.date)}
                    </div>
                    <div className="entry-content">
                      <p><strong>Your Entry:</strong> {entry.entry.substring(0, 150)}...</p>
                      <p><strong>AI Response:</strong> {entry.response.substring(0, 150)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>

        <footer className="footer">
          <p>Made with <Heart size={16} className="heart-icon" /> for your emotional wellbeing</p>
        </footer>
      </div>
    </div>
  );
}

export default App;