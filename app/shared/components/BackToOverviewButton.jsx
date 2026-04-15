import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const BackBtn = () => {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 py-3">
                <Link
                    href="/overview"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-100"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Tools
                </Link>
            </div>
        </nav>
    );
}

export default BackBtn;