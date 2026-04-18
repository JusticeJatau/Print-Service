import React from 'react'

function OrderStatusBadge({ status }) {
  const statusConfig = {
    pending: {
      label: 'Pending',
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    printing: {
      label: 'Printing',
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
      )
    },
    ready: {
      label: 'Ready for Pickup',
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  }
  
  const config = statusConfig[status] || statusConfig.pending
  
  return (
    <span className={`
      inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium
      ${config.bg} ${config.text}
    `}>
      {config.icon}
      {config.label}
    </span>
  )
}

export default OrderStatusBadge