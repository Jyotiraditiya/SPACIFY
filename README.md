# 🚗 SPACIFY - Smart Parking Management System

A modern, responsive web application for smart parking management built with Next.js, React, and Tailwind CSS.

## 🌟 Features

### 🎯 Core Functionality
- **Real-time Parking Search** - Find available parking spots instantly
- **Interactive Map View** - Visual representation of parking locations with availability status
- **Smart Booking System** - Reserve parking spots with flexible duration options
- **User Profile Management** - Manage personal information and booking history
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices

### 🎨 User Experience
- **Modern UI/UX** - Clean, intuitive interface with Tailwind CSS
- **Interactive Components** - Hover effects, tooltips, and smooth animations
- **Color-coded Availability** - Green (Available), Yellow (Few Spots), Red (Full)
- **Form Validation** - Black text inputs for better visibility and user experience

### 🔧 Technical Features
- **Next.js 14** - Server-side rendering and app router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide Icons** - Beautiful, consistent iconography
- **Hydration-safe** - No client-server mismatches

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Development**: ESLint, PostCSS

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Jyotiraditiya/SPACIFY.git
   cd SPACIFY
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
SPACIFY/
├── app/                    # Next.js app directory
│   ├── booking/           # Booking page
│   ├── parking/           # Parking search & details
│   │   └── [id]/         # Dynamic parking spot details
│   ├── profile/          # User profile page
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable components
│   ├── Footer.tsx        # Footer component
│   ├── Map.tsx           # Interactive map
│   ├── Navbar.tsx        # Navigation bar
│   └── ParkingCard.tsx   # Parking spot cards
├── utils/                # Utility functions
│   └── api.ts           # API utilities & mock data
├── src/                  # Legacy React components
├── public/              # Static assets
└── config files         # Next.js, Tailwind, TypeScript configs
```

## 🎯 Key Components

### 🗺️ Interactive Map (`components/Map.tsx`)
- Visual parking spot representation
- Color-coded availability indicators
- Hover tooltips with spot details
- Zoom controls and legend

### 🎫 Parking Cards (`components/ParkingCard.tsx`)
- Spot information display
- Rating and review system
- Feature highlighting
- Booking links

### 📝 Booking System (`app/booking/page.tsx`)
- Multi-step booking process
- Date and time selection
- Vehicle type configuration
- Payment method selection

### 👤 User Profile (`app/profile/page.tsx`)
- Personal information management
- Booking history
- Account settings

## 🔧 Recent Updates

### ✅ Bug Fixes & Improvements
- **Fixed form input text color** - All inputs now display black text instead of white
- **Resolved hydration errors** - Implemented deterministic review count generation
- **Enhanced accessibility** - Better form labels and ARIA attributes
- **Improved responsiveness** - Better mobile and tablet experience

### 🎨 UI/UX Enhancements
- **Consistent styling** - Applied `text-gray-900 bg-white` to all form inputs
- **Better visual feedback** - Enhanced hover states and transitions
- **Improved readability** - Optimized color contrast and typography

## 🌐 Pages Overview

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with search functionality |
| Parking Search | `/parking` | Browse available parking spots |
| Spot Details | `/parking/[id]` | Detailed view of specific parking spot |
| Booking | `/booking` | Multi-step booking process |
| Profile | `/profile` | User account management |

## 📱 Responsive Design

- **Mobile First** - Optimized for mobile devices
- **Tablet Support** - Adaptive layout for tablets
- **Desktop Enhanced** - Full-featured desktop experience
- **Cross-browser** - Compatible with modern browsers

## 🔮 Future Enhancements

- [ ] Real-time availability updates
- [ ] Payment gateway integration
- [ ] Push notifications
- [ ] GPS navigation integration
- [ ] QR code generation for bookings
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Jyotiraditya Misra**
- GitHub: [@Jyotiraditiya](https://github.com/Jyotiraditya)
- Repository: [SPACIFY](https://github.com/Jyotiraditiya/SPACIFY)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Lucide for beautiful icons
- Open source community for inspiration

---

⭐ **Star this repository if you found it helpful!**

📧 **Questions or suggestions?** Feel free to open an issue or reach out!
