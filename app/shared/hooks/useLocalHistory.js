'use client';
import { useState, useEffect } from 'react';

/**
 * useLocalHistory — persists a list of history items to localStorage.
 * @param {string} key  — unique key per tool, e.g. 'history_code'
 * @param {number} max  — max items to keep (default 10)
 */
export function useLocalHistory(key, max = 10) {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem(key);
            if (stored) setHistory(JSON.parse(stored));
        } catch { /* ignore */ }
    }, [key]);

    const addToHistory = (item) => {
        setHistory(prev => {
            const updated = [
                { ...item, id: Date.now(), savedAt: new Date().toLocaleString() },
                ...prev,
            ].slice(0, max);
            localStorage.setItem(key, JSON.stringify(updated));
            return updated;
        });
    };

    const deleteFromHistory = (id) => {
        setHistory(prev => {
            const updated = prev.filter(h => h.id !== id);
            localStorage.setItem(key, JSON.stringify(updated));
            return updated;
        });
    };

    const clearHistory = () => {
        localStorage.removeItem(key);
        setHistory([]);
    };

    return { history, addToHistory, deleteFromHistory, clearHistory };
}
