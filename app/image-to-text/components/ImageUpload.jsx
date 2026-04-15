import React from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ onImageSelect, selectedImage, previewUrl, loading }) {
    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            onImageSelect(file);
        }
    };

    return (
        <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-lg p-8 text-center transition-colors cursor-pointer group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                    disabled={loading}
                />
                <label htmlFor="image-upload" className="cursor-pointer block">
                    <div className="flex justify-center mb-3">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                            <Upload className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <p className="text-slate-900 font-semibold mb-1">Click to upload image</p>
                    <p className="text-sm text-slate-500">PNG, JPG up to 10MB</p>
                </label>
            </div>

            {previewUrl && (
                <div className="mt-4 space-y-2">
                    <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                        <ImageIcon className="w-4 h-4" />
                        Preview
                    </p>
                    <div className="relative bg-slate-50 rounded-lg border border-slate-200 p-2 overflow-hidden">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-48 object-contain"
                        />
                    </div>
                    <p className="text-xs text-slate-500">{selectedImage?.name}</p>
                </div>
            )}
        </div>
    );
}
