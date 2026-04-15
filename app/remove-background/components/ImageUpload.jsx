import { Upload } from 'lucide-react';

export default function ImageUpload({ onImageSelect, selectedImage }) {
    return (
        <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-900 mb-2">
                Upload Image
            </label>
            <div className="relative">
                <input
                    id="imageInput"
                    type="file"
                    accept="image/*"
                    onChange={onImageSelect}
                    className="hidden"
                />
                <label
                    htmlFor="imageInput"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <Upload className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-700">Select image to process</span>
                        <span className="text-xs text-slate-500">PNG, JPG up to 10MB</span>
                    </div>
                </label>
            </div>
        </div>
    );
}
