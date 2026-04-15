'use client';

import { useState } from 'react';
import { Wand2 } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import Footer from '../shared/components/Footer';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';
import SuccessMessage from './components/SuccessMessage';

export default function BackgroundRemover() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [processedImage, setProcessedImage] = useState('');
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageSelect = (event) => {
    const file = event.target.files[0];

    setErrorMessage('');
    setSuccessMessage('');
    setProcessedImage('');
    setOriginalImageUrl('');

    if (!file) {
      setSelectedImage(null);
      setPreviewUrl('');
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage('Image too large. Please select an image under 10MB.');
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeBackground = async () => {
    if (!selectedImage) {
      setErrorMessage('Please select an image first.');
      return;
    }

    setIsProcessing(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const response = await fetch('/api/remove-background', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to remove background');
      }

      if (result.success && result.imageUrl) {
        console.log('Setting processed image:', result.imageUrl);
        console.log('Original image URL:', result.originalUrl);
        console.log('Debug info:', result.debug);
        setProcessedImage(result.imageUrl);
        setOriginalImageUrl(result.originalUrl);
        setSuccessMessage('Background removed successfully!');
      } else {
        throw new Error('Invalid response from server');
      }

    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    setProcessedImage('');
    setOriginalImageUrl('');
    setErrorMessage('');
    setSuccessMessage('');
    const fileInput = document.getElementById('imageInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <BackToOverviewButton />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          icon={<Wand2 className="w-8 h-8 text-blue-600" />}
          title="Background Remover"
          subtitle="Remove backgrounds from images using AI"
        />

        <div className="grid md:grid-cols-2 gap-8">
          <InputPanel
            onImageSelect={handleImageSelect}
            selectedImage={selectedImage}
            previewUrl={previewUrl}
            onRemoveBackground={removeBackground}
            onReset={resetAll}
            isProcessing={isProcessing}
            errorMessage={errorMessage}
          />

          <OutputPanel
            originalImageUrl={originalImageUrl}
            processedImage={processedImage}
            onImageError={(e) => {
              console.error('Image failed to load:', originalImageUrl);
              console.error('Image error event:', e);
              setErrorMessage('Failed to load original image. The image URL might be invalid.');
              setOriginalImageUrl('');
            }}
          />
        </div>
        <SuccessMessage message={successMessage} />
      </div>
      <Footer />
    </div>
  );
}
