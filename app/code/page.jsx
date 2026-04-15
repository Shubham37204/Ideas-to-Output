'use client';

import { useState } from 'react';
import { Code } from 'lucide-react';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import PageHeader from '../shared/components/PageHeader';
import ErrorDisplay from '../shared/components/ErrorDisplay';
import Footer from '../shared/components/Footer';
import CodeInput from './components/CodeInput';
import CodeOutput from './components/CodeOutput';

function CodePage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const generateCode = async ({ prompt, language }) => {
    setLoading(true);
    setErr('');
    setCode('');

    console.log('generating code:', prompt, language);

    try {
      const response = await fetch('/api/code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, language }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'code generation failed');
      }

      setCode(data.code);
    } catch (error) {
      setErr(error.message || 'something went wrong');
    } finally {
      setLoading(false);
    }
  };

  function clearAll() {
    setCode('');
    setErr('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <BackToOverviewButton />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <PageHeader
          icon={<Code className="w-8 h-8 text-blue-600" />}
          title="Code Helper"
          subtitle="Generate, fix, and improve code with AI assistance"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-5 h-fit">
            <CodeInput
              onSubmit={generateCode}
              onClear={clearAll}
              isLoading={loading}
            />

            <ErrorDisplay error={err} />
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 space-y-3 flex flex-col min-h-96">
            <h2 className="font-semibold text-slate-900 flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              Generated Code
            </h2>

            <div className="flex-1 min-h-0">
              <CodeOutput
                generatedCode={code}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default CodePage;
