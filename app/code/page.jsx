'use client';

import { useState } from 'react';
import { Code, Copy, Check, Download, Terminal } from 'lucide-react';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import PageHeader from '../shared/components/PageHeader';
import Footer from '../shared/components/Footer';
import HistoryPanel from '../shared/components/HistoryPanel';
import { useLocalHistory } from '../shared/hooks/useLocalHistory';
import CodeInput from './components/CodeInput';

const ACCENT = '#2563eb'; // blue

function CodePage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [lastLang, setLastLang] = useState('');
  const [copied, setCopied] = useState(false);
  const { history, addToHistory, deleteFromHistory, clearHistory } = useLocalHistory('history_code');

  const generateCode = async ({ prompt, language }) => {
    setLoading(true); setErr(''); setCode(''); setLastLang(language);
    try {
      const res = await fetch('/api/code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, language }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCode(data.code);
      addToHistory({ prompt, language, code: data.code });
    } catch (error) {
      setErr(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const extMap = { javascript: 'js', python: 'py', typescript: 'ts', java: 'java', 'c++': 'cpp', rust: 'rs', go: 'go', php: 'php', ruby: 'rb' };
    const ext = extMap[lastLang?.toLowerCase()] || 'txt';
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([code], { type: 'text/plain' }));
    a.download = `generated-code.${ext}`;
    a.click();
  };

  const loadFromHistory = (item) => {
    setCode(item.code);
    setLastLang(item.language);
    setErr('');
  };

  return (
    <div className="min-h-screen" style={{ background: '#f8faff' }}>
      <BackToOverviewButton />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          icon={<Code className="w-7 h-7" style={{ color: ACCENT }} />}
          title="Code Helper"
          subtitle="Describe what you need — get clean, working code back. No boilerplate, no fluff."
          accentColor={ACCENT}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left — Input */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6">
              <CodeInput
                onSubmit={generateCode}
                onClear={() => { setCode(''); setErr(''); }}
                isLoading={loading}
              />
              {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mt-4">{err}</div>}
            </div>

            <HistoryPanel
              history={history}
              onSelect={loadFromHistory}
              onDelete={deleteFromHistory}
              onClear={clearHistory}
              renderLabel={(item) => `[${item.language}] ${item.prompt}`}
              accentColor={ACCENT}
            />
          </div>

          {/* Right — Output (dark code panel) */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-lg" style={{ background: '#0f172a' }}>
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs text-slate-400 font-mono">
                    {lastLang ? `output.${lastLang}` : 'output'}
                  </span>
                </div>
              </div>
              {code && (
                <div className="flex gap-2">
                  <button onClick={copyCode}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-700 transition-all">
                    {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <button onClick={downloadCode}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-slate-700 transition-all">
                    <Download className="w-3.5 h-3.5" />Save
                  </button>
                </div>
              )}
            </div>

            {/* Code area */}
            <div className="p-5 min-h-80 max-h-[500px] overflow-auto">
              {loading ? (
                <div className="space-y-2">
                  {[70, 90, 60, 85, 50, 75, 65, 80].map((w, i) => (
                    <div key={i} className="h-3 rounded animate-pulse bg-slate-700" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : code ? (
                <pre className="text-sm text-green-300 font-mono whitespace-pre-wrap leading-relaxed">{code}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <Code className="w-10 h-10 text-slate-600 mb-3" />
                  <p className="text-slate-500 text-sm font-mono">// your code will appear here</p>
                  <p className="text-slate-600 text-xs mt-1 font-mono">// describe it and hit Generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default CodePage;
