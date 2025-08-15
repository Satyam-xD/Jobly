# Jobly

Full‑stack job portal where students can browse and apply to jobs, and recruiters can register companies and post jobs. Built with React (Vite) + Redux on the frontend and Node.js (Express) + MongoDB on the backend. Includes authentication, file uploads (Cloudinary), admin dashboards, and a "Save for Later" feature.

## ✨ Features

- Authentication with httpOnly JWT cookies (login, signup, logout)
- Profile management with resume upload (Cloudinary)
- Recruiter company management (register, update, logo upload)
- Job posting by recruiters; job browsing/searching by students
- Apply to job; view applied jobs; recruiter can view applicants and update status
- Save for later (bookmark) jobs
- Admin-protected routes for recruiter dashboards
- Responsive UI with Tailwind CSS, Radix UI, framer‑motion, and sonner toasts

## 🧱 Tech Stack

- Frontend: React 18, Vite, Redux Toolkit, Redux Persist, Tailwind CSS, Radix UI, framer‑motion, axios
- Backend: Node.js, Express, Mongoose, JWT, Multer, Cloudinary
- Database: MongoDB

## 📁 Project Structure

```
Joblynew/
  backend/
    controllers/
    middlewares/
    models/
    routes/
    utils/
    index.js
    package.json
  frontend/
    src/
      components/
      hooks/
      redux/
      utils/
      main.jsx, App.jsx
    index.html
    package.json
  README.md
```

## ⚙️ Prerequisites

- Node.js 18+ (v20+ recommended)
- A MongoDB connection string
- Cloudinary account (for file uploads)

## 🔐 Environment Variables (Backend)

Create `backend/.env`:

```
PORT=3000              # or 8000 – must match frontend constants
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret

CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Notes:
- Cookies are set with `httpOnly` and `sameSite='strict'`. Ensure your frontend origin is in backend CORS.
- CORS is configured to allow `http://localhost:5173` (and optionally `http://localhost:5174`).

## 🧩 Frontend API Constants

Update `frontend/src/utils/constant.js` to point to your backend:

```js
export const USER_API_END_POINT = "http://localhost:3000/api/v1/user";
export const JOB_API_END_POINT = "http://localhost:3000/api/v1/job";
export const APPLICATION_API_END_POINT = "http://localhost:3000/api/v1/application";
export const COMPANY_API_END_POINT = "http://localhost:3000/api/v1/company";
```

If your backend runs on `8000`, change `3000` to `8000` and ensure backend CORS allows your Vite origin.

## 🚀 Getting Started

1) Install dependencies

```bash
cd backend && npm install
cd ../frontend && npm install
```

2) Start backend

```bash
cd backend
npm run dev
# should print: Server running at port <PORT> and mongodb connected successfully
```

3) Start frontend

```bash
cd frontend
npm run dev
# opens Vite at http://localhost:5173 (or 5174 if 5173 is in use)
```

## 🔑 Authentication

- Login sets an httpOnly cookie named `token`. Use `withCredentials: true` in axios requests from the frontend.
- Example axios usage:

```js
await axios.post(`${USER_API_END_POINT}/login`, body, {
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});
```

## 📚 API Overview (selected)

- Auth (`/api/v1/user`)
  - POST `/register` – multipart form with `file` (optional profile photo)
  - POST `/login` – `{ email, password, role }`
  - GET `/logout`
  - POST `/profile/update` – multipart form; resume `file` optional
  - POST `/saved/toggle` – `{ jobId }` save/unsave a job
  - GET `/saved` – list saved jobs for current user

- Companies (`/api/v1/company`) [recruiter]
  - POST `/register`
  - GET `/get`
  - GET `/get/:id`
  - PUT `/update/:id` – multipart form; `file` optional for logo

- Jobs (`/api/v1/job`)
  - POST `/post` [recruiter]
  - GET `/get?keyword=...` [student] – currently protected; remove auth if you want public browsing
  - GET `/get/:id`
  - GET `/getadminjobs` [recruiter]

- Applications (`/api/v1/application`)
  - GET `/apply/:id` – student applies to job
  - GET `/get` – student’s applied jobs
  - GET `/:id/applicants` – recruiter: list applicants for a job
  - POST `/status/:id/update` – recruiter: update application status to `accepted|rejected|pending`

## 🧠 Important Implementation Details

- Multer uses in‑memory storage and expects file field name `file`.
- Cloudinary uploads return a URL that is saved in the database for photos/logos/resumes.
- "Save for later" stores an array of job ObjectIds on the `User` (`savedJobs`).
- Admin routes are protected via `ProtectedRoute` in the frontend and `isAuthenticated` middleware in the backend.

## 🧪 Common Pitfalls & Troubleshooting

- Port already in use (Windows):
  - Check which PID uses the port:
    ```bash
    netstat -ano | findstr :3000
    ```
  - Kill the process:
    ```bash
    taskkill /PID <PID> /F
    ```

- 401 Unauthorized when calling APIs:
  - Ensure `withCredentials: true` in axios
  - Ensure backend CORS has your Vite origin and `credentials: true`
  - Cookies set as `httpOnly` + `sameSite: 'strict'` – browser must be at the allowed origin

- Job browsing returns empty or 401:
  - The `/api/v1/job/get` route is protected. Either log in as a student, or remove auth on that route if you want it public.

## 🧪 Scripts

- Backend
  - `npm run dev` – start backend with nodemon

- Frontend
  - `npm run dev` – start Vite dev server
  - `npm run build` – build production assets
  - `npm run preview` – preview production build

## 🛡️ Security Notes

- Secrets must live in environment variables; do not commit `.env`
- JWT cookies are httpOnly. Keep CORS origins limited to known dev domains.

## 📦 Deployment (brief)

- Backend: host on a Node platform (e.g., Render/Heroku/Vercel Functions) with environment variables set and MongoDB accessible.
- Frontend: build with `npm run build` and host the `dist/` output (e.g., Vercel/Netlify). Update frontend API constants to your deployed backend URL.
- Update backend CORS to include your deployed frontend origin(s).

## 📄 License

MIT


