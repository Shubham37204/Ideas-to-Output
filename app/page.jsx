'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useRef, useState } from 'react';
import {
  Sparkles, ArrowRight, Code, MessageCircle, Image, BookOpen,
  PenTool, ShieldAlert, Swords, Music, Camera, Zap, Lock,
  Github, Mail, ChevronDown
} from 'lucide-react';

const FEATURES = [
  {
    icon: Code,
    title: 'Code That Actually Works',
    desc: 'Describe what you want, pick a language, get clean production-ready code — not just snippets.',
    color: '#2563eb',
    bg: '#eff6ff',
  },
  {
    icon: ShieldAlert,
    title: 'Fact-Check Headlines',
    desc: 'Paste any claim or news headline and get a credibility score with reasoning in seconds.',
    color: '#dc2626',
    bg: '#fef2f2',
  },
  {
    icon: Swords,
    title: 'See Every Angle',
    desc: 'Enter any topic and get well-structured arguments for both sides — great for essays and research.',
    color: '#d97706',
    bg: '#fffbeb',
  },
  {
    icon: Music,
    title: 'Write Real Songs',
    desc: 'Pick your genre, describe a vibe, and get full lyrics with verses, chorus, and a bridge.',
    color: '#0891b2',
    bg: '#ecfeff',
  },
  {
    icon: Camera,
    title: 'Caption Any Image',
    desc: 'Upload a photo — AI reads it, writes an engaging caption, and suggests hashtags for social media.',
    color: '#059669',
    bg: '#f0fdf4',
  },
  {
    icon: PenTool,
    title: 'Stories on Demand',
    desc: 'Seed it with one sentence and it will write a compelling short story with a real arc.',
    color: '#be185d',
    bg: '#fdf2f8',
  },
];

const WHY = [
  { n: '01', title: 'Sign up free', desc: 'No credit card. Just create an account and you\'re in.' },
  { n: '02', title: 'Pick a tool', desc: 'Browse 11 AI tools in one place — no tab-switching.' },
  { n: '03', title: 'Get results', desc: 'Type a prompt, hit generate. Done in under 2 seconds.' },
];

