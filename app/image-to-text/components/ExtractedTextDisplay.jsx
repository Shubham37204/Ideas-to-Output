import React from 'react';
import { FileText } from 'lucide-react';

export default function ExtractedTextDisplay({
    extractedText,
    metadata,
}) {
    if (!extractedText) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                <div className="p-3 bg-slate-100 rounded-lg mb-3">
                    <FileText className="w-8 h-8" />
                </div>
                <p className="font-medium">No text extracted yet</p>
                <p className="text-sm mt-1">Upload an image and extract text to see it here</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <div className="bg-slate-50 rounded-lg p-4 min-h-[200px] border border-slate-200 overflow-auto">
                <p className="text-slate-800 whitespace-pre-wrap text-sm leading-relaxed">{extractedText}</p>
            </div>
            {metadata && (
                <div className="text-xs text-slate-500 space-y-1">
                    {metadata.wordCount && <p>Word count: {metadata.wordCount}</p>}
                    {metadata.charCount && <p>Character count: {metadata.charCount}</p>}
                </div>
            )}
        </div>
    );
}
