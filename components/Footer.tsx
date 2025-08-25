export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Spacify</h3>
            <p className="text-gray-300 text-sm">
              Find and book the best parking spots in your area with real-time availability and secure payments.
            </p>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="/parking" className="text-gray-300 hover:text-white">Find Parking</a></li>
              <li><a href="/booking" className="text-gray-300 hover:text-white">My Bookings</a></li>
              <li><a href="/profile" className="text-gray-300 hover:text-white">Profile</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-md font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>support@spacify.com</li>
              <li>+1 (555) 123-4567</li>
              <li>123 Parking Street, City, State</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-center text-gray-300 text-sm">
            © 2024 Spacify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
