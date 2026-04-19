'use client';

import { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, HelpCircle, XCircle, Copy, Check } from 'lucide-react';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import PageHeader from '../shared/components/PageHeader';
import Footer from '../shared/components/Footer';
import HistoryPanel from '../shared/components/HistoryPanel';
import { useLocalHistory } from '../shared/hooks/useLocalHistory';

const VERDICT_CONFIG = {
  'Likely True':  { icon: CheckCircle,   color: '#16a34a', bg: '#f0fdf4', border: '#bbf7d0' },
  'Uncertain':    { icon: HelpCircle,    color: '#d97706', bg: '#fffbeb', border: '#fde68a' },
  'Misleading':   { icon: AlertTriangle, color: '#ea580c', bg: '#fff7ed', border: '#fed7aa' },
  'Likely False': { icon: XCircle,       color: '#dc2626', bg: '#fef2f2', border: '#fecaca' },
};

const ACCENT = '#dc2626';

function ScoreBar({ score }) {
  const color = score >= 70 ? '#16a34a' : score >= 40 ? '#d97706' : '#dc2626';
  return (
    <div>
      <div className="flex justify-between text-xs text-slate-500 mb-1.5">
        <span className="font-medium">Credibility Score</span>
        <span className="font-black text-sm" style={{ color }}>{score} / 100</span>
      </div>
      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${score}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }} />
      </div>
    </div>
  );
}

export default function FakeNewsPage() {
  const [claim, setClaim] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const { history, addToHistory, deleteFromHistory, clearHistory } = useLocalHistory('history_fakenews');

  const analyze = async (e) => {
    e.preventDefault();
    if (!claim.trim()) return;
    setLoading(true); setErr(''); setResult(null);
    try {
      const res = await fetch('/api/fake-news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setResult(data.analysis);
      addToHistory({ claim, analysis: data.analysis });
    } catch (error) {
      setErr(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    setClaim(item.claim);
    setResult(item.analysis);
    setErr('');
  };

  const copyResult = () => {
    if (!result) return;
    navigator.clipboard.writeText(
      `Claim: ${claim}\nVerdict: ${result.verdict}\nScore: ${result.score}/100\n\n${result.reasoning}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const verdict = result ? (VERDICT_CONFIG[result.verdict] || VERDICT_CONFIG['Uncertain']) : null;

  return (
    <div className="min-h-screen" style={{ background: '#fff5f5' }}>
      <BackToOverviewButton />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <PageHeader
          icon={<ShieldAlert className="w-7 h-7" style={{ color: ACCENT }} />}
          title="Fake News Detector"
          subtitle="Paste any headline or claim — AI scores its credibility and explains why."
          accentColor={ACCENT}
        />

        {/* Input */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 mb-5">
          <form onSubmit={analyze} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">Claim or Headline</label>
              <textarea
                value={claim}
                onChange={e => setClaim(e.target.value)}
                rows={4}
                maxLength={500}
                placeholder='e.g. "Drinking lemon water on an empty stomach cures cancer"'
                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none transition-all placeholder:text-slate-300"
                style={{ '--tw-ring-color': ACCENT }}
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = ''}
              />
              <p className="text-right text-xs text-slate-400 mt-1">{claim.length}/500</p>
            </div>
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => { setClaim(''); setResult(null); setErr(''); }}
                className="px-4 py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all font-medium">
                Clear
              </button>
              <button type="submit" disabled={loading || !claim.trim()}
                className="px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
                style={{ background: ACCENT }}>
                {loading ? 'Analyzing...' : '🔍 Analyze Claim'}
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
          renderLabel={(item) => item.claim}
          accentColor={ACCENT}
        />

        {/* Error */}
        {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mt-5">{err}</div>}

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl border border-red-100 p-6 mt-5 space-y-3">
            <div className="h-3 bg-red-50 rounded-full animate-pulse w-3/4" />
            <div className="h-3 bg-red-50 rounded-full animate-pulse w-1/2" />
            <div className="h-8 bg-red-50 rounded-xl animate-pulse mt-2" />
            <div className="h-3 bg-red-50 rounded-full animate-pulse w-4/5" />
          </div>
        )}

        {/* Result */}
        {result && verdict && (
          <div className="bg-white rounded-2xl border border-red-100 shadow-sm p-6 mt-5 space-y-5 animate-fade-up">
            {/* Verdict */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 p-4 rounded-xl flex-1 border"
                style={{ background: verdict.bg, borderColor: verdict.border }}>
                <verdict.icon className="w-6 h-6 flex-shrink-0" style={{ color: verdict.color }} />
                <div>
                  <p className="text-xs text-slate-500">Verdict</p>
                  <p className="font-black text-lg" style={{ color: verdict.color }}>{result.verdict}</p>
                </div>
              </div>
              <button onClick={copyResult}
                className="ml-3 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-700 flex-shrink-0">
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <ScoreBar score={result.score} />

            <div className="border-t border-slate-100 pt-4 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">AI Reasoning</p>
                <p className="text-sm text-slate-700 leading-relaxed">{result.reasoning}</p>
              </div>

              {result.red_flags?.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Red Flags</p>
                  <ul className="space-y-1.5">
                    {result.red_flags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-red-400 flex-shrink-0 mt-0.5">⚠</span>{flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {result.suggestion && (
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                  <p className="text-xs font-bold text-blue-600 mb-1">How to verify</p>
                  <p className="text-sm text-blue-800">{result.suggestion}</p>
                </div>
              )}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
