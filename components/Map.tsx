'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

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

interface MapProps {
  spots: ParkingSpot[];
}

export default function Map({ spots }: MapProps) {
  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg relative overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#000" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Markers */}
      <div className="absolute inset-0 p-4">
        {spots.map((spot, index) => {
          // Calculate position using predefined positions to avoid inline styles
          const positions = [
            'left-[20%] top-[25%]', 'left-[35%] top-[37%]', 'left-[50%] top-[49%]',
            'left-[65%] top-[36%]', 'left-[80%] top-[48%]', 'left-[25%] top-[60%]',
            'left-[40%] top-[72%]', 'left-[55%] top-[59%]', 'left-[70%] top-[71%]',
            'left-[30%] top-[45%]', 'left-[45%] top-[57%]', 'left-[60%] top-[44%]'
          ];
          const positionClass = positions[index % positions.length] || 'left-[50%] top-[50%]';
          
          return (
            <div
              key={spot.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group ${positionClass}`}
            >
              {/* Marker */}
              <div className="relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white transition-transform group-hover:scale-110 ${
                  spot.availability === 'available' ? 'bg-green-500' :
                  spot.availability === 'few-spots' ? 'bg-yellow-500' : 'bg-red-500'
                }`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                  <div className="bg-white rounded-lg shadow-lg p-3 min-w-48 border border-gray-200">
                    <h4 className="font-semibold text-gray-800 text-sm">{spot.name}</h4>
                    <p className="text-xs text-gray-600 mb-1">{spot.location}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold text-sm">₹{spot.price}/hr</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        spot.availability === 'available' ? 'bg-green-100 text-green-700' :
                        spot.availability === 'few-spots' ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {spot.availability === 'available' ? 'Available' : 
                         spot.availability === 'few-spots' ? 'Few Spots' : 'Full'}
                      </span>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                      <div className="w-2 h-2 bg-white border-r border-b border-gray-200 transform rotate-45"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="bg-white p-2 rounded-md shadow-md hover:shadow-lg transition-shadow">
          <span className="text-gray-700 font-bold text-lg">+</span>
        </button>
        <button className="bg-white p-2 rounded-md shadow-md hover:shadow-lg transition-shadow">
          <span className="text-gray-700 font-bold text-lg">−</span>
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
        <h4 className="text-sm font-semibold text-gray-800 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Few Spots</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Full</span>
          </div>
        </div>
      </div>

      {/* Center Text when no spots */}
      {spots.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No parking spots to display</p>
          </div>
        </div>
      )}
    </div>
  );
}
