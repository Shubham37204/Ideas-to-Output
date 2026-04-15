'use client';

import Navbar from './components/Navbar';
import Header from './components/Header';
import ToolsGrid from './components/ToolsGrid';
import Footer from './components/Footer';
import { toolsData } from './data/toolsData';

export default function OverviewPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
            <Navbar />
            <div className="max-w-7xl mx-auto px-6 py-12">
                <Header />
                <ToolsGrid tools={toolsData} />
                <Footer />
            </div>
        </div>
    );
}
