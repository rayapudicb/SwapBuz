import { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRightLeft,
  ShieldCheck,
  Zap,
  Globe2,
  Trophy,
  Music2,
  Drama,
  Flame,
  CheckCircle2,
  Smartphone,
  ChevronRight,
  Tv,
  MapPin,
  RefreshCw,
  Shuffle,
  Sun,
  Moon,
} from 'lucide-react';

/* ─── Types ─── */
type Theme = 'dark' | 'light';

interface BackgroundVideo {
  id: string;
  name: string;
  category: string;
  sport: string;
  youtubeId: string;
  glowColor: string;
  glowColorLight: string;
  accentGradient: string;
}

/* ─── Data ─── */
const BG_VIDEOS: BackgroundVideo[] = [
  {
    id: 'football-world',
    name: 'Premier League & World Football',
    category: 'Football',
    sport: '⚽ Football',
    youtubeId: 'L3374C3OyrY',
    glowColor: 'rgba(16, 185, 129, 0.40)',
    glowColorLight: 'rgba(16, 185, 129, 0.15)',
    accentGradient: 'from-emerald-400 via-teal-400 to-cyan-400',
  },
  {
    id: 'nba-basketball',
    name: 'NBA Courtside & Slam Dunks',
    category: 'Basketball',
    sport: '🏀 NBA',
    youtubeId: '_tPPbdS3GYA',
    glowColor: 'rgba(245, 158, 11, 0.40)',
    glowColorLight: 'rgba(245, 158, 11, 0.15)',
    accentGradient: 'from-amber-400 via-orange-400 to-rose-400',
  },
  {
    id: 'f1-motorsport',
    name: 'Formula 1 & Grand Prix Speed',
    category: 'Formula 1',
    sport: '🏎️ F1 Racing',
    youtubeId: 'FdUrM4A-LEE',
    glowColor: 'rgba(239, 68, 68, 0.40)',
    glowColorLight: 'rgba(239, 68, 68, 0.15)',
    accentGradient: 'from-red-500 via-rose-500 to-amber-400',
  },
  {
    id: 'tennis-grand-slam',
    name: 'Wimbledon & US Open Tennis',
    category: 'Tennis',
    sport: '🎾 Tennis',
    youtubeId: 'L3374C3OyrY',
    glowColor: 'rgba(34, 197, 94, 0.40)',
    glowColorLight: 'rgba(34, 197, 94, 0.15)',
    accentGradient: 'from-lime-400 via-emerald-400 to-teal-400',
  },
  {
    id: 'concert-arena',
    name: 'Live Stadium Arena Tours & Lasers',
    category: 'Concerts',
    sport: '🎸 Live Concerts',
    youtubeId: '_tPPbdS3GYA',
    glowColor: 'rgba(217, 70, 239, 0.40)',
    glowColorLight: 'rgba(217, 70, 239, 0.15)',
    accentGradient: 'from-fuchsia-400 via-pink-400 to-indigo-400',
  },
  {
    id: 'nfl-football',
    name: 'NFL Super Bowl & Touchdowns',
    category: 'NFL',
    sport: '🏈 NFL',
    youtubeId: 'FdUrM4A-LEE',
    glowColor: 'rgba(99, 102, 241, 0.40)',
    glowColorLight: 'rgba(99, 102, 241, 0.15)',
    accentGradient: 'from-indigo-400 via-blue-400 to-cyan-400',
  },
];

