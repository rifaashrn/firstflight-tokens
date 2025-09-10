'use client'
import { useState } from 'react'

export default function Home() {
  const [token, setToken] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const generateToken = async (serviceType: string) => {
    setLoading(true)
    try {
      const response = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceType }),
      })
      const data = await response.json()
      setToken(data)
    } catch (error) {
      console.error('Error:', error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">First Flight Couriers</h1>
        
        {!token ? (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Select Service Type</h2>
            <div className="grid grid-cols-2 gap-4">
              {['PICKUP', 'DELIVERY', 'INQUIRY'].map((service) => (
                <button
                  key={service}
                  onClick={() => generateToken(service)}
                  disabled={loading}
                  className="bg-blue-500 text-white py-3 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
                >
                  {loading ? '...' : service}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-bold text-green-600 mb-4">Your Token is Ready!</h2>
            <div className="bg-gray-50 p-4 rounded mb-4">
              <div className="text-4xl font-bold mb-2">{token.number}</div>
              <div className="text-sm text-gray-600">{token.serviceType}</div>
            </div>
            {token.qrCodeImage && (
              <div className="mb-4">
                <img src={token.qrCodeImage} alt="QR Code" className="mx-auto w-32 h-32" />
                <p className="text-sm text-gray-600 mt-2">Show this QR code to staff</p>
              </div>
            )}
            <button
              onClick={() => setToken(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
            >
              Generate New Token
            </button>
          </div>
        )}
      </div>
    </div>
  )
}