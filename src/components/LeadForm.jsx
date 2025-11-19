import { useState } from 'react'

const initial = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company: '',
  source: 'Manual',
  status: 'new',
  owner: '',
  notes: ''
}

function LeadForm({ onCreated }) {
  const [form, setForm] = useState(initial)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed to create lead')
      const data = await res.json()
      onCreated?.(data.id)
      setForm(initial)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <input name="first_name" value={form.first_name} onChange={handleChange} placeholder="First name" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" required />
        <input name="last_name" value={form.last_name} onChange={handleChange} placeholder="Last name" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" required />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" type="email" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" />
        <input name="owner" value={form.owner} onChange={handleChange} placeholder="Owner" className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <select name="source" value={form.source} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">
          {['Manual','Website','Ad','Referral','Event','Cold Call'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select name="status" value={form.status} onChange={handleChange} className="px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white">
          {['new','contacted','qualified','lost','customer'].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <textarea name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" rows={3} className="w-full px-3 py-2 rounded bg-slate-900 border border-slate-700 text-white placeholder-slate-400" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded disabled:opacity-50">
        {loading ? 'Creating...' : 'Add Lead'}
      </button>
    </form>
  )
}

export default LeadForm
