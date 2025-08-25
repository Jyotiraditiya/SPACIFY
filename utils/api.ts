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
    // Get token from localStorage or cookies
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
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
      // Redirect to login or refresh token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// API endpoints
export const parkingAPI = {
  // Parking spots
  getSpots: (params?: any) => api.get('/parking-spots', { params }),
  getSpot: (id: string) => api.get(`/parking-spots/${id}`),
  searchSpots: (query: string, filters?: any) => 
    api.get('/parking-spots/search', { params: { query, ...filters } }),

  // Bookings
  createBooking: (bookingData: any) => api.post('/bookings', bookingData),
  getBookings: (userId?: string) => api.get('/bookings', { params: { userId } }),
  getBooking: (id: string) => api.get(`/bookings/${id}`),
  cancelBooking: (id: string) => api.patch(`/bookings/${id}/cancel`),
  
  // User
  getUserProfile: () => api.get('/user/profile'),
  updateUserProfile: (profileData: any) => api.patch('/user/profile', profileData),
  
  // Authentication
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
  
  // Payment
  createPaymentIntent: (amount: number, bookingId: string) =>
    api.post('/payments/create-intent', { amount, bookingId }),
  confirmPayment: (paymentIntentId: string) =>
    api.post('/payments/confirm', { paymentIntentId }),
  
  // Real-time data
  getSpotAvailability: (spotId: string) => api.get(`/parking-spots/${spotId}/availability`),
  updateSpotStatus: (spotId: string, status: 'available' | 'occupied' | 'reserved') =>
    api.patch(`/parking-spots/${spotId}/status`, { status }),
};

// Mock data for development
export const mockData = {
  parkingSpots: [
    {
      id: 'ambience-mall',
      name: 'Ambience Mall',
      location: 'Sector 52, Gurgaon',
      address: 'Ambience Mall, Sector 52, Gurgaon, Haryana 122002',
      price: 100,
      rating: 4.5,
      distance: '0.5 km',
      availability: 'available',
      totalSpots: 200,
      availableSpots: 45,
      features: ['CCTV', 'Covered', 'EV Charging', '24/7', 'Security Guard'],
      coordinates: { lat: 28.4595, lng: 77.0266 },
      images: ['/images/ambience-mall-parking.jpg'],
      description: 'Premium covered parking facility with 24/7 security and EV charging stations.',
      openingHours: '24/7',
      contact: '+91 12345 67890',
    },
    {
      id: 'delhi-airport',
      name: 'Delhi Airport',
      location: 'Terminal 3 Parking',
      address: 'Indira Gandhi International Airport, Terminal 3, New Delhi',
      price: 150,
      rating: 4.2,
      distance: '2.1 km',
      availability: 'few-spots',
      totalSpots: 500,
      availableSpots: 12,
      features: ['CCTV', 'Security', '24/7', 'Shuttle Service'],
      coordinates: { lat: 28.5562, lng: 77.1000 },
      images: ['/images/delhi-airport-parking.jpg'],
      description: 'Official airport parking with shuttle service to terminals.',
      openingHours: '24/7',
      contact: '+91 11 2567 5678',
    },
    {
      id: 'anant-vihar',
      name: 'Anant Vihar Station',
      location: 'Delhi Metro',
      address: 'Anant Vihar Metro Station, Delhi',
      price: 85,
      rating: 4.0,
      distance: '1.2 km',
      availability: 'available',
      totalSpots: 100,
      availableSpots: 67,
      features: ['Metro Access', 'Budget Friendly', 'CCTV'],
      coordinates: { lat: 28.6139, lng: 77.2090 },
      images: ['/images/anant-vihar-parking.jpg'],
      description: 'Convenient metro station parking with direct access to Delhi Metro.',
      openingHours: '5:00 AM - 11:30 PM',
      contact: '+91 98765 43210',
    },
    {
      id: 'cp-connaught',
      name: 'Connaught Place',
      location: 'Central Delhi',
      address: 'Connaught Place, Central Delhi, New Delhi',
      price: 120,
      rating: 4.3,
      distance: '3.5 km',
      availability: 'available',
      totalSpots: 150,
      availableSpots: 23,
      features: ['Central Location', 'Shopping', 'CCTV', 'Valet Service'],
      coordinates: { lat: 28.6315, lng: 77.2167 },
      images: ['/images/cp-parking.jpg'],
      description: 'Prime location parking in the heart of Delhi with valet service.',
      openingHours: '6:00 AM - 11:00 PM',
      contact: '+91 11 2334 5678',
    },
  ],
  
  userBookings: [
    {
      id: 'BK001',
      spotId: 'ambience-mall',
      spotName: 'Ambience Mall',
      location: 'Sector 52, Gurgaon',
      date: '2024-01-20',
      startTime: '14:00',
      endTime: '16:00',
      duration: 2,
      amount: 200,
      status: 'active',
      qrCode: 'AMB-A1-240120',
      vehicleType: 'car',
      vehicleNumber: 'DL 01 AB 1234',
      paymentMethod: 'card',
      createdAt: '2024-01-20T10:30:00Z',
    },
    {
      id: 'BK002',
      spotId: 'delhi-airport',
      spotName: 'Delhi Airport',
      location: 'Terminal 3 Parking',
      date: '2024-01-18',
      startTime: '09:00',
      endTime: '12:00',
      duration: 3,
      amount: 450,
      status: 'completed',
      qrCode: 'DEL-T3-240118',
      vehicleType: 'car',
      vehicleNumber: 'DL 01 AB 1234',
      paymentMethod: 'upi',
      createdAt: '2024-01-18T08:00:00Z',
    },
  ],
};

export default api;
