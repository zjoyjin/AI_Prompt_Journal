const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const { OpenAI } = require('openai');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? false : ['http://localhost:3000'],
  credentials: true
}));

// Body parsing middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// API endpoint for journal entries
app.post('/api/journal-response', async (req, res) => {
  try {
    const { diaryEntry, userName } = req.body;

    if (!diaryEntry || diaryEntry.trim().length === 0) {
      return res.status(400).json({ error: 'Diary entry cannot be empty' });
    }

    const prompt = `You are a warm, compassionate AI journal companion. A user named ${userName || 'friend'} has shared their diary entry with you. Please respond with:
    
    1. Warm acknowledgment of their feelings and experiences
    2. Thoughtful insights about their situation
    3. Gentle, practical suggestions or solutions if appropriate
    4. Encouragement and support
    
    Keep your response personal, caring, and around 150-200 words. Here's their diary entry:
    
    "${diaryEntry}"`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a compassionate AI journal companion who provides warm, supportive responses to diary entries. Always be kind, understanding, and helpful while maintaining appropriate boundaries."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({ 
      success: true, 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error generating AI response:', error);
    res.status(500).json({ 
      error: 'Failed to generate AI response. Please try again.',
      success: false 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// The "catchall" handler: send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Journal Server running on port ${PORT}`);
  console.log(`📖 Ready to provide warm, supportive responses to diary entries`);
});

module.exports = app;