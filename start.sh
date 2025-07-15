#!/bin/bash

# AI Journal Application Start Script
echo "🚀 Starting AI Journal Application..."

# Start backend server in the background
echo "📡 Starting backend server on port 3001..."
npm start &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🌐 Starting frontend server on port 3000..."
cd client
npm start &
FRONTEND_PID=$!

# Wait for both servers to start
sleep 3

echo "✅ AI Journal Application is running!"
echo "🔗 Frontend: http://localhost:3000"
echo "🔗 Backend API: http://localhost:3001/api/health"
echo ""
echo "To stop the application, press Ctrl+C"

# Keep script running and handle cleanup
cleanup() {
    echo "🛑 Stopping AI Journal Application..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for processes
wait