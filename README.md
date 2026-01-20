# 📊 LeetMetric – LeetCode Progress Tracker

LeetMetric is a **Vanilla JavaScript-based web application** that helps users visualize their LeetCode problem-solving progress in a simple and interactive way.  
Users can enter their LeetCode username and instantly view **Easy, Medium, and Hard** problem statistics using **dynamic progress circles and stat cards**.

---

## 🚀 Features

- 🔍 Username validation using **Regular Expressions (Regex)**
- ⚡ Asynchronous API calls using **async/await**
- 📡 Data fetched from **LeetCode GraphQL API**
- 📈 Visual progress using **CSS conic-gradient**
- 🧩 Dynamic UI updates using **DOM manipulation**
- 🛑 Proper error handling with **try/catch/finally**
- 🎯 Clean and responsive user interface

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3**
- **Vanilla JavaScript (ES6+)**
- **GraphQL**
- **CORS Anywhere** (development only)

---

## 🧠 How It Works

1. User enters a **LeetCode username**
2. Username is validated using a **regex pattern**
3. App makes an asynchronous request to the **LeetCode GraphQL API**
4. API response is safely parsed using `find()` instead of hardcoded array indexes
5. Progress percentage is calculated for each difficulty level
6. UI is updated dynamically using:
   - CSS variables
   - Conic gradients
   - DOM manipulation

---

## 🔐 Username Validation (Regex)

```js
/^[a-zA-Z0-9_]{3,20}$/

