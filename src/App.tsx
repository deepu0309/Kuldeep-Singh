/// <reference types="vite/client" />
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence, useInView } from 'motion/react';
import Lenis from 'lenis';
import { 
  Terminal, 
  Database, 
  Cpu, 
  ShieldCheck, 
  ChevronRight, 
  Mail, 
  Github, 
  Linkedin, 
  MapPin, 
  Coffee,
  ExternalLink,
  Code2,
  Box,
  Activity,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
  Phone,
  Heart,
  Smartphone,
  Globe,
  Crown,
  ScrollText,
  Sun,
  Moon
} from 'lucide-react';

import LightSpeedPreloader from './components/LightSpeedPreloader';

// --- Types ---
interface Skill {
  icon: React.ReactNode;
  name: string;
  cat: string;
  level: number;
}

interface Project {
  icon: React.ReactNode;
  name: string;
  desc: string;
  tags: string[];
}

interface Experience {
  date: string;
  role: string;
  company: string;
  desc: string;
}

// --- Data ---
const SKILLS: Skill[] = [
  { icon: <Terminal className="w-5 h-5" />, name: "Java 17+", cat: "language", level: 95 },
  { icon: <Code2 className="w-5 h-5" />, name: "Spring Boot", cat: "framework", level: 92 },
  { icon: <Database className="w-5 h-5" />, name: "PostgreSQL", cat: "database", level: 88 },
  { icon: <Activity className="w-5 h-5" />, name: "Grafana", cat: "monitoring", level: 85 },
  { icon: <ShieldCheck className="w-5 h-5" />, name: "JVM Tuning", cat: "devops", level: 80 },
  { icon: <Layers className="w-5 h-5" />, name: "Azure", cat: "cloud", level: 85 },
  { icon: <Box className="w-5 h-5" />, name: "MS365 API", cat: "integration", level: 80 },
  { icon: <Activity className="w-5 h-5" />, name: "Microservices", cat: "architecture", level: 82 },
];

const PROJECTS: Project[] = [
  { 
    icon: <Database className="w-6 h-6" />, 
    name: "ERP Billing & Inventory Engine", 
    desc: "High-performance enterprise middleware for MS Business Central 365. Engineered to eliminate frontal user licensing costs through custom API-driven inventory, billing, and transfer modules. Deployed across 20+ states.", 
    tags: ["Spring Boot", "BC365 API", "MSSQL", "Enterprise Security"] 
  },
  { 
    icon: <MapPin className="w-6 h-6" />, 
    name: "AIS140 Fleet Intel Engine", 
    desc: "Mission-critical backend for AIS140 compliant device tracking across 20+ states. Engineered a high-throughput architecture with TCP listeners and RabbitMQ. Implemented Firebase FCM for cross-platform notifications and JWT for hardened API security.", 
    tags: ["Spring Boot", "TCP Listener", "RabbitMQ", "Firebase FCM", "JWT Security"] 
  },
  { 
    icon: <ShieldCheck className="w-6 h-6" />, 
    name: "AIS140 Grievance Ecosystem", 
    desc: "State-mandated grievance portal for AIS140 compliance. Integrated MSG91 for Secure Mobile OTP login and engineered inter-application SSO for unified access. Features full SLA tracking, automated escalation, and agent resolution metrics.", 
    tags: ["Spring Boot", "MSG91 SMS", "JWT", "SLA Tracking"] 
  },
  { 
    icon: <Terminal className="w-6 h-6" />, 
    name: "Enterprise VMS Network", 
    desc: "Digital reception intelligence for multi-location facilities. Features Mobile OTP verification, repeat visitor photo-detection, and hierarchical card-to-floor assignment. Automated host workflows for rescheduling/rejection via email, with real-time employee data refresh using Azure Graph APIs.", 
    tags: ["Spring Boot", "Azure Graph API", "OTP Auth", "Email SMTP"] 
  }
];

