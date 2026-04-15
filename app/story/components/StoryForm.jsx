import InputForm from '../../shared/components/InputForm';

export default function StoryForm({
    prompt,
    setPrompt,
    onSubmit,
    onClear,
    loading
}) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && !loading) {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <InputForm
            onSubmit={(e) => { e.preventDefault(); onSubmit(); }}
            onClear={onClear}
            loading={loading}
            submitText="Generate Story"
            submitDisabled={!prompt.trim()}
        >
            <div className="flex-1 min-h-0">
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Story Idea
                </label>
                <p className="text-xs text-slate-500 mb-2">Describe the story you want to generate</p>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Example: A magical forest where animals can talk, A detective solving a mystery in a small town, A space explorer discovering a new planet..."
                    className="w-full h-full px-4 py-3 text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                />
            </div>
        </InputForm>
    );
}
