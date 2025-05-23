# 📰 Evaluate News NLP

A web app that checks and analyzes any article link using Natural Language Processing (NLP). It fetches the article, analyzes the sentiment, and shows the result. It also works offline by saving past results!

---

## ✨ Features

- ✅ Checks if a URL is valid
- 🧠 Analyzes article content using NLP (sentiment: Positive, Negative, Neutral, Mixed)
- 🧾 Shows a text preview of the article
- 💾 Saves results offline (localStorage)
- 🛠 Uses Webpack (Dev & Prod builds)
- 🔍 Unit tested with Jest
- 🌐 Opens in browser automatically when you run the server

---

## 📦 How to Install

```bash
git clone https://github.com/Muayid12/evaluate-news-nlp.git
cd evaluate-news-nlp/starter_project
npm install
```

---

## 🚀 Run the App (Development)

```bash
✅ npm run start — Runs both the Express server and the Webpack development server together.

🌐 npm run build-dev — Builds the development bundle, but requires the Express server to be running for full functionality.
```

- This runs the Express server (http://localhost:3001)
- Also opens your default browser automatically

---

## 🚀 Run the App (Production)

```bash
🏗️ npm run build-prod — Builds the project for production and starts the Express server.

📦 Offline Mode: To test offline, simply open dist/index.html in your browser (after the build is complete).
```

- This runs the Express server (http://localhost:8081)

---

## 🧪 Run Tests

```bash
  npm run test
```

- Uses **Jest** to test JS functions (e.g., URL checker and form handler)

---


## ⚠️ Notes
- **Offline support**: If the server is down, cached results will show

# Evaluate News NLP Project

This project analyzes text content from URLs using NLP (Natural Language Processing).

## Features
- Analyzes sentiment of web content
- Uses AWS Lambda for NLP analysis
- Works offline with cached results
- Progressive Web App with service workers

## Deployment to Netlify

This project is configured to deploy to Netlify with serverless functions to handle the backend processing.

### Automatic Deployment
The easiest way to deploy this project is directly from GitHub:

1. Push this project to your GitHub repository
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your GitHub repository
5. Use these build settings:
   - Base directory: `starter_project`
   - Build command: `npm run build-prod`
   - Publish directory: `dist`
6. Click "Deploy site"

### Manual Deployment
To deploy manually:

1. Install the Netlify CLI: `npm install netlify-cli -g`
2. Navigate to the starter_project directory: `cd starter_project`
3. Build the project: `npm run build-prod`
4. Deploy to Netlify: `netlify deploy --prod`

## Local Development

To run the project locally:

1. Navigate to the starter_project directory: `cd starter_project`
2. Install dependencies: `npm install`
3. Start the development server: `npm start`
4. The app will be available at http://localhost:3000

## Project Structure

- `src/client`: Frontend code
- `src/server`: Express server for local development
- `netlify/functions`: Serverless functions for production

