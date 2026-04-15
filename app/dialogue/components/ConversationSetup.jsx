import { MessageCircle, Play } from 'lucide-react';

export default function ConversationSetup({ onStartConversation }) {
    return (
        <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-4">
                <div className="inline-flex p-4 bg-orange-100 rounded-full">
                    <MessageCircle className="w-10 h-10 text-orange-600" />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to chat?</h3>
                    <p className="text-slate-600 text-sm mb-4">Start a conversation with an AI to ask questions and chat freely</p>
                </div>
                <button
                    onClick={onStartConversation}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 px-6 rounded-lg flex items-center gap-2 mx-auto transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                >
                    <Play className="w-4 h-4" />
                    Start Conversation
                </button>
            </div>
        </div>
    );
}
