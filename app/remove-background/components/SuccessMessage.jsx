import { CheckCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function SuccessMessage({ message }) {
    const [isVisible, setIsVisible] = useState(!!message);

    if (!message || !isVisible) return null;

    return (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-in fade-in duration-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-green-700 text-sm flex-1 font-medium">{message}</span>
            <button
                onClick={() => setIsVisible(false)}
                className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0"
                aria-label="Dismiss message"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}