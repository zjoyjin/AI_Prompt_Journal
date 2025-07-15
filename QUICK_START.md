# Quick Start Guide 🚀

## Prerequisites ✅
- Node.js installed (v14 or higher)
- Dependencies installed (run `npm install` in root and `cd client && npm install`)

## Start the Application

### Option 1: Using the Start Script (Recommended)
```bash
./start.sh
```

### Option 2: Manual Start
```bash
# Terminal 1 - Start backend server
npm start

# Terminal 2 - Start frontend server
cd client
npm start
```

## Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api/health

## How to Use
1. **Enter your name** (optional) for personalized responses
2. **Write your diary entry** in the text area
3. **Click "Share with AI"** to get a warm, supportive response
4. **View your journal history** below the entry form
5. **Toggle dark/light mode** using the theme button

## Features
- 🤖 AI-powered compassionate responses
- 📝 Local storage for journal entries
- 🌙 Dark/light mode toggle
- 📱 Responsive design
- 🔒 Secure API key handling
- 📊 Journal history tracking

## Security Note
Your OpenAI API key is stored in the `.env` file and is NOT committed to git for security reasons.