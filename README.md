# Celebration Connect - MERN Stack Application

A modern web application for discovering and joining local celebrations and events. Built with React, Node.js, Express, and MongoDB.

## 🎉 Features

- **Event Discovery**: Browse and search for celebrations near you
- **Location-Based Search**: Automatic location detection with manual override
- **User Authentication**: Secure login/registration system
- **Interactive Map**: Visualize events on an interactive map
- **Event Filtering**: Filter by date, type, and location
- **Responsive Design**: Works perfectly on all devices
- **Real-time Stats**: Live event statistics and attendee counts

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Shadcn/UI** components
- **Leaflet** for interactive maps
- **Framer Motion** for animations
- **React Router** for navigation

### Backend
- **Node.js** with Express
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd celebration-connect
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Configuration**

   Create a `.env` file in the backend directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/celebration-connect
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

   For production, use a cloud MongoDB URI like:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/celebration-connect
   ```

5. **Start the Application**

   **Backend** (Terminal 1):
   ```bash
   cd backend
   npm start
   ```

   **Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
celebration-connect/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Event.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── events.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Filters.jsx
│   │   │   ├── EventsGrid.jsx
│   │   │   ├── EventCard.jsx
│   │   │   └── Map.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Events
- `GET /api/events` - Get all events (with filters)
- `GET /api/events/:id` - Get single event
- `POST /api/events` - Create new event (authenticated)
- `PUT /api/events/:id` - Update event (owner only)
- `DELETE /api/events/:id` - Delete event (owner only)
- `POST /api/events/:id/join` - Join event (authenticated)
- `POST /api/events/:id/leave` - Leave event (authenticated)

## 🎨 Features in Detail

### Location Services
- Automatic GPS location detection
- Reverse geocoding for human-readable addresses
- Fallback to manual location entry
- Location-based event filtering

### Authentication Flow
- JWT-based authentication
- Protected routes for event management
- Secure password hashing
- Automatic token refresh

### Event Management
- Create celebrations with details
- Join/leave events (authenticated users only)
- Real-time attendee counts
- Event filtering and search

### Responsive Design
- Mobile-first approach
- Adaptive layouts for all screen sizes
- Touch-friendly interactions
- Optimized performance

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure authentication with expiration
- **Input Validation**: Server-side validation for all inputs
- **CORS Protection**: Configured for secure cross-origin requests
- **Rate Limiting**: Protection against abuse

## 🚀 Deployment

### Backend Deployment
1. Set production environment variables
2. Use a process manager like PM2
3. Configure reverse proxy (nginx)
4. Set up SSL certificates

### Frontend Deployment
1. Build the production bundle:
   ```bash
   npm run build
   ```
2. Serve static files from `dist/` directory
3. Configure routing for SPA

### Recommended Hosting
- **Frontend**: Vercel, Netlify, or AWS S3 + CloudFront
- **Backend**: Heroku, Railway, or AWS EC2
- **Database**: MongoDB Atlas

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support or questions, please open an issue on GitHub or contact the development team.

---

**Celebration Connect** - Bringing people together through celebrations! 🎊
