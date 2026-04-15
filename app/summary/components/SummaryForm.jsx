import InputForm from '../../shared/components/InputForm';
import TextAreaInput from '../../shared/components/TextAreaInput';

export default function SummaryForm({
    topic,
    setTopic,
    onSubmit,
    onClear,
    loading
}) {
    return (
        <InputForm
            onSubmit={onSubmit}
            onClear={onClear}
            loading={loading}
            submitText="Get Explanation"
            submitDisabled={!topic.trim()}
        >
            <TextAreaInput
                label="Topic"
                description="Enter any topic you'd like an explanation for"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., quantum computing, photosynthesis, how to bake bread, the Renaissance, machine learning..."
                disabled={loading}
            />
        </InputForm>
    );
}