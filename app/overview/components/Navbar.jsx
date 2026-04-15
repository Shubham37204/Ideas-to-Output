import Link from 'next/link';
import { Sparkles, Home } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-slate-900">Your-Prompts</h1>
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-slate-700 hover:text-slate-900 px-3 py-2 rounded-lg hover:bg-slate-100 transition-all font-medium"
                    >
                        <Home className="w-4 h-4" />
                        Home
                    </Link>
                </div>
            </div>
        </nav>
    );
}
