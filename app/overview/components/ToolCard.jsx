import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ToolCard({ tool, featured = false }) {
    return (
        <Link href={tool.href} className={featured ? 'col-span-2' : ''}>
            <div className={`card-lift group h-full bg-white rounded-2xl border border-orange-100/60 hover:border-orange-300/50 overflow-hidden transition-all shadow-sm hover:shadow-md ${featured ? 'p-8' : 'p-5'}`}>
                <div className={`flex ${featured ? 'flex-row items-center gap-8' : 'flex-col'}`}>
                    {/* Icon */}
                    <div
                        className={`${featured ? 'w-16 h-16 flex-shrink-0' : 'w-11 h-11 mb-4'} rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-110`}
                        style={{ background: tool.accentColor || '#f97316' }}
                    >
                        {tool.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            {tool.isNew && (
                                <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-full uppercase tracking-wide"
                                    style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                                    New
                                </span>
                            )}
                            {tool.model && (
                                <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                                    {tool.model}
                                </span>
                            )}
                        </div>

                        <h3 className={`font-bold text-slate-900 mb-1 ${featured ? 'text-2xl' : 'text-base'}`}>
                            {tool.title}
                        </h3>
                        <p className={`text-slate-500 leading-relaxed ${featured ? 'text-base' : 'text-sm'}`}>
                            {tool.description}
                        </p>

                        <div className="flex items-center gap-1.5 font-semibold mt-4 text-sm transition-all group-hover:gap-2.5"
                            style={{ color: '#f97316' }}>
                            Open tool
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
