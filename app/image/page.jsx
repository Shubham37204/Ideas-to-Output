'use client';
import { useState } from 'react';
import { Palette } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import ErrorDisplay from '../shared/components/ErrorDisplay';
import Footer from '../shared/components/Footer';
import ImageForm from './components/ImageForm';
import ImageOutput from './components/ImageOutput';

const ImageGen = () => {
  const [prompt, setPrompt] = useState('');
  const [imgType, setImgType] = useState('normal');
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const makeImage = async () => {
    if (!prompt.trim()) {
      setErr('need a description');
      return;
    }

    if (prompt.length < 10) {
      setErr('need more details (at least 10 chars)');
      return;
    }

    setIsLoading(true);
    setErr('');
    setImg(null);

    console.log('making image:', prompt);

    try {
      const response = await fetch('/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          type: imgType
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 503) {
          setErr('model is sleeping, try again in a bit');
        } else if (response.status === 429) {
          setErr('too many requests, wait a minute');
        } else if (response.status === 401) {
          setErr('api key issue - check environment');
        } else {
          setErr(data.error || 'image thing broke again');
        }
        return;
      }

      if (data.image) {
        setImg(data.image);
      } else {
        setErr('no image came back, try again');
      }
    } catch (error) {
      console.error('image generation error:', error);
      setErr('network error or something');
    } finally {
      setIsLoading(false);
    }
  };

  const saveImage = () => {
    if (!img) return;
    const link = document.createElement('a');
    link.href = img;
    link.download = `my-image-${Date.now()}.png`;
    link.click();
  };

  function clearAll() {
    setPrompt('');
    setImg(null);
    setErr('');
    setImgType('normal');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <BackToOverviewButton />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          icon={<Palette className="w-8 h-8 text-purple-600" />}
          title="AI Image Generator"
          subtitle="Create stunning images from text descriptions"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-5 h-fit">
            <ImageForm
              prompt={prompt}
              setPrompt={setPrompt}
              imageType={imgType}
              setImageType={setImgType}
              onGenerate={makeImage}
              onClear={clearAll}
              loading={isLoading}
            />

            <ErrorDisplay error={err} />
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-3 flex flex-col min-h-96">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              Generated Image
            </h2>

            <div className="flex-1 min-h-0 flex items-center justify-center">
              <ImageOutput
                generatedImage={img}
                loading={isLoading}
                onDownload={saveImage}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ImageGen;
