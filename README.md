# 🏪 Store Rating Platform

A full-stack web application that allows users to rate stores, store owners to monitor performance, and administrators to manage the platform.

Built using **React (Vite) + Node.js + Express + Prisma + PostgreSQL**.

---

## 🚀 Features

### 👑 System Administrator
- Add new stores, users, and admin accounts
- Dashboard overview:
  - Total Users
  - Total Stores
  - Total Ratings
- View and filter users (Name, Email, Address, Role)
- View and filter stores
- Sort tables (ascending / descending)
- View detailed user profile
  - If Store Owner → shows store & average rating
- Secure logout

---

### 👤 Normal User
- Register & login
- Update password
- View all stores
- Search stores by name or address
- Submit rating (1–5)
- Modify submitted rating
- View personal submitted rating
- Secure logout

---

### 🏬 Store Owner
- Login securely
- Update password
- View users who rated their store
- View average store rating
- Secure logout

---

## 🛡 Form Validations

- **Name:** 20–60 characters  
- **Address:** Max 400 characters  
- **Password:** 8–16 characters  
  - At least one uppercase letter  
  - At least one special character  
- **Email:** Standard email validation  

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- React Router
- React Hot Toast

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL
- JWT Authentication
- bcrypt

---


---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Ujjwal-anand00/Store-Rating
cd store-rating
```
---

### 2️⃣ Backend Setup

```
cd backend
npm install
```

Create .env file:
```
DATABASE_URL=postgresql://username:password@localhost:5432/store_rating
JWT_SECRET=your_secret_key
PORT=5000
```
Run migrations:
```
npx prisma migrate dev
```

Start backend:
```
npm run dev
```

### 3️⃣ Frontend Setup

```
cd frontend
npm install
npm run dev
```
Frontend runs at : http://localhost:5173

## 🔐 Authentication Flow

JWT-based authentication<br>

Role-based access control<br>

Protected routes<br>

Axios interceptor for automatic token injection

# 👨‍💻 Author

**Ujjwal Anand**<br>
BTech Computer Science Engineering<br>
Full Stack Developer
