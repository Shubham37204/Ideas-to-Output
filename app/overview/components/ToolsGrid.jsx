import ToolCard from './ToolCard';

export default function ToolsGrid({ tools, searchQuery = '' }) {
    const filtered = tools.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filtered.length === 0) {
        return (
            <div className="text-center py-16 text-slate-400">
                <p className="text-lg font-semibold">No tools match &quot;{searchQuery}&quot;</p>
                <p className="text-sm mt-1">Try searching for something else</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((tool, index) => (
                <ToolCard
                    key={tool.href}
                    tool={tool}
                    featured={index === 0 && !searchQuery}
                />
            ))}
        </div>
    );
}
