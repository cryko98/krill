
import React, { useState } from 'react';
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
  Image as ImageIcon
} from 'lucide-react';

const CONTRACT_ADDRESS = 'WchjLJqbq8AY283hoYKLs7ikBVYbnxUD8aHZf5upump';
const TICKER = '$KRILL';
const X_COMMUNITY_URL = 'https://x.com/i/communities/2004690431997514205';
const LOGO_URL = 'https://wkkeyyrknmnynlcefugq.supabase.co/storage/v1/object/public/wasd/logo%20-%202025-12-27T113916.213.png';
const ABOUT_HERO_IMAGE = 'https://pbs.twimg.com/community_banner_img/2004699893252718592/sALg042A?format=jpg&name=small';

const MEME_IMAGES = [
  'https://pbs.twimg.com/media/G9KgccGbEAAbutP?format=jpg&name=large',
  'https://pbs.twimg.com/media/G9KXEmpWQAA1g3f?format=jpg&name=medium',
  'https://pbs.twimg.com/media/G9KOw--WoAAmERb?format=jpg&name=900x900',
  'https://pbs.twimg.com/media/G9JvtxFWAAAQp_3?format=jpg&name=large',
  'https://pbs.twimg.com/media/G9JRTc3WcAAdkWQ?format=jpg&name=medium',
  'https://pbs.twimg.com/media/G9I8EdNWEAAyUmM?format=jpg&name=small',
  'https://pbs.twimg.com/media/G9Iv_YwXoAAjxhy?format=jpg&name=medium',
  'https://pbs.twimg.com/media/G9IqGlgXEAA0Fs4?format=jpg&name=large',
  'https://pbs.twimg.com/media/G9IaLx8XQAALtdo?format=jpg&name=medium'
];

// Custom X (Twitter) Logo Component
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

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* Background Decor */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0"></div>
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-sky-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="The Krill Logo" className="w-12 h-12 rounded-full border border-sky-400/50 shadow-[0_0_15px_rgba(56,189,248,0.3)]" />
              <span className="font-display text-2xl font-bold tracking-tighter electric-glow text-white">THE KRILL</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 font-medium">
              <a href="#about" className="hover:text-sky-400 transition-colors text-sm uppercase tracking-widest font-bold">About</a>
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

            {/* Mobile Toggle */}
            <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-sky-900/50 p-4 space-y-4 animate-in slide-in-from-top duration-300">
            <a href="#about" className="block text-lg py-2 font-bold uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>About</a>
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
        {/* Hero Section */}
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

              {/* CA Box */}
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

        {/* Accountability Banner */}
        <section className="bg-sky-600 py-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 text-center relative z-10 flex flex-col items-center gap-4">
            <ShieldAlert size={48} className="text-white animate-pulse" />
            <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">
              Accountability matters in this space.
            </h2>
            <p className="text-sky-100 font-medium text-lg max-w-3xl">
              Integrity isn't optional. When the creator turned his back on 1,000+ holders, we stepped up. The Krill is now community-owned and community-driven.
            </p>
          </div>
        </section>

        {/* About / Story Section */}
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
              <h2 className="text-4xl font-black mb-8 electric-glow text-white">THE STORY OF THE KRILL</h2>
              <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                <p>
                  In the wild world of Solana, trust is a rare currency. Many are asking what truly happened with @krillxbt, the original creator who vanished into the shadows.
                </p>
                <p>
                  After collecting the project's creator fees—a signal that should have guaranteed long-term commitment—he pulled a disappearing act less than five minutes after launch. In an instant, over 1,000 dedicated holders were left staring at their screens, abandoned and in the red.
                </p>
                <p className="border-l-4 border-sky-500 pl-6 italic bg-sky-500/5 py-4">
                  "Rather than taking responsibility or setting things right, he chose silence. Flooded with messages of concern, he simply hit delete on his X account and walked away from the community he built."
                </p>
                <p>
                  Whether this was an intentional exit or a momentary failure of nerve, the consequences were real. People were hurt. But out of that chaos, something unexpected happened. The community didn't scatter. We unified.
                </p>
                <p className="font-bold text-white text-xl">
                  Accountability matters. We are now the masters of our own ocean. This is the Krill Uprising.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Memes Section */}
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

        {/* How to Buy */}
        <section id="how-to-buy" className="py-24 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-black text-white mb-4">HOW TO BUY ON PUMP.FUN</h2>
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

        {/* Chart Section */}
        <section id="chart" className="py-24 px-4 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-4xl font-black text-white">LIVE MARKET DATA</h2>
                <p className="text-slate-400">Track $KRILL progress on the charts in real-time.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                  <span className="text-slate-500 text-xs block uppercase font-bold">Ticker</span>
                  <span className="text-sky-400 font-bold tracking-widest">{TICKER}</span>
                </div>
              </div>
            </div>

            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-sky-500/20 shadow-2xl bg-slate-900">
              <iframe 
                src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=0&info=0`} 
                className="w-full h-full"
                title="The Krill Dexscreener Chart"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-sky-900/30 px-4 relative z-10 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-3">
              <img src={LOGO_URL} alt="The Krill Logo" className="w-10 h-10 rounded-full" />
              <span className="font-display text-xl font-bold electric-glow text-white">THE KRILL</span>
            </div>
            
            <div className="flex gap-6">
              <a href={X_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                <XLogo size={24} />
              </a>
              <a href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                <TrendingUp size={24} />
              </a>
            </div>
          </div>
          
          <div className="text-center text-slate-500 text-xs border-t border-slate-900 pt-8">
            <p className="mb-4">© 2025 THE KRILL COMMUNITY. ALL RIGHTS RESERVED.</p>
            <p className="max-w-3xl mx-auto opacity-50 uppercase tracking-widest">
              DISCLAIMER: $KRILL IS A MEME COIN WITH NO INTRINSIC VALUE OR EXPECTATION OF FINANCIAL RETURN. IT IS A COMMUNITY PROJECT BORN FROM ACCOUNTABILITY. INVEST ONLY WHAT YOU CAN AFFORD TO LOSE.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
