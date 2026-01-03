# TutionMaster

A comprehensive tutoring platform that connects students with qualified teachers. TutionMaster provides a seamless experience for teachers to create profiles and showcase their expertise, while students can easily search and discover the perfect tutor for their needs.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### For Teachers
- **Profile Creation & Management**: Create detailed profiles with qualifications, experience, and subjects
- **Image Upload**: Upload profile pictures with Cloudinary integration
- **Availability Management**: Set and manage teaching availability
- **Dashboard**: Personal dashboard to manage profile and view statistics

### For Students
- **Advanced Search**: Search teachers by subject, location, experience, and more
- **Filter & Sort**: Filter results by various criteria including price range
- **Teacher Profiles**: View detailed teacher profiles with qualifications and reviews
- **Pagination**: Browse through teachers with efficient pagination

### General Features
- **Authentication**: Secure user registration and login with JWT
- **Newsletter Subscription**: Stay updated with platform news and features
- **Responsive Design**: Mobile-friendly interface built with TailwindCSS
- **Protected Routes**: Role-based access control
- **Error Handling**: Comprehensive error handling and validation

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **React Router DOM 6.8.0** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form 7.43.0** - Form management
- **TailwindCSS 3.4.18** - Utility-first CSS framework
- **Lucide React** - Icon library
- **React Toastify 9.1.0** - Toast notifications

### Backend
- **Node.js** - Runtime environment
- **Express 4.18.0** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 7.0.0** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Image hosting and management
- **Multer** - File upload handling
- **Express Validator 7.0.0** - Request validation
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
tutionmaster/
├── backend/
│   ├── config/
│   │   ├── cloudinary.js      # Cloudinary configuration
│   │   └── database.js         # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js   # Authentication logic
│   │   ├── newsletterController.js
│   │   ├── teacherController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   ├── error.js            # Error handling
│   │   ├── upload.js           # File upload middleware
│   │   └── validation.js       # Request validation
│   ├── models/
│   │   ├── Newsletter.js
│   │   ├── Teacher.js
│   │   └── User.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── newsletterRoute.js
│   │   ├── teachers.js
│   │   └── upload.js
│   ├── services/
│   │   └── newsletterService.js
│   ├── utils/
│   │   ├── cloudinaryUtils.js
│   │   └── errorResponse.js
│   ├── validators/
│   │   └── newsletterValidator.js
│   ├── package.json
│   └── server.js               # Entry point
│
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/           # Login & Register forms
│   │   │   ├── common/         # Shared components
│   │   │   ├── dashboard/      # Dashboard components
│   │   │   ├── section/        # Homepage sections
│   │   │   └── teachers/       # Teacher-specific components
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── TeacherContext.js
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── utils/              # Helper functions
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14.x or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Cloudinary Account** (for image uploads)

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/AayushSinghRajput/tutionmaster.git
cd tutionmaster
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend Environment Variables

Create a `.env` file in the `frontend` directory (if needed):

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃 Running the Application

### Development Mode

#### Start Backend Server

```bash
cd backend
npm run dev
```

The backend server will run on `http://localhost:5000`

#### Start Frontend Development Server

```bash
cd frontend
npm start
```

The frontend application will run on `http://localhost:3000`

### Production Mode

#### Build Frontend

```bash
cd frontend
npm run build
```

#### Start Backend

```bash
cd backend
npm start
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Teachers
- `GET /api/teachers` - Get all teachers (with filters and pagination)
- `GET /api/teachers/:id` - Get single teacher
- `POST /api/teachers` - Create teacher profile (Protected)
- `PUT /api/teachers/:id` - Update teacher profile (Protected)
- `DELETE /api/teachers/:id` - Delete teacher profile (Protected)

### Upload
- `POST /api/upload` - Upload image to Cloudinary (Protected)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/newsletter` - Get all subscribers (Protected/Admin)

### Health Check
- `GET /api/health` - API health status

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage on the client side and sent with each request via the Authorization header:

```
Authorization: Bearer <token>
```

## 🎨 Frontend Routes

- `/` - Home page
- `/about` - About page
- `/contact` - Contact page
- `/how-it-works` - How it works page
- `/teachers` - Teacher listing with search and filters
- `/teachers/:id` - Teacher detail page
- `/login` - Login page
- `/register` - Registration page
- `/dashboard` - User dashboard (Protected)
- `/create-profile` - Create teacher profile (Protected)
- `/edit-profile` - Edit teacher profile (Protected)
- `/privacy-policy` - Privacy policy
- `/terms-of-service` - Terms of service
- `/cookie-policy` - Cookie policy

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Open a Pull Request

## 📝 Best Practices

- Follow the existing code structure and naming conventions
- Write clean, readable, and well-documented code
- Test your changes thoroughly before submitting
- Use meaningful commit messages
- Keep components small and focused on a single responsibility

## 🐛 Known Issues

- None currently reported

## 📈 Future Enhancements

- Real-time messaging between students and teachers
- Video call integration for online tutoring
- Payment gateway integration
- Review and rating system
- Advanced analytics dashboard
- Mobile application (React Native)
- Email notifications
- Booking and scheduling system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Aayush Singh Rajput** - [GitHub](https://github.com/AayushSinghRajput)

## 🙏 Acknowledgments

- React team for the amazing library
- Express.js team for the robust backend framework
- MongoDB for the flexible database solution
- Cloudinary for image hosting services
- All contributors who help improve this project

## 📞 Support

For support, email support@tutionmaster.com or open an issue in the GitHub repository.

---

**Happy Coding! 🚀**
