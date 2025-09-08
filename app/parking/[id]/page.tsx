'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, 
  Star, 
  Clock, 
  Shield, 
  Zap, 
  Car, 
  Phone, 
  Navigation,
  Camera,
  Wifi,
  CreditCard
} from 'lucide-react';
import { mockData } from '@/utils/api';

// Generate consistent review count based on spot ID
const getReviewCount = (spotId: string): number => {
  // Simple hash function to generate consistent number from string
  let hash = 0;
  for (let i = 0; i < spotId.length; i++) {
    const char = spotId.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  // Return a number between 50 and 150
  return Math.abs(hash % 100) + 50;
};

export default function ParkingDetailPage() {
  const params = useParams();
  const spotId = params.id as string;
  
  // Find the parking spot from mock data
  const spot = mockData.parkingSpots.find(s => s.id === spotId);

  if (!spot) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Parking spot not found</h1>
          <Link href="/parking" className="text-blue-600 hover:text-blue-700">
            Back to parking search
          </Link>
        </div>
      </div>
    );
  }

  const getFeatureIcon = (feature: string) => {
    const featureLower = feature.toLowerCase();
    if (featureLower.includes('cctv') || featureLower.includes('security')) {
      return <Shield className="w-5 h-5" />;
    }
    if (featureLower.includes('ev') || featureLower.includes('charging')) {
      return <Zap className="w-5 h-5" />;
    }
    if (featureLower.includes('covered')) {
      return <Car className="w-5 h-5" />;
    }
    if (featureLower.includes('24/7')) {
      return <Clock className="w-5 h-5" />;
    }
    if (featureLower.includes('wifi')) {
      return <Wifi className="w-5 h-5" />;
    }
    if (featureLower.includes('valet')) {
      return <CreditCard className="w-5 h-5" />;
    }
    return <Star className="w-5 h-5" />;
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'text-green-600 bg-green-100';
      case 'few-spots':
        return 'text-yellow-600 bg-yellow-100';
      case 'full':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return `${spot.availableSpots} spots available`;
      case 'few-spots':
        return `Only ${spot.availableSpots} spots left`;
      case 'full':
        return 'No spots available';
      default:
        return 'Availability unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <nav className="text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/parking" className="hover:text-gray-700">Parking</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800">{spot.name}</span>
          </nav>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="bg-gray-200 rounded-xl h-64 md:h-80 mb-6 flex items-center justify-center">
              <Camera className="w-16 h-16 text-gray-400" />
              <span className="ml-4 text-gray-500">Parking spot images coming soon</span>
            </div>

            {/* Spot Info */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{spot.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{spot.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Navigation className="w-5 h-5 mr-2" />
                    <span>{spot.distance} away</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-800">{spot.rating}</span>
                    <span className="text-gray-500 ml-1">({getReviewCount(spot.id)} reviews)</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(spot.availability)}`}>
                    {getAvailabilityText(spot.availability)}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{spot.description}</p>

              {/* Features */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Features & Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {spot.features.map((feature, index) => (
                    <div key={index} className="flex items-center bg-gray-50 px-3 py-2 rounded-lg">
                      <span className="text-blue-600 mr-2">
                        {getFeatureIcon(feature)}
                      </span>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Information</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Opening Hours</h4>
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{spot.openingHours}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Contact</h4>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{spot.contact}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Total Capacity</h4>
                  <span className="text-gray-600">{spot.totalSpots} parking spots</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Currently Available</h4>
                  <span className="text-green-600 font-semibold">{spot.availableSpots} spots</span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  ₹{spot.price}
                  <span className="text-lg text-gray-500">/hour</span>
                </div>
                <p className="text-gray-600 text-sm">Competitive pricing</p>
              </div>

              {/* Quick Book Form */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parking Date
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label="Select parking date"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Time
                    </label>
                    <input
                      type="time"
                      defaultValue="14:00"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      aria-label="Select start time"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                      aria-label="Select duration"
                    >
                      <option value="1">1 hour</option>
                      <option value="2" selected>2 hours</option>
                      <option value="3">3 hours</option>
                      <option value="4">4 hours</option>
                      <option value="6">6 hours</option>
                      <option value="8">8 hours</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Type
                  </label>
                  <select 
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                    aria-label="Select vehicle type"
                  >
                    <option value="car">Car</option>
                    <option value="bike">Bike</option>
                    <option value="van">Van</option>
                    <option value="scooter">Scooter</option>
                  </select>
                </div>
              </div>

              {/* Total Calculation */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Base rate (2 hrs)</span>
                  <span className="text-gray-800">₹{spot.price * 2}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Service fee</span>
                  <span className="text-gray-800">₹20</span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between items-center font-semibold">
                    <span className="text-gray-800">Total</span>
                    <span className="text-gray-800">₹{spot.price * 2 + 20}</span>
                  </div>
                </div>
              </div>

              {/* Book Button */}
              {spot.availability === 'available' || spot.availability === 'few-spots' ? (
                <Link href={`/booking?spotId=${spot.id}`}>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </Link>
              ) : (
                <button 
                  disabled 
                  className="w-full bg-gray-300 text-gray-500 py-3 rounded-lg font-semibold cursor-not-allowed"
                >
                  No Spots Available
                </button>
              )}

              <p className="text-xs text-gray-500 text-center mt-4">
                Free cancellation up to 1 hour before your booking
              </p>
            </div>
          </div>
        </div>

        {/* Similar Spots */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Parking Spots</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockData.parkingSpots
              .filter(s => s.id !== spotId)
              .slice(0, 3)
              .map((similarSpot) => (
                <Link key={similarSpot.id} href={`/parking/${similarSpot.id}`}>
                  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    <div className="bg-gray-200 h-32 flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-1">{similarSpot.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">{similarSpot.location}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-blue-600 font-bold">₹{similarSpot.price}/hr</span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-600">{similarSpot.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
