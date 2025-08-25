'use client';

import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Star, Navigation } from 'lucide-react';
import ParkingCard from '@/components/ParkingCard';
import Map from '@/components/Map';

export default function ParkingPage() {
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    maxPrice: 200,
    vehicleType: 'car',
    features: [] as string[],
  });

  const parkingSpots = [
    {
      id: 'ambience-mall',
      name: 'Ambience Mall',
      location: 'Sector 52, Gurgaon',
      price: 100,
      rating: 4.5,
      distance: '0.5 km',
      availability: 'available',
      features: ['CCTV', 'Covered', 'EV Charging'],
      coordinates: { lat: 28.4595, lng: 77.0266 },
    },
    {
      id: 'delhi-airport',
      name: 'Delhi Airport',
      location: 'Terminal 3 Parking',
      price: 150,
      rating: 4.2,
      distance: '2.1 km',
      availability: 'few-spots',
      features: ['CCTV', 'Security', '24/7'],
      coordinates: { lat: 28.5562, lng: 77.1000 },
    },
    {
      id: 'anant-vihar',
      name: 'Anant Vihar Station',
      location: 'Delhi Metro',
      price: 85,
      rating: 4.0,
      distance: '1.2 km',
      availability: 'available',
      features: ['Metro Access', 'Budget Friendly'],
      coordinates: { lat: 28.6139, lng: 77.2090 },
    },
    {
      id: 'cp-connaught',
      name: 'Connaught Place',
      location: 'Central Delhi',
      price: 120,
      rating: 4.3,
      distance: '3.5 km',
      availability: 'available',
      features: ['Central Location', 'Shopping'],
      coordinates: { lat: 28.6315, lng: 77.2167 },
    },
  ];

  const filteredSpots = parkingSpots.filter(spot => 
    spot.price <= filters.maxPrice &&
    (filters.features.length === 0 || filters.features.some(feature => 
      spot.features.some(spotFeature => spotFeature.toLowerCase().includes(feature.toLowerCase()))
    ))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search location, mall, airport..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'map' 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters Bar */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Max Price:</span>
            <select 
              value={filters.maxPrice}
              onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900 bg-white"
            >
              <option value={200}>₹200/hr</option>
              <option value={150}>₹150/hr</option>
              <option value={100}>₹100/hr</option>
              <option value={50}>₹50/hr</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-700">Vehicle:</span>
            <select 
              value={filters.vehicleType}
              onChange={(e) => setFilters({...filters, vehicleType: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm text-gray-900 bg-white"
            >
              <option value="car">Car</option>
              <option value="bike">Bike</option>
              <option value="van">Van</option>
              <option value="scooter">Scooter</option>
            </select>
          </div>
          <div className="flex flex-wrap gap-2">
            {['CCTV', 'Covered', 'EV Charging', '24/7'].map((feature) => (
              <button
                key={feature}
                onClick={() => {
                  const newFeatures = filters.features.includes(feature)
                    ? filters.features.filter(f => f !== feature)
                    : [...filters.features, feature];
                  setFilters({...filters, features: newFeatures});
                }}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filters.features.includes(feature)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {feature}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-800">
              {filteredSpots.length} Parking Spots Found
            </h2>
            <div className="flex items-center text-gray-600">
              <Navigation className="w-4 h-4 mr-1" />
              <span className="text-sm">Near you</span>
            </div>
          </div>
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white">
            <option>Sort by Distance</option>
            <option>Sort by Price</option>
            <option>Sort by Rating</option>
          </select>
        </div>

        {/* Content Area */}
        {viewMode === 'list' ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredSpots.map((spot) => (
              <ParkingCard key={spot.id} spot={spot} />
            ))}
          </div>
        ) : (
          <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
            <Map spots={filteredSpots} />
          </div>
        )}

        {/* No Results */}
        {filteredSpots.length === 0 && (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No parking spots found</h3>
            <p className="text-gray-600">Try adjusting your filters or search in a different area.</p>
          </div>
        )}
      </div>
    </div>
  );
}
