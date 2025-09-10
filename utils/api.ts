import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('rememberMe');
        window.location.href = '/auth/login';
      }
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  
  register: (userData: { 
    fullName: string; 
    email: string; 
    phone: string; 
    password: string; 
  }) => api.post('/auth/register', userData),
  
  verifyToken: () => api.get('/auth/verify'),
  
  refreshToken: () => api.post('/auth/refresh'),
  
  logout: () => api.post('/auth/logout'),
  
  forgotPassword: (email: string) => 
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) => 
    api.post('/auth/reset-password', { token, password }),
};

// Parking API endpoints
export const parkingAPI = {
  // Parking spots
  getSpots: (params?: any) => api.get('/parking-spots', { params }),
  getSpot: (id: string) => api.get(`/parking-spots/${id}`),
  searchSpots: (query: string, filters?: any) => 
    api.get('/parking-spots/search', { params: { query, ...filters } }),
  createSpot: (spotData: any) => api.post('/parking-spots', spotData),
  updateSpot: (id: string, spotData: any) => api.put(`/parking-spots/${id}`, spotData),
  deleteSpot: (id: string) => api.delete(`/parking-spots/${id}`),

  // Bookings
  getUserBookings: () => api.get('/bookings'),
  getBooking: (id: string) => api.get(`/bookings/${id}`),
  createBooking: (bookingData: any) => api.post('/bookings', bookingData),
  updateBooking: (id: string, bookingData: any) => api.put(`/bookings/${id}`, bookingData),
  cancelBooking: (id: string) => api.delete(`/bookings/${id}`),

  // Payments
  createPayment: (paymentData: any) => api.post('/payments', paymentData),
  getPayments: () => api.get('/payments'),
  
  // User profile
  getProfile: () => api.get('/users/profile'),
  updateProfile: (profileData: any) => api.put('/users/profile', profileData),
};

// Mock data for development (remove when backend is ready)
export const mockData = {
  parkingSpots: [
    {
      id: '1',
      name: 'Downtown Mall Parking',
      address: '123 Main St, Downtown',
      location: '123 Main St, Downtown',
      price: 5,
      pricePerHour: 5,
      totalSpots: 200,
      availableSpots: 45,
      coordinates: { lat: 40.7128, lng: -74.0060 },
      amenities: ['Security', 'Covered', 'EV Charging'],
      rating: 4.5,
      images: ['/api/placeholder/400/300'],
      distance: '2.3 km',
      availability: 'available' as const,
      description: 'Secure covered parking facility in the heart of downtown. Perfect for shopping and business visits.',
      features: ['24/7 Security', 'Covered Parking', 'EV Charging', 'CCTV Surveillance', 'Easy Access'],
      contact: '+1 (555) 123-4567',
      openingHours: '24/7',
      hourlyRate: 5
    },
    {
      id: '2',
      name: 'Airport Long-term Parking',
      address: '456 Airport Blvd',
      location: '456 Airport Blvd',
      price: 3,
      pricePerHour: 3,
      totalSpots: 500,
      availableSpots: 120,
      coordinates: { lat: 40.6892, lng: -74.1745 },
      amenities: ['Shuttle Service', 'Security', 'Covered'],
      rating: 4.2,
      images: ['/api/placeholder/400/300'],
      distance: '15.7 km',
      availability: 'available' as const,
      description: 'Convenient airport parking with free shuttle service to all terminals. Perfect for travelers.',
      features: ['Free Shuttle', '24/7 Security', 'Covered Areas', 'Long-term Rates', 'Terminal Access'],
      contact: '+1 (555) 987-6543',
      openingHours: '24/7',
      hourlyRate: 3
    }
  ]
};

export default api;
