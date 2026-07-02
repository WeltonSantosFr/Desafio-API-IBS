# Full Stack Challenge - IBS Sistemas

This repository contains the solution for the Full Stack application development challenge proposed by **IBS Sistemas**, located in Rio do Sul, SC. The project consists of an API built with **NestJS** and a frontend developed with **Angular**.

The goal of the application is to manage users and their respective addresses, in addition to providing an administrative dashboard and an authentication system.

## 🚀 Technologies Used

### Backend (API)
The API was developed following the principles of a modular and scalable NestJS architecture.
- **Node.js** with **NestJS** (Main Framework)
- **TypeORM** (ORM for database mapping)
- **PostgreSQL** (Relational Database)
- **JWT (JSON Web Token)** and **bcrypt** (Authentication and Password Encryption)
- **TypeScript**

### Frontend (Web App)
The user interface was created as a Single Page Application (SPA), focused on usability.
- **Angular 17** (Frontend Framework)
- **PrimeNG**, **Angular Material**, and **NG-ZORRO** (UI Component Libraries)
- **Chart.js** (Used for rendering charts in the Dashboard)
- **TypeScript** and **RxJS**

---

## ⚙️ Architecture and Features

The system is divided into well-defined business modules:

### 1. Authentication and Administration (`admin` / `login`)
- Secure login system.
- API route protection using middlewares (`auth.middleware.ts`) based on JWT token validation.

### 2. User Management (`users`)
- **Backend:** RESTful endpoints for user creation, reading, updating, and deletion (CRUD).
- **Frontend:** User listing screen with interactive modals for creation (`create-user-modal`) and editing (`edit-user-modal`).

### 3. Address Management (`address`)
- **Backend:** Endpoints for managing addresses that are linked to the system's users.
- **Frontend:** Address screen and management controlled via interactive modals (`create-address-modal` and `edit-address-modal`).

### 4. Dashboard (`dashboard`)
- Main screen (dashboard) presented right after a successful login.
- Displays metrics, indicators, and charts (using Chart.js) for visual analysis of the data registered in the system.

---

## 📦 How to run the project

### Prerequisites
- Node.js (v18+ recommended)
- PostgreSQL configured and running on your machine or in a container (Docker)
- `yarn` (or `npm`) package manager

### Database Setup
1. Create a database in PostgreSQL (e.g., `ibs_challenge`).
2. In the `backend/` folder, you will find a file named `.env.example`. Create a copy of it and rename it to `.env`.
3. Fill in the environment variables in the `.env` file with your PostgreSQL database credentials and set the secret key for the JWT.

### Running the Backend (API)
```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
yarn install

# 3. Start the server in development mode
yarn start:dev
```
The API will be running (usually on `http://localhost:3000` or the port defined in your `.env`). TypeORM will handle syncing the database tables depending on your configuration.

### Running the Frontend (Angular)
```bash
# 1. Open a new terminal and navigate to the frontend directory
cd frontend

# 2. Install dependencies
yarn install

# 3. Start the Angular development server
yarn start
```
The frontend will be accessible in your browser at `http://localhost:4200/`.

---

## 📄 Repository Structure

```text
/
├── backend/                  # API source code (NestJS)
│   ├── src/
│   │   ├── admin/            # Authentication and Admin Rules Module
│   │   ├── users/            # Users Module
│   │   ├── address/          # Address Module
│   │   └── migrations/       # Database Migrations (TypeORM)
│   ├── typeOrm.config.ts     # TypeORM connection configuration
│   └── package.json          
│
└── frontend/                 # Web interface source code (Angular)
    ├── src/
    │   └── app/
    │       ├── components/   # UI visual components (Login, Dashboard, Users, Address, Modals)
    │       ├── services/     # API integration services via HTTP calls
    │       ├── types/        # TypeScript Typings and Interfaces Definitions
    │       └── app.routes.ts # Angular navigation routes definition
    └── package.json
```

---

*Developed for IBS Sistemas (Rio do Sul, SC).*
