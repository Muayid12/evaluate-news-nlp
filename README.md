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
- Also opens your default browser automatically

---

## 🧪 Run Tests

```bash
"npm run test"  
```

- Uses **Jest** to test JS functions (e.g., URL checker and form handler)

---


## ⚠️ Notes
- **Offline support**: If the server is down, cached results will show

