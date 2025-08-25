'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Star, Clock, Zap, Shield, Car } from 'lucide-react';

interface ParkingSpot {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  distance: string;
  availability: 'available' | 'few-spots' | 'full';
  features: string[];
  coordinates: { lat: number; lng: number };
}

interface ParkingCardProps {
  spot: ParkingSpot;
}

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

export default function ParkingCard({ spot }: ParkingCardProps) {
  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-100 text-green-700';
      case 'few-spots':
        return 'bg-yellow-100 text-yellow-700';
      case 'full':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'few-spots':
        return 'Few Spots';
      case 'full':
        return 'Full';
      default:
        return 'Unknown';
    }
  };

  const getFeatureIcon = (feature: string) => {
    if (feature.toLowerCase().includes('cctv') || feature.toLowerCase().includes('security')) {
      return <Shield className="w-4 h-4" />;
    }
    if (feature.toLowerCase().includes('ev') || feature.toLowerCase().includes('charging')) {
      return <Zap className="w-4 h-4" />;
    }
    if (feature.toLowerCase().includes('covered')) {
      return <Car className="w-4 h-4" />;
    }
    if (feature.toLowerCase().includes('24/7')) {
      return <Clock className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <Link href={`/parking/${spot.id}`}>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden cursor-pointer border border-gray-100">
        {/* Header with availability badge */}
        <div className="p-4 pb-2">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-800 truncate">{spot.name}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(spot.availability)}`}>
              {getAvailabilityText(spot.availability)}
            </span>
          </div>
          
          <div className="flex items-center text-gray-500 text-sm mb-3">
            <MapPin className="w-4 h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{spot.location}</span>
            <span className="ml-2 text-gray-400">•</span>
            <span className="ml-2 text-gray-600">{spot.distance}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-3">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-700">{spot.rating}</span>
            <span className="ml-1 text-sm text-gray-500">({getReviewCount(spot.id)} reviews)</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {spot.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center bg-gray-50 px-2 py-1 rounded-md">
                <span className="text-gray-600 mr-1">
                  {getFeatureIcon(feature)}
                </span>
                <span className="text-xs text-gray-700 font-medium">{feature}</span>
              </div>
            ))}
            {spot.features.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{spot.features.length - 3} more
              </span>
            )}
          </div>

          {/* Price and Book Button */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold text-blue-600">₹{spot.price}</span>
              <span className="text-sm text-gray-500">/hour</span>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
