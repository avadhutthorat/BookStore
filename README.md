# Node.js TypeScript REST API

A modern, secure, and scalable REST API built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **TypeScript Support** - Written in TypeScript for better developer experience and type safety
- **Express.js** - Fast, unopinionated web framework for Node.js
- **MongoDB with Mongoose** - Robust database integration with schema support
- **Authentication & Authorization** - Secure routes with JWT and bcrypt
- **File Upload** - Support for file uploads using Multer and Cloudinary
- **Input Validation** - Request validation using Joi
- **CORS Enabled** - Cross-Origin Resource Sharing support
- **Error Handling** - Centralized error handling with http-errors
- **Environment Variables** - Configuration using dotenv
- **ESLint** - Code linting and formatting
- **Hot Reloading** - Development environment with nodemon

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd nodejsproject
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. Start the development server:

```bash
npm run dev
```

The server will start running at `http://localhost:3000`

## 🏗️ Project Structure

```
├── src/
│   ├── app.ts          # Express app configuration
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middlewares/   # Custom middlewares
│   └── utils/         # Utility functions
├── server.ts          # Server entry point
├── package.json       # Project dependencies
├── tsconfig.json     # TypeScript configuration
└── .env              # Environment variables
```

## 🔒 Environment Variables

The following environment variables are required:

- `PORT` - Server port (default: 3000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation
- `CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

## 📚 API Documentation

[Add your API documentation here]

## 🧪 Running Tests

```bash
# Add test command when implemented
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## ✍️ Author

Avadhut Thorat

## 🙏 Acknowledgments

- Express.js team
- MongoDB team
- TypeScript team
- All other open-source contributors
