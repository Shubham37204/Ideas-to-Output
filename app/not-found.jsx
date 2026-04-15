'use client';
import Link from 'next/link';
import { Home, Sparkles } from 'lucide-react';
import Footer from './shared/components/Footer';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-md mx-auto text-center px-4 space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex p-4 bg-slate-100 rounded-full">
                            <Sparkles className="w-12 h-12 text-slate-400" />
                        </div>
                        <h1 className="text-7xl font-bold text-slate-900 tracking-tight">404</h1>
                        <h2 className="text-2xl font-bold text-slate-900">Page Not Found</h2>
                        <p className="text-slate-600 text-base">Sorry, the page you're looking for doesn't exist or has been moved.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>
                        <Link
                            href="/overview"
                            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium px-6 py-3 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-slate-300"
                        >
                            Explore Tools
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}