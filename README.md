# 🏭 Ambica Industries — Full-Stack Web Portal & Admin CMS

A high-performance, full-stack B2B industrial website, product catalog, knowledge center, and administrative suite built for **Ambica Industries** (established in 1986) — leading manufacturers and exporters of Acid Dyes, Direct Dyes, Reactive Dyes, Leather Dyes, and Wood Stains based in Ahmedabad, Gujarat, India.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion, Lenis Smooth Scroll, Lucide & React Icons.
- **Backend**: Node.js, Express.js (ES Modules), MongoDB Atlas (Mongoose ODM), JWT Authentication, Cloudinary API.
- **Architecture**: Monorepo workspace with automated parallel dev scripts (`concurrently`).

---

## 📁 Project Directory Structure

```
ambicaindustries/
├── frontend/                     # React + Vite + Tailwind CSS client
│   ├── src/
│   │   ├── components/           # Global, Layout, Admin, UI, Shared components
│   │   ├── pages/                # Public pages & Admin dashboard
│   │   ├── data/                 # Products, siteConfig, navigation, faqs
│   │   ├── routes/               # Centralized React Router configuration
│   │   ├── services/             # Axios API client, leadService, adminService
│   │   └── utils/                # Date filters, excelExport, validation
│   ├── public/                   # Favicons, logos, robots.txt, sitemap.xml
│   ├── package.json              # Frontend dependencies and build scripts
│   └── vite.config.ts            # Vite bundler configuration
├── backend/                      # Node.js + Express REST API server
│   ├── src/
│   │   ├── config/               # Database, Cloudinary, and JWT configuration
│   │   ├── controllers/          # Lead, Blog, Admin, and Sitemap controllers
│   │   ├── middleware/           # Auth, error handling, rate limiting
│   │   ├── models/               # MongoDB Mongoose schemas (Lead, Blog, Admin)
│   │   ├── routes/               # API route endpoints
│   │   └── server.js             # Express application entry point
│   ├── tests/                    # Automated Jest / Supertest test suites
│   └── package.json              # Backend dependencies and test scripts
├── package.json                  # Root monorepo workspace scripts
└── README.md                     # Documentation and setup guide
```

---

## 🚀 Step-by-Step Setup & How to Run (First to Last)

Follow these steps in order to run the entire website on any computer or server.

---

### Step 1: Install Prerequisites

Before starting, ensure your system has the following installed:
1. **Node.js**: Version `v18.0.0` or higher (recommended: LTS v20+).
   - Check version: `node -v`
2. **npm**: Version `v9.0.0` or higher.
   - Check version: `npm -v`
3. **Git**: Installed and available in your terminal.
   - Check version: `git -v`

---

### Step 2: Clone or Download the Project

Open your terminal or command prompt and clone the repository:

```bash
git clone <repository-url>
cd ambicaindustries
```

---

### Step 3: Install Dependencies

You can install all frontend, backend, and root dependencies with **one single command** from the root folder:

```bash
npm run install:all
```

*(Alternatively, you can install them manually in each folder):*
```bash
# 1. Install root dependencies
npm install

# 2. Install frontend dependencies
cd frontend
npm install

# 3. Install backend dependencies
cd ../backend
npm install
cd ..
```

---

### Step 4: Configure Environment Variables (`.env`)

Both the **backend** and **frontend** require a `.env` configuration file to connect to the database, APIs, and image services.

#### 4.1 Backend Environment File
Create a file named `.env` inside the `backend/` directory:

📁 **`backend/.env`**:
```env
# Server Port & Mode
PORT=5000
NODE_ENV=development

# Allowed Frontend Origins for CORS (comma-separated)
CLIENT_URL=http://localhost:5173,http://localhost:3000,https://ambicaindustries-ochre.vercel.app,https://www.ambicaindustry.com

# MongoDB Atlas Database Connection String
MONGODB_URI="mongodb+srv://vaibhavdigitalwebconnection_db_user:BAdMgXexvNA6tr7i@ambica.vhl68j3.mongodb.net/ambica?retryWrites=true&w=majority"

# JWT Authentication
JWT_SECRET="ambica_industries_super_secret_jwt_key_2026_secured"
JWT_EXPIRES_IN=7d

# Default Admin Login Credentials
ADMIN_EMAIL=admin@ambicaindustry.com
ADMIN_PASSWORD=Admin@123

# Cloudinary (Used for Blog Image Uploads)
CLOUDINARY_CLOUD_NAME="mvbnilgl"
CLOUDINARY_API_KEY="248243291868158"
CLOUDINARY_API_SECRET="V1WJiBCiktM254SyW--d-x2nXZ4"
CLOUDINARY_URL="cloudinary://248243291868158:V1WJiBCiktM254SyW--d-x2nXZ4@mvbnilgl"
```

