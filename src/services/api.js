import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Mock data for demonstration
const mockEvents = [
  {
    _id: '1',
    title: 'Birthday Bash Extravaganza',
    description: 'Join us for an unforgettable birthday celebration with games, music, and delicious cake!',
    date: '2024-12-25',
    time: '18:00',
    location: 'Central Park, New York',
    type: 'birthday',
    maxAttendees: 50,
    currentAttendees: 23,
    attendees: ['user1', 'user2'],
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdBy: 'user1',
    createdAt: '2024-12-01T10:00:00Z'
  },
  {
    _id: '2',
    title: 'Wedding Reception Gala',
    description: 'Celebrate love and commitment at this elegant wedding reception. Dress code: formal.',
    date: '2024-12-30',
    time: '19:30',
    location: 'Grand Ballroom, Manhattan',
    type: 'wedding',
    maxAttendees: 150,
    currentAttendees: 87,
    attendees: ['user1', 'user3'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdBy: 'user2',
    createdAt: '2024-12-02T14:30:00Z'
  },
  {
    _id: '3',
    title: 'Graduation Celebration Party',
    description: 'Congratulate our graduates on their amazing achievement! Food, drinks, and dancing included.',
    date: '2024-12-20',
    time: '16:00',
    location: 'University Campus, Brooklyn',
    type: 'graduation',
    maxAttendees: 100,
    currentAttendees: 45,
    attendees: ['user4', 'user5'],
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdBy: 'user3',
    createdAt: '2024-12-03T09:15:00Z'
  },
  {
    _id: '4',
    title: 'Baby Shower Delight',
    description: 'Join us in celebrating the upcoming arrival of baby Emma! Games, gifts, and lots of love.',
    date: '2024-12-22',
    time: '14:00',
    location: 'Community Center, Queens',
    type: 'baby-shower',
    maxAttendees: 30,
    currentAttendees: 18,
    attendees: ['user6', 'user7'],
    image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdBy: 'user4',
    createdAt: '2024-12-04T11:45:00Z'
  },
  {
    _id: '5',
    title: 'Anniversary Dinner Party',
    description: 'Celebrating 25 years of love and laughter. Join us for an intimate dinner celebration.',
    date: '2024-12-28',
    time: '20:00',
    location: 'Riverside Restaurant, Manhattan',
    type: 'anniversary',
    maxAttendees: 40,
    currentAttendees: 22,
    attendees: ['user8', 'user9'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdBy: 'user5',
    createdAt: '2024-12-05T16:20:00Z'
  },
  {
    _id: '6',
    title: 'Holiday Christmas Party',
    description: 'Spread holiday cheer with friends and family! Santa visits, caroling, and festive treats.',
    date: '2024-12-24',
    time: '17:00',
    location: 'Town Hall, Brooklyn',
    type: 'holiday',
    maxAttendees: 80,
    currentAttendees: 52,
    attendees: ['user10', 'user11'],
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    createdBy: 'user6',
    createdAt: '2024-12-06T13:10:00Z'
  }
];

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const eventsAPI = {
  getEvents: (params) => {
    // Simulate API delay
    return new Promise((resolve) => {
      setTimeout(() => {
        let filteredEvents = [...mockEvents];

        // Apply filters
        if (params?.type && params.type !== '') {
          filteredEvents = filteredEvents.filter(event => event.type === params.type);
        }
        if (params?.location && params.location !== '') {
          filteredEvents = filteredEvents.filter(event =>
            event.location.toLowerCase().includes(params.location.toLowerCase())
          );
        }
        if (params?.date && params.date !== '') {
          filteredEvents = filteredEvents.filter(event => event.date === params.date);
        }

        resolve({ data: filteredEvents });
      }, 500); // Simulate network delay
    });
  },
  getEvent: (id) => {
    const event = mockEvents.find(e => e._id === id);
    return Promise.resolve({ data: event });
  },
  createEvent: (eventData) => api.post('/events', eventData),
  updateEvent: (id, eventData) => api.put(`/events/${id}`, eventData),
  deleteEvent: (id) => api.delete(`/events/${id}`),
  joinEvent: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Successfully joined the event!' } });
      }, 300);
    });
  },
  leaveEvent: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: 'Successfully left the event' } });
      }, 300);
    });
  },
};

export default api;
