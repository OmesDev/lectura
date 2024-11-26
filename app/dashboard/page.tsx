'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

const BackgroundGradient = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.1),transparent,transparent)] dark:bg-[radial-gradient(circle_at_top_right,rgba(129,140,248,0.03),transparent,transparent)]"/>
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
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-full blur-3xl"
    />
  </div>
);

const SidebarLink = ({ icon, label, active = false }: { icon: string; label: string; active?: boolean }) => (
  <motion.a
    whileHover={{ x: 5 }}
    whileTap={{ scale: 0.95 }}
    href="#"
    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative
      ${active 
        ? 'text-white' 
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
      }`}
  >
    {/* Active background with gradient */}
    {active && (
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl opacity-90" />
    )}
    
    {/* Hover background */}
    <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-200 
      ${active ? 'opacity-0' : 'group-hover:opacity-100'}`} 
    />
    
    {/* Icon container */}
    <div className={`relative z-10 w-10 h-10 rounded-lg flex items-center justify-center text-xl
      ${active 
        ? 'bg-white/20' 
        : 'bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700'
      } transition-colors duration-200`}>
      {icon}
    </div>
    
    {/* Label */}
    <span className="relative z-10 font-medium flex-1">{label}</span>
    
    {/* Active indicator */}
    {active && (
      <div className="relative z-10 w-2 h-2 rounded-full bg-white mr-2" />
    )}
  </motion.a>
);

