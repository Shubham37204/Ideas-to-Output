import ImageUpload from './ImageUpload';
import ImagePreview from './ImagePreview';
import ActionButtons from './ActionButtons';
import ErrorDisplay from '../../shared/components/ErrorDisplay';
import { Upload } from 'lucide-react';

export default function InputPanel({
    onImageSelect,
    selectedImage,
    previewUrl,
    onRemoveBackground,
    onReset,
    isProcessing,
    errorMessage
}) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-5">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                    <Upload className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-slate-900">
                    Upload Image
                </h2>
            </div>

            <ImageUpload
                onImageSelect={onImageSelect}
                selectedImage={selectedImage}
            />

            <ImagePreview previewUrl={previewUrl} />

            <ActionButtons
                onRemoveBackground={onRemoveBackground}
                onReset={onReset}
                selectedImage={selectedImage}
                isProcessing={isProcessing}
            />

            <ErrorDisplay error={errorMessage} />
        </div>
    );
}
