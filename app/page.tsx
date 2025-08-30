'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import {
  Search,
  Bell,
  Car,
  Bike,
  Truck,
  MoreHorizontal,
  MapPin,
  UserCircle,
  ArrowRight,
  Clock,
  Shield,
  CreditCard,
} from 'lucide-react';

export default function HomePage() {
  const [selectedVehicle, setSelectedVehicle] = React.useState('car');
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-700">
      {/* Hero Section - Mobile First Design */}
      <div className="relative">
        {/* Header Section */}
        <header className="p-6 flex items-center justify-between text-white">
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <>
                <UserCircle className="w-10 h-10 rounded-full text-white border-2 border-white" />
                <div>
                  <h2 className="font-medium">Welcome back!</h2>
                  <p className="text-blue-200 text-sm">{user?.name}</p>
                </div>
              </>
            ) : (
              <>
                <UserCircle className="w-10 h-10 rounded-full text-white border-2 border-white" />
                <div>
                  <h2 className="font-medium">Welcome to SPACIFY</h2>
                  <p className="text-blue-200 text-sm">Sign in to get started</p>
                </div>
              </>
            )}
            <span className="text-lg font-medium">GOOD MORNING</span>
          </div>
          <div className="bg-blue-700 p-2 rounded-full shadow-lg">
            <Bell className="w-5 h-5" />
          </div>
        </header>

        {/* Main Title Section */}
        <section className="px-6 py-8 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Find the best place to park
          </h1>
          <p className="text-xl text-blue-100 mb-8">
            Smart parking solutions with Spacify
          </p>
        </section>

        {/* Search Bar Section */}
        <section className="px-6 mt-4">
          <Link href="/parking">
            <div className="relative flex items-center bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-shadow cursor-pointer">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <span className="flex-grow text-gray-500 text-left">
                Search for parking spots...
              </span>
              <ArrowRight className="w-5 h-5 text-blue-600" />
            </div>
          </Link>
        </section>

        {/* Vehicle Type Section */}
        <section className="px-6 mt-8">
          <div className="flex justify-around bg-white p-4 rounded-2xl shadow-lg">
            <div className="flex flex-col items-center">
              <button
                onClick={() => setSelectedVehicle('car')}
                aria-label="Select car"
                className={`p-3 rounded-full mb-2 shadow-md transition-colors ${
                  selectedVehicle === 'car' 
                    ? 'bg-blue-600' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                <Car className={`w-6 h-6 ${
                  selectedVehicle === 'car' ? 'text-white' : 'text-gray-500 hover:text-blue-600'
                }`} />
              </button>
              <span className="text-sm text-gray-700 font-medium">Car</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setSelectedVehicle('bike')}
                aria-label="Select bike"
                className={`p-3 rounded-full mb-2 transition-colors ${
                  selectedVehicle === 'bike' 
                    ? 'bg-blue-600 shadow-md' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                <Bike className={`w-6 h-6 ${
                  selectedVehicle === 'bike' ? 'text-white' : 'text-gray-500 hover:text-blue-600'
                }`} />
              </button>
              <span className="text-sm text-gray-700 font-medium">Bike</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setSelectedVehicle('van')}
                aria-label="Select van"
                className={`p-3 rounded-full mb-2 transition-colors ${
                  selectedVehicle === 'van' 
                    ? 'bg-blue-600 shadow-md' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                <Truck className={`w-6 h-6 ${
                  selectedVehicle === 'van' ? 'text-white' : 'text-gray-500 hover:text-blue-600'
                }`} />
              </button>
              <span className="text-sm text-gray-700 font-medium">Van</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setSelectedVehicle('scooter')}
                aria-label="Select scooter"
                className={`p-3 rounded-full mb-2 transition-colors ${
                  selectedVehicle === 'scooter' 
                    ? 'bg-blue-600 shadow-md' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                <Bike className={`w-6 h-6 ${
                  selectedVehicle === 'scooter' ? 'text-white' : 'text-gray-500 hover:text-blue-600'
                }`} />
              </button>
              <span className="text-sm text-gray-700 font-medium">Scooter</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => setSelectedVehicle('more')}
                aria-label="Show more vehicle options"
                className={`p-3 rounded-full mb-2 transition-colors ${
                  selectedVehicle === 'more' 
                    ? 'bg-blue-600 shadow-md' 
                    : 'bg-gray-100 hover:bg-blue-100'
                }`}
              >
                <MoreHorizontal className={`w-6 h-6 ${
                  selectedVehicle === 'more' ? 'text-white' : 'text-gray-500 hover:text-blue-600'
                }`} />
              </button>
              <span className="text-sm text-gray-700 font-medium">More</span>
            </div>
          </div>
          
          {/* Selected Vehicle Indicator */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Selected vehicle: <span className="font-semibold text-blue-600 capitalize">{selectedVehicle}</span>
            </p>
          </div>
        </section>
      </div>

      {/* Parking Nearby Section - Enhanced */}
      <section className="bg-gray-50 rounded-t-3xl mt-8 p-6 shadow-inner min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Parking Nearby</h2>
          <Link href="/parking" className="text-blue-600 font-medium hover:text-blue-700">
            View All
          </Link>
        </div>

        <div className="space-y-4 mb-8">
          {/* Parking Item 1: Ambience Mall */}
          <Link href="/parking/ambience-mall">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-24 h-24 bg-blue-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="w-12 h-12 text-blue-700" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">Ambience Mall</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Sector 52, Gurgaon</span>
                </div>
                <div className="flex items-center mt-2 space-x-4">
                  <p className="text-blue-600 font-bold text-lg">₹100/hr</p>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Available</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Parking Item 2: New Delhi Airport */}
          <Link href="/parking/delhi-airport">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-24 h-24 bg-red-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="w-12 h-12 text-red-700" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">Delhi Airport</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Terminal 3 Parking</span>
                </div>
                <div className="flex items-center mt-2 space-x-4">
                  <p className="text-blue-600 font-bold text-lg">₹150/hr</p>
                  <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs">Few Spots</span>
                </div>
              </div>
            </div>
          </Link>

          {/* Parking Item 3: Anant Vihar Station */}
          <Link href="/parking/anant-vihar">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex items-center p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="w-24 h-24 bg-green-200 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <MapPin className="w-12 h-12 text-green-700" />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-800">Anant Vihar Station</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>Delhi Metro</span>
                </div>
                <div className="flex items-center mt-2 space-x-4">
                  <p className="text-blue-600 font-bold text-lg">₹85/hr</p>
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">Available</span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Availability</h3>
            <p className="text-gray-600 text-sm">Check live parking spots and reserve instantly</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Secure Parking</h3>
            <p className="text-gray-600 text-sm">CCTV monitored and safe parking locations</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <CreditCard className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 mb-2">Easy Payments</h3>
            <p className="text-gray-600 text-sm">Cashless payments with multiple options</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
          <h3 className="text-xl font-bold mb-2">Ready to Park Smart?</h3>
          <p className="text-blue-100 mb-4">Join thousands of happy customers</p>
          <Link href="/parking">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Find Parking Now
            </button>
          </Link>
        </div>
      </section>

      {/* Authentication CTA Section */}
      {!isAuthenticated && (
        <section className="mx-4 mb-8 bg-white rounded-xl shadow-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Start Parking Smart?</h3>
          <p className="text-gray-600 mb-4">Join thousands of users who save time and money with SPACIFY</p>
          <div className="flex space-x-3">
            <Link href="/auth/signup" className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Sign Up Free
            </Link>
            <Link href="/auth/login" className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Sign In
            </Link>
          </div>
        </section>
      )}

      {/* Bottom Navigation - Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around items-center rounded-t-2xl shadow-lg border-t border-gray-100 md:hidden">
        <div className="flex flex-col items-center text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-home"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </div>
        <Link href="/parking" className="flex flex-col items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-map"
          >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6" />
            <line x1="9" x2="9" y1="3" y2="18" />
            <line x1="15" x2="15" y1="6" y2="21" />
          </svg>
          <span className="text-xs mt-1">Map</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </nav>
    </div>
  );
}
