# Celebration Connect

A full-stack web application that connects people for celebrations and events. Users can register, log in, and discover or create events in their area.

## Features

- User authentication (register/login)
- Event discovery and management
- Interactive map integration for event locations
- Responsive design with modern UI components
- Secure API with JWT authentication
- Rate limiting and CORS protection

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- React Router DOM (routing)
- Tailwind CSS (styling)
- shadcn/ui (UI components)
- Axios (HTTP client)
- Leaflet & React Leaflet (maps)
- Framer Motion (animations)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (authentication)
- bcryptjs (password hashing)
- CORS
- Express Rate Limit
- Helmet (security)

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd masheree
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend` directory
   - Add the following variables:
     ```
     MONGODB_URI=mongodb://localhost:27017/celebration-connect
     JWT_SECRET=your-secret-key
     PORT=5000
     ```

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```
   The server will run on http://localhost:5000

2. Start the frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```
   The app will be available at http://localhost:5173

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Events
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event (authenticated)
- `PUT /api/events/:id` - Update an event (authenticated)
- `DELETE /api/events/:id` - Delete an event (authenticated)

## Project Structure

```
masheree/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── ...
│   ├── public/
│   └── package.json
├── README.md
└── TODO.md
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
