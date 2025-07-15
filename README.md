# AI Journal - Your Digital Companion 📖✨

A beautiful, compassionate AI-powered journal application that provides warm, welcoming responses to your diary entries. Share your thoughts, feelings, and experiences, and receive thoughtful, supportive feedback from an AI companion.

## Features 🌟

- **Beautiful Modern UI**: Clean, responsive design with dark/light mode toggle
- **AI-Powered Responses**: Get warm, compassionate responses to your diary entries
- **Local Storage**: Your entries are saved locally in your browser
- **Journal History**: View your past entries and AI responses
- **Secure API**: OpenAI API key is stored securely in environment variables
- **Real-time Feedback**: Instant AI responses to your journal entries
- **Responsive Design**: Works perfectly on desktop and mobile devices

## Technology Stack 🛠️

- **Frontend**: React 18, Modern CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **AI**: OpenAI GPT-3.5-turbo
- **Security**: Helmet, Rate limiting, CORS protection
- **Storage**: LocalStorage for client-side data persistence

## Installation & Setup 🚀

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenAI API key

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ai-journal-app
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Configuration**
   The `.env` file is already configured with your OpenAI API key. Make sure it's secure and not committed to version control.

5. **Start the application**
   ```bash
   # Start backend server (runs on port 3001)
   npm start
   
   # In another terminal, start frontend (runs on port 3000)
   cd client
   npm start
   ```

6. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## Usage 💭

1. **Write Your Entry**: Share your thoughts, feelings, or experiences in the text area
2. **Optional Name**: Add your name for a more personalized AI response
3. **Get AI Response**: Click "Share with AI" to receive a warm, supportive response
4. **View History**: Your entries and responses are automatically saved and displayed
5. **Toggle Theme**: Switch between light and dark modes for your comfort

## API Endpoints 🔌

- `POST /api/journal-response` - Submit diary entry and receive AI response
- `GET /api/health` - Health check endpoint

## Security Features 🔒

- Environment variables for API key storage
- Rate limiting to prevent abuse
- CORS protection
- Input validation and sanitization
- Helmet for security headers

## Deployment 🌐

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-journal-app)

**Quick Steps:**
1. Fork this repository
2. Connect your GitHub to Vercel
3. Import the project
4. Add `OPENAI_API_KEY` environment variable
5. Deploy!

📖 **Detailed Instructions**: See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)

### Local Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Serve production build
npm start
```

### Environment Variables
- `OPENAI_API_KEY`: Your OpenAI API key (required)

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

If you encounter any issues or have questions, please create an issue in the repository.

---

**Made with ❤️ for your emotional wellbeing**

*Remember: This AI companion is designed to provide support and encouragement, but it's not a replacement for professional mental health care when needed.*