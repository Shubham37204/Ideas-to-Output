import { MessageCircle, Loader2 } from 'lucide-react';

export default function ConversationDisplay({
    isConversationActive,
    conversation,
    isLoading
}) {
    if (!isConversationActive) {
        return (
            <div className="flex items-center justify-center h-full text-center">
                <div className="text-slate-500">
                    <div className="p-3 bg-slate-100 rounded-lg inline-block mb-3">
                        <MessageCircle className="w-8 h-8" />
                    </div>
                    <p className="font-medium">Ready to chat!</p>
                    <p className="text-sm mt-1 text-slate-400">Setup a conversation to begin chatting</p>
                </div>
            </div>
        );
    }

    if (conversation.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-center">
                <div className="text-slate-500">
                    <div className="p-3 bg-slate-100 rounded-lg inline-block mb-3">
                        <MessageCircle className="w-8 h-8" />
                    </div>
                    <p className="font-medium">Conversation started!</p>
                    <p className="text-sm mt-1 text-slate-400">Send your first message to begin</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {conversation.map((msg, index) => (
                <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div
                        className={`max-w-[80%] px-4 py-3 rounded-lg transition-all ${msg.type === 'user'
                            ? 'bg-orange-600 text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-bl-none'
                            }`}
                    >
                        <div className={`text-xs opacity-70 mb-1 ${msg.type === 'user' ? 'text-orange-100' : 'text-slate-600'}`}>
                            {msg.type === 'user' ? 'You' : 'AI'} • {msg.timestamp}
                        </div>
                        <div className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                            {msg.content}
                        </div>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-slate-100 border border-slate-200 px-4 py-3 rounded-lg rounded-bl-none">
                        <div className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin text-orange-600" />
                            <span className="text-sm text-slate-700">AI is thinking...</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
