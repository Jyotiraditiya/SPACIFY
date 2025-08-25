'use client';

import React, { useState } from 'react';
import { User, Calendar, MapPin, Clock, CreditCard, Settings, QrCode, Star } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('bookings');

  const userBookings = [
    {
      id: 'BK001',
      spotName: 'Ambience Mall',
      location: 'Sector 52, Gurgaon',
      date: '2024-01-20',
      time: '14:00 - 16:00',
      duration: '2 hours',
      amount: 200,
      status: 'active',
      qrCode: 'AMB-A1-240120',
    },
    {
      id: 'BK002',
      spotName: 'Delhi Airport',
      location: 'Terminal 3 Parking',
      date: '2024-01-18',
      time: '09:00 - 12:00',
      duration: '3 hours',
      amount: 450,
      status: 'completed',
      qrCode: 'DEL-T3-240118',
    },
    {
      id: 'BK003',
      spotName: 'Anant Vihar Station',
      location: 'Delhi Metro',
      date: '2024-01-15',
      time: '08:30 - 18:30',
      duration: '10 hours',
      amount: 850,
      status: 'completed',
      qrCode: 'ANV-M1-240115',
    },
  ];

  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 98765 43210',
    joinDate: 'January 2024',
    totalBookings: 15,
    totalSpent: 3250,
    favoriteSpots: ['Ambience Mall', 'CP Metro Station'],
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'completed':
        return 'bg-gray-100 text-gray-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{userProfile.name}</h1>
              <p className="text-gray-600">{userProfile.email}</p>
              <p className="text-gray-600">{userProfile.phone}</p>
              <p className="text-sm text-gray-500 mt-2">Member since {userProfile.joinDate}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{userProfile.totalBookings}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">₹{userProfile.totalSpent}</div>
                <div className="text-sm text-gray-600">Total Spent</div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
                activeTab === 'bookings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
                activeTab === 'payment'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 py-4 px-6 text-center font-medium border-b-2 transition-colors ${
                activeTab === 'settings'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Settings
            </button>
          </div>

          <div className="p-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">My Bookings</h2>
                  <select className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white">
                    <option>All Bookings</option>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {userBookings.map((booking) => (
                    <div key={booking.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-800">{booking.spotName}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusText(booking.status)}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-2" />
                              {booking.location}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {booking.date}
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <CreditCard className="w-4 h-4 mr-2" />
                              ₹{booking.amount}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 mt-4 md:mt-0">
                          {booking.status === 'active' && (
                            <div className="bg-white border border-gray-300 rounded-lg p-3 text-center">
                              <QrCode className="w-8 h-8 mx-auto mb-1 text-gray-600" />
                              <p className="text-xs text-gray-600">QR Code</p>
                            </div>
                          )}
                          <div className="flex flex-col space-y-2">
                            {booking.status === 'active' && (
                              <button className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors">
                                Cancel
                              </button>
                            )}
                            {booking.status === 'completed' && (
                              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                                <Star className="w-4 h-4 mr-1" />
                                Rate
                              </button>
                            )}
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50 transition-colors">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payment' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Payment Methods</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Add Payment Method
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Credit Card */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold mr-4">
                          VISA
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">•••• •••• •••• 4532</p>
                          <p className="text-sm text-gray-600">Expires 12/26</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">Default</span>
                        <button className="text-gray-500 hover:text-gray-700">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* UPI */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold mr-4">
                          UPI
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">john.doe@paytm</p>
                          <p className="text-sm text-gray-600">UPI ID</p>
                        </div>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-8 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold mr-4">
                          WLLT
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Spacify Wallet</p>
                          <p className="text-sm text-gray-600">Balance: ₹250</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                        Add Money
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>

                <div className="space-y-6">
                  {/* Profile Settings */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Profile Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          value={userProfile.name}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={userProfile.email}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={userProfile.phone}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                        />
                      </div>
                    </div>
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                      Update Profile
                    </button>
                  </div>

                  {/* Notification Settings */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Booking confirmations</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Parking reminders</span>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Promotional offers</span>
                        <input type="checkbox" className="rounded" />
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-4">Security</h3>
                    <div className="space-y-3">
                      <button className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
                        Change Password
                      </button>
                      <button className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
