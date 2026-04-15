import ResultDisplay from './ResultDisplay';
import { Image as ImageIcon } from 'lucide-react';

export default function OutputPanel({
    originalImageUrl,
    processedImage,
    onImageError
}) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-green-100 rounded-lg">
                    <ImageIcon className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                    Result
                </h2>
            </div>

            <div className="min-h-64 border border-slate-200 rounded-lg p-4 bg-slate-50 overflow-auto">
                <ResultDisplay
                    originalImageUrl={originalImageUrl}
                    processedImage={processedImage}
                    onImageError={onImageError}
                />
            </div>
        </div>
    );
}
