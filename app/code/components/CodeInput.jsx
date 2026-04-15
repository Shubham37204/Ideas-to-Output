import { useState } from 'react';
import { Send, Loader2, Code2, RotateCcw } from 'lucide-react';
import { PROGRAMMING_LANGUAGES } from '../constants/languages';

function CodeInput({ onSubmit, onClear, isLoading }) {
    const [prompt, setPrompt] = useState('');
    const [lang, setLang] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!prompt.trim() || !lang) return;
        onSubmit({ prompt: prompt.trim(), language: lang });
    };

    function clearForm() {
        setPrompt('');
        setLang('');
        onClear();
    }

    return (
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="space-y-5 flex-1 min-h-0">
                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2 flex-shrink-0">
                        Programming Language
                    </label>
                    <div className="relative">
                        <Code2 className="absolute left-3 top-3.5 w-4 h-4 text-slate-400 pointer-events-none" />
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg appearance-none bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={isLoading}
                            required
                        >
                            <option value="">Choose a language...</option>
                            {PROGRAMMING_LANGUAGES.map((language) => (
                                <option key={language.value} value={language.value}>
                                    {language.label}
                                </option>
                            ))}
                        </select>
                        <div className="absolute right-3 top-3.5 pointer-events-none">
                            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2 flex-shrink-0">
                        Code Description
                    </label>
                    <p className="text-xs text-slate-500 mb-2">Describe what code you want to generate</p>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g., create a function that sorts numbers, fix my React hook, implement a hash table..."
                        className="w-full h-32 px-4 py-3 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        required
                    />
                </div>
            </div>

            <div className="flex gap-3 mt-6 flex-shrink-0">
                <button
                    type="submit"
                    disabled={isLoading || !prompt.trim() || !lang}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Generate Code
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={clearForm}
                    disabled={isLoading}
                    className="px-4 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-300"
                    aria-label="Clear form"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
}

export default CodeInput;