> [!NOTE]
> Ensure your MongoDB Atlas cluster has your current IP address whitelisted (or `0.0.0.0/0` allowed in Network Access).

#### 4.2 Frontend Environment File
Create a file named `.env` inside the `frontend/` directory:

📁 **`frontend/.env`**:
```env
# Web3Forms API Key for Email Notifications
VITE_WEB3FORMS_ACCESS_KEY="2d80f15e-698f-445b-a2fd-ff2d63bbe30d"

# Backend API Configuration
# For Local Development:
VITE_API_URL=http://localhost:5000/api
VITE_BACKEND_URL=http://localhost:5000

# For Production (Uncomment when deploying):
# VITE_API_URL=https://ambicaindustries-nods.onrender.com/api
# VITE_BACKEND_URL=https://ambicaindustries-nods.onrender.com
```

---

### Step 5: Start the Application (Development Mode)

#### ⚡ Method A: One-Command Start (Recommended)
From the root `ambicaindustries/` folder, run:

```bash
npm run dev
```

This launches **both** the backend and frontend concurrently with color-coded terminal logs!

---

#### 🖥️ Method B: Two Separate Terminals

**Terminal 1 (Backend API Server):**
```bash
cd backend
npm run dev
```
*Backend runs on: `http://localhost:5000`*

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
```
*Frontend runs on: `http://localhost:5173`*

---

### Step 6: Verify and Access the Application

Once both servers are running:

1. **Public Website**: Open your browser and navigate to:
   👉 **`http://localhost:5173`**
   - Browse Home, Products, R&D, Industries, and Blog.
   - Test the Contact Form or Quick Quote Modal to verify MongoDB lead capture.

2. **Admin Portal**:
   👉 **`http://localhost:5173/admin/login`**
   - **Email**: `admin@ambicaindustry.com`
   - **Password**: `Admin@123`
   - Test Analytics, Leads Table (Date Filters, Excel Export, Soft Delete), and Blog CMS.

3. **Backend Health Check**:
   👉 **`http://localhost:5000/api/health`**
   - Should return: `{"success": true, "message": "Ambica Industries Backend API is running smoothly", ...}`

---

### Step 7: Running Backend Automated Tests

To run the automated test suite for backend API routes, leads, and controllers:

```bash
# From root
npm test

# Or inside backend folder
cd backend
npm test
```

All 10 test suites should exit with passing status (`PASS`).

---

### Step 8: Build for Production Deployment

When preparing to deploy to hosting providers (Vercel, Render, Netlify, cPanel, or VPS):

```bash
# 1. Build the optimized production frontend bundle
npm run build:frontend
```
- The production-ready files are compiled into the **`frontend/dist/`** directory.
- Test the production build locally: `cd frontend && npm run preview`.

```bash
# 2. Run backend in production mode
cd backend
npm start
```

---

## 🌐 Complete Website Pages & Routes Directory

The Ambica Industries web portal features **34+ distinct routes and pages** categorized below:

### 1. Main Corporate & Inquiry Pages (10 Pages)

| Page Name | Route URL | Description |
| :--- | :--- | :--- |
| **Home** | `/` | Hero section, featured dye categories, R&D preview, global industries served, client testimonials, and quote CTA. |
| **About Us** | `/about` | Company heritage (est. 1986), leadership profile, manufacturing facilities, quality philosophy, and vision. |
| **Industry** | `/industry` | Applications across Textile Mills, Paper Producers, Leather Tanneries, Wood Finishing, Inks, and Plastics. |
| **Why Choose Us** | `/why-choose-us` | Laboratory testing standards, batch-to-batch shade consistency, sustainable formulations, and export reliability. |
| **Research & Development** | `/r&d` | Advanced testing lab, spectrophotometer color matching, custom synthesis, and quality certifications. |
| **Contact Us** | `/contact` | General corporate inquiry form (captures to MongoDB & email), interactive Google Map, direct landline & WhatsApp. |
| **Global B2B Enquiry** | `/enquiry` | Dedicated international export inquiry and container bulk supply quotation form. |
| **Privacy Policy** | `/privacy-policy` | Compliance disclosure, cookies, and data retention standards. |
| **Terms of Service** | `/termsof-service` | Legal terms of use, commercial terms, and website governance. |
| **404 Not Found** | `*` (Any invalid URL) | Custom error page with quick links back to product catalog. |

---

### 2. Products Catalog & Technical Categories (20 Pages)

#### Main Products Catalog Index
- **All Products Directory**: `/products`

