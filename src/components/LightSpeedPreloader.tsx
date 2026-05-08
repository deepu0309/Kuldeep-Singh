import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const LightSpeedPreloader = ({ onComplete }: { onComplete: () => void }) => {
  const [phase, setPhase] = useState<'idle' | 'warming' | 'launch' | 'lightspeed' | 'complete'>('idle');

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase('warming'), 500);
    const timer2 = setTimeout(() => setPhase('launch'), 2000);
    const timer3 = setTimeout(() => setPhase('lightspeed'), 3500);
    const timer4 = setTimeout(() => {
      setPhase('complete');
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[1000] bg-[#080810] flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0, transition: { duration: 1 } }}
      >
        {/* Starfield / Hyperdrive Lines */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%', 
                width: 2, 
                height: 2, 
                opacity: 0.1 
              }}
              animate={
                phase === 'lightspeed' 
                ? { 
                    height: [2, 1000], 
                    y: ['-10%', '110%'],
                    opacity: [0.1, 1, 0],
                    transition: { duration: 0.5, repeat: Infinity, ease: 'linear' }
                  } 
                : { 
                    opacity: [0.1, 0.5, 0.1], 
                    transition: { duration: 2, repeat: Infinity } 
                  }
              }
            />
          ))}
        </div>

        {/* The "Space Ship" (Stylized Code Block) */}
        <div className="relative">
          <motion.div
            initial={{ y: 0, scale: 1, opacity: 1 }}
            animate={
              phase === 'warming' ? { 
                y: [0, -2, 2, -2, 0], 
                rotate: [0, -0.5, 0.5, -0.5, 0],
                transition: { duration: 0.1, repeat: Infinity }
              } :
              phase === 'launch' ? {
                y: [0, -50, -200],
                transition: { duration: 1.5, ease: 'easeIn' }
              } :
              phase === 'lightspeed' ? {
                y: [-200, -2000],
                scaleY: [1, 10],
                opacity: [1, 0],
                transition: { duration: 0.5, ease: 'easeIn' }
              } : {}
            }
            className="flex flex-col items-center"
          >
            {/* Corporate/Backend Ship Design */}
            <div className="w-12 h-20 bg-accent-spring rounded-t-full relative shadow-[0_0_30px_rgba(109,179,63,0.5)]">
              {/* Cockpit */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-6 bg-bg/50 rounded-full border border-white/20" />
              {/* Fins */}
              <div className="absolute -left-4 bottom-0 w-4 h-10 bg-accent-spring rounded-l-full" />
              <div className="absolute -right-4 bottom-0 w-4 h-10 bg-accent-spring rounded-r-full" />
            </div>

            {/* Thruster Flame */}
            <motion.div 
              animate={{ 
                scaleY: phase === 'launch' ? [1, 2, 1.5] : phase === 'warming' ? [0.8, 1.2, 0.8] : 0,
                opacity: phase === 'lightspeed' ? 0 : 1
              }}
              className="w-8 h-16 bg-gradient-to-b from-accent-java to-transparent blur-sm mt-[-4px] origin-top"
            />
          </motion.div>

          {/* Launch Floor Sparkles */}
          {phase === 'launch' && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 4, opacity: 0 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-20 h-20 bg-accent-java/30 rounded-full blur-xl"
            />
          )}
        </div>

        {/* Text Notifications */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest text-muted uppercase">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {phase === 'idle' && "> sys.init()"}
              {phase === 'warming' && "> core.thrusters_online()"}
              {phase === 'launch' && "> sys.ignition(true)"}
              {phase === 'lightspeed' && "> protocol.warp_drive(1)"}
              {phase === 'complete' && "> connection.established()"}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightSpeedPreloader;
