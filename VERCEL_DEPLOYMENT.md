# Vercel Deployment Guide 🚀

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/ai-journal-app)

## Manual Deployment Steps

### 1. Prerequisites
- Vercel account (sign up at [vercel.com](https://vercel.com))
- GitHub repository with your AI Journal app
- OpenAI API key

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy from your project directory
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name: ai-journal-app
# - Directory: ./
# - Want to override settings? No
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Create React App
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### 3. Set Environment Variables
After deployment, you need to add your OpenAI API key:

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add a new variable:
   - **Name**: `OPENAI_API_KEY`
   - **Value**: Your OpenAI API key (starts with `sk-`)
   - **Environments**: Production, Preview, Development

### 4. Redeploy
After adding the environment variable, redeploy your app:
- Go to "Deployments" tab
- Click the three dots on the latest deployment
- Select "Redeploy"

## Project Structure for Vercel

```
ai-journal-app/
├── api/                    # Serverless functions
│   ├── journal-response.js # Main AI response endpoint
│   ├── health.js          # Health check endpoint
│   └── package.json       # API dependencies
├── src/                   # React app source
│   ├── App.js
│   ├── App.css
│   └── index.js
├── public/                # Static assets
│   ├── index.html
│   └── manifest.json
├── package.json           # Main dependencies
├── vercel.json           # Vercel configuration
└── README.md
```

## Vercel Configuration

The `vercel.json` file configures:
- **Static Build**: React app builds to `build/` directory
- **Serverless Functions**: API routes in `api/` directory
- **Environment Variables**: OpenAI API key configuration
- **Routing**: SPA routing for React app

## API Endpoints

Once deployed, your API endpoints will be available at:
- `https://your-app.vercel.app/api/health` - Health check
- `https://your-app.vercel.app/api/journal-response` - AI journal response

## Features on Vercel

✅ **Automatic HTTPS**: All deployments include SSL certificates
✅ **Global CDN**: Fast loading worldwide
✅ **Automatic Deployments**: Deploy on every git push
✅ **Preview Deployments**: Each PR gets a preview URL
✅ **Serverless Functions**: Scalable API endpoints
✅ **Environment Variables**: Secure configuration management

## Troubleshooting

### Common Issues:

1. **API Key Not Working**
   - Verify the environment variable is set correctly
   - Make sure you redeployed after adding the variable

2. **Build Errors**
   - Check that all dependencies are in `package.json`
   - Ensure React build completes without errors

3. **Function Timeout**
   - OpenAI API calls are configured with 30-second timeout
   - If needed, increase in `vercel.json` under `functions`

4. **CORS Issues**
   - The API functions include CORS headers
   - All origins are allowed in the current configuration

## Custom Domain (Optional)

1. Go to your project settings
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring and Logs

- **Function Logs**: Available in the Vercel dashboard
- **Analytics**: Built-in analytics for your app
- **Performance**: Real-time performance metrics

## Cost

- **Hobby Plan**: Free tier includes:
  - 100GB bandwidth
  - 100GB-hours serverless function execution
  - Unlimited static deployments

This should be sufficient for personal use of your AI journal app.

## Support

For Vercel-specific issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

For app-specific issues:
- Check the GitHub repository issues
- Review the application logs in Vercel dashboard