import { Sparkles } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="mt-12 border-t border-slate-200/60 pt-6 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: '#f97316' }}>
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                    </div>
                    <span className="font-semibold text-slate-600">Ideas To Thought</span>
                </div>
                <span>© {new Date().getFullYear()} · Built With 💖</span>
            </div>
        </footer>
    );
}