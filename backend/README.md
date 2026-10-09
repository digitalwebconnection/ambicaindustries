# Sunny Solar Backend

Express & Node.js backend for Sunny Solar.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run the Server
- Development mode (with live reload via nodemon):
  ```bash
  npm run dev
  ```
- Production mode:
  ```bash
  npm start
  ```

## Available Endpoints

- `GET /`: API overview
- `GET /api/health`: Health check and uptime status
