
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Wallet, 
  Rocket, 
  ShieldAlert, 
  TrendingUp, 
  Menu, 
  X as CloseIcon,
  Image as ImageIcon,
  Gamepad2, 
  RefreshCcw, 
  Trophy, 
  Coins, 
  ChevronUp,
  Mail
} from 'lucide-react';

const CONTRACT_ADDRESS = 'WchjLJqbq8AY283hoYKLs7ikBVYbnxUD8aHZf5upump';
const TICKER = '$KRILL';
const X_COMMUNITY_URL = 'https://x.com/i/communities/2004690431997514205';
const CONTACT_EMAIL = 'thekrillonsoll@gmail.com';
const LOGO_URL = 'https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/wasd/logo%20-%202025-12-27T113916.213.png';
const ABOUT_HERO_IMAGE = 'https://pbs.twimg.com/community_banner_img/2004699893252718592/sALg042A?format=jpg&name=small';
const NARRATIVE_IMAGE = 'https://pbs.twimg.com/media/G9KFzW0WkAA9Zqi?format=jpg&name=large';

const MEME_IMAGES = [
  'https://pbs.twimg.com/media/G9KgccGbEAAbutP?format=jpg&name=large',
  'https://pbs.twimg.com/media/G9KXEmpWQAA1g3f?format=jpg&name=medium',
  'https://pbs.twimg.com/media/G9KOw--WoAAmERb?format=jpg&name=900x900',
  'https://pbs.twimg.com/media/G9JRTc3WcAAdkWQ?format=jpg&name=medium',
  'https://pbs.twimg.com/media/G9I8EdNWEAAyUmM?format=jpg&name=small',
  'https://pbs.twimg.com/media/G9Iv_YwXoAAjxhy?format=jpg&name=medium',
  'https://pbs.twimg.com/media/G9IqGlgXEAA0Fs4?format=jpg&name=large',
  'https://pbs.twimg.com/media/G9IaLx8XQAALtdo?format=jpg&name=medium'
];

const XLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    aria-hidden="true"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932zm-1.292 19.49h2.039L6.486 3.24H4.298l13.311 17.403z" />
  </svg>
);

type GameState = 'idle' | 'playing' | 'gameover';

