import React from 'react';
import { Loader2, RotateCcw, Zap } from 'lucide-react';

export default function TextExtractorActions({
    onExtractText,
    onReset,
    selectedImage,
    loading
}) {
    return (
        <div className="flex gap-3 mt-6">
            <button
                onClick={onExtractText}
                disabled={!selectedImage || loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {loading ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Extracting...
                    </>
                ) : (
                    <>
                        <Zap className="w-4 h-4" />
                        Extract Text
                    </>
                )}
            </button>
            <button
                onClick={onReset}
                disabled={loading}
                className="px-4 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Reset form"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
        </div>
    );
}
