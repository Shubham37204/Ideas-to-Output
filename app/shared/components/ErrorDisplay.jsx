import { AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

function ErrorDisplay({ error }) {
    const [isVisible, setIsVisible] = useState(true);

    if (!error || !isVisible) return null;

    return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 animate-in fade-in duration-200">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <p className="text-red-700 text-sm font-medium">Error</p>
                <p className="text-red-600 text-sm mt-1">{error}</p>
            </div>
            <button
                onClick={() => setIsVisible(false)}
                className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 hover:bg-red-100 p-1 rounded"
                aria-label="Dismiss error"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}

export default ErrorDisplay;

