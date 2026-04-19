import Link from 'next/link';
import { Sparkles, Home } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';

export default function Navbar() {
    return (
        <nav className="bg-white/90 backdrop-blur-md border-b border-orange-100/60 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform"
                            style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-slate-900 tracking-tight">Ideas To Thought</span>
                    </Link>

                    <div className="flex items-center gap-3">
                        <Link href="/"
                            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-orange-600 px-3 py-1.5 rounded-xl hover:bg-orange-50 transition-all font-medium">
                            <Home className="w-4 h-4" />
                            Home
                        </Link>
                        <SignedIn>
                            <UserButton />
                        </SignedIn>
                    </div>
                </div>
            </div>
        </nav>
    );
}
