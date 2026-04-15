import { Send, Loader2, RotateCcw } from 'lucide-react';

export default function ImageForm({
    prompt,
    setPrompt,
    imageType,
    setImageType,
    onGenerate,
    onClear,
    loading
}) {
    const minChars = 10;
    const charCount = prompt.length;
    const isValid = charCount >= minChars;

    return (
        <div className="space-y-5 flex-1 min-h-0">
            <div className="flex-shrink-0">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Image Style
                </label>
                <select
                    value={imageType}
                    onChange={(e) => setImageType(e.target.value)}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    <option value="normal">Regular Style</option>
                    <option value="ghibli">Studio Ghibli Style</option>
                </select>
            </div>

            <div className="flex-1 min-h-0">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Image Description
                </label>
                <p className="text-xs text-slate-500 mb-2">At least {minChars} characters required</p>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={imageType === 'ghibli'
                        ? "A peaceful forest with magical creatures..."
                        : "A beautiful sunset over mountains..."
                    }
                    className="w-full h-full px-4 py-3 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                />
                <div className={`text-right text-xs mt-2 flex-shrink-0 ${charCount < minChars ? 'text-orange-600 font-medium' : 'text-slate-500'
                    }`}>
                    {charCount}/{minChars} characters
                </div>
            </div>

            <div className="flex gap-3 flex-shrink-0">
                <button
                    onClick={onGenerate}
                    disabled={loading || !isValid}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Generate Image
                        </>
                    )}
                </button>

                <button
                    onClick={onClear}
                    disabled={loading}
                    className="px-4 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-300"
                    aria-label="Clear form"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
