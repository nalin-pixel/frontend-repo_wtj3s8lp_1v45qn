import { useEffect, useState } from 'react'

function Badge({ children, color='blue' }){
  const colors = {
    blue: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
    green: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
    yellow: 'bg-yellow-500/20 text-yellow-300 border-yellow-400/30',
    red: 'bg-red-500/20 text-red-300 border-red-400/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-400/30'
  }
  return <span className={`px-2 py-1 rounded text-xs border ${colors[color]}`}>{children}</span>
}

function LeadTable(){
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      setError('')
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const url = new URL(`${baseUrl}/api/leads`)
      if (filter) url.searchParams.set('status', filter)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to load leads')
      const data = await res.json()
      setLeads(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [filter])

  const statusColor = (s) => {
    switch(s){
      case 'new': return 'blue'
      case 'contacted': return 'purple'
      case 'qualified': return 'green'
      case 'lost': return 'red'
      case 'customer': return 'yellow'
      default: return 'blue'
    }
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-semibold">Leads</h3>
        <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white">
          <option value="">All</option>
          {['new','contacted','qualified','lost','customer'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      {loading ? (
        <p className="text-slate-300">Loading...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-slate-400 text-sm border-b border-slate-700">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Company</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Phone</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Source</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-6 text-center text-slate-400">No leads yet</td>
                </tr>
              ) : (
                leads.map(l => (
                  <tr key={l.id} className="border-b border-slate-800/60 hover:bg-slate-800/60">
                    <td className="py-2 pr-4 text-white">{l.first_name} {l.last_name}</td>
                    <td className="py-2 pr-4 text-slate-300">{l.company || '-'}</td>
                    <td className="py-2 pr-4 text-slate-300">{l.email || '-'}</td>
                    <td className="py-2 pr-4 text-slate-300">{l.phone || '-'}</td>
                    <td className="py-2 pr-4"><Badge color={statusColor(l.status)}>{l.status}</Badge></td>
                    <td className="py-2 pr-4 text-slate-300">{l.source}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default LeadTable
