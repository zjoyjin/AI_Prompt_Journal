# Quick Start Guide 🚀

## Prerequisites ✅
- Node.js installed (v14 or higher)
- Dependencies installed (run `npm install`)

## Start the Application

### Option 1: Using the Development Script (Recommended)
```bash
./dev-start.sh
```

### Option 2: Manual Start
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Access the Application
- **Application**: http://localhost:3000
- **API Health Check**: http://localhost:3000/api/health
- **AI Journal API**: http://localhost:3000/api/journal-response

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