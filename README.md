# Real Taste - Cafe Shop Web Application

A full-stack MERN application for managing a cafe shop with user authentication, order management, and admin dashboard.

## Project Structure

```
real-taste/
├── client/                 # Frontend - React + Vite
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── features/     # Redux slices and features
│   │   ├── services/     # API services
│   │   └── utils/        # Utility functions
│   └── ...
│
└── server/                # Backend - Node.js + Express
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/       # MongoDB models
    │   ├── routes/       # API routes
    │   ├── middleware/   # Custom middleware
    │   └── utils/        # Utility functions
    └── ...
```

## Prerequisites

- Node.js v16 or higher
- MongoDB Atlas account
- npm or yarn package manager

## Getting Started

### Backend Setup

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a .env file based on .env.example and fill in your values.

4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Features

- User Authentication (JWT)
- Menu Management
- Order Processing
- Admin Dashboard
- Email Notifications
- Responsive Design

## Tech Stack

### Frontend
- React.js + Vite
- TypeScript
- Redux Toolkit
- TailwindCSS
- React Router DOM
- React Hook Form

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- NodeMailer

## License

This project is licensed under the ISC License.
