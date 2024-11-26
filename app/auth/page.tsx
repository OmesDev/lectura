'use client';

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';
import Image from "next/image";
import { useSearchParams, useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { toast } from 'sonner'

const supabase = createClientComponentClient<Database>()

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
    <motion.div
      animate={{
        opacity: [0.5, 0.8, 0.5],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        opacity: [0.3, 0.6, 0.3],
        scale: [1, 1.3, 1],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl"
    />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8B5CF6,#D946EF,#EC4899)] opacity-5 mix-blend-multiply dark:opacity-10"/>
  </div>
);

const FormField = ({ 
  label, 
  type, 
  name,
  placeholder, 
  autoComplete 
}: { 
  label: string; 
  type: string; 
  name: string;
  placeholder: string; 
  autoComplete?: string 
}) => (
  <div className="relative group">
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className="w-full px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-slate-200 dark:border-slate-800 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 placeholder-transparent peer"
    />
    <label className="absolute left-4 -top-2.5 text-sm text-slate-600 dark:text-slate-400 bg-white dark:bg-gray-900 px-1 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-2.5 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-purple-500">
      {label}
    </label>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-sm"/>
  </div>
);

const SocialButton = ({ provider, icon }: { provider: string; icon: string }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type="button"
    className="group relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/50 dark:bg-gray-900/50 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all duration-200"
  >
    <span className="relative z-10 flex items-center gap-2">
      <Image src={icon} alt={provider} width={20} height={20} className="transition-transform group-hover:scale-110"/>
      <span className="text-sm font-medium">{provider}</span>
    </span>
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-200"/>
  </motion.button>
);

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        toast.success('Successfully signed in!');
        router.push('/dashboard');
        
      } else {
        const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;
        
        if (password !== confirmPassword) {
          toast.error('Passwords do not match');
          return;
        }
        
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              // You can add additional user metadata here if needed
            }
          },
        });
        
        if (signUpError) throw signUpError;

        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;
        
        toast.success('Account created successfully!');
        router.push('/dashboard');
      }
    } catch (error: Error | any) {
      toast.error(error?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="h-screen overflow-hidden font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black flex items-center justify-center relative">
      <BackgroundGradient />
      
      <div className="w-full max-w-5xl px-4 relative flex flex-col lg:flex-row items-center gap-8 lg:justify-end">
        {/* Left Side - Branding */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 text-center lg:text-left lg:max-w-md lg:absolute lg:left-4"
        >
          <motion.a 
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block mb-6"
          >
            <span className="text-4xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Lectura
            </span>
          </motion.a>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl sm:text-4xl font-bold mb-4"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={isLogin ? 'login' : 'signup'}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="block"
              >
                {isLogin ? 'Welcome back!' : 'Join our community'}
              </motion.span>
            </AnimatePresence>
          </motion.h1>
          
          {/* Trust Indicators */}
          <div className="hidden lg:flex flex-col gap-3">
            {[
              { icon: "🔒", text: "Enterprise-grade security" },
              { icon: "🌟", text: "Trusted by 100,000+ students" },
              { icon: "🎓", text: "Used in top universities" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + (i * 0.1) }}
                className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
              >
                <span className="text-2xl">{item.icon}</span>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:w-1/2 w-full max-w-md lg:mr-4"
        >
          <div className="relative">
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
                rotate: [0, 1, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl"
            />
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-purple-500/5 p-6">
              {/* Tab Switcher */}
              <div className="flex gap-4 mb-6 p-1 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    ${isLogin 
                      ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
                    ${!isLogin 
                      ? 'bg-white dark:bg-gray-900 text-purple-600 dark:text-purple-400 shadow-sm' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400'
                    }`}
                >
                  Sign Up
                </motion.button>
              </div>

              {/* Form */}
              <AnimatePresence mode="wait">
                <motion.form
                  key={isLogin ? 'login' : 'signup'}
                  initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Social Login Buttons */}
                  <div className="grid grid-cols-2 gap-4">
                    <SocialButton provider="Google" icon="/auth/google.svg" />
                    <SocialButton provider="GitHub" icon="/auth/github.svg" />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-800"/>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white dark:bg-gray-900 text-slate-500">
                        or continue with email
                      </span>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <FormField 
                      label="Email" 
                      type="email" 
                      name="email"
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                    <FormField 
                      label="Password" 
                      type="password" 
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                    {!isLogin && (
                      <FormField 
                        label="Confirm Password" 
                        type="password" 
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        autoComplete="new-password"
                      />
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  {isLogin && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 group">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-purple-500 focus:ring-purple-500 transition-colors group-hover:border-purple-500"
                        />
                        <span className="text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">Remember me</span>
                      </label>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href="#forgot-password"
                        className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
                      >
                        Forgot password?
                      </motion.a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="group relative w-full py-2.5 rounded-xl transition-all duration-200 disabled:opacity-70"
                  >
                    <motion.span 
                      className="relative z-10 flex items-center justify-center text-white font-medium"
                      animate={isLoading ? { opacity: [1, 0.5, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                      ) : (
                        <>
                          {isLogin ? 'Sign In' : 'Create Account'}
                          <motion.svg 
                            whileHover={{ x: 5 }}
                            className="w-5 h-5 ml-2" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </>
                      )}
                    </motion.span>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-100 group-hover:opacity-90 transition-opacity duration-200"/>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur transition-opacity duration-200"/>
                  </motion.button>
                </motion.form>
              </AnimatePresence>
            </div>
          </div>

          {/* Terms and Privacy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400"
          >
            By continuing, you agree to our{' '}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="#terms" 
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Terms of Service
            </motion.a>
            {' '}and{' '}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href="#privacy" 
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              Privacy Policy
            </motion.a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
