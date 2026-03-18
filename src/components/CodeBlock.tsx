import React, { useState, useEffect } from 'react'

type CodeBlockProps = {
  language?: string
  code: string
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'text', code }) => {
  const [copied, setCopied] = useState(false)
  const [Highlighter, setHighlighter] = useState<any | null>(null)
  const [style, setStyle] = useState<any | null>(null)

  useEffect(() => {
    let mounted = true
    Promise.all([
      import('react-syntax-highlighter').then(m => m.Prism),
      import('react-syntax-highlighter/dist/esm/styles/prism').then(s => s.tomorrow)
    ]).then(([Prism, tomorrow]) => {
      if (!mounted) return
      setHighlighter(() => Prism)
      setStyle(() => tomorrow)
    }).catch(() => {
      // ignore load errors
    })
    return () => { mounted = false }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (e) {
      // ignore
    }
  }

  return (
    <div className="bg-slate-900 dark:bg-black rounded-b-xl rounded-tr-xl p-4 overflow-hidden relative group">
      <div className="absolute top-4 right-4 opacity-100">
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy code'}
          className="text-warm-gray hover:text-white flex items-center gap-1 text-xs tracking-widest font-bold bg-transparent"
        >
          <span className="material-symbols-outlined text-sm">{copied ? 'check' : 'content_copy'}</span>
        </button>
      </div>

      <div className="overflow-auto max-h-100 code-scrollbar" style={{ scrollbarColor: 'rgba(236,72,153,0.5) transparent', scrollbarWidth: 'thin' }}>
        <style>{`.code-scrollbar::-webkit-scrollbar{width:10px;height:10px}.code-scrollbar::-webkit-scrollbar-thumb{background:rgba(236,72,153,0.5);border-radius:9999px;border:2px solid transparent;background-clip:padding-box}.code-scrollbar::-webkit-scrollbar-track{background:transparent}`}</style>
        {Highlighter && style ? (
          <Highlighter
            language={language}
            style={style}
            showLineNumbers={true}
            wrapLongLines={true}
            customStyle={{ background: 'transparent', padding: 0, margin: 0, display: 'grid' }}
            lineProps={{ style: { display: 'block', width: '100%' } }}
          >
            {code}
          </Highlighter>
        ) : (
          <pre className="text-sm whitespace-pre-wrap">{code}</pre>
        )}
      </div>
    </div>
  )
}

export default CodeBlock
