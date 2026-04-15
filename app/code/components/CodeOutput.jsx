import { Code, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function CodeOutput({ generatedCode, isLoading }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (generatedCode) {
            navigator.clipboard.writeText(generatedCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">Generating code...</p>
                </div>
            </div>
        );
    }

    if (generatedCode) {
        return (
            <div className="space-y-3">
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${copied
                            ? 'bg-green-100 text-green-700'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                >
                    {copied ? (
                        <>
                            <CheckCircle2 className="w-4 h-4" />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy className="w-4 h-4" />
                            Copy Code
                        </>
                    )}
                </button>
                <div className="bg-slate-900 text-slate-50 p-4 rounded-lg font-mono text-sm overflow-auto border border-slate-700">
                    <pre className="whitespace-pre-wrap break-words">{generatedCode}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center h-full text-center">
            <div className="text-slate-500">
                <div className="p-3 bg-slate-100 rounded-lg inline-block mb-3">
                    <Code className="w-8 h-8" />
                </div>
                <p className="font-medium">Your generated code will appear here</p>
                <p className="text-sm mt-1 text-slate-400">Write a description and select a language to generate code</p>
            </div>
        </div>
    );
}
