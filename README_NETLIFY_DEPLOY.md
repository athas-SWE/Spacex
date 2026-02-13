# Netlify Deployment Guide

## ✅ Netlify-Ready Setup

This project is now configured for Netlify deployment with serverless functions for email sending.

## 📁 Project Structure

```
new/
├── netlify/
│   └── functions/
│       ├── send-email.js    # Serverless function for sending emails
│       └── package.json      # Dependencies for Netlify functions
├── netlify.toml             # Netlify configuration
├── src/                     # React frontend
└── package.json             # Frontend dependencies
```

## 🚀 Deployment Steps

### Option 1: Deploy via Netlify Dashboard

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Go to Netlify Dashboard:**
   - Visit https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18 (or latest)

4. **Deploy!**
   - Click "Deploy site"
   - Netlify will automatically build and deploy

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

## 📧 Email Function Setup

The email function is located at:
- **Path:** `netlify/functions/send-email.js`
- **Endpoint:** `/.netlify/functions/send-email`
- **Method:** POST

### Email Configuration

- **Sender:** ahamedathas12@gmail.com
- **Recipient:** infobsc12@gmail.com
- **Gmail App Password:** rfws vegm ycro kxky

## 🔧 Local Development with Netlify Functions

To test locally with Netlify Functions:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Install function dependencies
cd netlify/functions
npm install
cd ../..

# Run Netlify Dev (runs both frontend and functions)
netlify dev
```

This will:
- Start Vite dev server on port 8888
- Run Netlify functions locally
- Proxy function requests automatically

## 📝 Important Notes

1. **Function Dependencies:**
   - Netlify functions have their own `package.json` in `netlify/functions/`
   - Install dependencies there: `cd netlify/functions && npm install`

2. **Environment Variables (Optional):**
   - For production, consider moving email credentials to Netlify environment variables
   - Go to Site settings → Environment variables
   - Update function to use `process.env.GMAIL_USER` and `process.env.GMAIL_PASS`

3. **Build Process:**
   - Frontend builds to `dist/` folder
   - Functions are automatically detected in `netlify/functions/`
   - Netlify handles everything automatically

## 🎯 What Happens on Deployment

1. Netlify runs `npm run build` (builds React app)
2. Netlify detects `netlify/functions/` folder
3. Netlify creates serverless functions
4. Frontend is deployed to CDN
5. Functions are deployed as serverless endpoints

## ✅ Testing After Deployment

1. Visit your Netlify site URL
2. Click "Yes" button
3. Check `infobsc12@gmail.com` for the email
4. Email should arrive within seconds!

## 🔒 Security Recommendations

For production, consider:
- Moving credentials to Netlify environment variables
- Adding rate limiting to prevent spam
- Implementing request validation
- Using a more secure email service

## 📞 Support

If you encounter issues:
- Check Netlify function logs in the dashboard
- Verify Gmail app password is correct
- Ensure function dependencies are installed
- Check browser console for errors
