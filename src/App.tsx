import { useEffect, useRef, useState } from 'react';
import {
  PenTool,
  Headphones,
  Mic,
  Video,
  Instagram,
  CalendarDays,
  ChevronDown,
  Play,
  Star,
  Menu,
  X,
} from 'lucide-react';

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </section>
  );
}

const CALENDLY_URL = 'https://calendly.com/kian-kbmediax/30min';
const INSTAGRAM_URL = 'https://www.instagram.com/';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedProcess, setExpandedProcess] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const processSteps = [
    {
      num: '01',
      title: 'Vi finder din lyd og retning',
      desc: 'Vi finder ud af, hvad der klæder dig bedst som artist — både i lyd, vibe, energi og retning. Målet er, at du ikke bare lyder god, men lyder som dig.',
    },
    {
      num: '02',
      title: 'Vi gør din sang stærkere',
      desc: 'Vi arbejder med hook, struktur, tekst, levering og detaljer, så sangen bliver skarpere og mere færdig. Du får hjælp til at tage idéen fra halvfærdig til stærk.',
    },
    {
      num: '03',
      title: 'Vi arbejder sammen i studiet',
      desc: 'I studiet guider jeg dig gennem indspilning, performance, vokaler og produktion. Du bliver ikke bare optaget — du bliver coachet hele vejen.',
    },
    {
      num: '04',
      title: 'Du går derfra med klarhed og momentum',
      desc: 'Du går derfra med mere ro i hovedet, mere retning og et tydeligere næste skridt. Ikke bare inspiration — men reel fremdrift.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#080b12] text-white antialiased overflow-x-hidden">
      {/* Background ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[30%] right-[-200px] w-[500px] h-[500px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] rounded-full bg-blue-700/8 blur-[100px]" />
      </div>

      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080b12]/90 backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold tracking-widest text-white">KIAN</span>

          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors">
              Hvad jeg hjælper med
            </button>
            <button onClick={() => scrollTo('process')} className="hover:text-white transition-colors">
              Processen
            </button>
            <button onClick={() => scrollTo('booking')} className="hover:text-white transition-colors">
              Book kald
            </button>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-sm font-semibold hover:opacity-90 transition-all hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95"
            >
              Book kald
            </a>
          </div>

          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0d1120]/95 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex flex-col gap-4 text-sm text-white/70">
            <button onClick={() => scrollTo('services')} className="text-left hover:text-white transition-colors py-1">
              Hvad jeg hjælper med
            </button>
            <button onClick={() => scrollTo('process')} className="text-left hover:text-white transition-colors py-1">
              Processen
            </button>
            <button onClick={() => scrollTo('booking')} className="text-left hover:text-white transition-colors py-1">
              Book kald
            </button>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-center hover:opacity-90 transition-all"
            >
              Book kald
            </a>
          </div>
        )}
      </nav>

      {/* HERO + VSL COMBINED - SIMPLIFIED */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-20">
        <div className="w-full max-w-3xl">
          {/* Hero headline and subheadline */}
          <div className="flex flex-col items-center text-center mb-14">
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-[1.05] tracking-tight mb-8"
              style={{ animation: 'fadeUp 0.8s ease 0.1s forwards', opacity: 0 }}
            >
              Få din musik{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                helt i mål
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-white/55 max-w-xl leading-relaxed"
              style={{ animation: 'fadeUp 0.8s ease 0.2s forwards', opacity: 0 }}
            >
              Jeg hjælper upcoming artister med at finde deres lyd, blive skarpere i studiet og få deres sange færdige.
            </p>
          </div>

          {/* VSL Video Block - Full width */}
          <div
            className="flex flex-col gap-5 mb-12"
            style={{ animation: 'fadeUp 0.8s ease 0.35s forwards', opacity: 0 }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Se hvordan jeg kan{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  hjælpe dig
                </span>
              </h3>
              <p className="text-white/55 text-base leading-relaxed">
                En kort video hvor jeg forklarer, hvordan jeg hjælper upcoming artister med at finde deres lyd, blive
                skarpere i studiet og få deres musik færdig.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-blue-500/5 aspect-video flex flex-col items-center justify-center gap-3 group cursor-default hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-300">
                <Play size={20} className="text-white ml-0.5" />
              </div>
              <p className="text-sm text-white/50 text-center px-4">Klik for at se video</p>
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="flex flex-col items-center gap-1 text-white/20"
            style={{ animation: 'fadeUp 1s ease 0.8s forwards', opacity: 0 }}
          >
            <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/20" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <div id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400/70 mb-3 font-medium">Services</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Hvad{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                KIAN hjælper med
              </span>
            </h2>
            <p className="text-white/50 text-base">Det her er de vigtigste områder, jeg hjælper artister med.</p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                icon: <PenTool size={22} />,
                title: 'Sangskrivning',
                text: 'Hooks, struktur, storytelling og idéer der faktisk bliver færdige.',
                delay: 0,
              },
              {
                icon: <Headphones size={22} />,
                title: 'Studie-session',
                text: 'Produktion, indspilning, lyd og retning i studiet.',
                delay: 80,
              },
              {
                icon: <Mic size={22} />,
                title: 'Flow & performance',
                text: 'Delivery, vokal, energi og hvordan du lyder mere sikker.',
                delay: 160,
              },
              {
                icon: <Video size={22} />,
                title: 'Artist-brand & content',
                text: 'Sociale medier, visuel retning og content omkring din musik.',
                delay: 240,
              },
            ].map(({ icon, title, text, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className="group h-full p-6 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm hover:bg-white/7 hover:border-blue-500/30 transition-all duration-300 cursor-default hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-blue-500/20 flex items-center justify-center text-blue-300 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{text}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS */}
      <div id="process" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400/70 mb-3 font-medium">Processen</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Sådan løfter vi{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                dit niveau
              </span>
            </h2>
            <p className="text-white/50 text-base">
              Fra idé og tvivl til mere klarhed, bedre lyd og reel fremdrift.
            </p>
          </FadeIn>

          <div className="flex flex-col gap-4">
            {processSteps.map(({ num, title, desc }, idx) => (
              <FadeIn key={num} delay={idx * 80}>
                <button
                  onClick={() => setExpandedProcess(expandedProcess === idx ? null : idx)}
                  className="w-full text-left group flex flex-col p-7 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm hover:bg-white/7 hover:border-blue-500/25 transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 flex-1">
                      <span className="text-3xl font-extrabold bg-gradient-to-br from-blue-400/60 to-cyan-400/40 bg-clip-text text-transparent leading-none select-none min-w-[3.5rem]">
                        {num}
                      </span>
                      <div className="w-px h-8 bg-white/10 flex-shrink-0" />
                      <p className="text-base sm:text-lg font-semibold text-white/90 group-hover:text-white transition-colors">
                        {title}
                      </p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`text-white/30 group-hover:text-blue-400 transition-all duration-300 flex-shrink-0 ${
                        expandedProcess === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </div>

                  {expandedProcess === idx && (
                    <div className="mt-5 pt-5 border-t border-white/10 ml-[calc(3.5rem+24px)]">
                      <p className="text-white/60 leading-relaxed text-sm">{desc}</p>
                    </div>
                  )}
                </button>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400/70 mb-3 font-medium">Anmeldelser</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              Hvad{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                andre siger
              </span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: 'Artist 1',
                quote: 'KIAN hjalp mig med at finde min lyd. Nu ved jeg præcis, hvad jeg skal fokusere på.',
                delay: 0,
              },
              {
                name: 'Artist 2',
                quote: 'Mine hooks er blevet skarpere, og jeg føler mig langt mere klar som artist.',
                delay: 100,
              },
              {
                name: 'Artist 3',
                quote: 'Før tænkte jeg for meget. Nu har jeg en plan, en retning og musik der faktisk bliver færdigt.',
                delay: 200,
              },
            ].map(({ name, quote, delay }) => (
              <FadeIn key={name} delay={delay}>
                <div className="h-full p-7 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm flex flex-col gap-5 hover:border-blue-500/25 hover:bg-white/6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.10)] hover:-translate-y-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-blue-400 fill-blue-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed flex-1 italic">"{quote}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/40 to-cyan-400/20 border border-white/10 flex items-center justify-center text-xs font-bold text-blue-300">
                      {name[0]}
                    </div>
                    <span className="text-sm font-medium text-white/60">{name}</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* BOOKING - Main final CTA */}
      <div id="booking" className="relative z-10 py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeIn className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-blue-400/70 mb-3 font-medium">Book</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
              Klar til at tage din musik{' '}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                seriøst?
              </span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed max-w-md mx-auto">
              Book et kort kald, hvis du vil finde ud af, om jeg kan hjælpe dig med din musik.
            </p>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="rounded-3xl border border-white/10 bg-white/4 backdrop-blur-sm overflow-hidden p-6 sm:p-8">
              <div className="w-full rounded-2xl overflow-hidden bg-[#0d1120] border border-white/8">
                <iframe
                  src={`${CALENDLY_URL}?embed_domain=kian.com&embed_type=Inline&hide_landing_page_details=1&hide_gdpr_banner=1&background_color=080b12&text_color=ffffff&primary_color=3b82f6`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  title="Book kald med KIAN"
                />
              </div>

              <div className="mt-6 text-center">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold text-base hover:opacity-90 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.45)] active:scale-95"
                >
                  Book via Calendly
                  <CalendarDays size={16} />
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/8 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-xl font-bold tracking-widest text-white">KIAN</span>
            <span className="text-xs text-white/25 tracking-wide">KB Media</span>
            <p className="text-xs text-white/35 mt-1">
              Artist Development • Producer • Creative Coach
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-white/40">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Instagram size={15} />
              Instagram
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <CalendarDays size={15} />
              Calendly
            </a>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-xs text-white/20">
          &copy; {new Date().getFullYear()} KB Media. Alle rettigheder forbeholdes.
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
