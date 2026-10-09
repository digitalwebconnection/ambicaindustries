# Ambica Industries

This project contains both the frontend and backend applications in a clean monorepo / multi-package structure.

## Project Structure

```
ambicaindustries/
├── frontend/          # React + Vite + Tailwind CSS frontend application
│   ├── src/           # Components, pages, hooks, data, assets
│   ├── public/        # Static files
│   ├── package.json   # Frontend dependencies and scripts
│   └── vite.config.ts # Vite configuration
├── backend/           # Node.js + Express API backend
│   ├── src/           # API routes, controllers, models, middleware
│   ├── package.json   # Backend dependencies and scripts
│   └── tests/         # Backend test suites
└── package.json       # Workspace root scripts
```

## Getting Started

### 1. Install Dependencies
```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

Or from the root directory:
```bash
npm run install:all
```

### 2. Development Servers

From root directory:
```bash
# Start frontend dev server
npm run dev:frontend

# Start backend dev server
npm run dev:backend
```

Or run directly within each folder:
```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

### 3. Production Build

```bash
# Frontend build
npm run build:frontend
# or cd frontend && npm run build
```
