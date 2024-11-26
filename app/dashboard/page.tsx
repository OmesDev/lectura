'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
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
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
      ${active 
        ? 'bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400' 
        : 'hover:bg-gradient-to-r hover:from-indigo-500/5 hover:via-purple-500/5 hover:to-pink-500/5 text-slate-600 dark:text-slate-400'
      }`}
  >
    <span className="text-xl group-hover:scale-110 transition-transform duration-200">{icon}</span>
    <span className="font-medium">{label}</span>
  </motion.a>
);

const StatCard = ({ icon, label, value, gradient }: { icon: string; label: string; value: string; gradient: string }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"/>
    <div className="relative p-8 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-200">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradient} flex items-center justify-center text-2xl mb-4`}>
        {icon}
      </div>
      <div className="font-medium text-slate-600 dark:text-slate-400 mb-1">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  </motion.div>
);

const ChatMessage = ({ message, isAi = false }: { message: string; isAi?: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`flex gap-4 ${isAi ? 'flex-row' : 'flex-row-reverse'}`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white
      ${isAi 
        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' 
        : 'bg-slate-700'
      }`}
    >
      {isAi ? '🤖' : '👤'}
    </div>
    <div className={`max-w-[80%] p-4 rounded-2xl ${
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

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<any>(null)

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
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white">
            {user?.email?.[0].toUpperCase() || '👤'}
          </div>
          <div>
            <div className="font-medium">{user?.email}</div>
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
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-slate-50 dark:bg-black">
      <BackgroundGradient />
      
      {/* Dashboard Layout */}
      <div className="relative flex">
        {/* Sidebar */}
        <motion.aside 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 h-screen sticky top-0 p-6 border-r border-slate-200 dark:border-slate-800"
        >
          {/* Logo */}
          <div className="px-4 py-6 mb-8">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Lectura
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <SidebarLink icon="🎯" label="Dashboard" active />
            <SidebarLink icon="🤖" label="AI Chat" />
            <SidebarLink icon="📚" label="Study Plans" />
            <SidebarLink icon="📝" label="Notes" />
            <SidebarLink icon="📊" label="Progress" />
            <SidebarLink icon="⚙️" label="Settings" />
          </nav>

          {/* User Profile */}
          <UserProfile />
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 p-12">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
            <p className="text-slate-600 dark:text-slate-400">Here's an overview of your learning progress</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
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

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Chat Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800"
              >
                <h2 className="text-xl font-bold mb-6">AI Study Assistant</h2>
                
                {/* Chat Messages */}
                <div className="space-y-8 mb-8">
                  {messages.map((message, index) => (
                    <ChatMessage
                      key={index}
                      message={message.text}
                      isAi={message.isAi}
                    />
                  ))}
                </div>

                {/* Chat Input */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ask anything..."
                    className="w-full px-6 py-4 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Recent Activity */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
              <div className="space-y-4">
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
    </div>
  );
}
