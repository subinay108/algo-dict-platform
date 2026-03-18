import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import CodeBlock from './CodeBlock'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Tab = 'python' | 'javascript' | 'cpp' | 'java'

const AlgoDeck: React.FC = () => {
  const params = useParams<{ id: string }>()
  const id = params.id ?? 'binary-search'
  const navigate = useNavigate()

  const formatTitle = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

  const [algo, setAlgo] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tab, setTab] = useState<Tab>('python')

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`/data/algorithms/${id}.json`)
      .then(res => {
        if (!res.ok) throw new Error(`Algorithm ${id} not found`)
        return res.json()
      })
      .then(data => {
        setAlgo(data)
        // pick first available language as initial tab
        const available = ['python', 'javascript', 'cpp', 'java'] as Tab[]
        for (const l of available) if (data?.code?.[l]) { setTab(l); break }
      })
      .catch(err => setError(String(err)))
      .finally(() => setLoading(false))
  }, [id])

  const title = algo?.name ?? formatTitle(id)

  const renderTabs = () => {
    const languages: { key: Tab, label: string }[] = []
    if (algo?.code?.python) languages.push({ key: 'python', label: 'Python' })
    if (algo?.code?.javascript) languages.push({ key: 'javascript', label: 'JavaScript' })
    if (algo?.code?.cpp) languages.push({ key: 'cpp', label: 'C++' })
    if (algo?.code?.java) languages.push({ key: 'java', label: 'Java' })

    if (languages.length === 0) return null

    return (
      <div className="flex gap-1 mb-2">
        {languages.map(l => (
          <button
            key={l.key}
            onClick={() => setTab(l.key)}
            className={`px-4 py-2 text-sm font-bold rounded-t-lg ${tab === l.key ? 'bg-primary text-slate-900' : 'text-warm-gray hover:text-slate-900 transition-colors'}`}
          >
            {l.label}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="relative flex flex-col h-full w-full max-w-5xl mx-auto px-6 lg:px-10">
      <Header />

      <div className="max-w-5xl mx-auto w-full px-8">
        <div className="py-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-warm-gray hover:text-primary hover:bg-primary/5 transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
        </div>
      </div>

      <main className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-8 overflow-auto">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-6xl font-black text-slate-900 dark:text-slate-100 tracking-tight mb-4">{title}</h2>
          <p className="text-xl text-center text-warm-gray font-normal max-w-2xl leading-relaxed">
            {algo?.description ?? `${title} — algorithm details and implementations.`}
          </p>

          <div className="mt-3 flex items-center gap-3 flex-wrap">
            {(algo?.tags || []).map((t: string) => (
              <span key={t} className="text-xs px-2 py-1 rounded bg-warm-gray/10 text-warm-gray uppercase tracking-widest">{t}</span>
            ))}
            {algo?.difficulty && <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-bold">{algo.difficulty}</span>}
            {algo?.category && <span className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-800">{algo.category}</span>}
          </div>
        </div>

        <div className="flex gap-6 mb-10">
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-6 py-4 flex flex-col min-w-45">
            <span className="text-xs uppercase tracking-widest text-warm-gray font-bold mb-1">Time Complexity (Worst)</span>
            <span className="text-2xl font-mono font-bold text-accent-pink">{algo?.time_complexity?.worst ?? '—'}</span>
          </div>
          <div className="bg-primary/10 border border-primary/20 rounded-xl px-6 py-4 flex flex-col min-w-45">
            <span className="text-xs uppercase tracking-widest text-warm-gray font-bold mb-1">Space Complexity</span>
            <span className="text-2xl font-mono font-bold text-accent-pink">{algo?.space_complexity ?? '—'}</span>
          </div>
        </div>

        <div className="">
          {renderTabs()}

          {loading && <div className="p-6 text-warm-gray">Loading...</div>}
          {error && <div className="p-6 text-red-500">Error loading algorithm: {error}</div>}

          {!loading && !error && (
            <>
              <CodeBlock language={tab === 'cpp' ? 'cpp' : tab} code={algo?.code?.[tab] ?? ''} />

              {algo?.explanation && (
                <div className="mt-10 text-left prose prose-slate dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >
                    {String(algo.explanation).replace(/\r\n/g, '\n')}
                  </ReactMarkdown>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default AlgoDeck
