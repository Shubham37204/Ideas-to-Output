import { Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 border-t border-slate-200 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Brand Section */}
                    <div className="space-y-1">
                        <h3 className="font-bold text-slate-900">Your-Prompts</h3>
                        <p className="text-sm text-slate-600">AI-powered content creation made simple</p>
                    </div>

                    {/* Center Info */}
                    <div className="text-center">
                        <p className="text-xs text-slate-600">
                            Powered by AI • Built with Next.js & Convex
                        </p>
                    </div>

                    {/* Copyright */}
                    <div className="text-sm text-slate-600 flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> © {currentYear}
                    </div>
                </div>
            </div>
        </footer>
    );
}