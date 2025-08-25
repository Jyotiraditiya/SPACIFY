# Spacify - Smart Parking System Frontend

A modern, responsive web application built with Next.js for finding and booking parking spots in real-time.

## 🚀 Features

- **Modern UI/UX**: Clean, mobile-first design with Tailwind CSS
- **Real-time Search**: Find parking spots based on location, price, and availability
- **Interactive Map**: Visual representation of parking spots with availability status
- **Smart Booking**: Step-by-step booking process with payment integration
- **User Dashboard**: Manage bookings, payment methods, and profile
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Vehicle Support**: Support for cars, bikes, vans, and scooters

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Maps**: React Leaflet (ready for integration)
- **Forms**: React Hook Form
- **Deployment Ready**: Azure Static Web Apps compatible

## 📱 Pages & Components

### Pages
- **Homepage** (`/`) - Hero section with search and featured parking spots
- **Parking Search** (`/parking`) - Search, filter, and browse parking spots
- **Parking Details** (`/parking/[id]`) - Detailed view of individual parking spots
- **Booking Flow** (`/booking`) - Multi-step booking process
- **User Profile** (`/profile`) - User dashboard with bookings and settings

### Components
- **Navbar** - Responsive navigation with mobile menu
- **Footer** - Site footer with links and information
- **ParkingCard** - Reusable parking spot card component
- **Map** - Interactive map component for displaying parking spots

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── globals.css        # Global styles
│   ├── parking/
│   │   ├── page.tsx       # Parking search page
│   │   └── [id]/page.tsx  # Parking details page
│   ├── booking/
│   │   └── page.tsx       # Booking flow
│   └── profile/
│       └── page.tsx       # User profile
├── components/            # Reusable components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── ParkingCard.tsx
│   └── Map.tsx
├── utils/                 # Utilities and API
│   └── api.ts            # API client and mock data
├── public/               # Static assets
└── styles/              # Additional styles
```

## 🎨 Design Features

### Mobile-First Design
- Bottom navigation for mobile users
- Touch-friendly interface
- Responsive grid layouts
- Optimized for various screen sizes

### Visual Elements
- Gradient backgrounds
- Shadow effects
- Smooth transitions
- Interactive hover states
- Status indicators (available, few spots, full)

### User Experience
- Clear visual hierarchy
- Intuitive navigation
- Real-time feedback
- Progressive disclosure
- Accessibility considerations

## 🔌 API Integration

The app includes a complete API client setup with:

- **Axios configuration** with interceptors
- **Authentication** token handling
- **Error handling** and retry logic
- **Mock data** for development
- **Endpoints** for parking spots, bookings, users, and payments

### API Endpoints (Ready for Backend Integration)

```typescript
// Parking spots
GET /api/parking-spots
GET /api/parking-spots/:id
GET /api/parking-spots/search

// Bookings
POST /api/bookings
GET /api/bookings
PATCH /api/bookings/:id/cancel

// User
GET /api/user/profile
PATCH /api/user/profile

// Authentication
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout

// Payments
POST /api/payments/create-intent
POST /api/payments/confirm
```

## 🌐 Deployment

### Azure Static Web Apps

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Azure**
   - Use Azure CLI or portal
   - Connect your GitHub repository
   - Configure build settings for Next.js

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com/api
NEXT_PUBLIC_MAPS_API_KEY=your-maps-api-key
```

## 🔄 Future Enhancements

### Immediate Next Steps
- **Real-time Updates**: WebSocket integration for live availability
- **Payment Gateway**: Stripe/Razorpay integration
- **Authentication**: NextAuth.js or Auth0 integration
- **Maps Integration**: Google Maps or Mapbox implementation

### Advanced Features
- **QR Code Generation**: For parking tickets
- **Push Notifications**: Booking reminders and updates
- **Admin Dashboard**: Parking spot management
- **Analytics**: Usage statistics and insights
- **Multi-language**: Internationalization support

### Integration Ready
- **Backend APIs**: Ready for Django/Node.js backend
- **Database**: Structured for relational or NoSQL databases
- **Third-party Services**: Maps, payments, notifications
- **DevOps**: CI/CD pipeline configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

**Built with ❤️ using Next.js and TypeScript**

*Smart parking solutions for modern cities with Spacify*
