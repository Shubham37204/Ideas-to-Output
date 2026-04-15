import ToolCard from './ToolCard';

export default function ToolsGrid({ tools }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-max">
            {tools.map((tool, index) => (
                <ToolCard key={index} tool={tool} />
            ))}
        </div>
    );
}