export default function HomePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      createUser({
        name: user.fullName || user.firstName || 'User',
        email: user.primaryEmailAddress?.emailAddress || '',
        imageUrl: user.imageUrl || '',
      }).catch(console.error);
    }
  }, [isLoaded, user, createUser]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const firstName = user?.firstName || user?.fullName?.split(' ')[0] || '';

  return (
    <div className="min-h-screen" style={{ background: '#fffaf5' }}>

      {/* ── Navbar ── */}
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-sm border-b border-orange-100' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform" style={{ background: '#f97316' }}>
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 tracking-tight">Your-Prompts</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-slate-900 transition-colors">Features</button>
            <button onClick={() => contactRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="hover:text-slate-900 transition-colors">Contact</button>
          </div>

          <div className="flex items-center gap-3">
            <SignedIn>
              <button onClick={() => router.push('/overview')}
                className="text-sm font-semibold px-4 py-2 rounded-xl text-white transition-all hover:opacity-90"
                style={{ background: '#f97316' }}>
                Dashboard →
              </button>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-semibold px-5 py-2 rounded-xl text-white transition-all hover:opacity-90 shadow-sm"
                  style={{ background: '#f97316' }}>
                  Get Started
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <div>
            {isLoaded && user && (
              <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                👋 Welcome back, {firstName}!
              </div>
            )}

            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-[1.05] mb-5 tracking-tight">
              One app.<br />
              <span style={{
                background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Eleven AI tools.
              </span>
            </h1>

            <p className="text-slate-500 text-lg leading-relaxed mb-8 max-w-md">
              From writing code to detecting fake news, generating song lyrics to captioning photos — your all-in-one AI workspace. No switching tabs, no multiple subscriptions.
            </p>

            <div className="flex gap-3 flex-wrap">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="font-bold px-8 py-3.5 rounded-xl text-white text-sm transition-all hover:opacity-90 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                    style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                    <Sparkles className="w-4 h-4" />
                    Start for free
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <button onClick={() => router.push('/overview')}
                  className="font-bold px-8 py-3.5 rounded-xl text-white text-sm transition-all hover:opacity-90 shadow-md hover:shadow-lg inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                  <Sparkles className="w-4 h-4" />
                  Open Dashboard
                  <ArrowRight className="w-4 h-4" />
                </button>
              </SignedIn>
              <button onClick={() => featuresRef.current?.scrollIntoView({ behavior: 'smooth' })}
                className="font-semibold px-6 py-3.5 rounded-xl text-sm text-slate-700 border border-slate-300 hover:border-orange-300 hover:text-orange-700 transition-all inline-flex items-center gap-2">
                See features
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-4 mt-8">
              <div className="flex -space-x-2">
                {['#f97316', '#eab308', '#2563eb', '#dc2626'].map((c, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs text-white font-bold"
                    style={{ background: c, zIndex: 4 - i }}>
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-500">Built for curious minds, developers &amp; creators</p>
            </div>
          </div>

          {/* Right — visual blob */}
          <div className="relative h-80 lg:h-96">
            {/* Main blob */}
            <div className="absolute inset-0 rounded-3xl animate-blob opacity-60"
              style={{ background: 'linear-gradient(135deg, #fed7aa 0%, #fef08a 40%, #bbf7d0 100%)' }} />
            {/* Centered icon cluster */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {[
                  { Icon: Code, color: '#2563eb', top: '0%', left: '30%' },
                  { Icon: ShieldAlert, color: '#dc2626', top: '25%', left: '-10%' },
                  { Icon: Music, color: '#0891b2', top: '25%', left: '70%' },
                  { Icon: PenTool, color: '#be185d', top: '65%', left: '5%' },
                  { Icon: Camera, color: '#059669', top: '65%', left: '60%' },
                  { Icon: Swords, color: '#d97706', top: '100%', left: '30%' },
                ].map(({ Icon, color, top, left }, i) => (
                  <div key={i}
                    className="absolute w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-float"
                    style={{ top, left, animationDelay: `${i * 0.4}s`, transform: 'translate(-50%, -50%)' }}>
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                ))}
                {/* Center spark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-2xl flex items-center justify-center shadow-xl"
                  style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-white rounded-3xl border border-orange-100 p-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">About</p>
            <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight">
              Not another ChatGPT wrapper.
            </h2>
            <p className="text-slate-500 leading-relaxed text-sm">
              Your-Prompts is built for people who actually use AI to get things done. Instead of switching between Groq Playground, HuggingFace, and five other tabs — everything lives here. Purpose-built tools, not just a blank chat box.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: '11', sub: 'AI Tools' },
              { label: '3', sub: 'AI Models' },
              { label: '<2s', sub: 'Avg response' },
              { label: '100%', sub: 'Free to use' },
            ].map((s, i) => (
              <div key={i} className="bg-orange-50 rounded-2xl p-5 text-center border border-orange-100">
                <p className="text-3xl font-black text-orange-500">{s.label}</p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{s.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section ref={featuresRef} className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl font-black text-slate-900">What you can do here</h2>
          <p className="text-slate-500 text-sm mt-2">Sign in to access all tools — no credit card needed</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 card-lift group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                  style={{ background: f.bg }}>
                  <Icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-slate-900 mb-1.5">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">How It Works</p>
          <h2 className="text-3xl font-black text-slate-900">Three steps. That&apos;s it.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WHY.map((step, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-7 card-lift relative overflow-hidden">
              <span className="absolute top-4 right-5 text-5xl font-black opacity-5 text-slate-900">{step.n}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-4 text-sm font-black text-white"
                style={{ background: 'linear-gradient(135deg, #f97316, #eab308)' }}>
                {i + 1}
              </div>
              <h3 className="font-bold text-slate-900 mb-1.5">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Sign In CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-10">
        <div className="rounded-3xl p-10 text-center text-white relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #f97316 0%, #eab308 100%)' }}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-8 w-24 h-24 rounded-full border-4 border-white" />
            <div className="absolute bottom-4 right-8 w-16 h-16 rounded-full border-4 border-white" />
          </div>
          <Lock className="w-8 h-8 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl font-black mb-3">Tools are behind sign-in</h2>
          <p className="text-orange-100 mb-7 text-sm max-w-md mx-auto">
            Create a free account to access all 11 tools. Takes under 30 seconds — no credit card, no catch.
          </p>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-white font-bold px-8 py-3.5 rounded-xl text-orange-600 text-sm hover:bg-orange-50 transition-all inline-flex items-center gap-2 shadow-md">
                <Sparkles className="w-4 h-4" />
                Create free account
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <button onClick={() => router.push('/overview')}
              className="bg-white font-bold px-8 py-3.5 rounded-xl text-orange-600 text-sm hover:bg-orange-50 transition-all inline-flex items-center gap-2 shadow-md">
              Open Dashboard →
            </button>
          </SignedIn>
        </div>
      </section>

      {/* ── Get In Touch ── */}
      <section ref={contactRef} className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-3xl font-black text-slate-900">Have questions or ideas?</h2>
          <p className="text-slate-500 text-sm mt-2">Open source project — contributions and feedback always welcome.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="https://github.com/Shubham37204"
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2.5 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all card-lift">
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
          <a href="mailto:shubhambhardwaj37204@gmail.com"
            className="flex items-center gap-2.5 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-xl font-semibold text-sm hover:border-orange-300 hover:text-orange-600 transition-all card-lift">
            <Mail className="w-4 h-4" />
            Send an email
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-200 mt-8">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#f97316' }}>
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-700">Your-Prompts</span>
          </div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} · Made with ☕ by Shubham</p>
          <a href="https://github.com/Shubham37204" target="_blank" rel="noopener noreferrer"
            className="text-xs text-slate-400 hover:text-slate-700 transition-colors flex items-center gap-1">
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
