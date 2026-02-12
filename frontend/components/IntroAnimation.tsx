import React, { useEffect, useState } from 'react';
import { Shield, Zap } from 'lucide-react';

interface IntroAnimationProps {
    onComplete?: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [stage, setStage] = useState<'glitch' | 'stabilize' | 'reveal-sub' | 'finish' | 'exit'>('glitch');

    useEffect(() => {
        // Pacing matches the cinematic reveal flow
        const tGlitch = setTimeout(() => setStage('stabilize'), 1200);   // Glitch intensity phase
        const tReveal = setTimeout(() => setStage('reveal-sub'), 2000);  // Reveal Title 2
        const tFinish = setTimeout(() => setStage('finish'), 3200);      // Show Subtitles
        const tExit = setTimeout(() => setStage('exit'), 5500);         // Start Fade Out
        const tKill = setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
        }, 6200);

        return () => {
            [tGlitch, tReveal, tFinish, tExit, tKill].forEach(clearTimeout);
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (
        <div className={`fixed inset-0 z-[10000] bg-[#020617] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${stage === 'exit' ? 'opacity-0 scale-105' : 'opacity-100'}`}>

            {/* 1. Cinematic Background & Noise Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#020617]"></div>
                {/* Subtle Gradient Glow */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full transition-opacity duration-1000 ${stage !== 'glitch' ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Digital Noise / Static (Visible during glitch) */}
                {stage === 'glitch' && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-noise"></div>
                )}

                {/* Horizontal Glitch Lines */}
                {stage === 'glitch' && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-1/4 w-full h-[1px] bg-cyan-400/30 animate-scanline-fast"></div>
                        <div className="absolute top-1/2 w-full h-[2px] bg-blue-500/20 animate-scanline-fast delay-75"></div>
                        <div className="absolute top-3/4 w-full h-[1px] bg-red-500/20 animate-scanline-fast delay-150"></div>
                    </div>
                )}
            </div>

            <div className="relative z-10 flex flex-col items-center">

                {/* Icon / Emblem with RGB Split Glitch */}
                <div className={`mb-12 relative group ${stage === 'glitch' ? 'animate-rgb-split' : ''} transition-all duration-1000 ${stage !== 'glitch' ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-125'}`}>
                    <div className="relative">
                        <div className="absolute -inset-6 bg-cyan-500/20 blur-3xl rounded-full animate-pulse-slow"></div>
                        <div className="relative bg-slate-900/60 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-[0_0_60px_rgba(34,211,238,0.1)]">
                            <Shield size={64} className="text-white relative z-10" />
                        </div>
                    </div>
                </div>

                {/* Title Section */}
                <div className="text-center relative">

                    {/* Main Title: CRYPTO PORTFOLIO TRACKER */}
                    <h1 className={`text-4xl md:text-6xl font-black tracking-[0.4em] uppercase transition-all duration-1000 
            ${stage === 'glitch' ? 'opacity-0 translate-y-4 blur-lg' : 'opacity-100 translate-y-0 blur-0'}
            text-white relative`}
                    >
                        {/* RGB Glitch overlays during first stabilization */}
                        {stage === 'stabilize' && (
                            <>
                                <span className="absolute inset-0 text-red-500 opacity-30 -translate-x-1 animate-glitch-jitter">CRYPTO PORTFOLIO TRACKER</span>
                                <span className="absolute inset-0 text-blue-500 opacity-30 translate-x-1 animate-glitch-jitter delay-75">CRYPTO PORTFOLIO TRACKER</span>
                            </>
                        )}
                        CRYPTO PORTFOLIO TRACKER
                    </h1>

                    {/* Sub Title: WITH RISK & SCAM ANALYSIS */}
                    <div className="mt-4 h-12 flex items-center justify-center overflow-hidden">
                        <h2 className={`text-xl md:text-2xl font-bold tracking-[0.3em] uppercase text-cyan-400/90 transition-all duration-1000 relative
               ${stage === 'reveal-sub' || stage === 'finish' || stage === 'exit' ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
             `}>
                            WITH RISK & SCAM ANALYSIS
                            {/* Data Scan Effect Overlay */}
                            {(stage === 'reveal-sub' || stage === 'finish') && (
                                <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent -translate-x-full animate-data-scan"></div>
                            )}
                        </h2>
                    </div>

                    {/* Optional Footer Subtitles */}
                    <div className={`mt-16 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 transition-all duration-1000 
            ${stage === 'finish' || stage === 'exit' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}>
                        <span className="flex items-center gap-3 text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-[0.3em]">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                            Real-time portfolio intelligence.
                        </span>
                        <span className="flex items-center gap-3 text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-[0.3em]">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                            AI-powered risk detection.
                        </span>
                        <span className="flex items-center gap-3 text-[10px] md:text-xs font-medium text-slate-400 uppercase tracking-[0.3em]">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                            Scam-aware crypto insights.
                        </span>
                    </div>

                </div>

                {/* Minimal Bottom Status Info */}
                <div className={`absolute bottom-12 flex items-center gap-4 text-[9px] font-mono text-slate-600 tracking-[0.5em] uppercase transition-opacity duration-1000 ${stage !== 'glitch' ? 'opacity-40' : 'opacity-0'}`}>
                    <Zap size={10} /> SECURITY_LEVEL: MAX_CAPACITY // NODE_ACTIVE
                </div>
            </div>

            <style>{`
        /* 1. Cinematic Glitch Animations */
        @keyframes noise {
          0%, 100% { transform: translate(0,0) scale(1); }
          10% { transform: translate(-5%,-5%) scale(1.05); }
          30% { transform: translate(5%,5%) scale(1.1); }
          50% { transform: translate(-10%,5%) scale(1); }
          70% { transform: translate(5%,-10%) scale(1.05); }
          90% { transform: translate(-5%,-5%) scale(1.1); }
        }
        @keyframes scanline-fast {
          0% { transform: translateY(-100vh); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        @keyframes rgb-split {
          0% { text-shadow: 2px 0 red, -2px 0 blue; transform: skew(0deg); }
          20% { text-shadow: -3px 0 red, 3px 0 blue; transform: skew(5deg); }
          40% { text-shadow: 2px 0 red, -2px 0 blue; transform: skew(-5deg); }
          60% { text-shadow: -2px 0 red, 2px 0 blue; transform: skew(0deg); }
          80% { text-shadow: 3px 0 red, -3px 0 blue; transform: skew(2deg); }
          100% { text-shadow: -2px 0 red, 2px 0 blue; transform: skew(0deg); }
        }
        @keyframes glitch-jitter {
          0%, 100% { transform: translate(0,0); opacity: 0.3; }
          33% { transform: translate(-4px, 2px); opacity: 0.5; }
          66% { transform: translate(4px, -2px); opacity: 0.2; }
        }
        @keyframes data-scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }

        .animate-noise { animation: noise 0.2s steps(2) infinite; }
        .animate-scanline-fast { animation: scanline-fast 0.6s linear infinite; }
        .animate-rgb-split { animation: rgb-split 0.2s infinite; }
        .animate-glitch-jitter { animation: glitch-jitter 0.15s infinite; }
        .animate-data-scan { animation: data-scan 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
      `}</style>
        </div>
    );
};

export default IntroAnimation;
