'use client';

import { useState } from 'react';
import { BookOpen } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import ErrorDisplay from '../shared/components/ErrorDisplay';
import TextOutput from '../shared/components/TextOutput';
import SummaryForm from './components/SummaryForm';

export default function SummaryPage() {
    const [topic, setTopic] = useState('');
    const [explanation, setExplanation] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!topic.trim()) {
            setError('Please enter a topic to explain');
            return;
        }

        setIsLoading(true);
        setError('');
        setExplanation('');

        try {
            const response = await fetch('/api/summary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ topic: topic.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to get explanation');
            }

            setExplanation(data.explanation);
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClear = () => {
        setTopic('');
        setExplanation('');
        setError('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <BackToOverviewButton />
            <div className="max-w-6xl mx-auto px-6 py-8">
                <PageHeader
                    icon={<BookOpen className="w-8 h-8 text-indigo-600" />}
                    title="Topic Explainer"
                    subtitle="Get clear explanations about any topic with AI"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-5 h-fit">
                        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                            Enter Your Topic
                        </h2>

                        <SummaryForm
                            topic={topic}
                            setTopic={setTopic}
                            onSubmit={handleSubmit}
                            onClear={handleClear}
                            loading={isLoading}
                        />

                        <ErrorDisplay error={error} />
                    </div>

                    {/* Output Section */}
                    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-3 flex flex-col min-h-96">
                        <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                            <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                            AI Explanation
                        </h2>

                        <div className="flex-1 min-h-0">
                            <TextOutput
                                content={explanation}
                                loading={isLoading}
                                loadingText="Generating explanation..."
                                emptyIcon={BookOpen}
                                emptyText="Your explanation will appear here"
                                emptySubtext='Enter any topic and click "Get Explanation"'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
