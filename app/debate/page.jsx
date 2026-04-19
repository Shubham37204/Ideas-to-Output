'use client';

import { useState } from 'react';
import { Swords, ThumbsUp, ThumbsDown, Copy, Check } from 'lucide-react';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import PageHeader from '../shared/components/PageHeader';
import Footer from '../shared/components/Footer';
import HistoryPanel from '../shared/components/HistoryPanel';
import { useLocalHistory } from '../shared/hooks/useLocalHistory';

const ACCENT = '#0369a1'; // blue — not purple

export default function DebatePage() {
  const [topic, setTopic] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(null);
  const { history, addToHistory, deleteFromHistory, clearHistory } = useLocalHistory('history_debate');

  const generate = async (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true); setErr(''); setResult(null);
    try {
      const res = await fetch('/api/debate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.debate);
      addToHistory({ topic, debate: data.debate });
    } catch (error) {
      setErr(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const loadFromHistory = (item) => {
    setTopic(item.topic);
    setResult(item.debate);
    setErr('');
  };

  return (
    <div className="min-h-screen" style={{ background: '#f0f9ff' }}>
      <BackToOverviewButton />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          icon={<Swords className="w-7 h-7" style={{ color: ACCENT }} />}
          title="Debate Generator"
          subtitle="Enter any topic — get structured arguments for both sides. Perfect for essays, critical thinking, or just seeing all angles."
          accentColor={ACCENT}
        />

        {/* Input */}
        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-5">
          <form onSubmit={generate} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Debate Topic</label>
              <input
                type="text"
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder='e.g. "Social media does more harm than good"'
                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none transition-all placeholder:text-slate-300"
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = ''}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setTopic(''); setResult(null); setErr(''); }}
                className="px-4 py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium">
                Clear
              </button>
              <button type="submit" disabled={loading || !topic.trim()}
                className="px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
                style={{ background: ACCENT }}>
                {loading ? 'Generating...' : '⚖️ Generate Debate'}
              </button>
            </div>
          </form>
        </div>

        {/* History */}
        <HistoryPanel
          history={history}
          onSelect={loadFromHistory}
          onDelete={deleteFromHistory}
          onClear={clearHistory}
          renderLabel={(item) => item.topic}
          accentColor={ACCENT}
        />

        {/* Error */}
        {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mt-5">{err}</div>}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
            {[0, 1].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-blue-100 p-6 space-y-3">
                {[80, 60, 90, 70].map((w, j) => (
                  <div key={j} className="h-3 bg-blue-50 rounded-full animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* Result */}
        {result && (
          <div className="space-y-4 mt-5 animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* FOR */}
              <div className="bg-white rounded-2xl border-2 border-green-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-black text-green-700 tracking-wide">FOR</span>
                  </div>
                  <button onClick={() => copyText(result.for.arguments.join('\n\n'), 'for')}
                    className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition-all">
                    {copied === 'for' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === 'for' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-slate-500 italic border-l-2 border-green-300 pl-3 leading-relaxed">{result.for.summary}</p>
                <ul className="space-y-3">
                  {result.for.arguments.map((arg, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                      <span className="w-5 h-5 bg-green-100 text-green-700 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>

              {/* AGAINST */}
              <div className="bg-white rounded-2xl border-2 border-red-200 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                    </div>
                    <span className="font-black text-red-700 tracking-wide">AGAINST</span>
                  </div>
                  <button onClick={() => copyText(result.against.arguments.join('\n\n'), 'against')}
                    className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition-all">
                    {copied === 'against' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied === 'against' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <p className="text-sm text-slate-500 italic border-l-2 border-red-300 pl-3 leading-relaxed">{result.against.summary}</p>
                <ul className="space-y-3">
                  {result.against.arguments.map((arg, i) => (
                    <li key={i} className="flex gap-3 text-sm text-slate-700 leading-relaxed">
                      <span className="w-5 h-5 bg-red-100 text-red-700 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5">{i + 1}</span>
                      {arg}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {result.nuance && (
              <div className="bg-white border border-blue-100 rounded-2xl px-6 py-4">
                <p className="text-xs font-bold uppercase tracking-wide mb-1.5" style={{ color: ACCENT }}>The Nuance</p>
                <p className="text-sm text-slate-700 leading-relaxed">{result.nuance}</p>
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
