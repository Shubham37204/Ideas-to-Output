import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

const BackBtn = () => {
    return (
        <nav className="bg-white/90 backdrop-blur-md border-b border-orange-100/60 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mr-2 group">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                        style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                </Link>

                {/* breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Link href="/" className="hover:text-orange-600 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/overview" className="hover:text-orange-600 transition-colors">Tools</Link>
                </div>

                <div className="flex-1" />

                <Link href="/overview"
                    className="inline-flex items-center gap-1.5 text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors px-3 py-1.5 rounded-xl hover:bg-orange-50">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Tools
                </Link>
            </div>
        </nav>
    );
};

export default BackBtn;