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
  Layers
} from 'lucide-react';

import SymbolRain from './components/SymbolRain';
import CustomCursor from './components/CustomCursor';
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
  { icon: <Terminal className="w-5 h-5 text-accent-spring" />, name: "Java 17+", cat: "language", level: 95 },
  { icon: <Code2 className="w-5 h-5 text-accent-spring" />, name: "Spring Boot", cat: "framework", level: 92 },
  { icon: <Database className="w-5 h-5 text-accent-spring" />, name: "PostgreSQL", cat: "database", level: 88 },
  { icon: <Activity className="w-5 h-5 text-accent-spring" />, name: "Grafana", cat: "monitoring", level: 85 },
  { icon: <ShieldCheck className="w-5 h-5 text-accent-spring" />, name: "JVM Tuning", cat: "devops", level: 80 },
  { icon: <Layers className="w-5 h-5 text-accent-spring" />, name: "Azure", cat: "cloud", level: 85 },
  { icon: <Box className="w-5 h-5 text-accent-spring" />, name: "MS365 API", cat: "integration", level: 80 },
  { icon: <Activity className="w-5 h-5 text-accent-spring" />, name: "Microservices", cat: "architecture", level: 82 },
];

const PROJECTS: Project[] = [
  { 
    icon: <Box className="w-6 h-6" />, 
    name: "ERP Billing & Inventory Engine", 
    desc: "Architected a synchronized backend integrating a local PostgreSQL database with an MS365 ERP inventory and billing frontend. Handled complex state-machine logic for shipment holds.", 
    tags: ["Spring Boot", "MS365 ERP", "PostgreSQL"] 
  },
  { 
    icon: <Activity className="w-6 h-6" />, 
    name: "Fleet Tracking System", 
    desc: "Developed a comprehensive vehicle tracking and fleet management application. Integrated Firebase Cloud Messaging (FCM) to dispatch real-time vehicle alerts and status updates.", 
    tags: ["Java", "Firebase FCM", "REST API"] 
  },
  { 
    icon: <ShieldCheck className="w-6 h-6" />, 
    name: "Corporate Grievance Portal", 
    desc: "Built an internal corporate intranet for IT ticketing. Leveraged Azure to sync and authenticate corporate employee data for seamless SSO and role-based escalation.", 
    tags: ["Spring Boot", "Azure", "Microservices"] 
  },
  { 
    icon: <Terminal className="w-6 h-6" />, 
    name: "Smart VMS System", 
    desc: "Created a centralized Visitor Management System for enterprise facilities. Utilized Azure to enable secure corporate employee data lookups for host verification.", 
    tags: ["Java", "Azure AD", "REST API"] 
  }
];

const EXPERIENCE: Experience[] = [
  { 
    date: "2024 – PRESENT", 
    role: "Backend Developer", 
    company: "Rosmerta Technologies", 
    desc: "Leading core Spring Boot development. Established Grafana dashboards for JVM monitoring and optimized query latency by 40% through JPA tuning." 
  },
  { 
    date: "2023 – 2024", 
    role: "Social Media Designer", 
    company: "GITM", 
    desc: "Collaborated on migrating monolithic systems into containerized microservices. Implemented comprehensive integration test suites using JUnit." 
  },
];

// --- Components ---

const BackgroundParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[radial-gradient(#6db33f_1px,transparent_1px)] [background-size:40px_40px] opacity-10"></div>
      <div className="absolute inset-0 bg-[#080810] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150"></div>
    </div>
  );
};

const FadeIn = ({ children, delay = 0, x = 0, y = 40 }: { children: React.ReactNode, delay?: number, x?: number, y?: number }) => (
  <motion.div
    initial={{ opacity: 0, x, y, scale: 0.95, skewY: 2 }}
    whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, skewY: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.16, 1, 0.3, 1],
      scale: { type: "spring", damping: 20, stiffness: 100 }
    }}
  >
    {children}
  </motion.div>
);

