# Product Management System

A simple **e-commerce product management system** built with the MERN stack and Next.js.  
This application allows users to register, log in, manage products and categories, and view them via a dashboard.

---

## Tech Stack

- **Frontend:** Next.js 15, React 19, Ant Design, Redux Toolkit, Axios  
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT authentication  
- **Authentication:** JWT tokens stored in HttpOnly cookies  
- **Validation:** Joi  

---

## Project Features

- User authentication (register, login, logout, check session)  
- Protected dashboard for managing products and categories  
- CRUD operations for products and categories  
- Search products by name or description  
- Responsive UI built with Ant Design  

---

## Setup and Installation

### Prerequisites

- Node.js (v18+ recommended)  
- MongoDB instance (local or cloud)  

---

### Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (or copy `.env.example`) and set environment variables:

```
MONGO_URI=your_mongo_connection_string
PORT=5000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the backend server:

```bash
npm run dev
```

---

### Frontend

1. Navigate to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (or copy `.env.example`) and set environment variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

4. Start the frontend development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## API Documentation

### Auth Routes (`/api/auth`)

| Method | Endpoint    | Description                    | Protected |
| ------ | ----------- | ------------------------------ | --------- |
| POST   | /register   | Register a new user            | No        |
| POST   | /login      | Log in with email & password   | No        |
| POST   | /logout     | Log out the current user       | No        |
| GET    | /check-auth | Check if user session is valid | Yes       |

### Category Routes (`/api/category`)

| Method | Endpoint | Description           | Protected |
| ------ | -------- | --------------------- | --------- |
| GET    | /        | Get all categories    | Yes       |
| GET    | /:id     | Get category by ID    | Yes       |
| POST   | /        | Create a new category | Yes       |
| PUT    | /:id     | Update category by ID | Yes       |
| DELETE | /:id     | Delete category by ID | Yes       |

### Product Routes (`/api/product`)

| Method | Endpoint | Description                         | Protected |
| ------ | -------- | ----------------------------------- | --------- |
| GET    | /        | Get all products                    | Yes       |
| GET    | /search  | Search products by name/description | Yes       |
| GET    | /:id     | Get product by ID                   | Yes       |
| POST   | /        | Create a new product                | Yes       |
| PUT    | /:id     | Update product by ID                | Yes       |
| DELETE | /:id     | Delete product by ID                | Yes       |

---

## Notes

- All protected routes require a valid JWT token stored in an **HttpOnly cookie**.  
- Use the `.env.example` file as a reference for environment variables.  
- Ensure the frontend and backend URLs match when deploying to production (e.g., Vercel + Render).  

---
