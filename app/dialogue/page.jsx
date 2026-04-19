'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, StopCircle, User, Bot } from 'lucide-react';
import PageHeader from '../shared/components/PageHeader';
import BackToOverviewButton from '../shared/components/BackToOverviewButton';
import Footer from '../shared/components/Footer';

const ACCENT = '#2563eb'; // blue

function ChatPage() {
    const [currentMsg, setCurrentMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState('');
    const [chatActive, setChatActive] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const startChat = () => { setChatActive(true); setMessages([]); setErr(''); inputRef.current?.focus(); };
    const stopChat = () => { setChatActive(false); setCurrentMsg(''); };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!currentMsg.trim()) return;
        setLoading(true); setErr('');

        const userMsg = { type: 'user', content: currentMsg.trim(), time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        const msgToSend = currentMsg.trim();
        setCurrentMsg('');

        try {
            const res = await fetch('/api/dialogue', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: msgToSend }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setMessages(prev => [...prev, {
                type: 'ai', content: data.response,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        } catch (error) {
            setErr(error.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen" style={{ background: '#f0f4ff' }}>
            <BackToOverviewButton />
            <div className="max-w-4xl mx-auto px-6 py-8">
                <PageHeader
                    icon={<MessageCircle className="w-7 h-7" style={{ color: ACCENT }} />}
                    title="AI Chat"
                    subtitle="Have a real conversation. Ask anything — the AI thinks before it speaks."
                    accentColor={ACCENT}
                />

                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                    {/* Chat window */}
                    <div className="h-[420px] overflow-y-auto p-5 space-y-4" style={{ background: '#f8faff' }}>
                        {!chatActive && messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-slate-400">
                                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                                    style={{ background: '#eff6ff' }}>
                                    <MessageCircle className="w-8 h-8" style={{ color: ACCENT }} />
                                </div>
                                <p className="font-semibold text-slate-600 text-sm">No conversation yet</p>
                                <p className="text-xs mt-1">Hit Start Chat to begin</p>
                            </div>
                        ) : (
                            <>
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex gap-3 ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {msg.type === 'ai' && (
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                                                style={{ background: ACCENT }}>
                                                <Bot className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                        <div className={`max-w-[75%] space-y-1`}>
                                            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                                                msg.type === 'user'
                                                    ? 'text-white rounded-tr-sm'
                                                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                                            }`} style={msg.type === 'user' ? { background: ACCENT } : {}}>
                                                {msg.content}
                                            </div>
                                            <p className={`text-xs text-slate-400 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                                {msg.time}
                                            </p>
                                        </div>
                                        {msg.type === 'user' && (
                                            <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                                                <User className="w-4 h-4 text-slate-500" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex gap-3 justify-start">
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: ACCENT }}>
                                            <Bot className="w-4 h-4 text-white" />
                                        </div>
                                        <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1.5 items-center">
                                            {[0, 1, 2].map(i => (
                                                <div key={i} className="w-2 h-2 rounded-full animate-bounce"
                                                    style={{ background: ACCENT, animationDelay: `${i * 0.15}s` }} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div ref={bottomRef} />
                            </>
                        )}
                    </div>

                    {/* Error */}
                    {err && <div className="mx-4 mb-2 bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-xl">{err}</div>}

                    {/* Input bar */}
                    <div className="border-t border-slate-100 p-4">
                        {!chatActive ? (
                            <button onClick={startChat}
                                className="w-full py-3 font-bold text-sm text-white rounded-xl transition-all hover:opacity-90 shadow-sm"
                                style={{ background: ACCENT }}>
                                💬 Start Conversation
                            </button>
                        ) : (
                            <form onSubmit={sendMessage} className="flex gap-2">
                                <input ref={inputRef} type="text" value={currentMsg}
                                    onChange={e => setCurrentMsg(e.target.value)}
                                    disabled={loading}
                                    placeholder="Type a message..."
                                    className="flex-1 px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-none transition-all placeholder:text-slate-300 disabled:opacity-50"
                                    onFocus={e => e.target.style.borderColor = ACCENT}
                                    onBlur={e => e.target.style.borderColor = ''}
                                />
                                <button type="submit" disabled={loading || !currentMsg.trim()}
                                    className="px-4 py-3 text-white rounded-xl transition-all disabled:opacity-50 hover:opacity-90"
                                    style={{ background: ACCENT }}>
                                    <Send className="w-4 h-4" />
                                </button>
                                <button type="button" onClick={stopChat}
                                    className="px-4 py-3 text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
                                    <StopCircle className="w-4 h-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    );
}

export default ChatPage;
