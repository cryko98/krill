
import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Wallet, 
  Rocket, 
  TrendingUp, 
  Menu, 
  X as CloseIcon,
} from 'lucide-react';

const CONTRACT_ADDRESS = 'FquUHKWfMUdSMxxSU9ZWrSc98hvTXeMnQn9nksSKpump';
const TICKER = '$42069';
const X_COMMUNITY_URL = 'https://x.com/42069_OnSol';
const LOGO_URL = 'https://pbs.twimg.com/media/G-EMbPiWkAApwjp?format=jpg&name=small';
const IMAGE_BANNER = 'https://pbs.twimg.com/profile_banners/2008891683560443904/1767793153/600x200';

const SCATTER_IMAGES = [
  'https://i.redd.it/8talrf7kbgu41.jpg',
  'https://insidetesla.de/wp-content/uploads/2023/02/tesla-ceo-elon-musk-freigesprochen-prozess-tweet-1024x576.jpg',
  'https://pbs.twimg.com/media/FmxM-QGagAAfcX4.jpg',
  'https://www.the-sun.com/wp-content/uploads/sites/6/2022/04/NINTCHDBPICT000726187634.jpg?strip=all&w=932',
  'https://img.ifunny.co/images/df9f5a49f8c1c4322c5aec06ea5b57191bb0d765ad106b1f310bfa82554b4e17_1.jpg'
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

const App: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0c0905] text-[#f5e6c8]">
      {/* Revised Background: Richer Pattern & Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.07]" style={{
         backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2v2h-2V0zm2 2h2v2h-2V2zm2 2h2v2h-2V4zm2 2h2v2h-2V6zM0 40h2v2H0v-2zm2 2h2v2H2v-2zm2 2h2v2H4v-2zm2 2h2v2H6v-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="fixed inset-0 bg-radial-gradient from-transparent via-[#1a120b]/80 to-[#000000] z-0 pointer-events-none"></div>
      
      {/* Decorative Border Frames */}
      <div className="fixed top-4 bottom-4 left-4 right-4 border border-[#d4af37]/10 pointer-events-none z-50 lg:block hidden"></div>
      <div className="fixed top-0 left-0 w-full h-2 bg-gradient-to-r from-[#1a120b] via-[#d4af37]/50 to-[#1a120b] z-50"></div>

      <nav className="fixed top-0 w-full z-50 bg-[#1a120b]/90 backdrop-blur-xl border-b border-[#d4af37]/30 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-[#d4af37] blur-lg opacity-20 rounded-full"></div>
                <img src={LOGO_URL} alt="42069 Logo" className="relative w-12 h-12 rounded-full border border-[#d4af37] shadow-lg" />
              </div>
              <span className="font-greek text-2xl font-bold tracking-[0.2em] text-[#d4af37] drop-shadow-md">42069</span>
            </div>

            <div className="hidden md:flex items-center gap-8 font-serif">
              <a href="#about" className="hover:text-[#d4af37] transition-colors text-base uppercase tracking-[0.2em] font-bold">Legend</a>
              <a href="#how-to-buy" className="hover:text-[#d4af37] transition-colors text-base uppercase tracking-[0.2em] font-bold">Acquire</a>
              <a href="#chart" className="hover:text-[#d4af37] transition-colors text-base uppercase tracking-[0.2em] font-bold">Oracle</a>
              <a 
                href={X_COMMUNITY_URL} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2 px-6 py-2 bg-[#d4af37]/5 hover:bg-[#d4af37]/10 border border-[#d4af37]/40 rounded-sm text-[#d4af37] transition-all hover:shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              >
                <XLogo size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Olympus</span>
              </a>
            </div>

            <button className="md:hidden text-[#d4af37]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <CloseIcon size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-[#1a120b] border-b border-[#d4af37] p-6 space-y-6 animate-in slide-in-from-top duration-300 shadow-2xl">
            <a href="#about" className="block text-xl font-greek text-[#d4af37] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Legend</a>
            <a href="#how-to-buy" className="block text-xl font-greek text-[#d4af37] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Acquire</a>
            <a href="#chart" className="block text-xl font-greek text-[#d4af37] uppercase tracking-widest" onClick={() => setIsMenuOpen(false)}>Oracle</a>
            <a href={X_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#d4af37] py-2 font-bold uppercase tracking-widest border-t border-[#d4af37]/20 mt-4 pt-6">
              <XLogo size={20} /> Olympus
            </a>
          </div>
        )}
      </nav>

      <main className="relative z-10 pt-24">
        {/* REVISED HERO SECTION */}
        <section className="min-h-[90vh] flex items-center py-20 px-4 md:px-8 relative overflow-hidden">
          {/* Subtle Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-amber-900/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#d4af37]/30 bg-[#1a120b]/50 backdrop-blur-sm rounded-full">
                 <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
                 <span className="text-[#d4af37] font-greek text-xs md:text-sm tracking-[0.3em] uppercase font-bold">The Divine Integers</span>
                 <div className="w-2 h-2 bg-[#d4af37] rotate-45"></div>
              </div>
              
              <h1 className="text-7xl md:text-[7rem] lg:text-[9rem] leading-[0.9] font-greek font-black tracking-tighter text-[#f5e6c8] gold-glow relative z-10">
                <span className="block text-transparent bg-clip-text bg-gradient-to-b from-[#f5e6c8] to-[#9a8c7d]">{TICKER.replace('$', '')}</span>
                <span className="text-4xl md:text-6xl text-[#d4af37] absolute -top-4 -right-8 lg:-right-12">$</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-[#d4af37]/80 font-serif italic max-w-xl leading-relaxed">
                "Not merely a number, but a signal from the Architect himself."
              </p>

              <div className="w-full max-w-md bg-[#1a120b] border border-[#d4af37]/40 p-1 shadow-2xl relative group">
                <div className="absolute inset-0 bg-[#d4af37]/5 group-hover:bg-[#d4af37]/10 transition-colors"></div>
                <div className="relative flex items-center justify-between px-4 py-3 bg-[#0c0905]">
                  <code className="text-[#d4af37] font-mono text-xs md:text-sm truncate mr-4">{CONTRACT_ADDRESS}</code>
                  <button 
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-[#d4af37]/20 rounded-sm transition-colors text-[#f5e6c8]"
                  >
                    {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md pt-4">
                <a href="#how-to-buy" className="flex-1 px-8 py-4 bg-[#d4af37] hover:bg-[#b5952f] text-[#0c0905] font-greek font-bold text-lg text-center transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 uppercase tracking-widest relative overflow-hidden group">
                  <span className="relative z-10 flex items-center justify-center gap-2"><Rocket size={20} /> Acquire</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </a>
                <a href="#chart" className="flex-1 px-8 py-4 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 font-greek font-bold text-lg text-center transition-all flex items-center justify-center gap-2 uppercase tracking-widest">
                  <TrendingUp size={20} />
                  Oracle
                </a>
              </div>
            </div>

            {/* Right Visual */}
            <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
              <div className="relative w-72 h-72 md:w-[500px] md:h-[500px]">
                {/* Rotating Rings */}
                <div className="absolute inset-0 border border-[#d4af37]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                <div className="absolute inset-4 border border-[#d4af37]/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                <div className="absolute inset-0 bg-[#d4af37]/10 blur-[80px] rounded-full animate-pulse"></div>
                
                <img 
                  src={LOGO_URL} 
                  alt="42069 Emblem" 
                  className="absolute inset-4 md:inset-8 w-[calc(100%-2rem)] h-[calc(100%-2rem)] md:w-[calc(100%-4rem)] md:h-[calc(100%-4rem)] object-cover rounded-full border-2 border-[#d4af37]/60 shadow-2xl"
                />
                
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-[#1a120b] border border-[#d4af37] px-4 py-2 rounded-sm shadow-xl animate-bounce">
                   <span className="font-mono text-[#d4af37] text-xs">420</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-[#1a120b] border border-[#d4af37] px-4 py-2 rounded-sm shadow-xl animate-bounce" style={{animationDelay: '0.5s'}}>
                   <span className="font-mono text-[#d4af37] text-xs">69</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <div className="h-24 w-full bg-gradient-to-b from-transparent to-[#2c1e16]"></div>

        {/* ABOUT SECTION */}
        <section id="about" className="py-24 px-4 bg-[#2c1e16] relative stone-texture overflow-hidden">
          {/* Decorative Corner */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-4 border-l-4 border-[#d4af37]/20"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-4 border-r-4 border-[#d4af37]/20"></div>

          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 relative z-10">
              <h2 className="text-5xl md:text-6xl font-greek text-[#d4af37] mb-6 gold-glow uppercase tracking-tighter">The Prophecy</h2>
              <div className="flex items-center justify-center gap-4">
                 <div className="h-[1px] w-20 bg-gradient-to-r from-transparent to-[#d4af37]"></div>
                 <div className="w-3 h-3 bg-[#d4af37] rotate-45"></div>
                 <div className="h-[1px] w-20 bg-gradient-to-l from-transparent to-[#d4af37]"></div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start relative z-10">
              {/* Scattered Images Visual */}
              <div className="relative h-[600px] w-full hidden lg:block perspective-1000">
                {SCATTER_IMAGES.map((img, idx) => (
                   <div 
                      key={idx}
                      className="absolute w-56 transition-all duration-500 hover:scale-110 hover:z-50 shadow-2xl border-4 border-white/5"
                      style={{
                        top: `${10 + (idx * 15)}%`,
                        left: `${(idx % 2 === 0 ? 5 : 40) + (Math.random() * 10)}%`,
                        transform: `rotate(${Math.random() * 20 - 10}deg) translateZ(${idx * 10}px)`,
                        zIndex: idx
                      }}
                   >
                      <img src={img} alt={`Evidence ${idx}`} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500" />
                   </div>
                ))}
              </div>

              {/* Mobile Image Stack (Carousel-ish) */}
              <div className="lg:hidden flex overflow-x-auto gap-4 pb-8 snap-x">
                 {SCATTER_IMAGES.map((img, idx) => (
                    <img key={idx} src={img} alt="Evidence" className="w-64 h-auto flex-shrink-0 rounded-lg border-2 border-[#d4af37]/30 snap-center" />
                 ))}
              </div>

              <div className="space-y-10">
                 <div className="bg-[#1a120b]/80 p-8 border border-[#d4af37]/20 shadow-2xl backdrop-blur-sm relative">
                    <div className="absolute -top-3 -left-3 text-[#d4af37] text-6xl opacity-20 font-serif">"</div>
                    <div className="space-y-6 text-lg leading-loose font-serif text-[#eaddcf] text-justify relative z-10">
                      <p>
                        <span className="text-[#d4af37] font-greek text-2xl font-bold">This {TICKER}</span> is <span className="font-bold text-[#d4af37]">@elonmusk's</span> favorite number.
                      </p>
                      <p>
                        Elon Musk has repeatedly used <span className="text-[#d4af37] font-bold">420</span> and <span className="text-[#d4af37] font-bold">69</span> individually in public ways, which has turned the combination into an ongoing internet joke.
                      </p>
                      <p>
                        It is not merely a meme; it is a cultural artifact, etched into the digital stone of the modern agora. When the signs align, the market responds.
                      </p>
                    </div>
                 </div>

                 <div className="meander-border bg-[#1a120b] p-2 shadow-2xl mt-8 transform hover:scale-[1.02] transition-transform duration-500">
                    <img 
                      src={IMAGE_BANNER} 
                      alt="42069 Banner" 
                      className="w-full h-auto object-cover opacity-90 hover:opacity-100 transition-opacity"
                    />
                    <div className="text-center pt-2 pb-1">
                       <span className="text-[#d4af37] font-greek text-xs tracking-[0.4em] uppercase">The Banner of Truth</span>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </section>

        <div className="h-24 w-full bg-gradient-to-t from-transparent to-[#2c1e16]"></div>

        {/* HOW TO BUY */}
        <section id="how-to-buy" className="py-24 px-4 bg-[#0c0905] relative">
           {/* Background Pillars */}
           <div className="absolute left-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>
           <div className="absolute right-[10%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#d4af37]/20 to-transparent"></div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-greek text-[#d4af37] mb-6 gold-glow uppercase tracking-tighter">The Path to Ascension</h2>
              <p className="text-[#8c7b70] font-serif italic text-xl">Follow the steps to enlightenment.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  step: "I",
                  title: "Create Wallet",
                  desc: "Forge your digital vault with Phantom or Solflare.",
                  icon: <Wallet className="text-[#d4af37]" size={32} />
                },
                {
                  step: "II",
                  title: "Gather SOL",
                  desc: "Acquire the native token of Solana from the exchanges.",
                  icon: <TrendingUp className="text-[#d4af37]" size={32} />
                },
                {
                  step: "III",
                  title: "Seek 42069",
                  desc: "Journey to Pump.fun and enter the sacred contract.",
                  icon: <ExternalLink className="text-[#d4af37]" size={32} />
                },
                {
                  step: "IV",
                  title: "Transmute",
                  desc: "Swap your SOL for the divine $42069.",
                  icon: <Rocket className="text-[#d4af37]" size={32} />
                }
              ].map((item, idx) => (
                <div key={idx} className="relative group bg-[#1a120b] border border-[#d4af37]/20 p-8 hover:bg-[#201610] hover:border-[#d4af37]/60 transition-all duration-500 flex flex-col items-center text-center">
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#d4af37] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></div>
                  
                  <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-[#d4af37]/30">
                    {item.icon}
                  </div>
                  
                  <span className="text-4xl font-greek text-[#d4af37]/10 font-bold absolute top-4 right-6 pointer-events-none">{item.step}</span>
                  
                  <h3 className="text-xl font-greek font-bold text-[#f5e6c8] mb-4 uppercase tracking-wider">{item.title}</h3>
                  <p className="text-[#d4af37]/60 font-serif leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 text-center">
              <a 
                href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-16 py-6 bg-gradient-to-r from-[#b5952f] to-[#d4af37] text-[#0c0905] font-greek font-black text-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(212,175,55,0.4)] uppercase tracking-[0.2em] border-2 border-[#f5e6c8] relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">Enter Pump.fun <ExternalLink size={28} /></span>
                <div className="absolute inset-0 bg-white/30 mix-blend-overlay hover:opacity-100 opacity-0 transition-opacity"></div>
              </a>
            </div>
          </div>
        </section>

        {/* CHART SECTION */}
        <section id="chart" className="py-24 px-4 bg-[#2c1e16] stone-texture border-y border-[#d4af37]/40 relative">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-5xl font-greek text-[#d4af37] uppercase gold-glow tracking-tighter">The Oracle</h2>
                <p className="text-[#f5e6c8]/60 font-serif italic mt-2 text-lg">Observe the candles of fate.</p>
              </div>
              <div className="px-8 py-3 border-2 border-[#d4af37] bg-[#1a120b] shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <span className="text-[#d4af37] font-greek font-bold tracking-[0.3em] text-xl">{TICKER}</span>
              </div>
            </div>

            <div className="h-[700px] w-full bg-[#1a120b] border-[8px] border-[#2c1e16] ring-1 ring-[#d4af37]/50 shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 left-0 right-0 h-1 bg-[#d4af37] z-20"></div>
              <div className="absolute inset-0 flex items-center justify-center text-[#d4af37]/20 font-greek text-4xl uppercase pointer-events-none">
                Connecting to Olympus...
              </div>
              <iframe 
                src={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}?embed=1&theme=dark&trades=0&info=0`} 
                className="w-full h-full relative z-10"
                title="42069 Chart"
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-[#0c0905] border-t border-[#d4af37]/20 px-4 relative z-10">
         {/* Footer glow */}
         <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#d4af37]/5 blur-[100px] rounded-full pointer-events-none"></div>
         
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center items-center gap-6 mb-10">
             <div className="h-px w-20 bg-[#d4af37]/30"></div>
            <img src={LOGO_URL} alt="Logo" className="w-20 h-20 rounded-full border-2 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.2)]" />
            <div className="h-px w-20 bg-[#d4af37]/30"></div>
          </div>
          
          <span className="font-greek text-4xl font-bold text-[#d4af37] mb-12 block tracking-[0.2em] gold-glow">42069</span>

          <div className="flex justify-center gap-12 mb-16">
            <a href={X_COMMUNITY_URL} target="_blank" rel="noopener noreferrer" className="group relative p-4">
               <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-10 blur-md rounded-full transition-opacity"></div>
              <XLogo size={32} className="text-[#8c7b70] group-hover:text-[#d4af37] transition-colors" />
            </a>
            <a href={`https://dexscreener.com/solana/${CONTRACT_ADDRESS}`} target="_blank" rel="noopener noreferrer" className="group relative p-4">
               <div className="absolute inset-0 bg-[#d4af37] opacity-0 group-hover:opacity-10 blur-md rounded-full transition-opacity"></div>
              <TrendingUp size={32} className="text-[#8c7b70] group-hover:text-[#d4af37] transition-colors" />
            </a>
          </div>

          <div className="text-[#5c504a] text-xs space-y-4 font-serif border-t border-[#d4af37]/10 pt-10">
            <p className="tracking-[0.3em] uppercase text-[#d4af37]/30 font-bold">© 2026 THE 42069 ORDER</p>
            <p className="max-w-3xl mx-auto leading-relaxed opacity-60">
              $42069 is a memetic artifact dedicated to the culture of the internet. It possesses no intrinsic value, serves no utility, and offers no financial return. It exists solely for the amusement of the digital age. Tread carefully in the realm of speculation.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
