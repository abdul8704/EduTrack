# 📚 EduTrack

EduTrack is a full-stack e-learning platform where users can explore courses, enroll, take quizzes, and track their learning progress — while admins can monitor learners and manage user-course engagement.

---

## 🌍Live Preview
https://edu-track-flax.vercel.app/

To see the admin view, use 
- Email = "backups795@gmail.com"
- Password = "1234"
- Note: This is a dummy user to simulate admin view

## 🚀 Features

### 👨‍🎓 For Users
- 🔐 Secure signup & login using bcrypt
- 📚 Browse all available courses
- ✅ Enroll in courses and track your progress
- 🧠 Take quizzes to mark progress
- 📊 View categorized courses:
  - **Available**
  - **Ongoing (Enrolled)**
  - **Completed**

### 👩‍💼 For Admins
- 👀 View all registered users
- 📈 Monitor individual user progress across courses
- 🧾 View enrolled users for each course
- ➕ Add courses and quizzes

---

## 🧱 Tech Stack

| Layer        | Technology             |
|--------------|------------------------|
| Frontend     | React.js               |
| Backend      | Node.js + Express.js   |
| Database     | MongoDB + Mongoose     |
| Authentication | bcrypt for password hashing |


---

## 🔐 Security Highlights

- Passwords are never stored in plain text
- Salted & hashed using bcrypt with configurable rounds
- .env for managing sensitive credentials

  ---

## 🛠️ Setup Instructions

- Clone the repository
```
git clone https://github.com/abdul8704/EduTrack.git
cd EduTrack
```

- Install dependencies
```
npm install
```
- Setup environment

Create a .env file in your server directory:
```
PORT=5000
MONGO_URI=your_mongo_uri_here
HASH_SALT=10
USER_EMAIL=your_email_here
EMAIL_PASSWORD=your_email_app_password
```
Create a .env file in your client directory:

```
VITE_API_BASE_URL=http://localhost:5000
```

- Run the server
```
cd server
npm run start
```

- Run the client
  
```
 cd client
 npm run dev
 ```