const EXPERIENCE: Experience[] = [
  { 
    date: "2024 – PRESENT", 
    role: "Backend Developer", 
    company: "Rosmerta Technologies", 
    desc: "Architected the MSRTC Fleet Management System, managing one of Asia's largest bus fleets (~18,000+ vehicles). Optimized core Spring Boot services, established Grafana monitoring, and improved query performance by 40% through deep JPA tuning." 
  },
  { 
    date: "2023 – 2024", 
    role: "Social Media Designer", 
    company: "GITM", 
    desc: "Collaborated on migrating monolithic systems into containerized microservices. Implemented comprehensive integration test suites using JUnit." 
  },
];

const HOBBIES = [
  { 
    icon: <Smartphone className="w-6 h-6 md:w-8 md:h-8" />, 
    name: "Mobile Gaming", 
    desc: "High-refresh-rate mechanics and competitive strategies. Always optimizing for the winning frame.",
    color: "bg-red-400"
  },
  { 
    icon: <Globe className="w-6 h-6 md:w-8 md:h-8" />, 
    name: "Geopolitics", 
    desc: "Analyzing the global 'backend'—decoding the complex logic behind world systems and power shifts.",
    color: "bg-blue-400"
  },
  { 
    icon: <Crown className="w-6 h-6 md:w-8 md:h-8" />, 
    name: "Chess", 
    desc: "Pure algorithmic battle. Pattern recognition and strategic depth across a 64-square grid.",
    color: "bg-accent-spring"
  },
  { 
    icon: <ScrollText className="w-6 h-6 md:w-8 md:h-8" />, 
    name: "History", 
    desc: "Tracing the legacy code of civilizations to understand how modern architecture was built.",
    color: "bg-purple-400"
  }
];

// --- Components ---

