# SPACIFY - Smart Parking System Frontend

A modern Next.js frontend application for the SPACIFY parking management system, featuring comprehensive authentication, parking spot search, booking functionality, and user management.

## ✨ Features

- **🔐 Authentication System**: Login, signup, and persistent sessions with "Remember me" functionality
- **🅿️ Parking Management**: Search, view, and book parking spots
- **📱 Responsive Design**: Mobile-first design with Tailwind CSS
- **🎯 User Experience**: First-visit detection and route guarding
- **🔗 Backend Integration**: Full API integration with JWT authentication
- **🚀 Modern Stack**: Next.js 14, TypeScript, and modern React patterns

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Authentication**: JWT with persistent sessions

## 📦 Installation

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd SPMOS
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory:
   ```env
   # Backend API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   
   # Development
   NODE_ENV=development
   
   # JWT Configuration (for frontend reference)
   JWT_SECRET=your-super-secret-jwt-key-here-make-it-very-long-and-secure
   ```

## 🚀 Getting Started

### Development Mode

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the next available port).

### Production Build

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 🔗 Backend Integration

This frontend is designed to work with the **Spacify-backend** Node.js API. 

### Backend Setup Required

1. **Set up the backend server** from the Spacify-backend canvas:
   - Copy all backend files from the canvas
   - Install dependencies: `npm install`
   - Set up environment variables
   - Run: `npm start`

2. **Ensure backend is running** on `http://localhost:5000`

3. **Update API URL** if different:
   - Modify `NEXT_PUBLIC_API_URL` in `.env.local`

### API Endpoints Used

The frontend integrates with these backend endpoints:

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Token verification
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Token refresh

#### Parking Management
- `GET /api/parking-spots` - Get all parking spots
- `GET /api/parking-spots/:id` - Get specific parking spot
- `GET /api/parking-spots/search` - Search parking spots

#### Bookings
- `GET /api/bookings` - Get user bookings
- `POST /api/bookings` - Create new booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking

#### User Management
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

## 📁 Project Structure

```
SPMOS/
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── booking/           # Booking management
│   ├── parking/           # Parking spot pages
│   ├── profile/           # User profile
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable React components
│   ├── Footer.tsx
│   ├── Map.tsx
│   ├── Navbar.tsx
│   ├── ParkingCard.tsx
│   ├── ProtectedRoute.tsx
│   └── RouteGuard.tsx
├── contexts/              # React contexts
│   └── AuthContext.tsx   # Authentication context
├── utils/                 # Utility functions
│   └── api.ts            # API client and endpoints
├── public/               # Static assets
├── .env.local           # Environment variables
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── next.config.js       # Next.js configuration
```

## 🔐 Authentication Flow

### First Visit Experience
1. User visits the application for the first time
2. `RouteGuard` detects first visit and redirects to login
3. Login page shows appropriate welcome message

### Login Process
1. User enters credentials
2. Optional "Remember me" checkbox for persistent sessions
3. Frontend calls `/api/auth/login`
4. On success, JWT token is stored in localStorage
5. User is redirected to the main application

### Session Persistence
- If "Remember me" is checked, the session persists across browser restarts
- Token is automatically verified on app startup
- Invalid tokens trigger automatic logout and redirect to login

### Route Protection
- `RouteGuard` component protects all routes except authentication pages
- Unauthenticated users are automatically redirected to login
- Loading states prevent flash of unauthorized content

## 🎨 UI/UX Features

### Design System
- **Colors**: Modern blue and gray palette
- **Typography**: Inter font family
- **Spacing**: Consistent spacing scale
- **Components**: Reusable component library

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Flexible layouts for all screen sizes
- Touch-friendly interactive elements

### User Experience
- Loading states for all async operations
- Error handling with user-friendly messages
- Form validation with real-time feedback
- Smooth transitions and animations

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NODE_ENV` | Environment mode | `development` |

### API Configuration

The API client (`utils/api.ts`) includes:
- Automatic token attachment
- Request/response interceptors
- Error handling
- Token refresh logic
- Automatic logout on 401 errors

## 🧪 Testing

### Manual Testing Checklist

#### Authentication
- [ ] First visit redirects to login
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials shows error
- [ ] "Remember me" persists session
- [ ] Logout clears session
- [ ] Protected routes redirect unauthenticated users
- [ ] Token verification on app startup

#### Navigation
- [ ] Navbar shows correct user state
- [ ] Route transitions work smoothly
- [ ] Responsive navigation works on mobile

#### Parking Features
- [ ] Parking spots display correctly
- [ ] Search functionality works
- [ ] Spot details load properly
- [ ] Booking process functions

## 🚀 Deployment

### Prerequisites
1. Backend API must be deployed and accessible
2. Update `NEXT_PUBLIC_API_URL` to point to production API

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative hosting platform
- **Self-hosted**: Use `npm start` after building

### Environment Variables for Production
Ensure all environment variables are set in your deployment platform:
- `NEXT_PUBLIC_API_URL`
- `NODE_ENV=production`

## 📚 API Integration Guide

### Adding New Endpoints

1. **Add to API client** (`utils/api.ts`):
   ```typescript
   export const newAPI = {
     getData: () => api.get('/new-endpoint'),
     postData: (data: any) => api.post('/new-endpoint', data),
   };
   ```

2. **Use in components**:
   ```typescript
   import { newAPI } from '@/utils/api';
   
   const data = await newAPI.getData();
   ```

### Error Handling

The API client automatically handles:
- 401 errors (automatic logout)
- Network errors
- Token refresh
- Request timeouts

## 🐛 Troubleshooting

### Common Issues

#### Build Errors
- **Module not found**: Check import paths and ensure files exist
- **Type errors**: Verify TypeScript types match API responses
- **Environment variables**: Ensure `.env.local` is properly configured

#### Authentication Issues
- **Token not persisting**: Check localStorage is accessible
- **API calls failing**: Verify backend is running and accessible
- **Infinite redirects**: Check route guard logic

#### Development Issues
- **Port conflicts**: Next.js will automatically find available ports
- **Hot reload not working**: Restart development server
- **Styles not applying**: Check Tailwind CSS configuration

### Debug Mode

Enable verbose logging by setting:
```env
NODE_ENV=development
```

## 🤝 Contributing

1. Follow TypeScript best practices
2. Use consistent code formatting (Prettier recommended)
3. Test authentication flows thoroughly
4. Update documentation for new features
5. Follow component naming conventions

## 📄 License

This project is part of the SPACIFY parking management system.

---

## 🔗 Related Projects

- **Spacify-backend**: Node.js backend API (see canvas)
- **SPACIFY Mobile App**: React Native mobile application (coming soon)

For backend setup instructions, refer to the **Spacify-backend** canvas in the left panel.
