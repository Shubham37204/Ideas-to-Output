'use client';
import { useState } from 'react';
import { Clock, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';

/**
 * HistoryPanel — reusable history sidebar/section for any tool page.
 * Props:
 *  - history: array of items from useLocalHistory
 *  - onSelect: (item) => void — called when user clicks a history item
 *  - onDelete: (id) => void
 *  - onClear: () => void
 *  - renderLabel: (item) => string — short label to show in the list
 *  - accentColor: hex string
 */
export default function HistoryPanel({ history, onSelect, onDelete, onClear, renderLabel, accentColor = '#f97316' }) {
    const [open, setOpen] = useState(false);

    if (history.length === 0) return null;

    return (
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white overflow-hidden">
            {/* Header toggle */}
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-slate-50 transition-colors text-left"
            >
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700">Recent History</span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">{history.length}</span>
                </div>
                <div className="flex items-center gap-2">
                    {open && (
                        <button onClick={(e) => { e.stopPropagation(); onClear(); }}
                            className="text-xs text-red-400 hover:text-red-600 font-medium transition-colors px-2 py-1 rounded hover:bg-red-50">
                            Clear all
                        </button>
                    )}
                    {open ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                </div>
            </button>

            {/* List */}
            {open && (
                <div className="border-t border-slate-100 divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    {history.map((item) => (
                        <div key={item.id}
                            className="flex items-start justify-between gap-3 px-5 py-3 hover:bg-slate-50 transition-colors group">
                            <button
                                onClick={() => onSelect(item)}
                                className="flex-1 text-left min-w-0"
                            >
                                <p className="text-sm text-slate-700 truncate font-medium group-hover:text-slate-900 transition-colors"
                                    style={{ color: accentColor }}>
                                    {renderLabel(item)}
                                </p>
                                <p className="text-xs text-slate-400 mt-0.5">{item.savedAt}</p>
                            </button>
                            <button
                                onClick={() => onDelete(item.id)}
                                className="flex-shrink-0 p-1.5 rounded-lg text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100"
                                title="Delete"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
