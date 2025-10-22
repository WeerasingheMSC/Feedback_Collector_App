# 📝 Feedback Collector App

A full-stack **Feedback Collection Platform** where users can submit and view feedback entries instantly.  
Built with **Next.js**, **Ant Design**, **Aceternity UI**, and **Tailwind CSS** for a modern and responsive UI — powered by **Express.js** and **MongoDB** for backend data management.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- Next.js 14 (App Router)
- Ant Design
- Aceternity UI
- Tailwind CSS

### ⚙️ Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)

### 🗄️ Database
- MongoDB Atlas

---

## 📁 Project Structure

feedback-app/
├── frontend/ # Next.js application  
│ ├── src/  
│ │ ├── app/  
│ │ │ ├── page.js # Main page (form + feedback list)  
│ │ │ ├── layout.js # App layout wrapper  
│ │ │ └── globals.css # TailwindCSS global styles  
│ │ ├── components/  
│ │ │ ├── ui/ # Shared UI components  
│ │ │ ├── FeedbackForm.jsx # Feedback submission form  
│ │ │ └── FeedbackList.jsx # Display list of feedback  
│ │ └── lib/  
│ │ └── utils.js # Helper functions  
│ └── package.json  
└── backend/ # Express.js API  
├── models/  
│ └── Feedback.js # Mongoose model  
├── routes/  
│ └── feedback.js # API routes (GET, POST)  
├── server.js # Express server entry point  
└── package.json  

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/api/feedback` | Add new feedback |
| `GET`  | `/api/feedback` | Retrieve all feedback entries |

### 🧩 Example Schema
```js
const feedbackSchema = new mongoose.Schema({
  name: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});
```
---

## 💡 Features

✅ Submit feedback with name and message  
✅ View all feedback entries dynamically  
✅ Responsive UI built with Ant Design & TailwindCSS  
✅ Modular code with reusable React components  
✅ API integration with Express.js backend  
✅ MongoDB used for persistent data storage  

---
## ⚙️ Setup Instructions  

### 1️⃣ Clone the Repository  
```
git clone "https://github.com/WeerasingheMSC/feedback-app.git"
cd feedback-app
```
### 2️⃣ Backend Setup  
```
cd backend
npm install
```

Create a ```.env``` file inside the ```backend/``` folder:  
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```
Run backend server:  
```
npm start
```
### 3️⃣ Frontend Setup  
```
cd ../frontend
npm install
npm run dev
```
---
## 🧠 Future Enhancements  
- Add pagination and sorting  
- Implement form validation and error handling  
- Include admin authentication for feedback moderation  
- Deploy frontend (Vercel) and backend (Render/Railway)
  
---
## 👨‍💻 Author

**Sahan Weerasinghe**  
📍 Colombo, Sri Lanka  
🌐 www.mscweerasinghe.tech
 | www.linkedin.com/in/mscweerasinghe
 | [GitHub](https://github.com/WeerasingheMSC)
