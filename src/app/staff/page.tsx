'use client'
import { useState, useEffect } from 'react'

export default function StaffPage() {
  const [tokens, setTokens] = useState<any[]>([])

  useEffect(() => {
    fetchTokens()
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
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Staff Dashboard - Token Queue</h1>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Token Number</th>
                <th className="px-4 py-2">Service Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Time</th>
              </tr>
            </thead>
            <tbody>
              {tokens.map((token) => (
                <tr key={token.id} className="border-b">
                  <td className="px-4 py-2 text-center font-bold">{token.number}</td>
                  <td className="px-4 py-2">{token.serviceType}</td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                      {token.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-sm">
                    {new Date(token.createdAt).toLocaleTimeString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">How to Use:</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Tell customers to go to the homepage to get a token</li>
            <li>This screen shows all active tokens in the queue</li>
            <li>The display screen (/display) will update automatically</li>
          </ol>
        </div>
      </div>
    </div>
  )
}