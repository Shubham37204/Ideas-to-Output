'use client';

import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import ErrorDisplay from '../shared/components/ErrorDisplay';
import Footer from '../shared/components/Footer';
import ConversationSetup from './components/ConversationSetup';
import ChatInput from './components/ChatInput';
import ConversationDisplay from './components/ConversationDisplay';

function ChatPage() {
    const [currentMsg, setCurrentMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [chatActive, setChatActive] = useState(false);

    const startChat = () => {
        setChatActive(true);
        setMessages([]);
        setErr('');
    };

    const stopChat = () => {
        setChatActive(false);
        setCurrentMsg('');
    };

    const sendMessage = async (e) => {
        e.preventDefault();

        if (!currentMsg.trim()) {
            setErr('need a message to send');
            return;
        }

        setLoading(true);
        setErr('');

        const userMsg = {
            type: 'user',
            content: currentMsg.trim(),
            time: new Date().toLocaleTimeString()
        };

        setMessages(prev => [...prev, userMsg]);
        const msgToSend = currentMsg.trim();
        setCurrentMsg(''); 

        console.log('sending message:', msgToSend);

        try {
            const response = await fetch('/api/dialogue', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: msgToSend
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'chat api failed');
            }

            const aiMsg = {
                type: 'ai',
                content: data.response,
                time: new Date().toLocaleTimeString()
            };

            setMessages(prev => [...prev, aiMsg]);

        } catch (error) {
            setErr(error.message || 'something broke');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <BackToOverviewButton />
            <div className="max-w-6xl mx-auto p-6">
                <PageHeader
                    icon={<MessageCircle className="w-8 h-8 text-orange-600" />}
                    title="AI Conversation"
                    //subtitle="Talk to an AI"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg shadow p-6 border">
                        <h2 className="font-medium mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            {chatActive ? 'Chat Controls' : 'Start the Conversation'}
                        </h2>

                        {!chatActive ? (
                            <ConversationSetup onStartConversation={startChat} />
                        ) : (
                            <ChatInput
                                message={currentMsg}
                                setMessage={setCurrentMsg}
                                onSubmit={sendMessage}
                                onStop={stopChat}
                                isLoading={loading}
                            />
                        )}

                        <ErrorDisplay error={err} />
                    </div>

                    <div className="bg-white rounded-lg shadow p-6 border">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                                {chatActive ? 'Chat Messages' : 'Chat Preview'}
                            </h2>
                        </div>

                        <div className="bg-gray-50 rounded p-4 max-h-96 overflow-y-auto">
                            <ConversationDisplay
                                isConversationActive={chatActive}
                                conversation={messages}
                                isLoading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ChatPage;
