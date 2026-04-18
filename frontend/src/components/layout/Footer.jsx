import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">CampusPrint</h3>
            <p className="text-gray-300 text-sm">
              Your go-to printing service on campus. Print from anywhere, pick up at your convenience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/print" className="text-gray-300 hover:text-white transition-colors">
                  Print Documents
                </Link>
              </li>
              <li>
                <Link to="/handouts" className="text-gray-300 hover:text-white transition-colors">
                  Browse Handouts
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-gray-300 hover:text-white transition-colors">
                  Track Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>📍 Campus Café, Main Building</li>
              <li>📞 +234 123 456 7890</li>
              <li>✉️ print@campusprint.com</li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hours</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Monday - Friday: 8am - 8pm</li>
              <li>Saturday: 9am - 6pm</li>
              <li>Sunday: 10am - 4pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2024 CampusPrint. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer