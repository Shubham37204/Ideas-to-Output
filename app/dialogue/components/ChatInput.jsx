import { Send, Loader2, Square } from 'lucide-react';

export default function ChatInput({
    message,
    setMessage,
    onSubmit,
    onStop,
    isLoading
}) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSubmit(e);
        }
    };

    return (
        <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 min-h-0">
                <label className="block text-sm font-semibold text-slate-900 mb-2 flex-shrink-0">
                    Your Message
                </label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here... (Shift+Enter for new line, Enter to send)"
                    className="w-full h-full px-4 py-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed text-slate-900 placeholder:text-slate-400"
                    disabled={isLoading}
                    onKeyDown={handleKeyDown}
                />
            </div>

            <div className="flex gap-3 mt-4 flex-shrink-0">
                <button
                    onClick={onSubmit}
                    disabled={isLoading || !message.trim()}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            AI is thinking...
                        </>
                    ) : (
                        <>
                            <Send className="w-4 h-4" />
                            Send Message
                        </>
                    )}
                </button>

                <button
                    onClick={onStop}
                    className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="Stop generation"
                >
                    <Square className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}