import { Send, Loader2, RotateCcw } from 'lucide-react';

export default function InputForm({
    children,
    onSubmit,
    onClear,
    loading,
    submitText = "Generate",
    submitDisabled = false
}) {
    return (
        <form onSubmit={onSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="space-y-5 flex-1 min-h-0">
                {children}
            </div>

            <div className="flex gap-3 mt-6 flex-shrink-0">
                <button
                    type="submit"
                    disabled={loading || submitDisabled}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm hover:shadow-md"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{submitText}ing...</span>
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            <span>{submitText}</span>
                        </>
                    )}
                </button>

                <button
                    type="button"
                    onClick={onClear}
                    disabled={loading}
                    className="px-4 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-300 hover:border-slate-400"
                    aria-label="Clear form"
                    title="Clear all inputs"
                >
                    <RotateCcw className="w-4 h-4" />
                </button>
            </div>
        </form>
    );
}