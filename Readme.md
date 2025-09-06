🛒 RMR – Marketplace Application

This repository contains the full-stack codebase for RMR, an online marketplace platform.
It includes both backend (Node.js/fastify + Supabase + JWT authentication) and frontend (React + Vite + Redux) projects.

📂 Project Structure
RMR_repo/
│── RMR_backend-main/   # Backend (API server)
│   ├── backend/
│   │   ├── package.json
│   │   ├── server.js
│   │   └── src/
│   │       ├── app.js
│   │       ├── config/       # Database & environment configs
│   │       ├── controllers/  # Request controllers
│   │       ├── models/       # Database models
│   │       ├── plugins/      # JWT and other plugins
│   │       ├── routes/       # fastify routes
│   │       ├── services/     # External services (Supabase, etc.)
│   │       └── utils/        # Helpers (Mailer, Password, Token)
│
│── RMR_frontend-main/  # Frontend (React + Vite)
│   ├── frontend/
│   │   ├── public/        # Static assets
│   │   ├── src/
│   │   │   ├── api/       # API service layer
│   │   │   ├── components/# Reusable React components
│   │   │   ├── layout/    # Layout wrappers
│   │   │   ├── pages/     # Route pages
│   │   │   └── store/     # Redux store
│   │   ├── index.html
│   │   ├── vite.config.js
│   │   └── package.json

⚙️ Backend Setup
Prerequisites

Node.js >= 16

MongoDB or Supabase (based on supabase.service.js)

Environment variables (.env file)

Installation
cd RMR_backend-main/backend
npm install

Environment Variables

Create a .env file inside backend/ with the following (example):

PORT=5000
MONGO_URI=mongodb://localhost:27017/rmr
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_password
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

Run Server
npm run dev


Backend will be running on:
👉 http://localhost:5000

🎨 Frontend Setup
Prerequisites

Node.js >= 16

Vite

Installation
cd RMR_frontend-main/frontend
npm install

Run Development Server
npm run dev


Frontend will be running on:
👉 http://localhost:5173

🚀 Features
✅ Backend

Authentication (JWT-based login/register)

User Management (CRUD via user.controller.js)

Ads Management (ad.model.js)

Feedback & Contact APIs

Supabase integration

Password hashing + token utilities

Mailer utility for notifications

🎨 Frontend

React + Vite + Redux Toolkit

Authentication (SignIn/SignUp, Protected Routes)

Dashboard for ads management

Product listing & category filtering

Cart & Checkout flow

Responsive Navbar & Sidebar

Custom components (PriceBar, Hero, Upload, etc.)

Error handling pages (404, Unauthorized)

📦 Deployment
Frontend

Can be deployed on Vercel (already has vercel.json config).

vercel deploy

Backend

Deploy on Heroku / Render / Railway.
Make sure to set .env values in deployment environment.

🛠️ Tech Stack
Backend

Node.js

fastify.js

Supabase / MongoDB

JWT Authentication

Nodemailer

Frontend

React (Vite)

Redux Toolkit

React Router

Tailwind CSS

🤝 Contributing

Fork the repo

Create a feature branch (git checkout -b feature/your-feature)

Commit changes (git commit -m "Added feature")

Push branch (git push origin feature/your-feature)

Open a Pull Request