import { Image as ImageIcon, Loader2, Download, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

export default function ImageOutput({ generatedImage, loading, onDownload }) {
    const [downloaded, setDownloaded] = useState(false);

    const handleDownload = () => {
        if (onDownload) {
            onDownload();
            setDownloaded(true);
            setTimeout(() => setDownloaded(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">Creating your image...</p>
                    <p className="text-sm text-slate-500 mt-1">This may take 30-60 seconds</p>
                </div>
            </div>
        );
    }

    if (generatedImage) {
        return (
            <>
                <div className="flex justify-end mb-4">
                    <button
                        onClick={handleDownload}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm transition-all ${downloaded
                                ? 'bg-green-100 text-green-700'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                    >
                        {downloaded ? (
                            <>
                                <CheckCircle2 className="w-4 h-4" />
                                Downloaded
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4" />
                                Download
                            </>
                        )}
                    </button>
                </div>
                <div className="text-center">
                    <img
                        src={generatedImage}
                        alt="Generated artwork"
                        className="max-w-full max-h-80 rounded-lg shadow-md mx-auto border border-slate-200"
                    />
                </div>
            </>
        );
    }

    return (
        <div className="flex items-center justify-center h-full text-center">
            <div className="text-slate-500">
                <div className="p-3 bg-slate-100 rounded-lg inline-block mb-3">
                    <ImageIcon className="w-8 h-8" />
                </div>
                <p className="font-medium">Your generated image will appear here</p>
                <p className="text-sm mt-1 text-slate-400">Describe what you want to create</p>
            </div>
        </div>
    );
}
