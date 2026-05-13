import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap } from 'lucide-react';

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
        className="fixed inset-0 z-[1000] bg-[#facc15] flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0, transition: { duration: 1 } }}
      >
        {/* Starfield / Hyperdrive Lines */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-black rounded-full"
              initial={{ 
                x: Math.random() * 100 + '%', 
                y: Math.random() * 100 + '%', 
                width: 3, 
                height: 3, 
                opacity: 0.2
              }}
              animate={
                phase === 'lightspeed' 
                ? { 
                    height: [3, 1200], 
                    y: ['-10%', '110%'],
                    opacity: [0.2, 0.8, 0],
                    transition: { duration: 0.4, repeat: Infinity, ease: 'linear' }
                  } 
                : { 
                    opacity: [0.1, 0.3, 0.1], 
                    transition: { duration: 2, repeat: Infinity } 
                  }
              }
            />
          ))}
        </div>

        {/* The "Space Ship" (Neo-brutalist Style) */}
        <div className="relative">
          <motion.div
            initial={{ y: 0, scale: 1, opacity: 1 }}
            animate={
              phase === 'warming' ? { 
                y: [0, -3, 3, -3, 0], 
                rotate: [0, -1, 1, -1, 0],
                transition: { duration: 0.05, repeat: Infinity }
              } :
              phase === 'launch' ? {
                y: [0, -80, -300],
                transition: { duration: 1.2, ease: 'easeIn' }
              } :
              phase === 'lightspeed' ? {
                y: [-300, -2500],
                scaleY: [1, 15],
                opacity: [1, 0],
                transition: { duration: 0.4, ease: 'easeIn' }
              } : {}
            }
            className="flex flex-col items-center"
          >
            {/* Neo-brutalist Ship Design */}
            <div className="w-16 h-28 bg-white border-4 border-black rounded-t-full relative neo-shadow">
              {/* Cockpit */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-6 h-8 bg-black rounded-full" />
              {/* Fins */}
              <div className="absolute -left-6 bottom-0 w-6 h-14 bg-black border-2 border-black rounded-l-full" />
              <div className="absolute -right-6 bottom-0 w-6 h-14 bg-black border-2 border-black rounded-r-full" />
            </div>

            {/* Thruster Flame */}
            <motion.div 
              animate={{ 
                scaleY: phase === 'launch' ? [1, 2.5, 2] : phase === 'warming' ? [1, 1.4, 1] : 0,
                opacity: phase === 'lightspeed' ? 0 : 1
              }}
              className="w-10 h-24 bg-gradient-to-b from-black to-transparent blur-[2px] mt-[-4px] origin-top"
            />
          </motion.div>

          {/* Launch Floor Sparkles */}
          {phase === 'launch' && (
            <motion.div 
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 6, opacity: 0 }}
              className="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-24 bg-black/40 rounded-full blur-2xl"
            />
          )}
        </div>

        {/* Text Notifications */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 font-black text-xs tracking-tighter text-black uppercase bg-white border-2 border-black px-6 py-2 neo-shadow">
          <AnimatePresence mode="wait">
            <motion.div
              key={phase}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3"
            >
              <Zap className="w-4 h-4 fill-black" />
              {phase === 'idle' && "Initializing Core..."}
              {phase === 'warming' && "Thrusters Online"}
              {phase === 'launch' && "Ignition Success"}
              {phase === 'lightspeed' && "Warp Drive Active"}
              {phase === 'complete' && "Connection Secure"}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LightSpeedPreloader;
