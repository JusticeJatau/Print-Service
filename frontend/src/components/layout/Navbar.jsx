import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/print', label: 'Print' },
    { path: '/handouts', label: 'Handouts' },
    { path: '/orders', label: 'My Orders' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-xl text-gray-800">CampusPrint</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  px-3 py-2 rounded-lg transition-colors duration-200
                  ${isActive(link.path)
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Cart Icon */}
          <div className="hidden md:block">
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6M17 13l1.5 6M9 21h6M12 21v-6" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`
                  block px-4 py-2 rounded-lg transition-colors duration-200
                  ${isActive(link.path)
                    ? 'text-blue-600 font-semibold bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/cart"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-2 text-gray-600 hover:text-blue-600"
            >
              Cart
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar