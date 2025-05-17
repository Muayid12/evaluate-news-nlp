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
npm run build-prod
npm run start

```

---

## 🚀 Run the App (Development)

```bash
npm run build-dev
npm run start
```

- This runs the Express server (http://localhost:8081)
- Also opens your default browser automatically

---

## 🧪 Run Tests

```bash
npm run test
```

- Uses **Jest** to test JS functions (e.g., URL checker and form handler)

---


## ⚠️ Notes
- **Offline support**: If the server is down, cached results will show

