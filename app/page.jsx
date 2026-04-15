'use client';
import { useRouter } from 'next/navigation';
import { Sparkles, Zap, Palette, Code, BookOpen, Image, Wand2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from 'react';
import Footer from './shared/components/Footer';

const HomePage = () => {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  useEffect(() => {
    if (isLoaded && user) {
      const saveUserData = async () => {
        try {
          await createUser({
            name: user.fullName || user.firstName || "User",
            email: user.primaryEmailAddress?.emailAddress || "",
            imageUrl: user.imageUrl || "",
          });
        } catch (error) {
          console.error("Error saving user:", error);
        }
      };
      saveUserData();
    }
  }, [isLoaded, user, createUser]);

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <nav className="bg-white/60 backdrop-blur-md border-b border-purple-200/50 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">Your-Prompts</span>
            </Link>
            <SignedIn>
              <div className="flex items-center gap-4">
                <UserButton />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Powered by Advanced AI
          </div>
          <h1 className="text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
            Create Amazing Things<br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">With AI Superpowers</span>
          </h1>
          <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your creative ideas into reality instantly. From stunning images to polished code, our AI tools help you accomplish more in less time.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => router.push('/overview')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg inline-flex items-center gap-2 hover:shadow-xl"
            >
              <Sparkles className="w-5 h-5" />
              Start Creating Free
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            Why Choose Your-Prompts?
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">Everything you need to create professional content instantly</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'Lightning Fast',
                desc: 'Get results in seconds, not hours. Our optimized AI models deliver instant responses.',
                color: 'yellow'
              },
              {
                icon: Palette,
                title: 'Multiple Formats',
                desc: 'Create images, text, code, and more. One platform for all your creative needs.',
                color: 'pink'
              },
              {
                icon: Sparkles,
                title: 'AI-Powered',
                desc: 'Powered by cutting-edge AI technology that understands context and nuance.',
                color: 'blue'
              },
              {
                icon: ArrowRight,
                title: 'Easy to Use',
                desc: 'Simple interface designed for everyone. No technical skills required.',
                color: 'emerald'
              },
              {
                icon: BookOpen,
                title: 'Learn & Explore',
                desc: 'Discover new creative possibilities with our comprehensive tool documentation.',
                color: 'purple'
              },
              {
                icon: Wand2,
                title: 'Instant Results',
                desc: 'See your ideas come to life immediately with professional-quality outputs.',
                color: 'orange'
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              const colorMap = {
                yellow: 'from-yellow-100 to-yellow-50',
                pink: 'from-pink-100 to-pink-50',
                blue: 'from-blue-100 to-blue-50',
                emerald: 'from-emerald-100 to-emerald-50',
                purple: 'from-purple-100 to-purple-50',
                orange: 'from-orange-100 to-orange-50',
              };
              const colorMapText = {
                yellow: 'text-yellow-600',
                pink: 'text-pink-600',
                blue: 'text-blue-600',
                emerald: 'text-emerald-600',
                purple: 'text-purple-600',
                orange: 'text-orange-600',
              };
              return (
                <div key={idx} className="p-6 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50/70 to-purple-100/40 hover:shadow-lg hover:border-purple-300 transition-all group backdrop-blur-sm">
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[benefit.color]} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${colorMapText[benefit.color]}`} />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-lg">{benefit.title}</h3>
                  <p className="text-slate-600 text-sm">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">Get started in three simple steps</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50/70 to-blue-50/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4 font-bold text-blue-600 text-lg">
                1
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Select a Tool</h3>
              <p className="text-slate-600 text-sm">Choose from our collection of AI-powered tools</p>
            </div>
            <div className="text-center p-8 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50/70 to-emerald-50/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-4 font-bold text-emerald-600 text-lg">
                2
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Describe Your Idea</h3>
              <p className="text-slate-600 text-sm">Tell the AI exactly what you want to create</p>
            </div>
            <div className="text-center p-8 rounded-xl border border-purple-200 bg-gradient-to-br from-purple-50/70 to-pink-50/50 backdrop-blur-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg flex items-center justify-center mx-auto mb-4 font-bold text-purple-600 text-lg">
                3
              </div>
              <h3 className="font-semibold text-slate-900 mb-2 text-lg">Get Your Results</h3>
              <p className="text-slate-600 text-sm">AI generates and displays your content instantly</p>
            </div>
          </div>
        </div>


        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
