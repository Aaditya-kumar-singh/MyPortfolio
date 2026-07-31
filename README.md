# 🚀 Aaditya Kumar | Full-Stack Developer Portfolio

Welcome to my professional developer portfolio repository. This is a highly polished, responsive, and interactive web application built with a React/Vite frontend and a Node/Express backend. It showcases my personal and freelance projects, work experience, education, certifications, and features a fully active SMTP contact form.

---

## 🛠️ Tech Stack

### Frontend
* **Core:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/) (for fast builds & hot module replacement)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animations:** [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/) (fluid page transitions and micro-interactions)
* **Icons:** [Lucide React](https://lucide.dev/)

### Backend
* **Runtime:** [Node.js](https://nodejs.org/)
* **Framework:** [Express.js](https://expressjs.com/)
* **SMTP Mailing:** [Nodemailer](https://nodemailer.com/) (integrated with Gmail SMTP)
* **Process Manager:** [Nodemon](https://nodemon.io/) (for hot-reloading development server)

---

## ✨ Features

1. **Intelligent Screen-Balanced Landing Page:** 
   * Designed to keep text and navigation elements away from the left half of the page to prevent obscuring the background profile photo.
   * Auto-adjusts margin, padding, and font sizes across mobile and desktop devices to sit cleanly within the height viewport (`100vh`) with zero vertical scrolling.
   * Responsive background image focusing on your face at `25%` center alignment on mobile.
2. **Dynamic Project Grid with Skeleton Shimmers:** 
   * Fetches/displays project metadata (freelance & personal).
   * Displays interactive cards with conditional "Code" or "Demo" buttons depending on link availability.
   * Displays custom CSS skeleton loading states before the content fades in.
3. **Experience & Education Timeline:** 
   * Renders professional experience, university education (B.Tech CSE), and high school details in a chronological glowing timeline.
   * Integrated resume download buttons linked directly to a local PDF file.
4. **Active SMTP Contact Form:** 
   * Front-end validations with status-controlled messaging (Success / Submitting / Error).
   * Back-end modular controller handles requests and sends clean, templated HTML emails to the administrator's account.

---

## 📂 Project Structure

```text
my-portfolio/
├── frontend/                 # React/Vite Client
│   ├── public/               # Static assets (images, Aaditya_pic.jpg, resume.pdf)
│   ├── src/
│   │   ├── components/       # Reusable UI parts (ScrollIndicator, etc.)
│   │   ├── pages/            # Page sections (HeroSection, AboutPage, ProjectsPage, etc.)
│   │   ├── App.jsx           # Main component & Section routing
│   │   └── main.jsx          # Entry point
│   ├── index.html            # Entry HTML & SEO configurations
│   ├── vite.config.js
│   └── package.json
│
├── backend/                  # Node/Express API
│   ├── controllers/          # Business logic handlers (emailController.js)
│   ├── routes/               # API endpoints (emailRoutes.js)
│   ├── templates/            # Email designs (emailTemplate.js)
│   ├── server.js             # Express app setup & CORS config
│   ├── .env                  # Port & Gmail SMTP App Password (gitignored)
│   └── package.json
└── README.md                 # Project Documentation
```

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run both the frontend and backend locally.

### Prerequisites
* [Node.js](https://nodejs.org/) (v16.x or higher)
* [npm](https://www.npmjs.com/) (Node Package Manager)

### Step 1: Set Up Backend
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the backend root:
   ```env
   PORT=5000
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_16_char_google_app_password
   ```
   *Note: Ensure 2-Step Verification is enabled in your Google account and generate an App Password. Do not use your standard login password.*
4. Start the backend development server (hot-reload enabled):
   ```bash
   npm run dev
   ```

### Step 2: Set Up Frontend
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your resume PDF file to the static directory:
   * Rename your resume to `resume.pdf`.
   * Place it under `frontend/public/resume.pdf`.
4. Start the frontend development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:5173](http://localhost:5173) in your browser to view your live portfolio!

---

## 🌐 Production Deployment

### 1. Backend (e.g., Render / Heroku)
1. Deploy the `backend` folder to a hosting provider.
2. In the provider's dashboard, configure the Environment Variables:
   * `EMAIL_USER`
   * `EMAIL_PASS`
3. Note your live backend API URL (e.g. `https://your-backend.onrender.com`).

### 2. Frontend (e.g., Vercel / Netlify)
1. Deploy the `frontend` folder.
2. Add the following Environment Variable in the deployment settings:
   * `VITE_API_URL` = `https://your-backend.onrender.com`
3. Hit deploy, and your frontend will communicate with your live backend securely.