const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(var(--color-accent-java)_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.05] dark:opacity-[0.1]"></div>
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, x = 0, y = 40, className = "" }: { children: React.ReactNode, delay?: number, x?: number, y?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, x, y, scale: 0.98 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.16, 1, 0.3, 1]
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ text, centered = false }: { text: string, centered?: boolean }) => (
  <div className={`flex items-center gap-3 mb-6 ${centered ? 'justify-center' : ''}`}>
    <div className="bg-accent-spring border border-accent-java px-4 py-1.5 rounded-full neo-shadow flex items-center gap-2">
      <Zap className="w-3.5 h-3.5 fill-accent-java" />
      <span className="font-bold text-[10px] tracking-tight text-accent-java uppercase">{text}</span>
    </div>
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    
    try {
      const key = import.meta.env.VITE_STATIC_FORMS_KEY;
      if (!key) {
        setIsSubmitting(false);
        alert('Configuration Missing: Please set VITE_STATIC_FORMS_KEY in your deployment environment variables.');
        return;
      }
      
      const response = await fetch(`https://api.staticforms.xyz/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          accessKey: key || '',
          subject: 'New Connection Request - Portfolio',
          replyTo: '@' // Encourages service to use the email field for replies if present
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      if (!loading) {
        lenis.raf(time);
      }
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <div className="min-h-screen selection:bg-accent-spring selection:text-accent-java">
      <AnimatePresence>
        {loading && <LightSpeedPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={loading ? 'hidden' : 'block'}>
        <BackgroundParticles />
        
        {/* Nav */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-accent-java/10 py-4 md:py-5 px-4 md:px-8 lg:px-12 flex justify-between items-center"
        >
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-accent-spring rounded-lg border-2 border-accent-java flex items-center justify-center neo-shadow group-hover:translate-x-[1px] group-hover:translate-y-[1px] group-hover:shadow-none transition-all">
            <Cpu className="w-5 h-5 lg:w-6 lg:h-6" />
          </div>
          <span className="font-bold text-base lg:text-lg tracking-tighter">KULDEEP.SPRING</span>
        </a>
        <div className="hidden lg:flex gap-10 font-bold text-[13px] uppercase tracking-tight text-accent-java">
          <a href="#about" className="hover:text-accent-spring transition-colors">Dashboard</a>
          <a href="#skills" className="hover:text-accent-spring transition-colors">Stack</a>
          <a href="#projects" className="hover:text-accent-spring transition-colors">Architecture</a>
          <a href="#glitch-storm" className="hover:text-accent-spring transition-colors">Labs</a>
          <a href="#hobbies" className="hover:text-accent-spring transition-colors">Side Quests</a>
          <a href="#contact" className="hover:text-accent-spring transition-colors">Connect</a>
        </div>
        <div className="hidden md:flex lg:hidden gap-4 font-bold text-[11px] uppercase tracking-tight text-accent-java">
          <a href="#about" className="hover:text-accent-spring transition-colors">Dash</a>
          <a href="#skills" className="hover:text-accent-spring transition-colors">Stack</a>
          <a href="#projects" className="hover:text-accent-spring transition-colors">Arch</a>
          <a href="#hobbies" className="hover:text-accent-spring transition-colors">Side</a>
          <a href="#contact" className="hover:text-accent-spring transition-colors">Contact</a>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-accent-java flex items-center justify-center neo-shadow-hover transition-all bg-surface text-accent-java"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 md:w-6 md:h-6" /> : <Moon className="w-5 h-5 md:w-6 md:h-6" />}
          </button>
          <a href="#contact" className="bg-accent-java text-bg px-4 md:px-6 py-1.5 md:py-2 rounded-full font-bold text-xs md:text-sm neo-shadow-hover transition-all">
            JOIN NOW
          </a>
        </div>
      </motion.nav>

      <main className="relative z-10 mx-auto max-w-7xl px-6 md:px-8 lg:px-12 space-y-32 md:space-y-48 py-32">
        
        {/* --- Hero Section --- */}
        <section id="hero" className="min-h-[70vh] lg:min-h-[85vh] grid lg:grid-cols-2 gap-12 items-center pt-20 lg:pt-0">
          <div className="text-left order-2 lg:order-1 pt-8 lg:pt-12">
            <SectionLabel text="WELCOME TO MY PORTFOLIO" />
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.85] mb-6 md:mb-8"
            >
              FIND THE <br/>
              <span className="relative inline-block">
                BEST CORE
                <div className="absolute bottom-1 md:bottom-2 left-0 w-full h-2 md:h-4 bg-accent-spring -z-10" />
              </span> <br/>
              FOR SYSTEMS
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-xl text-muted font-medium text-base md:text-lg leading-relaxed mb-8 md:mb-12"
            >
              Specialized backend software engineer focused on high-performance systems. 
              Expert in microservices, database architecture, and API scaling.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4 md:gap-6"
            >
              <a href="#projects" className="neo-button scale-100 lg:scale-110">
                GET STARTED <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
              </a>
              <a href="#about" className="bg-accent-java text-bg px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-sm md:text-base neo-shadow-hover transition-all">
                BROWSE STACK
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="neo-card bg-white p-6 md:p-10 lg:p-12 max-w-sm md:max-w-xl lg:max-w-md mx-auto lg:ml-auto">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-accent-spring rounded-full border-2 border-accent-java flex items-center justify-center mx-auto mb-6 md:mb-8 neo-shadow">
                <Sparkles className="w-6 h-6 lg:w-8 lg:h-8" />
              </div>
              <h3 className="text-xl lg:text-2xl font-black text-center mb-2 tracking-tight uppercase">JOIN THE NETWORK</h3>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-accent-spring/20 border-2 border-accent-java rounded-2xl p-8 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-accent-java" />
                  <div className="font-black text-lg mb-2">REQUEST RECEIVED</div>
                  <p className="text-xs font-bold text-muted uppercase">Protocol initiated. Expect contact within 24 cycles.</p>
                </motion.div>
              ) : (
                <>
                  <p className="text-muted text-center text-xs md:text-sm mb-6 md:mb-8 font-medium italic">Enter your details to initiate contact</p>
                  
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 opacity-60">Full Identity</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="KULDEEP SINGH"
                        className="w-full border-2 border-accent-java rounded-xl p-3 md:p-4 text-sm font-bold bg-bg/50 focus:bg-white outline-none transition-all placeholder:opacity-30"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold uppercase tracking-widest ml-1 opacity-60">WhatsApp No.</label>
                      <input 
                        required
                        name="whatsapp"
                        type="tel" 
                        placeholder="+91 XXXX-XXXXXX"
                        className="w-full border-2 border-accent-java rounded-xl p-3 md:p-4 text-sm font-bold bg-bg/50 focus:bg-white outline-none transition-all placeholder:opacity-30"
                      />
                    </div>
                    <button 
                      disabled={isSubmitting}
                      type="submit"
                      className="w-full bg-accent-spring border-2 border-accent-java rounded-xl py-4 md:py-5 font-black text-base md:text-lg neo-shadow-hover transition-all mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'SYNCING...' : 'COMPLY NOW'}
                    </button>
                  </form>
                </>
              )}
              <p className="text-[9px] md:text-[10px] text-muted text-center mt-5 md:mt-6 font-medium">By connecting, you agree to technical T&C and SLA policies</p>
            </div>
            {/* Float Element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 md:-bottom-10 -left-4 md:-left-10 bg-white border-2 border-accent-java p-3 md:p-4 rounded-xl md:rounded-2xl neo-shadow flex items-center gap-2 md:gap-3 z-20"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-400 rounded-full border-2 border-accent-java flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <div className="font-black text-[10px] md:text-xs">99.9% UPTIME</div>
                <div className="text-[8px] md:text-[10px] text-muted font-bold">CORE ESTABLISHED</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="scroll-mt-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <FadeIn x={-50}>
              <div className="relative aspect-[4/5] bg-surface rounded-2xl lg:rounded-3xl overflow-hidden border-2 border-accent-java group neo-shadow max-w-md mx-auto lg:mx-0">
                <img 
                  id="profile-img" 
                  src="/profile.jpg" 
                  alt="Kuldeep Singh" 
                  className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    document.getElementById('placeholder-content')?.classList.remove('hidden');
                  }}
                  onLoad={(e) => {
                    (e.target as HTMLImageElement).style.display = 'block';
                    document.getElementById('placeholder-content')?.classList.add('hidden');
                  }}
                />

                <div id="placeholder-content" className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-surface">
                  <Coffee className="w-12 h-12 md:w-16 md:h-16 text-accent-spring mb-4" />
                  <p className="font-bold text-base md:text-lg leading-tight uppercase tracking-tighter">
                    profile.jpg <br/>
                    AWAITING SCAN
                  </p>
                </div>

                <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-accent-spring border-2 border-accent-java px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black z-20 neo-shadow whitespace-nowrap">
                  KULDEEP SINGH
                </div>
              </div>
            </FadeIn>
            
            <div className="space-y-8 md:space-y-12">
              <FadeIn delay={0.2}>
                <div className="bg-accent-spring/20 border border-accent-spring px-4 py-1.5 rounded-full inline-flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 bg-accent-spring rounded-full animate-pulse" />
                  <span className="font-bold text-[10px] uppercase tracking-widest text-accent-java">WHO I AM</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 md:mb-8 leading-none">ENGINEER & <br className="hidden lg:block" /> ARCHITECT.</h2>
                <div className="text-base md:text-xl text-muted font-medium leading-relaxed space-y-6">
                  <p>
                    Hey — I'm <span className="text-accent-java font-bold underline decoration-accent-spring decoration-4">Kuldeep Singh</span>, a software engineer based in Gurugram who thrives on solving 
                    complex data synchronization and infrastructure challenges.
                  </p>
                  <p>
                    I specialize in <span className="text-accent-java font-bold">Java and Spring Boot</span> backend development, 
                    focusing on scalable microservices, managing inventory logic, 
                    and ensuring bulletproof database integrations.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-8">
                  {[
                    { n: "100%", l: "SYSTEM Uptime" },
                    { n: "O(1)", l: "Logic SCALE" },
                    { n: "∞", l: "TEA COFFEE" }
                  ].map((s, i) => (
                    <div key={i} className={`neo-card p-4 md:p-8 text-center hover:bg-accent-spring transition-all duration-300 group ${i === 2 ? 'col-span-2 sm:col-span-1' : ''}`}>
                      <div className="text-2xl md:text-4xl font-black text-accent-java group-hover:scale-110 transition-transform">{s.n}</div>
                      <div className="text-[9px] md:text-[11px] font-bold text-muted uppercase tracking-tight mt-1 md:mt-3 opacity-60">{s.l}</div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section id="skills" className="scroll-mt-32 text-center flex flex-col items-center">
          <FadeIn>
            <SectionLabel text="AVAILABLE RIGHT NOW" centered />
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-10 md:mb-16">TECH STACK ENGINE</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 w-full">
            {SKILLS.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="neo-card flex flex-col items-center text-center group hover:bg-accent-spring transition-colors p-6 lg:p-8"
              >
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-bg border-2 border-accent-java rounded-lg lg:rounded-xl flex items-center justify-center mb-4 lg:mb-6 group-hover:bg-white transition-colors neo-shadow">
                  {React.cloneElement(s.icon as React.ReactElement, { className: "w-5 h-5 lg:w-6 lg:h-6" })}
                </div>
                <div className="font-black text-base lg:text-lg mb-1 uppercase tracking-tight whitespace-nowrap">{s.name}</div>
                <div className="font-bold text-[9px] lg:text-[10px] text-muted uppercase mb-4 lg:mb-6 opacity-60 tracking-widest">{s.cat}</div>
                <div className="w-full h-2 lg:h-3 bg-bg border-2 border-accent-java rounded-full overflow-hidden p-[1px] lg:p-[2px] relative">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    transition={{ 
                      duration: 2.5, 
                      delay: 0.5 + (i * 0.1),
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    className="h-full bg-accent-spring rounded-full relative overflow-hidden"
                  >
                    <motion.div 
                      animate={{ 
                        x: ['-100%', '200%'] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "linear",
                        delay: 2.5 // Start shimmer after fill-up
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-1/2"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="scroll-mt-32">
          <FadeIn>
            <SectionLabel text="NEAR YOU · GURUGRAM" centered />
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-10 md:mb-16 text-center italic uppercase leading-none">AVAILABLE <br className="md:hidden" /> ARCHITECTURE</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            {PROJECTS.map((p, i) => (
              <div key={i} className="h-full">
                <FadeIn delay={i * 0.1} className="h-full">
                  <motion.div 
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="neo-card group h-full relative overflow-hidden p-6 md:p-8 lg:p-10 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-6 md:mb-8 shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-bg border-2 border-accent-java rounded-xl md:rounded-2xl flex items-center justify-center text-accent-java neo-shadow group-hover:bg-accent-spring transition-colors">
                        {React.cloneElement(p.icon as React.ReactElement, { className: "w-6 h-6 md:w-7 md:h-7" })}
                      </div>
                      <a href="#" className="p-1.5 md:p-2 bg-bg border-2 border-accent-java rounded-lg text-accent-java neo-shadow hover:translate-y-px transition-all">
                        <ExternalLink className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    </div>
                    <h3 className="text-xl md:text-2xl lg:text-xl xl:text-2xl font-black mb-3 md:mb-4 uppercase tracking-tighter leading-[0.9]">{p.name}</h3>
                    <p className="font-medium text-muted text-xs md:text-sm leading-relaxed mb-6 md:mb-8 flex-grow">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 md:gap-3 shrink-0">
                      {p.tags.map((t, j) => (
                        <span key={j} className="px-3 md:px-4 py-1 md:py-1.5 bg-bg border-2 border-accent-java rounded-full text-[8px] md:text-[9px] lg:text-[10px] font-black uppercase tracking-widest whitespace-nowrap group-hover:bg-accent-spring/20">
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                </FadeIn>
              </div>
            ))}
          </div>
        </section>

        {/* --- Glitch Storm (Special Section) --- */}
        <section id="glitch-storm" className="scroll-mt-32">
          <div className="bg-[#0a0a0a] text-white p-8 md:p-12 lg:p-16 rounded-3xl lg:rounded-[3rem] border-4 border-accent-java relative overflow-hidden group selection:bg-accent-spring selection:text-accent-java">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-full bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,#1a1a1a_2px,#1a1a1a_4px)]" />
              <motion.div 
                animate={{ y: ["-100%", "100%"] }} 
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-20 bg-accent-spring/10 blur-3xl" 
              />
            </div>
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center text-center lg:text-left">
              <div className="flex flex-col items-center lg:items-start">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 mb-6 md:mb-8"
                >
                  <div className="bg-red-500/20 border border-red-500 px-4 py-1.5 rounded-full flex items-center gap-2">
                    <Activity className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    <span className="font-bold text-[10px] tracking-tight text-red-500 uppercase">Warning: HIGH FRUSTRATION</span>
                  </div>
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[0.85] italic uppercase text-accent-spring">
                  GLITCH <br className="hidden lg:block" /> 
                  <span className="text-white lg:text-accent-spring drop-shadow-[4px_4px_0px_#1a1a1a]">STORM</span>
                </h2>
                
                <p className="font-bold text-base md:text-lg lg:text-xl text-gray-400 mb-8 lg:mb-10 leading-relaxed max-w-md uppercase mx-auto lg:mx-0">
                  A hyper-fast, chaotic arcade experience designed to push your reflexes to the breaking point. Architected as a stress-test for UI interaction.
                </p>
                
                <a 
                  href="https://glitch.kuldeepsingh.space/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-4 bg-accent-spring text-accent-java px-8 py-4 rounded-2xl font-black text-lg lg:text-xl hover:translate-x-2 transition-all neo-shadow"
                >
                  ENTER THE STORM <Zap className="w-6 h-6 fill-current" />
                </a>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                className="relative aspect-square lg:aspect-video bg-gray-900 rounded-2xl border-2 border-accent-java/30 overflow-hidden shadow-2xl group-hover:border-accent-spring/50 transition-colors"
              >
                 {/* Visual Representation */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                       <motion.div 
                        animate={{ 
                          x: [0, -2, 2, -2, 0],
                          y: [0, 1, -1, 1, 0],
                        }}
                        transition={{ duration: 0.1, repeat: Infinity }}
                        className="text-8xl md:text-[12rem] font-black opacity-10 blur-sm select-none italic"
                       >
                        GLITCH
                       </motion.div>
                       <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div
                            animate={{ 
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          >
                             <Cpu className="w-24 h-24 md:w-32 md:h-32 text-accent-spring" />
                          </motion.div>
                       </div>
                    </div>
                 </div>
                 {/* Scanlines Overlay */}
                 <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- Experience Section --- */}
        <section id="experience" className="scroll-mt-32 max-w-4xl">
          <SectionLabel text="HISTORY LOG" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 md:mb-16 italic uppercase leading-none">SYSTEM TRACKS</h2>
          <div className="space-y-12 md:space-y-20">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="flex flex-col lg:flex-row gap-6 lg:gap-10 group">
                <div className="lg:w-40 shrink-0 lg:text-right lg:pt-2">
                  <span className="font-black text-[10px] md:text-sm text-muted tracking-tight opacity-40 lg:opacity-60 uppercase">{e.date}</span>
                </div>
                <div className="relative hidden lg:block">
                  <div className="w-1 h-full bg-accent-java/10 absolute left-1/2 -translate-x-1/2 top-4 rounded-full" />
                  <div className="w-6 h-6 rounded-full bg-accent-spring border-2 border-accent-java neo-shadow relative z-10 group-hover:scale-125 transition-transform" />
                </div>
                <div className="space-y-3 md:space-y-6">
                  <h3 className="text-3xl md:text-4xl lg:text-3xl font-black tracking-tight leading-none uppercase group-hover:text-accent-spring transition-colors">{e.role}</h3>
                  <div className="inline-block bg-accent-java text-bg px-4 py-1.5 rounded-full text-[10px] md:text-xs font-black">@ {e.company}</div>
                  <p className="text-muted font-medium text-base md:text-lg lg:text-base leading-relaxed pt-2 max-w-2xl">
                    {e.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Hobbies Section --- */}
        <section id="hobbies" className="scroll-mt-32">
          <SectionLabel text="BEYOND THE TERMINAL" />
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 md:mb-16 italic uppercase leading-none">SIDE QUESTS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOBBIES.map((h, i) => (
              <div key={i} className="h-full">
                <FadeIn delay={i * 0.1} className="h-full">
                  <motion.div 
                    whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
                    className="neo-card h-full p-8 flex flex-col items-center text-center group cursor-default"
                  >
                    <div className={`w-16 h-16 md:w-20 md:h-20 ${h.color} border-2 border-accent-java rounded-2xl flex items-center justify-center neo-shadow mb-8 group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all`}>
                      {h.icon}
                    </div>
                    <h3 className="text-xl font-black mb-3 uppercase tracking-tight">{h.name}</h3>
                    <p className="text-sm font-medium text-muted leading-relaxed opacity-80 italic">
                      "{h.desc}"
                    </p>
                  </motion.div>
                </FadeIn>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 bg-accent-java text-bg p-8 md:p-12 rounded-3xl neo-shadow flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-accent-spring rounded-full border-2 border-white flex items-center justify-center shrink-0">
                <Heart className="w-8 h-8 text-accent-java fill-current" />
              </div>
              <div className="text-center md:text-left">
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight">Open Source Mindset</h4>
                <p className="text-sm md:text-base font-bold text-gray-400 mt-1">GIVING BACK TO THE COMMUNITY IS PART OF MY CORE LOGIC.</p>
              </div>
            </div>
            <a href="https://github.com/deepu0309" target="_blank" rel="noopener noreferrer" className="bg-accent-spring text-accent-java px-8 py-4 rounded-xl font-black text-sm uppercase neo-shadow-hover transition-all whitespace-nowrap">
              VIEW GITHUB OPS
            </a>
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="scroll-mt-32 max-w-4xl">
          <div className="neo-card bg-accent-spring text-accent-java p-8 md:p-12 lg:p-20 relative overflow-hidden">
            <div className="absolute top-4 md:top-10 right-4 md:right-10 opacity-10 md:opacity-20 rotate-12 -z-0">
              <Zap className="w-20 h-20 lg:w-32 lg:h-32 fill-accent-java" />
            </div>
            
            <div className="relative z-10">
              <SectionLabel text="STAY CONNECTED" />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 md:mb-10 leading-[0.85] uppercase">
                LET'S COMPILE <br/> 
                <span className="text-bg drop-shadow-[2px_2px_0px_var(--color-shadow)]">SOMETHING GREAT</span>
              </h2>
              <p className="font-bold text-base md:text-xl leading-relaxed mb-12 md:mb-16 max-w-2xl">
                Currently open to new opportunities to build robust backend systems. 
                Whether you have a complex ERP integration or a microservices challenge, my inbox is open.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16">
                {[
                  { icon: <Mail />, l: "email", v: "hello@kuldeepsingh.dev", href: "mailto:hello@kuldeepsingh.dev" },
                  { icon: <Github />, l: "github", v: "github.com/deepu0309", href: "https://github.com/deepu0309" },
                  { icon: <Linkedin />, l: "linkedin", v: "linkedin.com/in/singh-deep0309", href: "https://www.linkedin.com/in/singh-deep0309/" },
                  { icon: <Phone />, l: "phone", v: "+91 8708946881", href: "tel:+918708946881" }
                ].map((c, i) => (
                  <motion.a 
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={i}
                    className="flex items-center gap-4 lg:gap-6 p-4 lg:p-6 bg-surface border-2 border-accent-java rounded-xl lg:rounded-2xl neo-shadow-hover transition-all overflow-hidden"
                  >
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-accent-spring border-2 border-accent-java rounded-lg lg:rounded-xl flex items-center justify-center shrink-0">
                      {React.cloneElement(c.icon as React.ReactElement, { className: "w-5 h-5 lg:w-6 lg:h-6" })}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-[9px] lg:text-[10px] font-black text-muted uppercase tracking-widest opacity-60 mb-0.5 lg:mb-1">{c.l}</div>
                      <div className="text-xs lg:text-base font-black uppercase tracking-tight break-all">{c.v}</div>
                    </div>
                  </motion.a>
                ))}
              </div>

              <footer className="pt-8 md:pt-10 lg:pt-12 border-t-2 border-accent-java/20 flex flex-col md:flex-row justify-between gap-4 lg:gap-6 text-[9px] lg:text-[11px] font-black uppercase tracking-tight opacity-70">
                <div>
                  © 2026 KULDEEP SINGH. ARCHITECTED FOR PERFORMANCE.
                  <span className="block md:inline md:ml-4 mt-1 md:mt-0 text-accent-java opacity-50">
                    EXPERIMENTAL UNIT: ACTIVE
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <span>TERMS</span>
                  <span>PRIVACY</span>
                  <span className="text-white drop-shadow-[1px_1px_0px_var(--color-shadow)]">V2.0.42</span>
                </div>
              </footer>
            </div>
          </div>
        </section>

      </main>
      </div>
    </div>
  );
}
