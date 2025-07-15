const { OpenAI } = require('openai');

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CORS headers for Vercel
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default async function handler(req, res) {
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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

    res.status(200).json({ 
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
}