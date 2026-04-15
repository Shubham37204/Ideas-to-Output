'use client';

import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import ErrorDisplay from '../shared/components/ErrorDisplay';
import Footer from '../shared/components/Footer';
import TextOutput from '../shared/components/TextOutput';
import StoryForm from './components/StoryForm';

function StoryPage() {
  const [storyIdea, setStoryIdea] = useState('');
  const [generatedStory, setGeneratedStory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  const createStory = async () => {
    if (!storyIdea.trim()) {
      setErr('need an idea to work with');
      return;
    }

    setErr('');
    setGeneratedStory('');
    setIsLoading(true);

    console.log('generating story for:', storyIdea);

    try {
      const response = await fetch('/api/story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: storyIdea.trim() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'story generation failed');
      }

      setGeneratedStory(data.story);
    } catch (error) {
      setErr(error.message || 'something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  function clearEverything() {
    setStoryIdea('');
    setGeneratedStory('');
    setErr('');
  }

  const copyStory = () => {
    navigator.clipboard.writeText(generatedStory);
    alert('Story copied!');
  };

  const downloadStory = () => {
    if (!generatedStory) return;

    const link = document.createElement('a');
    const file = new Blob([generatedStory], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = `my-story-${Date.now()}.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BackToOverviewButton />
      <div className="max-w-6xl mx-auto p-6">
        <PageHeader
          icon={<BookOpen className="w-8 h-8 text-indigo-600" />}
          title="Story Maker"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6 border">
            <h2 className="font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
              Story Idea
            </h2>

            <StoryForm
              prompt={storyIdea}
              setPrompt={setStoryIdea}
              onSubmit={createStory}
              onClear={clearEverything}
              loading={isLoading}
            />

            <ErrorDisplay error={err} />
          </div>

          <div className="bg-white rounded-lg shadow p-6 border">
            <h2 className="font-medium mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Your Story
            </h2>

            <div className="bg-gray-50 rounded p-4 max-h-96 overflow-y-auto">
              <TextOutput
                content={generatedStory}
                loading={isLoading}
                loadingText="Writing your story..."
                emptyIcon={BookOpen}
                emptyText="Your story will show up here"
                emptySubtext='Enter an idea and hit "Create Story"'
                showActions={!!generatedStory}
                onCopy={copyStory}
                onDownload={downloadStory}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StoryPage;