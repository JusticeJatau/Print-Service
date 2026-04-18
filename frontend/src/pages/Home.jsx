import React from 'react'
import { Link } from 'react-router-dom'
import { getCurrentPricing } from '../lib/pricing'
import { formatCurrency } from '../lib/utils'

function Home() {
  const pricing = getCurrentPricing()
  
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Upload Document",
      description: "Drag & drop your PDF or Word document"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "See Price",
      description: "Auto-calculated based on pages & options"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Pay & Pick Up",
      description: "Secure payment, pick up from campus café"
    }
  ]
  
  const benefits = [
    {
      title: "Fast Printing",
      description: "24-hour turnaround time",
      icon: "⚡"
    },
    {
      title: "Affordable",
      description: `Starting from ${formatCurrency(pricing.blackAndWhite)}/page`,
      icon: "💰"
    },
    {
      title: "Campus Pickup",
      description: "Convenient location at campus café",
      icon: "📍"
    },
    {
      title: "24/7 Ordering",
      description: "Upload anytime, anywhere",
      icon: "🕐"
    }
  ]
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Print Your Documents From Anywhere
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Upload, pay online, and pick up from campus café. No queues, no stress.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/print"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Upload Document
              </Link>
              <Link
                to="/handouts"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Handouts
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 text-blue-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Preview */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Transparent Pricing
          </h2>
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatCurrency(pricing.blackAndWhite)}
              </div>
              <p className="text-gray-600">per page</p>
              <div className="mt-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Black & White
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {formatCurrency(pricing.color)}
              </div>
              <p className="text-gray-600">per page</p>
              <div className="mt-4">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  Color
                </span>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              *Bulk orders get {pricing.bulkDiscount} discount • Student discount available
            </p>
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose CampusPrint?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Print?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Upload your document now and have it ready for pickup
          </p>
          <Link
            to="/print"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block"
          >
            Start Printing Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home