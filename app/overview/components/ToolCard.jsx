import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ToolCard({ tool }) {
    return (
        <Link href={tool.href}>
            <div className="group h-full bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all hover:shadow-lg hover:-translate-y-1 duration-300 overflow-hidden">
                <div className="p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-4">
                        <div className={`w-12 h-12 ${tool.color} rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                            {tool.icon}
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 flex-1">
                        {tool.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                        {tool.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                        <span>Open Tool</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}
