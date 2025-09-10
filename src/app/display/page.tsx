'use client'
import { useState, useEffect } from 'react'

export default function DisplayPage() {
  const [tokens, setTokens] = useState<any[]>([])

  useEffect(() => {
    fetchTokens()
    const interval = setInterval(fetchTokens, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchTokens = async () => {
    try {
      const response = await fetch('/api/tokens')
      const data = await response.json()
      setTokens(data)
    } catch (error) {
      console.error('Error fetching tokens:', error)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2">First Flight Couriers</h1>
        <p className="text-2xl mb-8">Now Serving</p>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-blue-600 py-2">NOW SERVING</h2>
            <div className="text-6xl font-bold text-green-400">
              {tokens[0]?.number || '---'}
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4 bg-yellow-600 py-2">WAITING</h2>
            <div className="space-y-2">
              {tokens.slice(1, 6).map((token) => (
                <div key={token.id} className="text-3xl font-bold">
                  {token.number}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}