'use client';

import React, { useState } from 'react';
import { PenTool, BookOpen, Copy, Check, Download } from 'lucide-react';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import PageHeader from '../shared/components/PageHeader';
import Footer from '../shared/components/Footer';
import HistoryPanel from '../shared/components/HistoryPanel';
import { useLocalHistory } from '../shared/hooks/useLocalHistory';

const ACCENT = '#b45309'; // warm amber-brown
const GENRES = ['Adventure', 'Romance', 'Mystery', 'Horror', 'Sci-Fi', 'Fantasy', 'Drama', 'Comedy', 'Thriller'];

function StoryPage() {
  const [storyIdea, setStoryIdea] = useState('');
  const [genre, setGenre] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');
  const [copied, setCopied] = useState(false);
  const { history, addToHistory, deleteFromHistory, clearHistory } = useLocalHistory('history_story');

  const createStory = async (e) => {
    e.preventDefault();
    if (!storyIdea.trim()) { setErr('Give me something to work with!'); return; }
    setErr(''); setGeneratedStory(''); setIsLoading(true);
    try {
      const res = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: genre ? `[${genre}] ${storyIdea.trim()}` : storyIdea.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setGeneratedStory(data.story);
      addToHistory({ prompt: storyIdea, genre, story: data.story });
    } catch (error) {
      setErr(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    setStoryIdea(item.prompt);
    setGenre(item.genre || '');
    setGeneratedStory(item.story);
    setErr('');
  };

  const copyStory = () => {
    navigator.clipboard.writeText(generatedStory);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadStory = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([generatedStory], { type: 'text/plain' }));
    a.download = `story-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className="min-h-screen" style={{ background: '#fdf8f0' }}>
      <BackToOverviewButton />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <PageHeader
          icon={<PenTool className="w-7 h-7" style={{ color: ACCENT }} />}
          title="Story Maker"
          subtitle="Drop one sentence of an idea — AI turns it into a compelling short story."
          accentColor={ACCENT}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left — Input */}
          <div className="lg:col-span-2 space-y-5">
            <form onSubmit={createStory} className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 space-y-4">
              {/* Genre pills */}
              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Genre (optional)</label>
                <div className="flex flex-wrap gap-1.5">
                  {GENRES.map(g => (
                    <button key={g} type="button" onClick={() => setGenre(genre === g ? '' : g)}
                      className="px-2.5 py-1 text-xs font-semibold rounded-full border transition-all"
                      style={genre === g
                        ? { background: ACCENT, color: '#fff', borderColor: ACCENT }
                        : { color: '#78716c', borderColor: '#e5e7eb' }
                      }>
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 mb-2">Your Story Idea</label>
                <textarea value={storyIdea} onChange={e => setStoryIdea(e.target.value)} rows={5}
                  placeholder='e.g. "A detective who can only solve crimes by dreaming about them"'
                  className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl resize-none focus:outline-none transition-all placeholder:text-slate-300"
                  onFocus={e => e.target.style.borderColor = ACCENT}
                  onBlur={e => e.target.style.borderColor = ''} />
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => { setStoryIdea(''); setGenre(''); setGeneratedStory(''); setErr(''); }}
                  className="px-3 py-2.5 text-sm text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium transition-all">
                  Clear
                </button>
                <button type="submit" disabled={isLoading || !storyIdea.trim()}
                  className="flex-1 py-2.5 text-sm font-bold text-white rounded-xl transition-all disabled:opacity-50 shadow-sm hover:shadow-md"
                  style={{ background: ACCENT }}>
                  {isLoading ? 'Writing...' : '📖 Create Story'}
                </button>
              </div>
            </form>

            {err && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">{err}</div>}

            {/* History */}
            <HistoryPanel
              history={history}
              onSelect={loadFromHistory}
              onDelete={deleteFromHistory}
              onClear={clearHistory}
              renderLabel={(item) => `${item.genre ? `[${item.genre}] ` : ''}${item.prompt}`}
              accentColor={ACCENT}
            />
          </div>

          {/* Right — Output */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-6 min-h-96">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" style={{ color: ACCENT }} />
                  Your Story
                </h2>
                {generatedStory && (
                  <div className="flex gap-2">
                    <button onClick={copyStory}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-all">
                      {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button onClick={downloadStory}
                      className="flex items-center gap-1 text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-all">
                      <Download className="w-3.5 h-3.5" />Save
                    </button>
                  </div>
                )}
              </div>

              {isLoading ? (
                <div className="space-y-2 pt-4">
                  {[90, 75, 85, 60, 80, 70, 90, 65].map((w, i) => (
                    <div key={i} className="h-3 bg-amber-50 rounded-full animate-pulse" style={{ width: `${w}%` }} />
                  ))}
                </div>
              ) : generatedStory ? (
                <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100 max-h-[600px] overflow-y-auto">
                  <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{generatedStory}</p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-slate-400">
                  <BookOpen className="w-12 h-12 mb-3 opacity-20" />
                  <p className="font-medium text-sm">Your story will appear here</p>
                  <p className="text-xs mt-1">Give me an idea and hit Create Story</p>
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

export default StoryPage;