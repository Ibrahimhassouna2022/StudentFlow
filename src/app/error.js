'use client'

import { useEffect } from 'react'

// Error boundary: catches runtime errors in this route segment and provides a retry button
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log error details to console
    console.error("Server Error caught:", error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4 p-6 border rounded-xl bg-red-50/50">
      <h2 className="text-2xl font-bold text-red-600">Sorry, an unexpected server error occurred!</h2>
      <p className="text-sm text-gray-600">We are currently unable to load the requested articles.</p>
      
      <button
        onClick={() => reset()} 
        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
  )
}
