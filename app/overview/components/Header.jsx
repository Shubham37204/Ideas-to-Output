'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function Header({ onSearch }) {
    const [q, setQ] = useState('');

    const handleChange = (e) => {
        setQ(e.target.value);
        onSearch?.(e.target.value);
    };

    return (
        <div className="mb-10">
            <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: '#f97316' }}>AI Toolkit</p>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 leading-tight">
                        What do you want to{' '}
                        <span style={{
                            background: 'linear-gradient(135deg, #f97316, #eab308)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text'
                        }}>
                            build today?
                        </span>
                    </h1>
                    <p className="text-slate-500 mt-2 text-sm">
                        Pick a tool, drop a prompt, get results.
                    </p>
                </div>

                <div className="relative flex-shrink-0 w-full sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        value={q}
                        onChange={handleChange}
                        placeholder="Search tools..."
                        className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none transition-all placeholder:text-slate-400"
                        onFocus={e => { e.target.style.borderColor = '#f97316'; e.target.style.boxShadow = '0 0 0 3px rgba(249,115,22,0.1)'; }}
                        onBlur={e => { e.target.style.borderColor = ''; e.target.style.boxShadow = ''; }}
                    />
                </div>
            </div>
        </div>
    );
}