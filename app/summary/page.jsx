'use client';

import { useState } from 'react';
import { BookOpen, Send, RotateCcw, Copy, Check } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import Footer from '../shared/components/Footer';

const ACCENT = '#0d9488'; // teal

const EXAMPLE_TOPICS = ['Quantum Computing', 'Black Holes', 'How CRISPR works', 'Stoicism', 'The Silk Road'];

export default function SummaryPage() {
    const [topic, setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!topic.trim()) { setError('Enter a topic first.'); return; }
        setIsLoading(true); setError(''); setExplanation('');
        try {
            const res = await fetch('/api/summary', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic: topic.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setExplanation(data.explanation);
        } catch (err) {
            setError(err.message || 'Something went wrong.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => { setTopic(''); setExplanation(''); setError(''); };

    const copyText = () => {
        navigator.clipboard.writeText(explanation);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen" style={{ background: '#f0fdfa' }}>
            <BackToOverviewButton />
            <div className="max-w-4xl mx-auto px-6 py-8">
                <PageHeader
                    icon={<BookOpen className="w-7 h-7" style={{ color: ACCENT }} />}
                    title="Topic Explainer"
                    subtitle="Ask about anything — science, history, tech, philosophy. Get a clear, well-structured explanation."
                    accentColor={ACCENT}
                />

                {/* Input */}
                <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6 mb-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-800 mb-2">What do you want to learn about?</label>
                            <div className="flex gap-2 flex-wrap mb-3">
                                {EXAMPLE_TOPICS.map(t => (
                                    <button key={t} type="button" onClick={() => setTopic(t)}
                                        className="px-2.5 py-1 text-xs font-medium text-teal-700 bg-teal-50 border border-teal-100 rounded-full hover:bg-teal-100 transition-all">
                                        {t}
                                    </button>
                                ))}
                            </div>
                            <input
                                type="text" value={topic} onChange={e => setTopic(e.target.value)}
                                placeholder='e.g. "How do mRNA vaccines work?"'
                                className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none transition-all placeholder:text-slate-300"
                                onFocus={e => e.target.style.borderColor = ACCENT}
                                onBlur={e => e.target.style.borderColor = ''}
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={handleClear}
                                className="p-2.5 text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                                <RotateCcw className="w-4 h-4" />
                            </button>
                            <button type="submit" disabled={isLoading || !topic.trim()}
                                className="flex items-center gap-2 px-6 py-2.5 text-sm font-bold text-white rounded-xl disabled:opacity-50 shadow-sm hover:shadow-md transition-all"
                                style={{ background: ACCENT }}>
                                <Send className="w-4 h-4" />
                                {isLoading ? 'Explaining...' : 'Explain This'}
                            </button>
                        </div>
                    </form>
                    {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mt-4">{error}</div>}
                </div>

                {/* Output */}
                {(isLoading || explanation) && (
                    <div className="bg-white rounded-2xl border border-teal-100 shadow-sm p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <BookOpen className="w-4 h-4" style={{ color: ACCENT }} />
                                Explanation
                            </h2>
                            {explanation && (
                                <button onClick={copyText}
                                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 transition-all">
                                    {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    {copied ? 'Copied' : 'Copy'}
                                </button>
                            )}
                        </div>

                        {isLoading ? (
                            <div className="space-y-2">
                                {[85, 70, 90, 60, 80, 50, 75].map((w, i) => (
                                    <div key={i} className="h-3 bg-teal-50 rounded-full animate-pulse" style={{ width: `${w}%` }} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-teal-50/50 rounded-xl p-5 border border-teal-100 max-h-[600px] overflow-y-auto animate-fade-up">
                                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">{explanation}</p>
                            </div>
                        )}
                    </div>
                )}
                <Footer />
            </div>
        </div>
    );
}
