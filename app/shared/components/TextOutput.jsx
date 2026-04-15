import { Loader2, Copy, Download, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function TextOutput({
    content,
    loading,
    loadingText = "Generating...",
    emptyIcon: EmptyIcon,
    emptyText = "Your content will appear here",
    emptySubtext = "Click generate to start",
    showActions = false,
    onCopy,
    onDownload,
    className = ""
}) {
    const [copiedId, setCopiedId] = useState(null);

    const handleCopy = () => {
        if (onCopy) {
            onCopy();
            setCopiedId('copy');
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const handleDownload = () => {
        if (onDownload) {
            onDownload();
            setCopiedId('download');
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">{loadingText}</p>
                </div>
            </div>
        );
    }

    if (content) {
        return (
            <>
                {showActions && (
                    <div className="flex gap-2 mb-4">
                        {onCopy && (
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${copiedId === 'copy'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                {copiedId === 'copy' ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        Copy
                                    </>
                                )}
                            </button>
                        )}
                        {onDownload && (
                            <button
                                onClick={handleDownload}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${copiedId === 'download'
                                        ? 'bg-blue-100 text-blue-700'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                    }`}
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        )}
                    </div>
                )}
                <div className={`bg-slate-50 p-4 rounded-lg border border-slate-200 shadow-sm overflow-auto ${className}`}>
                    <pre className="whitespace-pre-wrap text-sm text-slate-900 font-mono">
                        {content}
                    </pre>
                </div>
            </>
        );
    }

    return (
        <div className="flex items-center justify-center h-full text-center">
            <div className="text-slate-500">
                {EmptyIcon && <EmptyIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />}
                <p className="font-medium">{emptyText}</p>
                {emptySubtext && <p className="text-sm mt-1 text-slate-400">{emptySubtext}</p>}
            </div>
        </div>
    );
}