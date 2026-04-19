'use client';

import { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import ToolsGrid from './components/ToolsGrid';
import Footer from '../shared/components/Footer';
import { toolsData } from './data/toolsData';

export default function OverviewPage() {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="min-h-screen" style={{ background: '#fffaf5' }}>
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-10">
                <Header onSearch={setSearchQuery} />
                <ToolsGrid tools={toolsData} searchQuery={searchQuery} />
                <Footer />
            </div>
        </div>
    );
}