// --- Flappy Krill Underwater Mini Game ---
const KrillGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [coins, setCoins] = useState(0);

  const stateRef = useRef<GameState>(gameState);
  useEffect(() => {
    stateRef.current = gameState;
  }, [gameState]);

  const gameRef = useRef({
    shrimpY: 300,
    velocity: 0,
    obstacles: [] as { x: number; gapY: number; gapSize: number; passed: boolean }[],
    tokens: [] as { x: number; y: number; collected: boolean }[],
    bubbles: [] as { x: number; y: number; speed: number; size: number }[],
    particles: [] as { x: number; y: number; vx: number; vy: number; life: number; color: string }[],
    backgroundX: 0,
    frame: 0,
    speed: 4,
    gravity: 0.35,
    jumpStrength: -7.5,
  });

  const triggerParticles = (x: number, y: number, color: string, count = 8, scale = 1) => {
    for (let i = 0; i < count; i++) {
      gameRef.current.particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 6 * scale,
        vy: (Math.random() - 0.5) * 6 * scale,
        life: 1,
        color
      });
    }
  };

  const spawnBubble = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    gameRef.current.bubbles.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      speed: 1 + Math.random() * 2,
      size: 2 + Math.random() * 8
    });
  }, []);

  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    setCoins(0);
    gameRef.current = {
      ...gameRef.current,
      shrimpY: 300,
      velocity: 0,
      obstacles: [],
      tokens: [],
      particles: [],
      bubbles: Array.from({ length: 15 }).map(() => ({
        x: Math.random() * 1200,
        y: Math.random() * 600,
        speed: 1 + Math.random() * 2,
        size: 2 + Math.random() * 8
      })),
      backgroundX: 0,
      frame: 0,
      speed: 4,
    };
  }, []);

  const jump = useCallback((e?: any) => {
    if (e && e.preventDefault && typeof e.preventDefault === 'function') {
      e.preventDefault();
    }

    if (stateRef.current === 'playing') {
      gameRef.current.velocity = gameRef.current.jumpStrength;
      triggerParticles(80, gameRef.current.shrimpY + 25, 'rgba(56, 189, 248, 0.5)', 4, 0.5);
    } else if (stateRef.current !== 'playing') {
      startGame();
    }
  }, [startGame]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const update = () => {
      if (stateRef.current !== 'playing') return;

      const g = gameRef.current;
      g.frame++;
      g.speed = 4 + Math.floor(g.frame / 800) * 0.5;
      
      g.velocity += g.gravity;
      g.shrimpY += g.velocity;

      if (g.shrimpY > canvas.height - 50) {
         setGameState('gameover');
      }
      if (g.shrimpY < 0) {
        g.shrimpY = 0;
        g.velocity = 0;
      }

      if (g.frame % 30 === 0) spawnBubble();
      for (let i = g.bubbles.length - 1; i >= 0; i--) {
        const b = g.bubbles[i];
        b.y -= b.speed;
        if (b.y < -20) g.bubbles.splice(i, 1);
      }

      if (g.frame % 100 === 0) {
        const gapSize = Math.max(160, 220 - (g.frame / 500));
        const gapY = 100 + Math.random() * (canvas.height - gapSize - 200);
        g.obstacles.push({
          x: canvas.width,
          gapY,
          gapSize,
          passed: false
        });
      }

      if (g.frame % 150 === 0) {
         const lastObs = g.obstacles[g.obstacles.length - 1];
         if (lastObs) {
            g.tokens.push({
                x: lastObs.x + 200,
                y: 100 + Math.random() * (canvas.height - 200),
                collected: false
            });
         }
      }

      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
        if (p.life <= 0) g.particles.splice(i, 1);
      }

      const shrimpX = 80;
      const shrimpSize = 35;

      g.obstacles = g.obstacles.filter(obs => {
        obs.x -= g.speed;
        if (shrimpX + shrimpSize > obs.x && shrimpX < obs.x + 60) {
          if (g.shrimpY < obs.gapY || g.shrimpY + shrimpSize > obs.gapY + obs.gapSize) {
             setGameState('gameover');
             triggerParticles(shrimpX + 15, g.shrimpY + 15, '#ef4444', 30, 3);
          }
        }
        if (!obs.passed && obs.x + 60 < shrimpX) {
          obs.passed = true;
          setScore(s => s + 1);
        }
        return obs.x > -100;
      });

      g.tokens = g.tokens.filter(t => {
        t.x -= g.speed;
        if (!t.collected) {
          const dx = (shrimpX + 15) - t.x;
          const dy = (g.shrimpY + 15) - t.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < 40) {
            t.collected = true;
            setCoins(c => c + 1);
            triggerParticles(t.x, t.y, '#fbbf24', 10, 1.5);
          }
        }
        return t.x > -100 && !t.collected;
      });
    };

    const draw = () => {
      const g = gameRef.current;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      bgGrad.addColorStop(0, '#020617');
      bgGrad.addColorStop(0.6, '#080c25');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      g.bubbles.forEach(b => {
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
        ctx.stroke();
      });

      g.tokens.forEach(t => {
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#fbbf24';
        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.arc(t.x, t.y, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#000';
        ctx.font = 'bold 16px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('$', t.x, t.y + 6);
      });

      g.particles.forEach(p => {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;

      g.obstacles.forEach(obs => {
        ctx.fillStyle = '#ef4444';
        ctx.shadowBlur = 20;
        ctx.shadowColor = 'rgba(239, 68, 68, 0.4)';
        const pipeWidth = 60;
        ctx.fillRect(obs.x, 0, pipeWidth, obs.gapY);
        ctx.fillRect(obs.x, obs.gapY + obs.gapSize, pipeWidth, canvas.height - (obs.gapY + obs.gapSize));
        ctx.shadowBlur = 0;
      });

      ctx.font = '58px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.save();
      ctx.translate(80, g.shrimpY + 25);
      const rotation = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, g.velocity * 0.1));
      ctx.rotate(rotation);
      ctx.fillText('🦐', 0, 0);
      ctx.restore();

      if (stateRef.current === 'playing') {
        animationId = requestAnimationFrame(() => {
          update();
          draw();
        });
      }
    };

    if (stateRef.current === 'playing') {
      draw();
    } else {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = '24px Space Grotesk';
      ctx.fillStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.textAlign = 'center';
      ctx.fillText('FLAPPY KRILL UNIVERSE', canvas.width/2, canvas.height/2);
    }

    return () => cancelAnimationFrame(animationId);
  }, [gameState]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-6xl mx-auto rounded-3xl md:rounded-[3rem] overflow-hidden border-4 md:border-8 border-sky-500/20 bg-slate-950 shadow-[0_0_80px_rgba(56,189,248,0.2)] group aspect-[4/5] md:aspect-[1200/750] h-auto select-none touch-none" 
      onMouseDown={jump}
      onTouchStart={jump}
    >
      <div className="absolute top-0 left-0 right-0 p-3 md:p-10 flex justify-between items-start z-20 pointer-events-none select-none">
        <div className="flex gap-2 md:gap-8">
          <div className="px-3 py-1.5 md:px-8 md:py-4 bg-slate-900/95 backdrop-blur-3xl rounded-xl md:rounded-3xl border border-sky-500/40 shadow-2xl">
            <div className="flex items-center gap-1 md:gap-3 mb-0 md:mb-1">
              <TrendingUp size={12} className="text-sky-400 md:hidden" />
              <TrendingUp size={20} className="text-sky-400 hidden md:block" />
              <span className="text-[7px] md:text-[11px] text-slate-400 uppercase font-black tracking-tight md:tracking-[0.2em]">Dodged</span>
            </div>
            <span className="text-white font-black text-lg md:text-4xl italic">{score}</span>
          </div>
          <div className="px-3 py-1.5 md:px-8 md:py-4 bg-slate-900/95 backdrop-blur-3xl rounded-xl md:rounded-3xl border border-yellow-500/40 shadow-2xl">
            <div className="flex items-center gap-1 md:gap-3 mb-0 md:mb-1">
              <Coins size={12} className="text-yellow-400 md:hidden" />
              <Coins size={20} className="text-yellow-400 hidden md:block" />
              <span className="text-[7px] md:text-[11px] text-slate-400 uppercase font-black tracking-tight md:tracking-[0.2em]">Banked</span>
            </div>
            <span className="text-yellow-400 font-black text-lg md:text-4xl italic">{coins}</span>
          </div>
        </div>
        
        <div className="px-3 py-1.5 md:px-8 md:py-4 bg-slate-900/95 backdrop-blur-3xl rounded-xl md:rounded-3xl border border-white/20 shadow-2xl">
          <div className="flex items-center gap-1 md:gap-3 mb-0 md:mb-1">
            <Trophy size={12} className="text-slate-500 md:hidden" />
            <Trophy size={20} className="text-slate-500 hidden md:block" />
            <span className="text-[7px] md:text-[11px] text-slate-400 uppercase font-black tracking-tight md:tracking-[0.2em]">High</span>
          </div>
          <span className="text-white/70 font-black text-lg md:text-4xl italic">{highScore}</span>
        </div>
      </div>

      <canvas 
        ref={canvasRef} 
        width={1200} 
        height={750} 
        className="w-full h-full block cursor-pointer select-none object-cover"
      />
      
      {gameState === 'idle' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-3xl transition-all z-30 p-4 md:p-16 text-center">
          <div className="relative mb-6 md:mb-12">
            <div className="absolute inset-0 bg-sky-500/30 blur-[60px] md:blur-[100px] rounded-full scale-150 animate-pulse"></div>
            <div className="w-20 h-20 md:w-48 md:h-48 bg-sky-900/30 rounded-full flex items-center justify-center border-2 md:border-4 border-sky-400/50 relative shadow-2xl">
              <span className="text-4xl md:text-9xl">🦐</span>
            </div>
          </div>
          
          <h3 className="text-4xl md:text-8xl font-black text-white mb-3 md:mb-6 uppercase tracking-tighter italic scale-110 electric-glow">RUG ESCAPE</h3>
          <p className="text-sky-400 font-bold uppercase tracking-widest text-[9px] md:text-lg mb-6 md:mb-12 px-4">Swim through the crash • Rebuild the community</p>
          
          <div className="bg-slate-900/80 p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/10 mb-8 md:mb-14 max-w-xs md:max-w-lg">
            <div className="flex items-center justify-center gap-4 md:gap-10">
               <div className="flex flex-col items-center gap-1 md:gap-3">
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-white/10 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/20 text-white shadow-lg">
                     <ChevronUp size={20} className="md:hidden" />
                     <ChevronUp size={32} className="hidden md:block" />
                  </div>
                  <span className="text-[8px] md:text-xs text-white font-black uppercase tracking-widest">Tap</span>
               </div>
               <div className="w-px h-10 md:h-16 bg-white/10"></div>
               <div className="text-left">
                  <p className="text-white font-black text-[10px] md:text-sm uppercase mb-1">FLAP TO SURVIVE</p>
                  <p className="text-slate-500 text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Dodge the red candles</p>
               </div>
            </div>
          </div>

          <button className="group relative px-10 py-4 md:px-24 md:py-8 bg-sky-600 hover:bg-sky-500 text-white font-black rounded-xl md:rounded-[2rem] transition-all shadow-[0_0_60px_rgba(2,132,199,0.6)] active:scale-95 text-lg md:text-4xl tracking-tighter italic">
             START SWIMMING
          </button>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/95 backdrop-blur-3xl animate-in fade-in zoom-in duration-300 z-30 p-6 md:p-16 text-center overflow-hidden">
          <div className="text-6xl md:text-[12rem] mb-4 md:mb-10 drop-shadow-[0_0_30px_rgba(239,68,68,0.7)]">💀</div>
          <h3 className="text-4xl md:text-9xl font-black text-white mb-3 md:mb-6 uppercase tracking-tighter italic drop-shadow-2xl">REKT!</h3>
          <p className="text-red-400 font-black tracking-widest uppercase mb-8 md:mb-16 text-xs md:text-2xl">The market was too volatile.</p>
          
          <div className="grid grid-cols-2 gap-4 md:gap-12 mb-8 md:mb-20 w-full max-w-sm md:max-w-4xl px-4">
            <div className="text-center p-4 md:p-10 bg-slate-950/70 rounded-2xl md:rounded-[3rem] border border-white/15 shadow-2xl flex flex-col items-center justify-center min-h-[80px] md:min-h-[auto]">
              <p className="text-slate-500 text-[8px] md:text-xs uppercase font-black tracking-tight md:tracking-[0.3em] mb-2 md:mb-4 leading-none">Dodged</p>
              <p className="text-white text-3xl md:text-8xl font-black leading-none">{score}</p>
            </div>
            <div className="text-center p-4 md:p-10 bg-slate-950/70 rounded-2xl md:rounded-[3rem] border border-white/15 shadow-2xl flex flex-col items-center justify-center min-h-[80px] md:min-h-[auto]">
              <p className="text-slate-500 text-[8px] md:text-xs uppercase font-black tracking-tight md:tracking-[0.3em] mb-2 md:mb-4 leading-none">Banked</p>
              <p className="text-yellow-400 text-3xl md:text-8xl font-black leading-none">{coins}</p>
            </div>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); startGame(); }} 
            className="group flex items-center gap-3 md:gap-8 px-8 py-4 md:px-20 md:py-8 bg-white text-red-600 font-black rounded-xl md:rounded-[2rem] transition-all hover:scale-105 active:scale-95 shadow-2xl text-base md:text-3xl uppercase tracking-tighter"
          >
            <RefreshCcw size={20} className="md:hidden" />
            <RefreshCcw size={40} className="hidden md:block group-hover:rotate-180 transition-transform duration-1000" />
            RESPAWN
          </button>
        </div>
      )}

      <div className="absolute bottom-4 md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none z-20 opacity-40 group-hover:opacity-100 transition-opacity">
        <div className="flex gap-4 md:gap-8 items-center bg-slate-900/95 px-6 py-2 md:px-12 md:py-4 rounded-full border border-white/15 shadow-2xl backdrop-blur-3xl">
          <span className="text-[8px] md:text-sm text-sky-400 uppercase font-black tracking-tight md:tracking-[0.4em]">Tap to Swim</span>
          <div className="w-1.5 h-1.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_20px_#22c55e]"></div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-slate-200">
      <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="The Krill Logo" className="w-12 h-12 rounded-full border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
              <span className="font-display text-2xl font-bold tracking-tighter electric-glow text-white uppercase">THE KRILL</span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-medium">
              <a href="#about" className="hover:text-sky-400 transition-colors text-sm uppercase tracking-widest font-bold">About</a>
              <a href="#arcade" className="hover:text-sky-400 transition-colors text-sm uppercase tracking-widest font-bold">Arcade</a>
              <a href="#memes" className="hover:text-sky-400 transition-colors text-sm uppercase tracking-widest font-bold">Memes</a>
              <a href="#how-to-buy" className="hover:text-sky-400 transition-colors text-sm uppercase tracking-widest font-bold">How to Buy</a>
              <a href="#chart" className="hover:text-sky-400 transition-colors text-sm uppercase tracking-widest font-bold">Live Chart</a>
              <a 
                href={X_COMMUNITY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-6 py-2 bg-sky-600 hover:bg-sky-500 rounded-full text-white transition-all transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(2,132,199,0.4)]"
              >
                <XLogo size={18} />
                <span className="text-sm font-bold">Community</span>
              </a>
            </div>

            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-sky-900/50 p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#about" className="block text-lg py-2 font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#arcade" className="block text-lg py-2 font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Arcade</a>
            <a href="#memes" className="block text-lg py-2 font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Memes</a>
            <a href="#how-to-buy" className="block text-lg py-2 font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>How to Buy</a>
            <a href="#chart" className="block text-lg py-2 font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Live Chart</a>
            <a href={X_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sky-400 py-2 font-bold uppercase tracking-widest">
              <XLogo size={20} /> Community
            </a>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left space-y-8">
              <div className="inline-block px-4 py-1.5 rounded-full bg-sky-950 border border-sky-500/30 text-sky-400 text-sm font-bold tracking-widest uppercase mb-4">
                Born from the Depths • {TICKER}
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-none text-white">
                WE ARE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600">THE KRILL</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto lg:mx-0">
                A community that refused to be silenced. When one leader walked away, a thousand krill rose to take his place. Accountability matters.
              </p>

              <div className="p-1 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 max-w-xl mx-auto lg:mx-0">
                <div className="bg-slate-900 rounded-xl px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col items-start overflow-hidden w-full">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Contract Address</span>
                    <code className="text-sky-400 font-mono text-sm break-all truncate w-full">{CONTRACT_ADDRESS}</code>
                  </div>
                  <button 
                    onClick={copyToClipboard}
                    className="flex-shrink-0 flex items-center gap-2 bg-sky-600/20 hover:bg-sky-600/40 text-sky-400 px-4 py-2 rounded-lg transition-all border border-sky-500/30 active:scale-95"
                  >
                    {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <a href="#how-to-buy" className="px-8 py-4 bg-white text-slate-950 font-bold rounded-xl hover:bg-sky-400 hover:text-white transition-all flex items-center gap-2 shadow-xl shadow-sky-500/20">
                  <Rocket size={20} />
                  Buy $KRILL
                </a>
                <a href="#chart" className="px-8 py-4 border border-sky-500/30 bg-sky-500/5 text-sky-400 font-bold rounded-xl hover:bg-sky-500/10 transition-all flex items-center gap-2">
                  <TrendingUp size={20} />
                  View Chart
                </a>
              </div>
            </div>

            <div className="flex-1 relative animate-float">
              <div className="absolute inset-0 bg-sky-500/20 rounded-full blur-[80px]"></div>
              <img 
                src={LOGO_URL} 
                alt="Krill Hero" 
                className="relative z-10 w-full max-w-lg mx-auto rounded-3xl shadow-2xl shadow-sky-500/30 border border-sky-400/20 rotate-3"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#0084cc] py-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-15 pointer-events-none" style={{
            backgroundImage: 'radial-gradient(circle, #fff 1.5px, transparent 0)',
            backgroundSize: '16px 16px'
          }}></div>
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-6">
            <div className="mb-4">
              <svg 
                viewBox="0 0 24 24" 
                className="w-16 h-16 text-white/90" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-tight">
              ACCOUNTABILITY MATTERS IN THIS SPACE.
            </h2>
            <p className="text-white/90 font-medium text-lg md:text-xl max-w-3xl leading-relaxed">
              Integrity isn't optional. When the creator turned his back on 1,000+ holders, we stepped up. The Krill is now community-owned and community-driven.
            </p>
          </div>
        </section>

        <section id="about" className="py-24 px-4 bg-slate-950">
          <div className="max-w-5xl mx-auto space-y-16">
            <div className="relative group overflow-hidden rounded-3xl border border-sky-500/20 shadow-2xl">
              <img 
                src={ABOUT_HERO_IMAGE} 
                alt="Krill Community Banner" 
                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
            </div>

            <div className="card-gradient p-8 md:p-12 rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 blur-3xl rounded-full"></div>
              <h2 className="text-4xl font-black mb-8 electric-glow text-white uppercase tracking-tighter italic">The swarm stands tall</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  In the wild world of Solana, trust is a rare currency. Many are asking what truly happened with @krillxbt, the original creator who vanished into the shadows.
                </p>
                <p>
                  After collecting the project's creator fees—a signal that should have guaranteed long-term commitment—he pulled a disappearing act less than five minutes after launch. In an instant, over 1,000 dedicated holders were left abandoned.
                </p>
                <p className="border-l-4 border-sky-500 pl-6 italic bg-sky-500/5 py-6 rounded-r-2xl">
                  "Rather than taking responsibility or setting things right, he chose silence. Flooded with messages of concern, he simply hit delete on his x account and walked away from the community he built."
                </p>
                <p>
                  Whether this was an intentional exit or a momentary failure of nerve, the consequences were real. People were hurt. But out of that chaos, something unexpected happened. The community didn't scatter. We unified.
                </p>
                <p className="font-bold text-white text-2xl uppercase tracking-tighter italic border-b-2 border-sky-500/30 pb-2">
                  Accountability matters. This is the Krill Uprising.
                </p>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-3xl border border-sky-500/20 shadow-2xl bg-slate-900/50">
              <img 
                src={NARRATIVE_IMAGE} 
                alt="Krill Narrative" 
                className="w-full h-auto object-cover transform transition-transform duration-700" 
              />
              <div className="p-8 md:p-12 text-center">
                <p className="text-xl md:text-3xl font-black text-white italic leading-relaxed tracking-tight">
                  "The krill, a narrative tied to the white whale which is at 23M marketcap on the moment of writing this. I like the idea of the krill even more."
                </p>
                <div className="h-1 w-24 bg-sky-500 mx-auto mt-8 rounded-full"></div>
              </div>
            </div>
          </div>
        </section>

        <section id="arcade" className="py-32 px-4 bg-slate-900/50 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <div className="mb-20">
              <div className="inline-flex items-center gap-2 px-6 py-2 bg-sky-500/10 border border-sky-500/30 rounded-full text-sky-400 text-xs font-black tracking-[0.4em] uppercase mb-8 shadow-xl">
                Arcade Sector Alpha
              </div>
              <h2 className="text-5xl md:text-8xl font-black text-white mb-8 italic tracking-tighter uppercase drop-shadow-2xl electric-glow">RUG ESCAPE</h2>
              <p className="text-slate-400 max-w-3xl mx-auto text-lg md:text-2xl mb-14 leading-relaxed font-medium">The market is crashing. The pipes are red. The swarm is your only hope. Tap to stay afloat in the deep ocean of volatility.</p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16 text-[10px] md:text-sm uppercase font-black tracking-[0.2em] text-sky-400/80">
                <span className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-slate-900/60 rounded-2xl border border-sky-400/30 shadow-2xl transition-all hover:bg-sky-900/80">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-sky-400 rounded-full animate-ping"></div>
                  Snappy Flap Controls
                </span>
                <span className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-slate-900/60 rounded-2xl border border-sky-400/30 shadow-2xl transition-all hover:bg-sky-900/80">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-400 rounded-full"></div>
                  Stack $KRILL Bonus
                </span>
              </div>
            </div>
            
            <KrillGame />
          </div>
        </section>

        <section id="memes" className="py-24 px-4 bg-slate-900/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center items-center gap-3 mb-4">
                <ImageIcon className="text-sky-400" size={32} />
                <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Krill Army Memes</h2>
              </div>
              <p className="text-slate-400 text-xl font-medium">The collective creativity of the most resilient swarm in crypto.</p>
              <div className="h-1.5 w-32 bg-sky-500 mx-auto rounded-full mt-6"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {MEME_IMAGES.map((src, index) => (
                <div key={index} className="group relative aspect-square overflow-hidden rounded-2xl border border-sky-500/20 shadow-lg hover:shadow-sky-500/20 transition-all duration-500 bg-slate-800">
                  <img 
                    src={src} 
                    alt={`Krill Meme ${index + 1}`} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-4 py-2 bg-slate-950/80 rounded-full text-sky-400 font-bold text-sm tracking-widest border border-sky-400/50">
                      $KRILL ARMY
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-to-buy" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-4 uppercase italic tracking-tighter">HOW TO BUY ON PUMP.FUN</h2>
              <div className="h-1.5 w-32 bg-sky-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Setup Wallet",
                  desc: "Download Phantom or Solflare wallet from the app store or as a browser extension.",
                  icon: <Wallet className="text-sky-400" size={32} />
                },
                {
                  step: "02",
                  title: "Get SOL",
                  desc: "Buy SOL on an exchange like Coinbase or Binance and send it to your wallet address.",
                  icon: <TrendingUp className="text-sky-400" size={32} />
                },
                {
                  step: "03",
                  title: "Find The Krill",
                  desc: "Head over to Pump.fun and paste our contract address in the search bar.",
                  icon: <ExternalLink className="text-sky-400" size={32} />
                },
                {
                  step: "04",
                  title: "Swap for $KRILL",
                  desc: "Connect your wallet, enter the amount of SOL you want to spend, and hit buy!",
                  icon: <Rocket className="text-sky-400" size={32} />
                }
              ].map((item, idx) => (
                <div key={idx} className="card-gradient p-8 rounded-3xl hover:border-sky-400/50 transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-sky-500/10 rounded-2xl group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    <span className="text-4xl font-black text-slate-800">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <a 
                href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-black text-xl rounded-2xl hover:scale-105 transition-all shadow-2xl shadow-sky-500/40"
              >
                GO TO PUMP.FUN
                <ExternalLink size={24} />
              </a>
            </div>
          </div>
        </section>

        <section id="chart" className="py-24 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">LIVE MARKET DATA</h2>
                <p className="text-slate-400 uppercase tracking-[0.2em] text-xs font-bold">Resilience in the metrics</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-800 px-6 py-3 rounded-2xl border border-slate-700 shadow-2xl">
                  <span className="text-slate-500 text-xs block uppercase font-black leading-tight tracking-widest">Ticker</span>
                  <span className="text-sky-400 font-black tracking-[0.2em]">{TICKER}</span>
                </div>
              </div>
            </div>

            <div className="h-[600px] md:h-auto md:aspect-[16/9] w-full rounded-3xl md:rounded-[3rem] overflow-hidden border border-sky-500/20 shadow-2xl bg-slate-900 ring-4 md:ring-8 ring-sky-500/5">
              <iframe 
                src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=0&info=0`} 
                className="w-full h-full"
                title="The Krill Dexscreener Chart"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-sky-900/30 px-4 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-16 mb-16">
            <div className="flex flex-col items-center md:items-start gap-6">
              <div className="flex items-center gap-3">
                <img src={LOGO_URL} alt="The Krill Logo" className="w-16 h-16 rounded-full border-2 border-sky-400/30 shadow-2xl" />
                <span className="font-display text-3xl font-bold electric-glow text-white uppercase tracking-tighter">THE KRILL</span>
              </div>
              <p className="text-slate-500 text-lg max-w-sm text-center md:text-left leading-relaxed font-medium italic">
                The swarm is the strength. Accountability is the mission. Solana's deepest resilience.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-10">
               <div className="flex gap-10 items-center">
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-slate-400 hover:text-sky-400 transition-all hover:scale-125 p-3 rounded-full bg-slate-900 border border-slate-800 shadow-xl flex items-center gap-3">
                  <Mail size={32} />
                  <span className="hidden md:inline text-xs font-black uppercase tracking-widest">{CONTACT_EMAIL}</span>
                </a>
                <a href={X_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-all hover:scale-125 p-3 rounded-full bg-slate-900 border border-slate-800 shadow-xl">
                  <XLogo size={32} />
                </a>
                <a href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-all hover:scale-125 p-3 rounded-full bg-slate-900 border border-slate-800 shadow-xl">
                  <TrendingUp size={32} />
                </a>
              </div>
              <div className="flex gap-10 text-xs uppercase font-black tracking-[0.3em] text-slate-500">
                 <a href="#about" className="hover:text-sky-400 transition-colors">About</a>
                 <a href="#arcade" className="hover:text-sky-400 transition-colors">Arcade</a>
                 <a href="#memes" className="hover:text-sky-400 transition-colors">Memes</a>
                 <a href="#how-to-buy" className="hover:text-sky-400 transition-colors">Buy</a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-slate-600 text-[10px] border-t border-slate-900 pt-16">
            <p className="mb-4 font-black uppercase tracking-[0.3em] text-slate-400">CONTACT: {CONTACT_EMAIL}</p>
            <p className="mb-8 font-black uppercase tracking-[0.3em] text-slate-500">© 2025 THE KRILL COMMUNITY • UNIFIED BY ACCIDENT, HELD BY STRENGTH</p>
            <p className="max-w-5xl mx-auto opacity-30 uppercase tracking-[0.1em] leading-relaxed italic">
              LEGAL NOTICE: $KRILL IS A MEMETIC EXPRESSION OF COMMUNITY DISCONTENT AND RESILIENCE. IT HOLDS NO CONTRACTUAL VALUE, NO PROMISE OF PROFITS, AND NO FORMAL ORGANIZATION. TRADING IN VOLATILE ASSETS IS EXTREMELY RISKY. CONDUCT YOUR OWN RESEARCH AND INVEST RESPONSIBLY.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
