# 🤖 Jervis AI ( GPT Clone)

A full-stack ChatGPT-like AI chat application built using **React (Vite)**, **Node.js**, **Express**, **MongoDB**, and **Socket.io**.

🌐 **Live Demo:** [https://gpt-lemon-xi.vercel.app/](https://gpt-lemon-xi.vercel.app/)

---

## 🚀 Features

* 🔐 User Authentication (Register & Login)
* 💬 Real-time AI Chat (Socket.io)
* 🧠 Memory-based responses using vector embeddings
* 📂 Multiple chat sessions
* 🌙 Dark mode UI
* ⚡ Fast and responsive interface

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Redux Toolkit
* Axios
* Socket.io-client

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* Socket.io
* JWT Authentication

---

## 📁 Project Structure

```
GPT/
│
├── backend-gpt/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── sockets/
│   │   └── app.js
│   └── server.js
│
├── frontend-gpt/
│   └── vite-project/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── store/
│       │   └── App.jsx
```

---

## 🔑 Environment Variables

### Backend (.env)

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_api_key
```

### Frontend (.env)

```
VITE_API_URL=https://gpt-1-od0l.onrender.com
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/harshpal130/GPT.git
cd GPT
```

---

### 2. Backend Setup

```bash
cd backend-gpt
npm install
npm run dev
```

---

### 3. Frontend Setup

```bash
cd frontend-gpt/vite-project
npm install
npm run dev
```

---

## 🌍 Deployment

### Backend (Render)

* Hosted on: [https://gpt-1-od0l.onrender.com](https://gpt-1-od0l.onrender.com)
* Ensure:

  * `secure: true`
  * `sameSite: "none"`
  * `app.set("trust proxy", 1)`

### Frontend (Vercel)

* Hosted on: [https://gpt-lemon-xi.vercel.app](https://gpt-lemon-xi.vercel.app)

---

## 🔐 Authentication Flow

1. User registers
2. User logs in
3. JWT token stored in HTTP-only cookie
4. Authenticated requests include cookie

---

## 💡 Usage

1. Open the app
2. Create an account
3. Login
4. Create a new chat
5. Start chatting with AI 🚀

---

## ⚠️ Important Notes

* Cookies require:

  * `secure: true`
  * `sameSite: "none"`
* CORS must allow frontend domain
* Socket.io requires separate CORS config

---

## 🧑‍💻 Author

**Harshpal**

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!
