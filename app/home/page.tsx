'use client';

import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

const BackgroundGradient = () => (
  <div className="absolute inset-0">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.1),transparent,transparent)] dark:bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.03),transparent,transparent)]"/>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"/>
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF6,#D946EF,#EC4899)] opacity-5 mix-blend-multiply dark:opacity-10"/>
  </div>
);

const MenuButton = ({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="relative h-10 w-10 md:hidden flex items-center justify-center"
  >
    <div className="absolute w-5 h-5 flex flex-col justify-between transform transition-all duration-300">
      <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`}/>
      <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}/>
      <span className={`w-full h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
    </div>
  </button>
);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black">
      {/* Enhanced Navigation */}
      <nav 
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 dark:bg-black/80 backdrop-blur-lg border-b border-slate-200/20 dark:border-slate-800/20' 
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative z-10 flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Lectura
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden md:flex items-center gap-1 ml-12"
            >
              {[
                { name: 'Features', href: '#features' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Testimonials', href: '#testimonials' },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-purple-600 dark:hover:text-purple-400 group"
                >
                  {item.name}
                  <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-purple-500/0 via-purple-500/70 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-100"/>
                </a>
              ))}
            </motion.div>

            {/* Desktop CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:flex items-center gap-4 ml-auto"
            >
              <a 
                href="/auth?mode=login"
                className="text-sm font-medium px-4 py-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
              >
                Sign in
              </a>
              <a
                href="/auth?mode=signup"
                className="relative inline-flex items-center justify-center text-sm font-medium h-10 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-all duration-200 group"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"/>
              </a>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <MenuButton 
                isOpen={isMobileMenuOpen} 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={false}
            animate={{
              height: isMobileMenuOpen ? 'auto' : 0,
              opacity: isMobileMenuOpen ? 1 : 0
            }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white dark:bg-black border-t border-slate-200/20 dark:border-slate-800/20"
          >
            <div className="px-4 py-6 space-y-4">
              {[
                { name: 'Features', href: '#features' },
                { name: 'Pricing', href: '#pricing' },
                { name: 'Testimonials', href: '#testimonials' },              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-2 text-base font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4 space-y-4">
                <a
                  href="/auth?mode=login"
                  className="block w-full text-center py-2 text-base font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                >
                  Sign in
                </a>
                <a
                  href="/auth?mode=signup"
                  className="block w-full text-center py-3 px-4 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        <BackgroundGradient />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center relative"
          >
            {/* Badge */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400 mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"/>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"/>
              </span>
              <span className="relative inline-flex items-center gap-2">
                AI-Powered Learning Assistant
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-xs bg-purple-500/20 px-2 py-0.5 rounded-full"
                >
                  New
                </motion.span>
              </span>
            </motion.span>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                <span className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Your Academic
                </span>
                <br/>
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
                >
                  Success Partner
                </motion.span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Transform your learning experience with 
              <span className="font-semibold text-purple-600 dark:text-purple-400"> AI-powered </span> 
              assistance for homework, research, and academic excellence
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <a href="/auth?mode=signup" 
                className="group relative inline-flex items-center justify-center h-14 px-8 rounded-full bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-all duration-200"
              >
                <span className="relative z-10 text-base font-medium flex items-center gap-2">
                  Get Started Free
                  <motion.svg 
                    whileHover={{ x: 5 }}
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"/>
              </a>

              <a href="#demo" 
                className="group relative inline-flex items-center justify-center h-14 px-8 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200"
              >
                <span className="text-base font-medium flex items-center gap-2">
                  Watch Demo
                  <motion.svg 
                    whileHover={{ scale: 1.1 }}
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </motion.svg>
                </span>
              </a>
            </motion.div>

            {/* Floating UI Preview */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="relative mt-20 max-w-5xl mx-auto"
            >
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-20 -z-10"/>
              <div className="relative bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-purple-500/5">
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"/>
                    <div className="w-3 h-3 rounded-full bg-green-400"/>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded-full"/>
                    <div className="h-4 w-4 bg-slate-200 dark:bg-slate-700 rounded-full"/>
                  </div>
                </div>
                <div className="aspect-[16/9] bg-slate-100 dark:bg-slate-800 rounded-b-2xl p-8">
                  <div className="h-full w-full rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center">
                    <span className="text-slate-400 dark:text-slate-600">Preview Coming Soon</span>
                  </div>
                </div>
              </div>

              {/* Stats Preview */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="absolute -right-12 top-1/2 transform translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Success Rate</div>
                    <div className="text-2xl font-bold text-green-500">95%</div>
                  </div>
                </div>
              </motion.div>

              {/* Active Users Preview */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute -left-12 bottom-12 transform -translate-x-1/2 bg-white dark:bg-gray-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl p-4 hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-2 border-white dark:border-gray-900"/>
                    ))}
                  </div>
                  <div className="text-sm font-medium">
                    <span className="text-purple-600 dark:text-purple-400">2,941</span> students online
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="relative py-32 overflow-hidden">
        <BackgroundGradient />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Enhanced Heading */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400">
                Trusted Worldwide
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Empowering Students Globally
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Join over <span className="font-semibold text-purple-600 dark:text-purple-400">100,000+</span> students from top universities who are transforming their academic journey
            </motion.p>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {[
              { 
                number: "100K+", 
                label: "Active Students",
                color: "from-blue-500 to-indigo-500",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )
              },
              { 
                number: "95%", 
                label: "Success Rate",
                color: "from-green-500 to-emerald-500",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              { 
                number: "50+", 
                label: "Subjects Covered",
                color: "from-purple-500 to-violet-500",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                )
              },
              { 
                number: "4.9/5", 
                label: "Average Rating",
                color: "from-pink-500 to-rose-500",
                icon: (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                )
              }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>
                <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-200 group-hover:translate-y-[-2px]">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white mb-4 rotate-3 group-hover:rotate-6 transition-transform duration-200`}>
                    {stat.icon}
                  </div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-105 transition-transform duration-200`}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Universities Scroll */}
          <div className="relative py-12 overflow-hidden mb-20">
            {/* Simplified gradient fades */}
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white dark:from-black to-transparent z-10"/>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white dark:from-black to-transparent z-10"/>
            
            <div className="flex gap-8 items-center animate-scroll">
              {[
                'Harvard University',
                'Stanford University',
                'MIT',
                'Oxford University',
                'Cambridge University',
                'Yale University',
                'Princeton University',
                'Columbia University'
              ].map((uni, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm whitespace-nowrap shadow-sm hover:shadow-md transition-all duration-200"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center">
                    <span className="text-lg">🎓</span>
                  </div>
                  <span className="text-sm font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {uni}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Lectura has completely transformed how I approach my studies. The AI assistance is incredibly intuitive!",
                author: "Sarah Chen",
                role: "Computer Science Student",
                school: "Stanford University",
                avatar: "👩🏻‍🎓",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                quote: "The research assistant feature has saved me countless hours on my thesis. It's like having a personal academic advisor.",
                author: "James Wilson",
                role: "Graduate Student",
                school: "Harvard University",
                avatar: "👨🏼‍🎓",
                gradient: "from-purple-500 to-violet-500"
              },
              {
                quote: "As an international student, Lectura helps me understand complex topics in my non-native language.",
                author: "Maria Garcia",
                role: "Engineering Student",
                school: "MIT",
                avatar: "👩🏽‍🎓",
                gradient: "from-pink-500 to-rose-500"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${testimonial.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500`}/>
                <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-200">
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl">
                    "
                  </div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center text-2xl`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">{testimonial.role}</div>
                      <div className="text-sm text-purple-600 dark:text-purple-400">{testimonial.school}</div>
                    </div>
                  </div>
                  <blockquote className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex flex-wrap justify-center gap-8">
            {[
              { label: "GDPR Compliant", icon: "🔒" },
              { label: "24/7 Support", icon: "💬" },
              { label: "99.9% Uptime", icon: "⚡" },
              { label: "AI Powered", icon: "🤖" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 + (i * 0.1) }}
                className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="relative py-32 overflow-hidden">
        <BackgroundGradient />
        
        {/* Animated background elements */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400">
                Powerful Features
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Everything You Need to Excel
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Advanced AI-powered tools designed to transform your learning experience
            </motion.p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Homework Help",
                description: "Get step-by-step explanations powered by advanced AI. Understand complex problems with detailed breakdowns.",
                icon: "💡",
                gradient: "from-blue-500 to-indigo-500",
                features: ["Step-by-step solutions", "Multiple approaches", "Practice problems"]
              },
              {
                title: "Research Assistant",
                description: "Analyze sources, generate citations, and get help with research papers instantly.",
                icon: "🔍",
                gradient: "from-purple-500 to-violet-500",
                features: ["Source analysis", "Citation generation", "Plagiarism check"]
              },
              {
                title: "Study Planning",
                description: "AI-powered study schedules that adapt to your learning style and goals.",
                icon: "📚",
                gradient: "from-pink-500 to-rose-500",
                features: ["Personalized schedules", "Progress tracking", "Smart reminders"]
              },
              {
                title: "Math Solver",
                description: "Advanced mathematics problem-solving with detailed explanations and graphs.",
                icon: "🧮",
                gradient: "from-green-500 to-emerald-500",
                features: ["Visual solutions", "Step-by-step guides", "Practice exercises"]
              },
              {
                title: "Writing Assistant",
                description: "Enhance your essays with AI-powered suggestions and improvements.",
                icon: "✍️",
                gradient: "from-orange-500 to-amber-500",
                features: ["Grammar check", "Style suggestions", "Structure analysis"]
              },
              {
                title: "Language Support",
                description: "Multi-language support for international students and language learners.",
                icon: "🌎",
                gradient: "from-teal-500 to-cyan-500",
                features: ["50+ languages", "Translation help", "Cultural context"]
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>
                <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-200 group-hover:translate-y-[-2px]">
                  {/* Feature Icon */}
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-2xl mb-6 rotate-3 group-hover:rotate-6 transition-transform duration-200`}>
                    {feature.icon}
                  </div>
                  
                  {/* Feature Title */}
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {feature.title}
                  </h3>
                  
                  {/* Feature Description */}
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    {feature.description}
                  </p>
                  
                  {/* Feature List */}
                  <ul className="space-y-2">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className={`w-5 h-5 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white text-xs`}>
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Effect Arrow */}
                  <div className="absolute bottom-8 right-8 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white`}>
                      →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="relative inline-block group">
              {/* Animated background gradient */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-200"/>
              
              {/* Button */}
              <a 
                href="#get-started"
                className="relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"/>
                <span className="relative flex items-center gap-2 font-medium">
                  <span>Explore All Features</span>
                  <motion.span
                    initial={{ rotate: 0 }}
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    className="inline-block"
                  >
                    ✨
                  </motion.span>
                  <motion.svg 
                    className="w-5 h-5"
                    whileHover={{ x: 5 }}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </motion.svg>
                </span>
              </a>
            </div>

            {/* Optional: Add a subtle hint text below */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-sm text-slate-600 dark:text-slate-400"
            >
              Discover all the ways Lectura can help you succeed
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Pricing Section */}
      <section id="pricing" className="relative py-32 overflow-hidden">
        <BackgroundGradient />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-2 mb-6"
            >
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
              <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400">
                Simple Pricing
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-transparent via-purple-500 to-transparent"/>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Choose Your Perfect Plan
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto"
            >
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <span className={`text-sm transition-colors duration-200 ${
                !isAnnual ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-slate-600 dark:text-slate-400'
              }`}>
                Monthly
              </span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="relative w-14 h-7 bg-slate-200 dark:bg-slate-800 rounded-full transition-colors hover:bg-slate-300 dark:hover:bg-slate-700"
              >
                <div className={`absolute top-1 w-5 h-5 bg-white dark:bg-slate-200 rounded-full transition-transform duration-200 ${
                  isAnnual ? 'translate-x-8' : 'translate-x-1'
                }`}/>
              </button>
              <span className={`text-sm transition-colors duration-200 ${
                isAnnual ? 'text-purple-600 dark:text-purple-400 font-medium' : 'text-slate-600 dark:text-slate-400'
              }`}>
                Annual
                <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400">
                  Save 20%
                </span>
              </span>
            </motion.div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Free",
                price: "0",
                description: "Perfect for trying out Lectura",
                gradient: "from-blue-500 to-indigo-500",
                features: [
                  { text: "5 AI-powered explanations per day", available: true },
                  { text: "Basic homework help", available: true },
                  { text: "Community support", available: true },
                  { text: "Limited subject access", available: true },
                  { text: "Advanced features", available: false },
                  { text: "Priority support", available: false }
                ],
                cta: "Get Started",
                popular: false
              },
              {
                name: "Pro",
                price: isAnnual ? "12" : "15",
                description: "Most popular for students",
                gradient: "from-purple-500 to-violet-500",
                features: [
                  { text: "Unlimited AI explanations", available: true },
                  { text: "Advanced homework help", available: true },
                  { text: "Priority support 24/7", available: true },
                  { text: "All subjects access", available: true },
                  { text: "Research paper assistance", available: true },
                  { text: "Personalized study plans", available: true }
                ],
                cta: "Start Free Trial",
                popular: true
              },
              {
                name: "Team",
                price: isAnnual ? "39" : "49",
                description: "Perfect for study groups",
                gradient: "from-pink-500 to-rose-500",
                features: [
                  { text: "Everything in Pro", available: true },
                  { text: "5 team member accounts", available: true },
                  { text: "Team collaboration tools", available: true },
                  { text: "Shared study materials", available: true },
                  { text: "Admin dashboard", available: true },
                  { text: "API access", available: true }
                ],
                cta: "Contact Sales",
                popular: false
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative group ${plan.popular ? 'md:-mt-8' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-0 right-0 flex justify-center">
                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>
                <div className={`relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-200 ${plan.popular ? 'md:p-10 ring-2 ring-purple-500/20' : ''}`}>
                  {/* Plan Name & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    {plan.popular && (
                      <div className="hidden md:block px-3 py-1 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400">
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-5xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                        ${plan.price}
                      </span>
                      <span className="ml-2 text-slate-600 dark:text-slate-400">
                        /{isAnnual ? 'year' : 'month'}
                      </span>
                    </div>
                    {isAnnual && plan.price !== "0" && (
                      <p className="mt-1 text-sm text-green-600 dark:text-green-400">
                        Save 20% with annual billing
                      </p>
                    )}
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                      {plan.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-sm">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0
                          ${feature.available 
                            ? `bg-gradient-to-r ${plan.gradient}` 
                            : 'bg-slate-200 dark:bg-slate-800'}`
                        }>
                          {feature.available ? '✓' : '×'}
                        </div>
                        <span className={`${feature.available 
                          ? 'text-slate-600 dark:text-slate-400' 
                          : 'text-slate-400 dark:text-slate-600'}`}
                        >
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href="#signup"
                    className={`block w-full py-3 px-4 rounded-xl text-center font-medium transition-all duration-200
                      ${plan.popular 
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/25' 
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                  >
                    {plan.cta}
                  </a>

                  {/* Additional Info */}
                  {plan.popular && (
                    <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
                      Includes 7-day free trial
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "🔒",
                title: "Secure Payments",
                description: "Your payments are secure with 256-bit encryption"
              },
              {
                icon: "🌍",
                title: "Available Worldwide",
                description: "Access your account from anywhere in the world"
              },
              {
                icon: "💬",
                title: "24/7 Support",
                description: "Get help anytime via chat, email, or phone"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                className="text-center"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* FAQ Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Have questions? Check our FAQ or contact support
            </p>
            <a 
              href="#faq"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-200 text-sm font-medium group"
            >
              View FAQ
              <svg className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <BackgroundGradient />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative p-8 sm:p-16 rounded-3xl overflow-hidden">
            {/* Update the container background to be more consistent */}
            <div className="absolute inset-0 bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl rounded-3xl border border-slate-200/10 dark:border-slate-800/10"/>
            
            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center max-w-3xl mx-auto"
              >
                {/* Badge */}
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-sm font-medium text-purple-600 dark:text-purple-400 mb-8">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"/>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"/>
                  </span>
                  Limited Time Offer
                </span>

                {/* Heading */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                >
                  Start Your Academic Journey Today
                </motion.h2>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-12"
                >
                  Join thousands of students already using Lectura to achieve their academic goals. 
                  Get started with a 7-day free trial.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a
                    href="#signup"
                    className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                  >
                    Get Started Free
                    <motion.svg
                      whileHover={{ x: 5 }}
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </motion.svg>
                  </a>
                  <a
                    href="#demo"
                    className="group inline-flex items-center justify-center px-8 py-4 rounded-full border border-purple-500/20 hover:border-purple-500/40 transition-colors duration-200"
                  >
                    Schedule Demo
                    <motion.svg
                      whileHover={{ scale: 1.1 }}
                      className="w-5 h-5 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </motion.svg>
                  </a>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-4 items-center text-sm text-slate-600 dark:text-slate-400"
                >
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    No credit card required
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    7-day free trial
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Cancel anytime
                  </span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer Section */}
      <footer className="relative pt-32 pb-12 overflow-hidden">
        <BackgroundGradient />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-20">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Lectura
                </span>
                <p className="text-slate-600 dark:text-slate-400 max-w-sm">
                  Empowering students worldwide with AI-powered learning assistance. Transform your academic journey today.
                </p>
                <div className="flex gap-4">
                  {[
                    { icon: "twitter", href: "#" },
                    { icon: "facebook", href: "#" },
                    { icon: "instagram", href: "#" },
                    { icon: "linkedin", href: "#" }
                  ].map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white transition-all duration-200"
                    >
                      <span className="sr-only">{social.icon}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {/* Add appropriate social media icon paths */}
                      </svg>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Quick Links */}
            {[
              {
                title: "Product",
                links: [
                  { name: "Features", href: "#features" },
                  { name: "Pricing", href: "#pricing" },
                  { name: "Demo", href: "#demo" },
                  { name: "Changelog", href: "#changelog" }
                ]
              },
              {
                title: "Company",
                links: [
                  { name: "About Us", href: "#about" },
                  { name: "Careers", href: "#careers" },
                  { name: "Blog", href: "#blog" },
                  { name: "Press Kit", href: "#press" }
                ]
              },
              {
                title: "Resources",
                links: [
                  { name: "Documentation", href: "#docs" },
                  { name: "Help Center", href: "#help" },
                  { name: "Community", href: "#community" },
                  { name: "Tutorials", href: "#tutorials" }
                ]
              },
              {
                title: "Legal",
                links: [
                  { name: "Privacy", href: "#privacy" },
                  { name: "Terms", href: "#terms" },
                  { name: "Security", href: "#security" },
                  { name: "Cookies", href: "#cookies" }
                ]
              }
            ].map((column, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
              >
                <h3 className="font-semibold mb-6">{column.title}</h3>
                <ul className="space-y-4">
                  {column.links.map((link, j) => (
                    <li key={j}>
                      <a
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative py-12 px-8 rounded-3xl mb-20"
          >
            <div className="absolute inset-0 bg-white/[0.02] dark:bg-white/[0.02] backdrop-blur-3xl rounded-3xl border border-slate-200/10 dark:border-slate-800/10"/>
            <div className="relative z-10 max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Subscribe to our newsletter for the latest features and updates.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-3 rounded-full bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-purple-500 transition-colors duration-200"
                />
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-200"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-slate-200/10 dark:border-slate-800/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm text-slate-600 dark:text-slate-400"
              >
                © {new Date().getFullYear()} Lectura. All rights reserved.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-8"
              >
                <select className="bg-transparent text-sm text-slate-600 dark:text-slate-400 focus:outline-none">
                  <option value="en">English (US)</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                </select>
                <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                  <a href="#accessibility" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    Accessibility
                  </a>
                  <span>•</span>
                  <a href="#sitemap" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
                    Sitemap
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>

      {/* More sections following similar modern design patterns... */}
      
    </div>
  );
}
