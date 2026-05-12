import { useEffect, useRef, useState } from 'react';
import {
  PenTool,
  Headphones,
  Mic,
  Video,
  Instagram,
  CalendarDays,
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

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
              Få din sang{' '}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                helt i mål
              </span>
            </h1>

            <p
              className="text-lg sm:text-xl text-white/55 max-w-xl leading-relaxed"
              style={{ animation: 'fadeUp 0.8s ease 0.2s forwards', opacity: 0 }}
            >
              Hvis du har en idé, et hook eller en demo liggende, men ikke helt ved, hvordan du får den færdig, hjælper jeg dig med at finde retningen, skrive skarpere og få sangen til at føles rigtig.
            </p>
          </div>

          {/* VSL Video Block - Full width */}
          <div
            className="flex flex-col gap-5 mb-12"
            style={{ animation: 'fadeUp 0.8s ease 0.35s forwards', opacity: 0 }}
          >
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Se om det her er det, du{' '}
                <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  mangler
                </span>
              </h3>
              <p className="text-white/55 text-base leading-relaxed">
                I videoen forklarer jeg, hvordan vi kan tage din idé fra halvfærdig til noget, der føles mere færdigt
                i lyd, tekst, performance og retning.
              </p>
            </div>

            <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-black aspect-video hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/5G3aE8NMpSA"
                title="KIAN VSL"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
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
                text: 'Du har måske idéen. Jeg hjælper dig med at finde linjerne, hooket og vinklen, så sangen faktisk rammer.',
                delay: 0,
              },
              {
                icon: <Headphones size={22} />,
                title: 'Studie-session',
                text: 'Du skal ikke bare ind og indspille. Du skal ind og forstå, hvorfor det virker, og hvordan det bliver bedre.',
                delay: 80,
              },
              {
                icon: <Mic size={22} />,
                title: 'Flow & performance',
                text: 'Din tekst kan være god, men hvis du ikke leverer den rigtigt, mærker folk den ikke. Det arbejder vi med.',
                delay: 160,
              },
              {
                icon: <Video size={22} />,
                title: 'Artist-brand & content',
                text: 'Hvis sangen er fed, skal folk også forstå, hvorfor de skal lytte. Vi gør din musik nemmere at opdage.',
                delay: 240,
              },
            ].map(({ icon, title, text, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className="group h-full p-6 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm hover:bg-white/7 hover:border-blue-500/30 transition-all duration-300 cursor-default hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-400/10 border border-blue-500/20 flex items-center justify-center text-blue-300 mb-5 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed max-w-[15rem]">{text}</p>
                </div>
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
                name: 'MGZ',
                image: './testimonials/mgz.png',
                avatarClass: '',
                quote:
                  'Jeg var faktisk lidt i chok, fordi du kom med et flow, og så var jeg sådan der: "Shit, han har styr på hvad han laver, ham der."',
                delay: 0,
              },
              {
                name: 'VEGA',
                image: './testimonials/vega.jpg',
                avatarClass: 'scale-[1.18]',
                quote:
                  'Du har været der fra starten af. Det har bare givet mig et selvtillidsboost, og det gør jo virkelig noget, at jeg har færdiggjort noget.',
                delay: 100,
              },
              {
                name: 'Magnus Nonbo',
                image: './testimonials/magnus-nonbo.jpg',
                avatarClass: 'scale-[1.55] -translate-x-1 translate-y-1',
                quote:
                  'Jeg ville have ramt den samme væg hver gang. Men når man har fået vist, hvordan man kommer igennem den væg, så synes jeg, at det gør det meget nemmere.',
                delay: 200,
              },
            ].map(({ name, image, avatarClass, quote, delay }) => (
              <FadeIn key={name} delay={delay}>
                <div className="h-full p-7 rounded-3xl border border-white/8 bg-white/4 backdrop-blur-sm flex flex-col gap-5 hover:border-blue-500/25 hover:bg-white/6 transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.10)] hover:-translate-y-1">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="text-blue-400 fill-blue-400" />
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed flex-1 italic">"{quote}"</p>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                    <div className="h-11 w-11 rounded-full overflow-hidden border border-blue-300/35 bg-gradient-to-br from-blue-500/50 to-cyan-400/20 shadow-[0_0_18px_rgba(59,130,246,0.22)]">
                      <img
                        src={image}
                        alt={name}
                        className={`h-full w-full object-cover ${avatarClass}`}
                      />
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
