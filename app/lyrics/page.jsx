'use client';

import { useState } from 'react';
import { Music, Copy, Check, Download } from 'lucide-react';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import PageHeader from '../shared/components/PageHeader';
import Footer from '../shared/components/Footer';
import HistoryPanel from '../shared/components/HistoryPanel';
import { useLocalHistory } from '../shared/hooks/useLocalHistory';

const GENRES = ['Pop', 'Hip-Hop', 'Rock', 'Country', 'R&B', 'Folk', 'Jazz', 'Electronic', 'Indie', 'Metal'];
const ACCENT = '#1d4ed8'; // deep blue

export default function LyricsPage() {
  const [theme, setTheme] = useState('');
  const [genre, setGenre] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const { history, addToHistory, deleteFromHistory, clearHistory } = useLocalHistory('history_lyrics');

  const generate = async (e) => {
    e.preventDefault();
    if (!theme.trim() || !genre) return;
    setLoading(true); setErr(''); setLyrics('');
    try {
      const res = await fetch('/api/lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ theme, genre }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setLyrics(data.lyrics);
      addToHistory({ theme, genre, lyrics: data.lyrics });
    } catch (error) {
      setErr(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    setTheme(item.theme);
    setGenre(item.genre);
    setLyrics(item.lyrics);
    setErr('');
  };

  const copyLyrics = () => {
    navigator.clipboard.writeText(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadLyrics = () => {
    const blob = new Blob([lyrics], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${genre.toLowerCase()}-lyrics-${Date.now()}.txt`;
    a.click();
  };

  const renderLyrics = (text) =>
    text.split('\n').map((line, i) => {
      const isHeader = /^\[.+\]/.test(line);
      return (
        <p key={i} className={
          isHeader
            ? 'font-black mt-5 mb-1 text-xs uppercase tracking-widest'
            : line === '' ? 'mt-1' : 'text-slate-700 text-sm leading-loose'
        } style={isHeader ? { color: ACCENT } : {}}>
          {line || '\u00A0'}
        </p>
      );
    });

  return (
    <div className="min-h-screen" style={{ background: '#f0f4ff' }}>
      <BackToOverviewButton />
      <div className="max-w-3xl mx-auto px-6 py-8">
        <PageHeader
          icon={<Music className="w-7 h-7" style={{ color: ACCENT }} />}
          title="Song Lyrics Generator"
          subtitle="Pick a genre, describe a vibe — get a full song with verses, chorus, and bridge."
          accentColor={ACCENT}
        />

        <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-5 space-y-5">
          <form onSubmit={generate} className="space-y-5">
            {/* Genre pills */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-3">Pick a Genre</label>
              <div className="flex flex-wrap gap-2">
                {GENRES.map(g => (
                  <button key={g} type="button" onClick={() => setGenre(g)}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-full border transition-all"
                    style={genre === g
                      ? { background: ACCENT, color: '#fff', borderColor: ACCENT }
                      : { background: '#fff', color: '#475569', borderColor: '#e2e8f0' }
                    }>
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div>
              <label className="block text-sm font-bold text-slate-800 mb-2">What&apos;s it about?</label>
              <textarea value={theme} onChange={e => setTheme(e.target.value)} rows={3}
                placeholder='e.g. "A late-night drive thinking about someone you miss"'
                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none transition-all placeholder:text-slate-300"
                onFocus={e => e.target.style.borderColor = ACCENT}
                onBlur={e => e.target.style.borderColor = ''} />
            </div>

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => { setTheme(''); setGenre(''); setLyrics(''); setErr(''); }}
                className="px-4 py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium transition-all">
                Clear
              </button>
              <button type="submit" disabled={loading || !theme.trim() || !genre}
                className="px-6 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
                style={{ background: ACCENT }}>
                {loading ? '✍️ Writing...' : '✍️ Write Lyrics'}
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
          renderLabel={(item) => `${item.genre} · ${item.theme}`}
          accentColor={ACCENT}
        />

        {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mt-5">{err}</div>}

        {loading && (
          <div className="bg-white rounded-2xl border border-blue-100 p-6 mt-5 space-y-2">
            {[85, 60, 75, 40, 90, 55, 70].map((w, i) => (
              <div key={i} className="h-3 bg-blue-50 rounded-full animate-pulse" style={{ width: `${w}%` }} />
            ))}
          </div>
        )}

        {lyrics && (
          <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mt-5 animate-fade-up">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-black px-3 py-1 rounded-full text-white" style={{ background: ACCENT }}>{genre}</span>
                <span className="text-xs text-slate-400">AI-generated lyrics</span>
              </div>
              <div className="flex gap-2">
                <button onClick={copyLyrics}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-all font-medium">
                  {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button onClick={downloadLyrics}
                  className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-all font-medium">
                  <Download className="w-3.5 h-3.5" />Save
                </button>
              </div>
            </div>
            <div className="bg-blue-50/50 rounded-xl p-5 font-mono border border-blue-100">
              {renderLyrics(lyrics)}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  );
}
