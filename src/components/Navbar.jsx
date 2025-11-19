import { useState } from 'react'

function Navbar({ onRefresh }) {
  const [loading, setLoading] = useState(false)

  const handleRefresh = async () => {
    setLoading(true)
    try {
      await onRefresh?.()
    } finally {
      setLoading(false)
    }
  }

  return (
    <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur border-b border-slate-700">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-500/20 border border-blue-400/30 grid place-items-center">
            <span className="text-blue-400 font-bold">1</span>
          </div>
          <h1 className="text-white font-semibold tracking-tight">OneLead CRM</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefresh}
            className="text-sm px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white transition"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
