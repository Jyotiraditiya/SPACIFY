'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Clock, CreditCard, MapPin, Car, Shield, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function BookingPage() {
  const router = useRouter();
  const { isAuthenticated, user, isLoading } = useAuth();
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    spotId: '',
    date: '',
    startTime: '',
    duration: 2,
    vehicleType: 'car',
    vehicleNumber: '',
    paymentMethod: 'card',
  });

  const [isBookingComplete, setIsBookingComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Validation functions
  const validateStep1 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!bookingData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(bookingData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Cannot book for past dates';
      }
    }
    
    if (!bookingData.startTime) {
      newErrors.startTime = 'Please select a start time';
    }
    
    if (!bookingData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = 'Please enter vehicle number';
    } else if (!/^[A-Z]{2}[\s-]?\d{1,2}[\s-]?[A-Z]{1,2}[\s-]?\d{1,4}$/i.test(bookingData.vehicleNumber.replace(/\s/g, ''))) {
      newErrors.vehicleNumber = 'Please enter a valid vehicle number (e.g., DL 01 AB 1234)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!bookingData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store booking in localStorage for demo purposes
      const bookingDetails = {
        id: Date.now().toString(),
        ...bookingData,
        userEmail: user?.email,
        totalAmount: 100 * bookingData.duration,
        bookingDate: new Date().toISOString(),
        status: 'confirmed'
      };
      
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(bookingDetails);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
      setIsBookingComplete(true);
    } catch (error) {
      setErrors({ general: 'Booking failed. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStepNavigation = (nextStep: number) => {
    if (nextStep === 2 && !validateStep1()) {
      return;
    }
    if (nextStep === 3 && !validateStep2()) {
      return;
    }
    setBookingStep(nextStep);
    setErrors({});
  };

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  if (isBookingComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your parking spot has been reserved successfully.</p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Spot:</span>
                <span className="text-gray-800">Ambience Mall - A1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="text-gray-800">Today, 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="text-gray-800">2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total:</span>
                <span className="text-gray-800 font-semibold">₹200</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-blue-800 mb-2">QR Code</h4>
            <div className="w-24 h-24 bg-white border-2 border-blue-300 rounded-lg mx-auto mb-2 flex items-center justify-center">
              <div className="w-16 h-16 bg-black opacity-10 rounded"></div>
            </div>
            <p className="text-sm text-blue-700">Show this QR code at the parking entrance</p>
          </div>

          <button 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            onClick={() => router.push('/profile')}
          >
            View My Bookings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Book Parking Spot</h1>
          <div className="flex items-center mt-2 space-x-4">
            <div className={`flex items-center ${bookingStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${bookingStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className={`flex items-center ${bookingStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${bookingStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className={`flex items-center ${bookingStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${bookingStep >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              {bookingStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Booking Details</h2>
                  
                  <div className="space-y-6">
                    {/* Date Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.date}
                        onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
                          errors.date ? 'border-red-500' : 'border-gray-300'
                        }`}
                        aria-label="Select parking date"
                        required
                      />
                      {errors.date && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Time Selection */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-2" />
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={bookingData.startTime}
                          onChange={(e) => setBookingData({...bookingData, startTime: e.target.value})}
                          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
                            errors.startTime ? 'border-red-500' : 'border-gray-300'
                          }`}
                          aria-label="Select start time"
                          required
                        />
                        {errors.startTime && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.startTime}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                        <select
                          value={bookingData.duration}
                          onChange={(e) => setBookingData({...bookingData, duration: parseInt(e.target.value)})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          aria-label="Select duration"
                          required
                        >
                          <option value={1}>1 hour - ₹100</option>
                          <option value={2}>2 hours - ₹200</option>
                          <option value={3}>3 hours - ₹300</option>
                          <option value={4}>4 hours - ₹400</option>
                          <option value={6}>6 hours - ₹600</option>
                          <option value={8}>8 hours - ₹800</option>
                          <option value={12}>12 hours - ₹1200</option>
                          <option value={24}>24 hours - ₹2400</option>
                        </select>
                      </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Car className="w-4 h-4 inline mr-2" />
                          Vehicle Type
                        </label>
                        <select
                          value={bookingData.vehicleType}
                          onChange={(e) => setBookingData({...bookingData, vehicleType: e.target.value})}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
                          aria-label="Select vehicle type"
                          required
                        >
                          <option value="car">🚗 Car</option>
                          <option value="bike">🏍️ Bike</option>
                          <option value="van">🚐 Van</option>
                          <option value="scooter">🛵 Scooter</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Number</label>
                        <input
                          type="text"
                          placeholder="DL 01 AB 1234"
                          value={bookingData.vehicleNumber}
                          onChange={(e) => setBookingData({...bookingData, vehicleNumber: e.target.value.toUpperCase()})}
                          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white ${
                            errors.vehicleNumber ? 'border-red-500' : 'border-gray-300'
                          }`}
                          aria-label="Vehicle number"
                          required
                        />
                        {errors.vehicleNumber && (
                          <p className="mt-1 text-sm text-red-600 flex items-center">
                            <AlertCircle className="w-4 h-4 mr-1" />
                            {errors.vehicleNumber}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* General Error Message */}
                  {errors.general && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-sm text-red-700">{errors.general}</span>
                    </div>
                  )}

                  <button
                    onClick={() => handleStepNavigation(2)}
                    className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={!bookingData.date || !bookingData.startTime || !bookingData.vehicleNumber}
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Payment Method</h2>
                  
                  <div className="space-y-4">
                    <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors ${
                      bookingData.paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="card"
                          name="payment"
                          value="card"
                          checked={bookingData.paymentMethod === 'card'}
                          onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
                          className="mr-3"
                        />
                        <label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="w-5 h-5 mr-2 text-gray-600" />
                          <div>
                            <span className="font-medium">Credit/Debit Card</span>
                            <p className="text-sm text-gray-500">Visa, MasterCard, RuPay</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors ${
                      bookingData.paymentMethod === 'upi' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="upi"
                          name="payment"
                          value="upi"
                          checked={bookingData.paymentMethod === 'upi'}
                          onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
                          className="mr-3"
                        />
                        <label htmlFor="upi" className="flex items-center cursor-pointer">
                          <div className="w-5 h-5 mr-2 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            U
                          </div>
                          <div>
                            <span className="font-medium">UPI Payment</span>
                            <p className="text-sm text-gray-500">Pay using any UPI app</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className={`border rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors ${
                      bookingData.paymentMethod === 'wallet' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="wallet"
                          name="payment"
                          value="wallet"
                          checked={bookingData.paymentMethod === 'wallet'}
                          onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
                          className="mr-3"
                        />
                        <label htmlFor="wallet" className="flex items-center cursor-pointer">
                          <div className="w-5 h-5 mr-2 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                            W
                          </div>
                          <div>
                            <span className="font-medium">Digital Wallet</span>
                            <p className="text-sm text-gray-500">Paytm, PhonePe, Google Pay</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Payment Error Message */}
                  {errors.paymentMethod && (
                    <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-sm text-red-700">{errors.paymentMethod}</span>
                    </div>
                  )}

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => handleStepNavigation(1)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => handleStepNavigation(3)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Review Booking
                    </button>
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">Confirm Booking</h2>
                  
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-gray-800 mb-4">Booking Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date & Time:</span>
                        <span className="text-gray-800">
                          {bookingData.date ? new Date(bookingData.date).toLocaleDateString() : 'Not selected'}, {bookingData.startTime || 'Not selected'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="text-gray-800">{bookingData.duration} hours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Vehicle:</span>
                        <span className="text-gray-800">{bookingData.vehicleType.toUpperCase()} - {bookingData.vehicleNumber || 'Not entered'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="text-gray-800">
                          {bookingData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                           bookingData.paymentMethod === 'upi' ? 'UPI Payment' : 'Digital Wallet'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">User:</span>
                        <span className="text-gray-800">{user?.name}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-800">Total Amount:</span>
                          <span className="text-gray-800">₹{100 * bookingData.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Final Error Message */}
                  {errors.general && (
                    <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center">
                      <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="text-sm text-red-700">{errors.general}</span>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleStepNavigation(2)}
                      className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                      disabled={isProcessing}
                    >
                      Back
                    </button>
                    <button
                      onClick={handleBooking}
                      disabled={isProcessing}
                      className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        'Confirm & Pay'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Spot Information */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Parking Spot</h3>
              
              <div className="bg-blue-200 rounded-lg h-32 flex items-center justify-center mb-4">
                <MapPin className="w-12 h-12 text-blue-700" />
              </div>

              <h4 className="font-semibold text-gray-800">Ambience Mall</h4>
              <p className="text-gray-600 text-sm mb-4">Sector 52, Gurgaon</p>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex items-center text-gray-600">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>CCTV Monitored</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Car className="w-4 h-4 mr-2" />
                  <span>Covered Parking</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>24/7 Access</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Rate:</span>
                  <span className="text-2xl font-bold text-blue-600">₹100<span className="text-sm text-gray-500">/hr</span></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Your Total:</span>
                  <span className="text-xl font-bold text-green-600">₹{100 * bookingData.duration}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