const CATEGORIES = [
  {
    id: 'concerts',
    name: 'Live Music & Festivals',
    badge: 'SOLD OUT TOURS',
    icon: Music2,
    headline: 'Swap your dates. Catch your idol.',
    venues: ['Wembley Stadium, London', 'Madison Square Garden, NYC', 'Sofi Stadium, LA', 'O2 Arena, London'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sports',
    name: 'Premier League & World Football',
    badge: 'DERBY MATCHES',
    icon: Trophy,
    headline: 'Switch sides or dates. Never miss kickoff.',
    venues: ['Emirates Stadium, London', 'Santiago Bernabéu, Madrid', 'San Siro, Milan', 'Camp Nou, Barcelona'],
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'us-sports',
    name: 'NFL, NBA & Major Leagues',
    badge: 'PLAYOFFS & FINALS',
    icon: Flame,
    headline: 'Trade courtside seats with verified fans.',
    venues: ['Crypto.com Arena, LA', 'TD Garden, Boston', 'MetLife Stadium, NJ', 'Chase Center, SF'],
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'theatre',
    name: 'Broadway & West End Shows',
    badge: 'PREMIERES',
    icon: Drama,
    headline: 'Exchange show dates with 100% seat value parity.',
    venues: ['Broadway, New York', 'West End, London', 'Sydney Opera House', 'Palais Garnier, Paris'],
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80',
  },
];

const LIVE_SWAP_FEED = [
  { from: 'Taylor Swift (London - Fri)', to: 'Taylor Swift (London - Sun)', fan: 'Elena R.', time: '2m ago', venue: 'Wembley' },
  { from: 'Arsenal vs Chelsea (Lower Tier)', to: 'Arsenal vs Chelsea (Club Level)', fan: 'Marcus K.', time: '4m ago', venue: 'Emirates' },
  { from: 'Coldplay (Rome - Day 1)', to: 'Coldplay (Rome - Day 2)', fan: 'Matteo G.', time: '7m ago', venue: 'Stadio Olimpico' },
  { from: 'Lakers vs Warriors (Sec 102)', to: 'Lakers vs Warriors (Sec 104)', fan: 'Devon W.', time: '9m ago', venue: 'Crypto Arena' },
];

/* ─── Theme-aware style helpers ─── */
const t = (theme: Theme, dark: string, light: string) => (theme === 'dark' ? dark : light);

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('concerts');
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(() =>
    Math.floor(Math.random() * BG_VIDEOS.length)
  );
  const [swapsCount, setSwapsCount] = useState<number>(24810);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('swapbeez-theme') as Theme | null;
      if (stored) return stored;
    }
    return 'light';
  });

  // Persist theme choice
  useEffect(() => {
    localStorage.setItem('swapbeez-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  // Auto-shuffle video every 20 seconds
  useEffect(() => {
    const shuffleTimer = setInterval(() => {
      setSelectedVideoIndex((prev) => {
        let next = Math.floor(Math.random() * BG_VIDEOS.length);
        if (next === prev) next = (prev + 1) % BG_VIDEOS.length;
        return next;
      });
    }, 20000);
    return () => clearInterval(shuffleTimer);
  }, []);

  // Increment simulated swap counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSwapsCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerRandomSport = () => {
    let next = Math.floor(Math.random() * BG_VIDEOS.length);
    if (next === selectedVideoIndex) next = (selectedVideoIndex + 1) % BG_VIDEOS.length;
    setSelectedVideoIndex(next);
  };

  const v = BG_VIDEOS[selectedVideoIndex];
  const cat = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];
  const isDark = theme === 'dark';

  return (
    <div className={`${theme} relative min-h-screen ${t(theme, 'text-slate-100', 'text-slate-800')} selection:bg-indigo-500 selection:text-white overflow-x-hidden transition-colors duration-500`}>

      {/* ─── FULLSCREEN YOUTUBE BACKGROUND VIDEO ─── */}
      <div className={`fixed inset-0 w-full h-full overflow-hidden pointer-events-none -z-50 ${t(theme, 'bg-[#06080D]', 'bg-[#121620]')}`}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vw] h-[160vh] min-w-[100%] min-h-[100%] pointer-events-none scale-[1.35]">
          <iframe
            key={v.id + v.youtubeId}
            src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${v.youtubeId}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&iv_load_policy=3`}
            title="Multi-Sport Live Background Video"
            className={`w-full h-full object-cover pointer-events-none transition-opacity duration-1000 ${t(theme, 'opacity-85 brightness-105 contrast-110 saturate-125', 'opacity-85 brightness-105 contrast-110 saturate-120')}`}
            allow="autoplay; encrypted-media"
          />
        </div>
        <div
          className="absolute inset-0 transition-all duration-1000 pointer-events-none"
          style={{
            background: isDark
              ? `radial-gradient(circle at top right, ${v.glowColor}, transparent 65%), linear-gradient(to bottom, rgba(6,8,13,0.35) 0%, rgba(6,8,13,0.18) 50%, rgba(6,8,13,0.55) 100%)`
              : `radial-gradient(circle at top right, ${v.glowColorLight}, transparent 70%), linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.20) 100%)`,
          }}
        />
        <div className={`absolute inset-0 pointer-events-none ${t(theme, 'bg-black/10', 'bg-black/5')}`} />
      </div>

      {/* ─── FLOATING MULTI-SPORT CHANNEL DOCK ─── */}
      <div className={`fixed bottom-6 right-6 z-50 glass-panel rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl hidden md:flex items-center gap-1.5 ${t(theme, 'border-white/20 bg-[#0C101B]/85', 'border-slate-200 bg-white/90')}`}>
        <div className="flex items-center gap-1.5 px-2 text-xs font-bold">
          <Tv className={`w-3.5 h-3.5 ${t(theme, 'text-indigo-400', 'text-indigo-600')}`} />
          <span className={`text-[11px] uppercase tracking-wider ${t(theme, 'text-slate-400', 'text-slate-500')}`}>Sports:</span>
        </div>
        {BG_VIDEOS.map((vid, idx) => (
          <button
            key={vid.id}
            onClick={() => setSelectedVideoIndex(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedVideoIndex === idx
                ? `bg-gradient-to-r ${vid.accentGradient} text-black font-extrabold shadow-lg scale-105`
                : t(theme, 'bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white', 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900')
            }`}
          >
            {vid.sport}
          </button>
        ))}
        <button
          onClick={triggerRandomSport}
          className={`ml-2 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${t(theme, 'bg-white/15 hover:bg-white/25 text-white border-white/15', 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200')}`}
          title="Randomize sport video"
        >
          <Shuffle className={`w-3.5 h-3.5 ${t(theme, 'text-amber-400', 'text-amber-600')}`} />
          <span>Shuffle</span>
        </button>
      </div>

      {/* ─── TOP NAVIGATION ─── */}
      <header className={`sticky top-0 z-40 glass-panel px-6 py-4 transition-all backdrop-blur-xl ${t(theme, 'border-b border-white/15 bg-[#06080D]/60', 'border-b border-slate-200/60 bg-white/70')}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl p-0.5 shadow-lg border backdrop-blur-md ${t(theme, 'bg-gradient-to-tr from-white/20 to-white/5 border-white/20', 'bg-gradient-to-tr from-indigo-100 to-white border-slate-200')}`}>
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center ${t(theme, 'bg-[#06080D]/80', 'bg-white')}`}>
                <ArrowRightLeft className={`w-5 h-5 ${t(theme, 'text-white', 'text-indigo-600')}`} />
              </div>
            </div>
            <div>
              <span className={`text-xl font-black tracking-tight flex items-center gap-1.5 ${t(theme, 'text-white drop-shadow', 'text-slate-900')}`}>
                SWAPBEEZ
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </span>
              <p className={`text-[10px] font-semibold tracking-wider uppercase -mt-0.5 ${t(theme, 'text-slate-300 drop-shadow', 'text-slate-500')}`}>
                Universal Exchange Engine
              </p>
            </div>
          </div>

          <nav className={`hidden md:flex items-center gap-8 text-sm font-semibold ${t(theme, 'text-slate-200 drop-shadow', 'text-slate-600')}`}>
            <a href="#how-it-works" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>How It Works</a>
            <a href="#categories" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Events & Venues</a>
            <a href="#bilateral" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Why Bilateral</a>
            <a href="#safety" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Trust & Safety</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-xl transition-all ${t(theme, 'bg-white/10 hover:bg-white/20 text-amber-400', 'bg-slate-100 hover:bg-slate-200 text-indigo-600')}`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <a
              href="#download"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${v.accentGradient} text-black font-bold text-sm shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all`}
            >
              <Smartphone className="w-4 h-4" />
              Get the App
            </a>
          </div>
        </div>
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative pt-16 pb-24 md:pt-28 md:pb-36 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md shadow-lg ${t(theme, 'bg-black/40 border border-white/20 text-white', 'bg-white/80 border border-slate-200 text-slate-700')}`}>
              <Sparkles className={`w-3.5 h-3.5 ${t(theme, 'text-amber-400', 'text-amber-500')}`} />
              <span>THE ZERO-BROKER LIVE SEAT EXCHANGE ENGINE</span>
            </div>

            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] ${t(theme, 'text-white drop-shadow-2xl', 'text-slate-900')}`}>
              Don't Resell. <br />
              <span className={`bg-gradient-to-r ${v.accentGradient} bg-clip-text text-transparent`}>
                Swap Your Seats.
              </span>
            </h1>

            <p className={`text-lg sm:text-xl max-w-2xl leading-relaxed font-medium p-4 rounded-2xl backdrop-blur-sm border ${t(theme, 'text-slate-100 drop-shadow-lg bg-black/25 border-white/10', 'text-slate-600 bg-white/70 border-slate-200')}`}>
              Plans changed? Can't make the match or concert? Don't let scalpers and 30% broker fees take your money.
              Exchange your football, basketball, F1, and concert tickets directly with genuine fans in seconds.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="#download"
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${v.accentGradient} text-black font-extrabold text-base shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all`}
              >
                <Smartphone className="w-5 h-5" />
                Download SwapBeez for iOS & Android
              </a>
              <a
                href="#how-it-works"
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-2xl glass-panel font-bold text-base shadow-xl transition-all ${t(theme, 'text-white hover:bg-white/25 bg-black/40', 'text-slate-700 hover:bg-slate-100')}`}
              >
                How It Works
                <ChevronRight className={`w-4 h-4 ${t(theme, 'text-slate-300', 'text-slate-400')}`} />
              </a>
            </div>

            {/* Live Swap Counter */}
            <div className={`pt-6 grid grid-cols-3 gap-6 border-t ${t(theme, 'border-white/20', 'border-slate-200')}`}>
              <div className={`p-3 rounded-2xl backdrop-blur-sm border ${t(theme, 'bg-black/30 border-white/10', 'bg-white/70 border-slate-200')}`}>
                <p className={`text-2xl sm:text-4xl font-black ${t(theme, 'text-white drop-shadow-lg', 'text-slate-900')}`}>{swapsCount.toLocaleString()}+</p>
                <p className={`text-xs font-semibold ${t(theme, 'text-slate-200', 'text-slate-500')}`}>Verified Swaps Done</p>
              </div>
              <div className={`p-3 rounded-2xl backdrop-blur-sm border ${t(theme, 'bg-black/30 border-white/10', 'bg-white/70 border-slate-200')}`}>
                <p className={`text-2xl sm:text-4xl font-black bg-gradient-to-r ${v.accentGradient} bg-clip-text text-transparent`}>0%</p>
                <p className={`text-xs font-semibold ${t(theme, 'text-slate-200', 'text-slate-500')}`}>Resale Markups</p>
              </div>
              <div className={`p-3 rounded-2xl backdrop-blur-sm border ${t(theme, 'bg-black/30 border-white/10', 'bg-white/70 border-slate-200')}`}>
                <p className={`text-2xl sm:text-4xl font-black ${t(theme, 'text-white drop-shadow-lg', 'text-slate-900')}`}>100%</p>
                <p className={`text-xs font-semibold ${t(theme, 'text-slate-200', 'text-slate-500')}`}>Fan Exchanges</p>
              </div>
            </div>
          </div>

          {/* Right Hero: Live Bilateral Match Card */}
          <div className="lg:col-span-5 relative">
            <div className={`relative rounded-3xl overflow-hidden glass-panel p-6 shadow-2xl backdrop-blur-2xl space-y-6 ${t(theme, 'border-white/25 bg-[#0C101B]/75', 'border-slate-200 bg-white/85')}`}>
              <div className={`flex items-center justify-between pb-4 border-b ${t(theme, 'border-white/15', 'border-slate-200')}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className={`text-sm font-bold ${t(theme, 'text-white', 'text-slate-900')}`}>Live Bilateral Match</span>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] border ${t(theme, 'bg-white/15 text-white border-white/20', 'bg-slate-100 text-slate-600 border-slate-200')}`}>
                  Instant Verification
                </span>
              </div>

              <div className="space-y-4">
                <div className={`rounded-2xl p-4 border space-y-2 ${t(theme, 'glass-card border-white/15 bg-black/40', 'bg-slate-50 border-slate-200')}`}>
                  <div className={`flex items-center justify-between text-[11px] font-semibold ${t(theme, 'text-slate-300', 'text-slate-500')}`}>
                    <span>FAN A • OFFERED TICKET</span>
                    <span className={`font-bold ${t(theme, 'text-white', 'text-slate-800')}`}>Wembley Stadium</span>
                  </div>
                  <p className={`font-extrabold text-base ${t(theme, 'text-white', 'text-slate-900')}`}>Taylor Swift | The Eras Tour</p>
                  <div className={`flex items-center gap-2 text-xs ${t(theme, 'text-slate-200', 'text-slate-600')}`}>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold ${t(theme, 'bg-white/20 text-white', 'bg-slate-200 text-slate-800')}`}>Friday, Aug 15</span>
                    <span>Sec 114 • Row 12</span>
                  </div>
                </div>

                <div className="flex justify-center -my-2 relative z-10">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${v.accentGradient} flex items-center justify-center text-black font-black shadow-xl`}>
                    <ArrowRightLeft className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>

                <div className={`rounded-2xl p-4 border space-y-2 ${t(theme, 'glass-card border-emerald-400/40 bg-emerald-950/40', 'bg-emerald-50 border-emerald-200')}`}>
                  <div className={`flex items-center justify-between text-[11px] font-semibold ${t(theme, 'text-emerald-300', 'text-emerald-700')}`}>
                    <span>FAN B • RECEIVED TICKET</span>
                    <span className={`font-bold ${t(theme, 'text-emerald-200', 'text-emerald-800')}`}>Wembley Stadium</span>
                  </div>
                  <p className={`font-extrabold text-base ${t(theme, 'text-white', 'text-slate-900')}`}>Taylor Swift | The Eras Tour</p>
                  <div className={`flex items-center gap-2 text-xs ${t(theme, 'text-slate-200', 'text-slate-600')}`}>
                    <span className={`px-2 py-0.5 rounded font-mono font-bold ${t(theme, 'bg-emerald-500/30 text-emerald-200', 'bg-emerald-100 text-emerald-800')}`}>Sunday, Aug 17</span>
                    <span>Sec 114 • Row 10</span>
                  </div>
                </div>
              </div>

              <div className={`pt-2 flex items-center justify-between text-xs ${t(theme, 'text-slate-300', 'text-slate-500')}`}>
                <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                  <CheckCircle2 className="w-4 h-4" /> 100% Guaranteed Seat Parity
                </span>
                <span className="font-semibold">Zero Cash Markup</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── EVENT CATEGORIES & VENUES ─── */}
      <section id="categories" className="py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${t(theme, 'bg-black/40 border border-white/20 text-white', 'bg-white/80 border border-slate-200 text-slate-700')}`}>
              <Globe2 className={`w-3.5 h-3.5 ${t(theme, 'text-indigo-400', 'text-indigo-600')}`} />
              <span>ACROSS EVERY LIVE ENTERTAINMENT VERTICAL</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight ${t(theme, 'text-white drop-shadow-2xl', 'text-slate-900')}`}>
              Every Stage. Every Stadium. Every Match.
            </h2>
            <p className={`text-base sm:text-lg ${t(theme, 'text-slate-200 drop-shadow', 'text-slate-600')}`}>
              SwapBeez is the universal exchange engine connecting fans across world football derbies, sold-out arena tours, NBA courtside seats, and Broadway premieres.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CATEGORIES.map((c) => {
              const Icon = c.icon;
              const isActive = activeCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-bold transition-all backdrop-blur-md ${
                    isActive
                      ? `bg-gradient-to-r ${v.accentGradient} text-black font-extrabold shadow-xl scale-105`
                      : t(theme, 'glass-panel text-slate-200 hover:text-white hover:bg-white/25 bg-black/40', 'glass-panel text-slate-600 hover:text-slate-900 hover:bg-slate-100')
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Active Category Showcase */}
          <div className={`relative rounded-3xl overflow-hidden glass-panel border shadow-2xl p-8 sm:p-12 backdrop-blur-2xl ${t(theme, 'border-white/25 bg-[#0C101B]/75', 'border-slate-200 bg-white/85')}`}>
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold tracking-wider ${t(theme, 'bg-white/20 text-white', 'bg-slate-100 text-slate-700')}`}>
                  {cat.badge}
                </div>
                <h3 className={`text-2xl sm:text-4xl font-extrabold leading-tight ${t(theme, 'text-white', 'text-slate-900')}`}>
                  {cat.headline}
                </h3>
                <p className={`text-sm sm:text-base leading-relaxed ${t(theme, 'text-slate-200', 'text-slate-600')}`}>
                  Connect directly with attendees who have the alternate date, section, or venue you need. Automated barcode verification checks ensure authentic tickets.
                </p>
                <div className="space-y-3 pt-2">
                  <p className={`text-xs font-bold uppercase tracking-wider ${t(theme, 'text-slate-300', 'text-slate-500')}`}>Top Verified Venues</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {cat.venues.map((venue, idx) => (
                      <div key={idx} className={`flex items-center gap-2 text-xs px-3.5 py-2.5 rounded-xl border backdrop-blur-md ${t(theme, 'text-slate-200 bg-white/10 border-white/15', 'text-slate-600 bg-slate-50 border-slate-200')}`}>
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${t(theme, 'text-white', 'text-slate-400')}`} />
                        <span className="truncate font-medium">{venue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={`lg:col-span-6 relative aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border ${t(theme, 'border-white/20', 'border-slate-200')}`}>
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                  <span className="font-bold flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    Bilateral Matching Engine Active
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/40 text-emerald-200 font-bold border border-emerald-400/50">
                    Live Verified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS: 3 STEPS ─── */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto space-y-16 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md ${t(theme, 'bg-black/40 border border-white/20 text-emerald-300', 'bg-white/80 border border-slate-200 text-emerald-600')}`}>
            <Zap className={`w-3.5 h-3.5 ${t(theme, 'text-emerald-400', 'text-emerald-500')}`} />
            <span>SEAMLESS 3-STEP EXPERIENCE</span>
          </div>
          <h2 className={`text-3xl sm:text-5xl font-black ${t(theme, 'text-white drop-shadow-2xl', 'text-slate-900')}`}>How SwapBeez Works</h2>
          <p className={`text-base sm:text-lg ${t(theme, 'text-slate-200 drop-shadow', 'text-slate-600')}`}>
            No price gouging. No brokers holding your money. Just pure fan-to-fan seat swapping.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { num: '01', title: 'Upload Your Ticket', desc: "Import your official mobile ticket or PDF. SwapBeez's secure OCR engine validates the event, date, and seat tier in real time.", icon: ShieldCheck, iconColor: 'text-emerald-400', label: 'Direct Provider Verification' },
            { num: '02', title: 'Set Your Swap Intent', desc: 'Choose the alternate dates, companion sections, or cities you want. The universal algorithm discovers instant matches.', icon: RefreshCw, iconColor: 'text-indigo-400', label: 'AI Compatibility Engine' },
            { num: '03', title: 'Confirm & Celebrate', desc: 'Both fans review the match and lock the bilateral agreement. Barcodes are securely exchanged with complete proof of transfer.', icon: CheckCircle2, iconColor: 'text-emerald-400', label: '100% Guaranteed Seat Exchange' },
          ].map((step) => (
            <div key={step.num} className={`glass-panel rounded-3xl p-8 border space-y-6 relative overflow-hidden group transition-all backdrop-blur-2xl ${t(theme, 'border-white/20 hover:border-white/40 bg-[#0C101B]/75', 'border-slate-200 hover:border-slate-300 bg-white/85')}`}>
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${v.accentGradient} flex items-center justify-center text-black font-black text-xl shadow-lg`}>
                {step.num}
              </div>
              <div className="space-y-2">
                <h3 className={`text-xl font-bold ${t(theme, 'text-white', 'text-slate-900')}`}>{step.title}</h3>
                <p className={`text-sm leading-relaxed ${t(theme, 'text-slate-200', 'text-slate-600')}`}>{step.desc}</p>
              </div>
              <div className={`pt-4 border-t text-xs font-bold flex items-center gap-1 ${t(theme, 'border-white/15 text-white', 'border-slate-200 text-slate-700')}`}>
                <step.icon className={`w-4 h-4 ${step.iconColor}`} /> {step.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY BILATERAL BEATS RESALE ─── */}
      <section id="bilateral" className="py-20 px-6 relative z-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${t(theme, 'bg-black/40 border border-white/20 text-white', 'bg-white/80 border border-slate-200 text-slate-700')}`}>
              <Flame className={`w-3.5 h-3.5 ${t(theme, 'text-amber-400', 'text-amber-500')}`} />
              <span>THE FAN-FIRST REVOLUTION</span>
            </div>
            <h2 className={`text-3xl sm:text-5xl font-black leading-tight ${t(theme, 'text-white drop-shadow-2xl', 'text-slate-900')}`}>
              Why Sell at a Loss When You Can Swap?
            </h2>
            <p className={`text-base leading-relaxed p-4 rounded-2xl backdrop-blur-sm border ${t(theme, 'text-slate-200 bg-black/25 border-white/10', 'text-slate-600 bg-white/70 border-slate-200')}`}>
              Secondary ticketing platforms take up to 35% in hidden fees and leave you stranded when you just want to attend the show on a different night.
            </p>

            <div className="space-y-4 pt-2">
              {[
                { title: 'Zero Scalper Markups', desc: 'Every swap is bilateral 1-to-1. No speculative price gouging.' },
                { title: 'Verified Attendance Only', desc: 'Only genuine ticket holders can initiate exchanges.' },
                { title: 'Post-Swap Reputation & Ratings', desc: '5-Star verified community reviews reward reliable fans.' },
              ].map((item, idx) => (
                <div key={idx} className={`flex items-start gap-3 p-3 rounded-2xl border backdrop-blur-sm ${t(theme, 'bg-black/30 border-white/10', 'bg-white/70 border-slate-200')}`}>
                  <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${t(theme, 'text-white', 'text-slate-900')}`}>{item.title}</p>
                    <p className={`text-xs ${t(theme, 'text-slate-300', 'text-slate-500')}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Ticker Feed */}
          <div className="lg:col-span-6 space-y-4">
            <div className={`glass-panel rounded-3xl p-6 border space-y-4 shadow-2xl backdrop-blur-2xl ${t(theme, 'border-white/20 bg-[#0C101B]/75', 'border-slate-200 bg-white/85')}`}>
              <div className={`flex items-center justify-between pb-3 border-b ${t(theme, 'border-white/15', 'border-slate-200')}`}>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className={`text-sm font-bold ${t(theme, 'text-white', 'text-slate-900')}`}>Live Exchanges Happening Now</span>
                </div>
                <span className={`text-xs font-semibold ${t(theme, 'text-slate-300', 'text-slate-500')}`}>Real-Time Engine</span>
              </div>
              <div className="space-y-3">
                {LIVE_SWAP_FEED.map((feed, idx) => (
                  <div key={idx} className={`rounded-2xl p-3.5 border flex items-center justify-between text-xs backdrop-blur-md ${t(theme, 'bg-black/40 border-white/10', 'bg-slate-50 border-slate-200')}`}>
                    <div className="space-y-1 max-w-[70%]">
                      <p className={`font-bold truncate ${t(theme, 'text-white', 'text-slate-900')}`}>{feed.from}</p>
                      <p className={`text-[11px] flex items-center gap-1 truncate font-medium ${t(theme, 'text-slate-200', 'text-slate-600')}`}>
                        <ArrowRightLeft className={`w-3 h-3 shrink-0 ${t(theme, 'text-white', 'text-slate-400')}`} />
                        {feed.to}
                      </p>
                      <p className={`text-[10px] ${t(theme, 'text-slate-400', 'text-slate-500')}`}>Swapped by {feed.fan} • {feed.venue}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${t(theme, 'bg-emerald-500/30 text-emerald-200 border-emerald-400/40', 'bg-emerald-50 text-emerald-700 border-emerald-200')}`}>
                      {feed.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DOWNLOAD CTA ─── */}
      <section id="download" className="py-24 px-6 relative z-10">
        <div className={`max-w-5xl mx-auto rounded-3xl glass-panel border p-10 sm:p-16 text-center space-y-8 relative overflow-hidden shadow-2xl backdrop-blur-2xl ${t(theme, 'border-white/25 bg-[#0C101B]/80', 'border-slate-200 bg-white/90')}`}>
          <div className={`w-16 h-16 rounded-3xl bg-gradient-to-tr ${v.accentGradient} p-0.5 mx-auto shadow-2xl`}>
            <div className={`w-full h-full rounded-[22px] flex items-center justify-center ${t(theme, 'bg-[#06080D]', 'bg-white')}`}>
              <Smartphone className={`w-8 h-8 ${t(theme, 'text-white', 'text-slate-800')}`} />
            </div>
          </div>
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className={`text-3xl sm:text-5xl font-black tracking-tight ${t(theme, 'text-white drop-shadow-2xl', 'text-slate-900')}`}>
              Ready to Swap Your Seats?
            </h2>
            <p className={`text-base sm:text-lg font-medium ${t(theme, 'text-slate-100 drop-shadow', 'text-slate-600')}`}>
              Download the native mobile app for iOS and Android. Start exploring live stadium matches and concert tours in your city today.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a href="#" className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-black text-sm shadow-2xl transition-all w-full sm:w-auto justify-center ${t(theme, 'bg-white text-black hover:bg-slate-200', 'bg-slate-900 text-white hover:bg-slate-800')}`}>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.36-.58.67-.99 1.74-.88 2.76 1 .08 2-.52 2.6-1.27z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold leading-none">Download on the</p>
                <p className="text-sm font-black leading-tight">App Store</p>
              </div>
            </a>
            <a href="#" className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm border shadow-2xl transition-all w-full sm:w-auto justify-center backdrop-blur-md ${t(theme, 'bg-black/60 text-white border-white/30 hover:bg-black/80', 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50')}`}>
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a1.996 1.996 0 0 1-.61-1.436V3.25c0-.555.228-1.057.609-1.436zm11.24 11.24l2.122 2.122-10.985 6.342 8.863-8.464zm2.828-2.828l3.14 1.813c.896.517.896 1.36 0 1.878l-3.14 1.813-2.122-2.122 2.122-2.122zm-2.828-2.828L5.986 4.434l10.985 6.342-2.122-2.122z"/>
              </svg>
              <div className="text-left">
                <p className="text-[10px] uppercase font-bold leading-none">Get it on</p>
                <p className="text-sm font-black leading-tight">Google Play</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={`border-t py-12 px-6 backdrop-blur-xl text-xs relative z-10 ${t(theme, 'border-white/15 bg-[#040609]/80 text-slate-300', 'border-slate-200 bg-white/80 text-slate-500')}`}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${t(theme, 'bg-white/20 text-white', 'bg-slate-100 text-slate-600')}`}>
              <ArrowRightLeft className="w-3.5 h-3.5" />
            </div>
            <span className={`font-bold ${t(theme, 'text-white', 'text-slate-800')}`}>SWAPBEEZ PLATFORM</span>
            <span>© 2026 SwapBeez Inc. All rights reserved.</span>
          </div>
          <div className={`flex items-center gap-6 font-medium ${t(theme, 'text-slate-300', 'text-slate-500')}`}>
            <a href="#" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Privacy Policy</a>
            <a href="#" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Terms of Service</a>
            <a href="#" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Fan Safety Guidelines</a>
            <a href="#" className={`hover:${t(theme, 'text-white', 'text-slate-900')} transition-colors`}>Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
