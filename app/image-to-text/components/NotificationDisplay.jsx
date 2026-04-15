import React, { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function NotificationDisplay({ success }) {
    const [isVisible, setIsVisible] = useState(!!success);

    if (!success || !isVisible) return null;

    return (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3 animate-in fade-in duration-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-green-700 text-sm flex-1">{success}</span>
            <button
                onClick={() => setIsVisible(false)}
                className="text-green-500 hover:text-green-700 transition-colors flex-shrink-0"
                aria-label="Dismiss notification"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}