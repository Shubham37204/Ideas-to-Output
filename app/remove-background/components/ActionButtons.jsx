import { Loader2, RotateCcw, Wand2 } from 'lucide-react';

export default function ActionButtons({
    onRemoveBackground,
    onReset,
    selectedImage,
    isProcessing
}) {
    return (
        <div className="flex gap-3">
            <button
                onClick={onRemoveBackground}
                disabled={!selectedImage || isProcessing}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                {isProcessing ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                    </>
                ) : (
                    <>
                        <Wand2 className="w-4 h-4" />
                        Remove Background
                    </>
                )}
            </button>

            <button
                onClick={onReset}
                disabled={isProcessing}
                className="px-4 py-3 border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-slate-300"
                aria-label="Reset"
            >
                <RotateCcw className="w-4 h-4" />
            </button>
        </div>
    );
}