#### Category & Sub-Product Pages
| Category | Category URL | Sub-Product Name | Sub-Product URL |
| :--- | :--- | :--- | :--- |
| **Acid Dyes** | `/products/acid-dyes` | Acid Black Dyes | `/products/acid-dyes/acid-black-dyes` |
| | | Acid Violet Dyes | `/products/acid-dyes/acid-violet-dyes` |
| | | Acid Blue Dyes | `/products/acid-dyes/acid-blue-dyes` |
| | | Acid Brown Dyes | `/products/acid-dyes/acid-brown-dyes` |
| | | Acid Red Dyes | `/products/acid-dyes/acid-red-dyes` |
| | | Acid Yellow Dyes | `/products/acid-dyes/acid-yellow-dyes` |
| **Direct Dyes** | `/products/direct-dyes` | Sunfast Non-Benzidine Direct Dyes | `/products/direct-dyes/sunfast-non-benzidine-direct-dyes` |
| | | Non-Benzidine Direct Dyes | `/products/direct-dyes/non-benzidine-direct-dyes` |
| **Reactive Dyes** | `/products/reactive-dyes` | Reactive Cold Dyes | `/products/reactive-dyes/reactive-cold-dyes` |
| | | Reactive HE Dyes | `/products/reactive-dyes/reactive-he-dyes` |
| | | Reactive Hot Dyes | `/products/reactive-dyes/reactive-hot-dyes` |
| | | Reactive ME Dyes | `/products/reactive-dyes/reactive-me-dyes` |
| | | Reactive Vinyl Sulphone Base Dyes | `/products/reactive-dyes/reactive-vinyl-sulphone-base-dyes` |
| **Leather Dyes** | `/products/leather-dyes` | Leather Applicable Dyes | `/products/leather-dyes/leather-applicable-dyes` |
| **Wood Dyes** | `/products/wood-dyes` | Wood Stain Dyes | `/products/wood-dyes/wood-stain-dyes` |

---

### 3. Blog & Technical Articles (Dynamic)

| Page Name | Route URL | Description |
| :--- | :--- | :--- |
| **Blog Index** | `/blogs` *(also `/blog`)* | Filterable article listing with category tabs, live view count, search bar, and reading times. |
| **Blog Article Detail** | `/blogs/:slug` | Dynamic article page with rich formatting, key takeaways, social share links, and JSON-LD BlogPosting schema. |

---

### 4. Secure Admin Panel Portal (2 Pages / 3 Modules)

| Section / Page | Route URL | Description |
| :--- | :--- | :--- |
| **Admin Login** | `/admin/login` | Secure JWT-authenticated login portal with brute-force protection. |
| **Admin Dashboard** | `/admin` | Unified administrative suite featuring: |
| ↳ *Analytics Overview* | `/admin` *(Dashboard Tab)* | SVG doughnut chart for total reads, 2×2 mobile-responsive performance cards, and category breakdown. |
| ↳ *Leads Management* | `/admin` *(Leads Tab)* | MongoDB Atlas lead tracker, IP/location finder, status updates, preset & custom date filters, single & bulk Excel (.csv) export, and database-safe soft delete with confirmation popup. |
| ↳ *Blog CMS Manager* | `/admin` *(Blog Tab)* | Article publisher, WYSIWYG editor with smart markdown paste, Cloudinary image uploader, instant publish/draft toggle, and delete confirmation popup. |

---

### 5. Technical SEO & Crawler Endpoints
- **Sitemap XML**: `/sitemap.xml` (Static XML file in `frontend/public/sitemap.xml` + dynamic backend generator at `/api/sitemap.xml`)
- **Robots Configuration**: `/robots.txt` (Directs search engines, protects `/admin` and `/api/` paths)

---

## ❓ Common Troubleshooting & FAQs

1. **Port 5000 or 5173 is already in use**:
   - You can stop the existing process:
     - On Windows PowerShell: `Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process`
     - Or specify an alternative port in `backend/.env` (e.g., `PORT=5001`).

2. **MongoDB Connection Fails**:
   - Verify that your IP address is whitelisted in MongoDB Atlas under **Network Access** (`0.0.0.0/0` allows connections from anywhere).
   - Ensure the `MONGODB_URI` string in `backend/.env` is enclosed in quotation marks.

3. **CORS Error between Frontend & Backend**:
   - Check `backend/.env` to ensure `CLIENT_URL` contains `http://localhost:5173`.
   - In `frontend/.env`, ensure `VITE_API_URL` is set to `http://localhost:5000/api`.

---

## 📄 License & Attribution
- **Owner**: [Ambica Industries](https://ambicaindustrie.com/)
- **Developed by**: [Digital Web Connection](https://digitalwebconnection.com/)
