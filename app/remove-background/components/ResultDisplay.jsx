import { Image as ImageIcon, Loader2 } from 'lucide-react';

export default function ResultDisplay({
    originalImageUrl,
    processedImage,
    onImageError
}) {
    if (!originalImageUrl) {
        return (
            <div className="text-center text-slate-500 flex items-center justify-center min-h-64">
                <div>
                    <div className="p-3 bg-slate-100 rounded-lg inline-block mb-3">
                        <ImageIcon className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="font-medium">Processed image will appear here</p>
                    <p className="text-sm mt-1 text-slate-400">Upload an image and remove the background</p>
                </div>
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {processedImage ? (
                <div className="relative">
                    <div
                        className="absolute inset-0 opacity-20 rounded-lg"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='checkerboard' x='0' y='0' width='20' height='20' patternUnits='userSpaceOnUse'%3e%3crect x='0' y='0' width='10' height='10' fill='%23e5e7eb'/%3e%3crect x='10' y='10' width='10' height='10' fill='%23e5e7eb'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='20' height='20' fill='url(%23checkerboard)'/%3e%3c/svg%3e")`,
                            backgroundSize: '20px 20px'
                        }}
                    ></div>
                    <img
                        src={processedImage}
                        alt="Processed image with background removed"
                        className="relative max-w-full max-h-96 mx-auto rounded-lg shadow-md"
                        onError={onImageError}
                    />
                </div>
            ) : (
                <div className="text-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
                    <p className="text-slate-600 font-medium">Processing image...</p>
                </div>
            )}
        </div>
    );
}