const StatCard = ({ icon, label, value, gradient }: { icon: string; label: string; value: string; gradient: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group"
  >
    {/* Hover effect gradient */}
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>
    
    {/* Card content */}
    <div className="relative p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-slate-200/50 dark:border-slate-800/50 hover:border-purple-500/50 transition-all duration-200 backdrop-blur-sm">
      <div className="flex items-center gap-4">
        {/* Icon container */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-2xl shadow-lg`}>
          {icon}
        </div>
        {/* Text content */}
        <div className="flex-1">
          <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</div>
        </div>
      </div>
    </div>
  </motion.div>
);

const ChatMessage = ({ message, isAi = false }: { message: string; isAi?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex gap-2 lg:gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
  >
    <div className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-white text-sm lg:text-base
      ${isAi 
        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' 
        : 'bg-slate-700'
      }`}
    >
      {isAi ? '🤖' : '👤'}
    </div>
    <div className={`max-w-[85%] p-3 lg:p-4 rounded-2xl text-sm lg:text-base ${
      isAi 
        ? 'bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800' 
        : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white'
    }`}>
      {message}
    </div>
  </motion.div>
);

const RecentActivity = ({ icon, title, time }: { icon: string; title: string; time: string }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-pink-500/5 transition-all duration-200"
  >
    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 flex items-center justify-center text-xl">
      {icon}
    </div>
    <div className="flex-1">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-slate-600 dark:text-slate-400">{time}</div>
    </div>
  </motion.div>
);

// Add this new component for the mobile bottom bar
const MobileNavBar = () => (
  <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900/70 border-t border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl lg:hidden">
    <div className="flex items-center justify-around p-2">
      <motion.a
        whileTap={{ scale: 0.95 }}
        href="#"
        className="flex flex-col items-center p-2 text-purple-600 dark:text-purple-400"
      >
        <span className="text-xl mb-1">🎯</span>
        <span className="text-xs">Dashboard</span>
      </motion.a>
      <motion.a
        whileTap={{ scale: 0.95 }}
        href="#"
        className="flex flex-col items-center p-2 text-slate-600 dark:text-slate-400"
      >
        <span className="text-xl mb-1">🤖</span>
        <span className="text-xs">AI Chat</span>
      </motion.a>
      <motion.a
        whileTap={{ scale: 0.95 }}
        href="#"
        className="flex flex-col items-center p-2 text-slate-600 dark:text-slate-400"
      >
        <span className="text-xl mb-1">📚</span>
        <span className="text-xs">Study</span>
      </motion.a>
      <motion.a
        whileTap={{ scale: 0.95 }}
        href="#"
        className="flex flex-col items-center p-2 text-slate-600 dark:text-slate-400"
      >
        <span className="text-xl mb-1">📝</span>
        <span className="text-xs">Notes</span>
      </motion.a>
    </div>
  </div>
);

// Update the ProfileDropdown component
const ProfileDropdown = ({ isOpen, onClose, handleSignOut }: { 
  isOpen: boolean; 
  onClose: () => void;
  handleSignOut: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Backdrop - Update position and z-index */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-30"
          style={{ backgroundColor: 'transparent' }}
        />
        
        {/* Dropdown menu - Update z-index */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-white dark:bg-gray-900 border border-slate-200/50 dark:border-slate-800/50 shadow-lg shadow-black/10 backdrop-blur-sm z-40"
        >
          <div className="p-2 space-y-1">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="text-lg">👤</span>
              Profile
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <span className="text-lg">⚙️</span>
              Settings
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
            >
              <span className="text-lg">🚪</span>
              Sign Out
            </motion.button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// Update the MobileHeader component
const MobileHeader = ({ user, handleSignOut }: { user: any; handleSignOut: () => void }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50 lg:hidden z-50">
      <div className="flex items-center justify-between p-4 relative">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-xl text-white">📚</span>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gradient">
            Lectura
          </span>
        </div>
        <motion.div
          ref={dropdownRef}
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white"
          >
            {user?.email?.[0].toUpperCase() || '👤'}
          </button>
          
          <ProfileDropdown 
            isOpen={isDropdownOpen} 
            onClose={() => setIsDropdownOpen(false)}
            handleSignOut={handleSignOut}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser(user)
      } else {
        router.push('/auth')
      }
    }

    getUser()
  }, [supabase, router])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/auth')
  }

  const UserProfile = () => (
    <div className="absolute bottom-8 left-4 right-4">
      <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-full h-full flex items-center justify-center text-white text-lg font-medium">
              {user?.email?.[0].toUpperCase() || '👤'}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-medium truncate relative pr-4">
              <span className="relative z-10">{user?.email}</span>
              <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-r from-transparent to-indigo-500/10 dark:to-purple-500/10 z-20" />
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400">Student</div>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSignOut}
          className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          Sign Out
        </motion.button>
      </div>
    </div>
  )

  const [messages, setMessages] = useState<Array<{text: string; isAi: boolean}>>([
    { text: "Hello! How can I help you with your studies today?", isAi: true },
    { text: "I need help understanding quantum mechanics.", isAi: false },
    { text: "I'll help break down quantum mechanics into simpler concepts. Let's start with the basics.", isAi: true },
  ]);

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-slate-50 dark:bg-black pb-16 lg:pb-0 pt-[73px] lg:pt-0 custom-scrollbar">
      <BackgroundGradient />
      
      {/* Mobile Header */}
      <MobileHeader user={user} handleSignOut={handleSignOut} />
      
      {/* Dashboard Layout */}
      <div className="relative flex flex-col lg:flex-row">
        {/* Sidebar - Hide completely on mobile */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="hidden lg:block lg:w-64 h-screen sticky top-0 p-6 border-r border-slate-200/50 dark:border-slate-800/50 bg-white/50 dark:bg-gray-900/50 backdrop-blur-xl"
        >
          {/* Logo */}
          <div className="px-4 py-4 lg:py-6 mb-6 lg:mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-xl text-white">📚</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gradient">
                Lectura
              </span>
            </div>
            {/* Mobile menu button */}
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              <span className="text-xl">{isMobileMenuOpen ? '✕' : '☰'}</span>
            </motion.button>
          </div>

          {/* Navigation Groups */}
          <div className={`space-y-6 lg:block ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
            {/* Main Navigation */}
            <div>
              <h3 className="px-4 mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">MAIN</h3>
              <nav className="space-y-1">
                <SidebarLink icon="🎯" label="Dashboard" active />
                <SidebarLink icon="🤖" label="AI Chat" />
                <SidebarLink icon="📚" label="Study Plans" />
              </nav>
            </div>

            {/* Tools */}
            <div>
              <h3 className="px-4 mb-2 text-sm font-semibold text-slate-600 dark:text-slate-400">TOOLS</h3>
              <nav className="space-y-1">
                <SidebarLink icon="📝" label="Notes" />
                <SidebarLink icon="📊" label="Progress" />
                <SidebarLink icon="⚙️" label="Settings" />
              </nav>
            </div>
          </div>

          {/* User Profile - Hide on mobile */}
          <div className="hidden lg:block">
            <UserProfile />
          </div>
        </motion.aside>

        {/* Main Content - Update padding and height */}
        <main className="flex-1 p-4 lg:p-8 lg:pt-12">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 lg:mb-10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  Welcome back, John! 👋
                </h1>
                <p className="text-sm lg:text-base text-slate-600 dark:text-slate-400">
                  Here's an overview of your learning progress
                </p>
              </div>
              
              {/* Quick Actions */}
              <div className="flex gap-3 mt-4 lg:mt-0">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-sm font-medium shadow-lg shadow-purple-500/20"
                >
                  New Study Plan
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 rounded-xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 text-sm font-medium shadow-lg shadow-slate-200/20 dark:shadow-slate-900/20"
                >
                  View Reports
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-10"
          >
            <StatCard
              icon="📚"
              label="Study Hours"
              value="24.5"
              gradient="from-blue-500 to-indigo-500"
            />
            <StatCard
              icon="✅"
              label="Tasks Completed"
              value="12"
              gradient="from-green-500 to-emerald-500"
            />
            <StatCard
              icon="🎯"
              label="Goals Achieved"
              value="8"
              gradient="from-purple-500 to-violet-500"
            />
            <StatCard
              icon="⭐"
              label="Current Streak"
              value="5 days"
              gradient="from-pink-500 to-rose-500"
            />
          </motion.div>

          {/* Two Column Layout - Update to use flex and height */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 lg:h-[calc(100vh-340px)]">
            {/* AI Chat Section - Update height and overflow */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="h-full p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm flex flex-col"
              >
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                  <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                    AI Study Assistant
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium"
                  >
                    New Chat
                  </motion.button>
                </div>
                
                {/* Chat Messages - Update to use flex-grow and overflow */}
                <div className="flex-grow overflow-y-auto space-y-4 lg:space-y-8 mb-4 lg:mb-8 custom-scrollbar">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message.text}
                      isAi={message.isAi}
                    />
                  ))}
                </div>

                {/* Chat Input - Add flex-shrink-0 */}
                <div className="relative flex-shrink-0">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <button className="absolute right-2 lg:right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity - Update height and overflow */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="h-full p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-sm flex flex-col"
            >
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <h2 className="text-lg lg:text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
                  Recent Activity
                </h2>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium"
                >
                  View All
                </motion.button>
              </div>
              <div className="flex-grow overflow-y-auto space-y-2 lg:space-y-4 custom-scrollbar">
                <RecentActivity
                  icon="📚"
                  title="Completed Physics Chapter 5"
                  time="2 hours ago"
                />
                <RecentActivity
                  icon="✍️"
                  title="Wrote Essay on Climate Change"
                  time="5 hours ago"
                />
                <RecentActivity
                  icon="🧮"
                  title="Solved Math Problems"
                  time="Yesterday"
                />
                <RecentActivity
                  icon="🔍"
                  title="Researched History Topic"
                  time="2 days ago"
                />
              </div>
            </motion.div>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNavBar />
    </div>
  );
}
