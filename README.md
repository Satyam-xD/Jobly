# Jobly

A modern, feature-rich job portal built with React, Node.js, and MongoDB. This application connects job seekers with employers, providing a seamless platform for job searching, application management, and company administration.

## 🚀 Features

### For Job Seekers
- **User Authentication**: Secure login/signup with JWT tokens
- **Job Browsing**: Browse and search through available job listings
- **Job Applications**: Apply to jobs with a streamlined application process
- **Profile Management**: Update personal information and track applications
- **Responsive Design**: Mobile-friendly interface for all devices

### For Employers/Recruiters
- **Company Management**: Create and manage company profiles
- **Job Posting**: Post new job opportunities with detailed descriptions
- **Application Tracking**: View and manage job applications
- **Admin Dashboard**: Comprehensive admin panel for business operations
- **Applicant Management**: Review and manage candidate applications

### General Features
- **Real-time Updates**: Live job listings and application status
- **Search & Filter**: Advanced filtering and search capabilities
- **File Upload**: Support for resume and document uploads via Cloudinary
- **Responsive UI**: Modern, intuitive interface built with Tailwind CSS
- **State Management**: Redux-powered state management for seamless user experience

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Redux Toolkit** - State management with Redux
- **React Router** - Client-side routing
- **Radix UI** - Accessible UI components
- **Framer Motion** - Animation library
- **Axios** - HTTP client for API calls

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **Bcrypt** - Password hashing
- **Multer** - File upload handling
- **Cloudinary** - Cloud image and file management
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
 frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── admin/       # Admin-specific components
│   │   │   ├── auth/        # Authentication components
│   │   │   ├── shared/      # Reusable UI components
│   │   │   └── ui/          # UI component library
│   │   ├── hooks/           # Custom React hooks
│   │   ├── redux/           # Redux store and slices
│   │   └── utils/           # Utility functions
│   ├── package.json
│   └── vite.config.js
backend/                  # Node.js backend application
│   ├── controllers/         # Route controllers
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── middlewares/         # Custom middleware
│   ├── utils/               # Utility functions
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create .env file with your configuration
   cp .env.example .env
   
   # Update .env with your values
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   PORT=8000
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start Development Servers**

   **Backend:**
   ```bash
   cd backend
   npm run dev
   ```
   Server will start at http://localhost:8000

   **Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will start at http://localhost:5173

## 🔧 Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/jobportal
JWT_SECRET=your_super_secret_jwt_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=8000
```

## 📱 Available Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/user/register` - User registration
- `POST /api/v1/user/login` - User login
- `GET /api/v1/user/me` - Get current user profile
- `PUT /api/v1/user/update` - Update user profile

### Jobs
- `GET /api/v1/job/all` - Get all jobs
- `POST /api/v1/job/create` - Create new job (admin only)
- `GET /api/v1/job/:id` - Get job by ID
- `PUT /api/v1/job/:id` - Update job (admin only)
- `DELETE /api/v1/job/:id` - Delete job (admin only)

### Companies
- `GET /api/v1/company/all` - Get all companies
- `POST /api/v1/company/create` - Create company (admin only)
- `GET /api/v1/company/:id` - Get company by ID
- `PUT /api/v1/company/:id` - Update company (admin only)

### Applications
- `POST /api/v1/application/apply` - Apply for a job
- `GET /api/v1/application/applied` - Get user's applied jobs
- `GET /api/v1/application/:jobId/applicants` - Get job applicants (admin only)

## 🔐 Authentication & Authorization

The application uses JWT tokens stored in HTTP-only cookies for secure authentication. Protected routes require valid authentication tokens, and admin routes require the user to have a 'recruiter' role.

## 🎨 UI Components

The application includes a comprehensive UI component library built with:
- **Radix UI** - Accessible, unstyled components
- **Tailwind CSS** - Utility-first styling
- **Custom Components** - Reusable, styled components
- **Responsive Design** - Mobile-first approach

## 📊 State Management

Redux Toolkit is used for state management with the following slices:
- **authSlice** - User authentication state
- **jobSlice** - Job-related state
- **companySlice** - Company-related state
- **applicationSlice** - Job application state

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Build the application: `npm run build`
3. Deploy to your preferred hosting service (Heroku, Vercel, AWS, etc.)

### Frontend Deployment
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Update API endpoints for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues
2. Create a new issue with detailed information
3. Contact the development team

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- MongoDB for the flexible database solution
- All contributors and maintainers

---

**Happy Job Hunting! 🎯**