const SectionLabel = ({ text, centered = false }: { text: string, centered?: boolean }) => (
  <div className={`flex items-center gap-4 mb-2 ${centered ? 'justify-center' : ''}`}>
    <div className="w-8 h-[1px] bg-accent-spring"></div>
    <span className="font-mono text-[10px] tracking-widest text-accent-spring uppercase">{text}</span>
    {centered && <div className="w-8 h-[1px] bg-accent-spring"></div>}
  </div>
);

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
    <div className="min-h-screen selection:bg-accent-spring selection:text-bg">
      <AnimatePresence>
        {loading && <LightSpeedPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={loading ? 'hidden' : 'block'}>
        <CustomCursor />
        <SymbolRain />
        <BackgroundParticles />
        
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-accent-spring z-[100] origin-left"
          style={{ scaleX }}
        />

        {/* Nav */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center"
        >
        <a href="#hero" className="font-mono font-bold text-accent-spring hover:glow-spring transition-all">
          &lt;kuldeep.java /&gt;
        </a>
        <div className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-tighter text-muted">
          <a href="#about" className="hover:text-accent-spring transition-colors">01. init()</a>
          <a href="#skills" className="hover:text-accent-spring transition-colors">02. getDeps()</a>
          <a href="#projects" className="hover:text-accent-spring transition-colors">03. exec()</a>
          <a href="#contact" className="hover:text-accent-spring transition-colors">04. exit()</a>
        </div>
      </motion.nav>

      <main className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 space-y-32 py-32">
        
        {/* --- Hero Section --- */}
        <section id="hero" className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <SectionLabel text="Backend software engineer" centered />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 max-w-4xl"
          >
            Architecting <span className="text-accent-spring">resilient</span> systems for the <span className="text-accent-java">enterprise.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-muted font-mono text-sm leading-relaxed mb-12"
          >
            I design, build, and optimize high-performance backend infrastructure. 
            Specializing in Java, Spring Boot, and robust enterprise integrations with real-time JVM monitoring.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href="#projects" className="bg-accent-spring text-bg px-8 py-3 rounded font-mono text-xs font-bold hover:translate-y-[-2px] transition-transform flex items-center gap-2">
              View Architecture <ChevronRight className="w-4 h-4" />
            </a>
            <a href="#contact" className="border border-white/10 px-8 py-3 rounded font-mono text-xs hover:border-accent-spring hover:text-accent-spring transition-all">
              Initialize Connection
            </a>
          </motion.div>
        </section>

        {/* --- About Section --- */}
        <section id="about" className="scroll-mt-32">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <FadeIn x={-50}>
              <div className="relative aspect-[4/5] bg-surface rounded-xl overflow-hidden border border-white/5 group">
                <div className="absolute inset-0 bg-accent-spring/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-surface-brighter md:bg-surface">
                  <Coffee className="w-12 h-12 text-accent-spring mb-4 opacity-20" />
                  <p className="font-mono text-xs text-muted leading-relaxed">
                    // Image Asset Placeholder <br/>
                    System is currently rendering <br/>
                    optimized profile metadata...
                  </p>
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-accent-spring/20 border border-accent-spring/40 px-3 py-1 rounded-full text-[10px] font-mono text-accent-spring z-20">
                  // kuldeep_profile.jpg
                </div>
              </div>
            </FadeIn>
            
            <div className="space-y-8">
              <FadeIn delay={0.2}>
                <SectionLabel text="01. init()" />
                <h2 className="text-4xl font-bold tracking-tight mb-6">Who I am</h2>
                <div className="font-mono text-sm text-muted leading-8 space-y-4">
                  <p>
                    Hey — I'm <span className="text-white font-bold">Kuldeep Singh</span>, a software engineer based in Gurugram who thrives on solving 
                    complex data synchronization and infrastructure challenges.
                  </p>
                  <p>
                    I specialize in <span className="text-accent-spring">Java and Spring Boot</span> backend development, 
                    focusing on scalable microservices, managing inventory logic, 
                    and ensuring bulletproof database integrations.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.4}>
                <div className="grid grid-cols-3 gap-1 border border-white/5 bg-white/5 rounded-lg overflow-hidden">
                  {[
                    { n: "100%", l: "Uptime" },
                    { n: "O(1)", l: "Efficiency" },
                    { n: "∞", l: "Tea" }
                  ].map((s, i) => (
                    <div key={i} className="bg-surface p-6 text-center hover:bg-surface-brighter transition-colors">
                      <div className="text-2xl font-bold text-accent-spring">{s.n}</div>
                      <div className="text-[10px] font-mono text-muted uppercase tracking-widest mt-1">{s.l}</div>
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
            <SectionLabel text="02. getDependencies()" centered />
            <h2 className="text-4xl font-bold tracking-tight mb-12">Tech Stack</h2>
          </FadeIn>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden w-full">
            {SKILLS.map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ backgroundColor: "#17172a", y: -4 }}
                className="bg-surface p-8 group transition-all text-left"
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform">{s.icon}</div>
                <div className="font-mono text-sm font-bold mb-1">{s.name}</div>
                <div className="font-mono text-[9px] text-muted uppercase mb-4">{s.cat}</div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${s.level}%` }}
                    transition={{ duration: 1, delay: 0.3 + (i * 0.05) }}
                    className="h-full bg-accent-spring"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- Projects Section --- */}
        <section id="projects" className="scroll-mt-32">
          <FadeIn>
            <SectionLabel text="03. execute()" centered />
            <h2 className="text-4xl font-bold tracking-tight mb-12 text-center">Architecture</h2>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <div key={i}>
                <FadeIn delay={i * 0.1}>
                  <motion.div 
                    whileHover={{ y: -8, borderColor: "rgba(109, 179, 63, 0.6)" }}
                    className="group p-8 bg-surface border border-white/5 rounded-xl transition-all relative overflow-hidden h-full"
                  >
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-spring to-accent-java scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-accent-spring/10 rounded-lg text-accent-spring group-hover:bg-accent-spring group-hover:text-bg transition-colors">
                        {p.icon}
                      </div>
                      <a href="#" className="p-2 text-muted hover:text-accent-spring transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{p.name}</h3>
                    <p className="font-mono text-xs text-muted leading-relaxed mb-6">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t, j) => (
                        <span key={j} className="px-2 py-1 bg-accent-spring/5 border border-accent-spring/10 rounded text-[9px] font-mono text-accent-spring font-bold">
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

        {/* --- Experience Section --- */}
        <section id="experience" className="scroll-mt-32 max-w-4xl">
          <SectionLabel text="04. stackTrace()" />
          <h2 className="text-4xl font-bold tracking-tight mb-12">History</h2>
          <div className="space-y-12">
            {EXPERIENCE.map((e, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="hidden md:block w-32 shrink-0 text-right pt-1">
                  <span className="font-mono text-[10px] text-muted tracking-widest">{e.date}</span>
                </div>
                <div className="relative">
                  <div className="w-px h-full bg-white/5 absolute left-1/2 -translate-x-1/2 top-4" />
                  <div className="w-3 h-3 rounded-full bg-accent-spring shadow-[0_0_12px_rgba(109,179,63,0.6)] relative z-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-accent-spring transition-colors">{e.role}</h3>
                  <div className="font-mono text-xs text-accent-spring font-bold">@ {e.company}</div>
                  <p className="font-mono text-xs text-muted leading-relaxed pt-2">
                    {e.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- Contact Section --- */}
        <section id="contact" className="scroll-mt-32 max-w-2xl">
          <SectionLabel text="05. POST /contact" />
          <h2 className="text-5xl font-extrabold tracking-tighter mb-8 leading-none">
            Let's compile <br/> something great.
          </h2>
          <p className="font-mono text-sm text-muted leading-relaxed mb-12">
            Currently open to new opportunities to build robust backend systems. 
            Whether you have a complex ERP integration or a microservices challenge, my inbox is open.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4 mb-16">
            {[
              { icon: <Mail />, l: "email", v: "hello@kuldeepsingh.dev" },
              { icon: <Github />, l: "github", v: "github.com/kuldeep-java" },
              { icon: <Linkedin />, l: "linkedin", v: "linkedin.com/in/kuldeep" },
              { icon: <MapPin />, l: "location", v: "Gurugram, HR" }
            ].map((c, i) => (
              <motion.a 
                href="#"
                key={i}
                whileHover={{ y: -2, borderColor: "#6db33f" }}
                className="flex items-center gap-4 p-4 bg-surface border border-white/5 rounded-lg transition-colors"
              >
                <span className="text-accent-spring opacity-70">{c.icon}</span>
                <div className="overflow-hidden">
                  <div className="text-[9px] font-mono text-muted uppercase tracking-widest">{c.l}</div>
                  <div className="text-xs font-mono text-white truncate">{c.v}</div>
                </div>
              </motion.a>
            ))}
          </div>

          <footer className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between gap-4 text-[10px] font-mono text-muted uppercase tracking-widest">
            <div>© 2026 Kuldeep Singh. All rights reserved.</div>
            <div>Built with <span className="text-accent-java">Spring</span> accents & clean code.</div>
          </footer>
        </section>

      </main>
      </div>
    </div>
  );
}
