import Navbar from './components/Navbar'
import LeadForm from './components/LeadForm'
import LeadTable from './components/LeadTable'

function App() {
  const refresh = async () => {
    // no-op, components auto reload data
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar onRefresh={refresh} />

      <main className="mx-auto max-w-7xl px-4 py-8 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-1 space-y-4">
          <h2 className="text-white text-lg font-semibold">Add Lead</h2>
          <LeadForm onCreated={refresh} />
          <div className="text-slate-400 text-sm">
            <p>Quickly capture potential customers with name, contact, and source.</p>
          </div>
        </section>

        <section className="lg:col-span-2 space-y-4">
          <LeadTable />
        </section>
      </main>

      <footer className="text-center text-slate-500 text-sm py-6">
        <p>OneLead CRM • Simple pipeline to manage your leads</p>
      </footer>
    </div>
  )
}

export default App
