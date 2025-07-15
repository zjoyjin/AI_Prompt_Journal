#!/bin/bash

# AI Journal Application Development Start Script (Vercel Version)
echo "🚀 Starting AI Journal Application for Development..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Please create one with your OPENAI_API_KEY."
    echo "Example: OPENAI_API_KEY=sk-your-api-key-here"
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Start the React development server
echo "🌐 Starting React development server..."
echo "🔗 Application will be available at: http://localhost:3000"
echo "🔗 API endpoints: http://localhost:3000/api/*"
echo ""
echo "To stop the application, press Ctrl+C"

npm run dev