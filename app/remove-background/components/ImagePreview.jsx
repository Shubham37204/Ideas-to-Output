import { Image as ImageIcon } from 'lucide-react';

export default function ImagePreview({ previewUrl }) {
    if (!previewUrl) return null;

    return (
        <div className="mb-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Preview
            </h3>
            <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                <img
                    src={previewUrl}
                    alt="Selected image"
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
                />
            </div>
        </div>
    );
}
