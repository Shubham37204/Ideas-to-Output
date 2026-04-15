'use client';

import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import ErrorDisplay from '../shared/components/ErrorDisplay';
import Footer from '../shared/components/Footer';
import ImageUpload from './components/ImageUpload';
import TextExtractorActions from './components/TextExtractorActions';
import ExtractedTextDisplay from './components/ExtractedTextDisplay';
import NotificationDisplay from './components/NotificationDisplay';

export default function ImageToText() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [metadata, setMetadata] = useState(null);

    const handleImageSelect = (file) => {
        setSelectedImage(file);
        setPreviewUrl(URL.createObjectURL(file));
        setExtractedText('');
        setError('');
        setSuccess('');
        setMetadata(null);
    };

    const handleExtractText = async () => {
        if (!selectedImage) {
            setError('Please select an image first');
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const response = await fetch('/api/image-to-text', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                setExtractedText(data.text);
                setMetadata(data.metadata);
                setSuccess('Text extracted successfully!');
            } else {
                setError(data.error || 'Failed to extract text');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSelectedImage(null);
        setPreviewUrl('');
        setExtractedText('');
        setError('');
        setSuccess('');
        setMetadata(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <BackToOverviewButton />
            <div className="max-w-6xl mx-auto p-6">
                <PageHeader
                    icon={<FileText className="w-8 h-8 text-indigo-600" />}
                    title="Image-To-Text"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded p-6 border">
                        <h2 className="font-medium mb-4">
                            Upload an Image
                        </h2>

                        <ImageUpload
                            onImageSelect={handleImageSelect}
                            selectedImage={selectedImage}
                            previewUrl={previewUrl}
                            loading={loading}
                        />

                        <TextExtractorActions
                            onExtractText={handleExtractText}
                            onReset={handleReset}
                            selectedImage={selectedImage}
                            loading={loading}
                        />

                        <ErrorDisplay error={error} />
                        <NotificationDisplay success={success} />
                    </div>

                    <div className="bg-white rounded p-6 border">
                        <h2 className="font-medium mb-4">
                            Extracted Text will shown here
                        </h2>

                        <div className="bg-gray-50 rounded p-4 max-h-96 overflow-y-auto">
                            <ExtractedTextDisplay
                                extractedText={extractedText}
                                metadata={metadata}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
