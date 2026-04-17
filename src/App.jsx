import { useState, useEffect, useRef } from "react";

const NAV_LINKS = [
  { label: "Características", href: "#features" },
  { label: "Beneficios", href: "#benefits" },
  { label: "Tiendas", href: "#social" },
];

const FEATURES = [
  {
    tag: "Inventario",
    title: "Lleva el control sin papel ni libreta",
    desc: "Cada vez que llega mercancía, ABASTOCK la registra al instante. Tu inventario siempre actualizado: qué tienes, qué te falta, qué se vendió. Sin tachones, sin hojas perdidas.",
    img: "/img/pantalla-inventario.jpeg",
    accent: "Adiós a las libretas",
    reverse: false,
  },
  {
    tag: "Escáner",
    title: "Escanea y listo — sin teclear nada",
    desc: "Apunta la cámara al código de barras y en segundos el producto ya está en tu inventario. Ni un error de dedo, ni tiempo perdido buscando el nombre correcto.",
    img: "/img/scan.jpeg",
    accent: "Escanea cualquier producto",
    reverse: true,
  },
  {
    tag: "Ventas",
    title: "Registra tus ventas al instante y sin matemáticas",
    desc: "Anota lo que vendes en el momento. La app suma el total por ti y descuenta los productos de tu inventario automáticamente. Atiende a tus clientes más rápido y despídete de los errores de cobro.",
    img: "/img/pantalla-ventas.jpeg",
    accent: "Cuentas claras, inventario al día",
    reverse: false,
  },
];

const BENEFITS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Funciona sin internet",
    desc: "En zonas con señal mala o nula, ABASTOCK sigue trabajando. Tus datos siempre disponibles.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "Tan fácil como un mensaje",
    desc: "Sin cursos, sin manuales. Si usas WhatsApp, puedes usar ABASTOCK desde el primer día.",
    color: "text-cyan-600",
    bg: "bg-cyan-50",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    title: "Ve cuánto ganas de verdad",
    desc: "Conoce tus ganancias, tus gastos y qué productos te dan más dinero — todo en pantalla.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Evita las pérdidas ocultas",
    desc: "ABASTOCK te avisa cuando un producto se está acabando o cuando algo no cuadra en tu caja.",
    color: "text-red-500",
    bg: "bg-red-50",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: "Tu tienda en tu bolsillo",
    desc: "Revisa tu negocio desde casa, desde el mercado, desde donde estés. 24/7.",
    color: "text-purple-500",
    bg: "bg-purple-50",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Para toda la familia",
    desc: "Tú, tu pareja, tu hijo — todos pueden ayudar a registrar sin miedo a equivocarse.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
];

const TESTIMONIALS = [
  {
    name: "Rosario M.",
    location: "Oaxaca",
    text: "Antes usaba tres libretas y aún así perdía productos. Ahora sé exactamente qué tengo y cuánto gané esta semana.",
    stars: 5,
    initials: "RM",
  },
  {
    name: "Don Ernesto V.",
    location: "Veracruz",
    text: "Mis hijos me enseñaron en un rato. El escáner me ahorra muchísimo tiempo cuando llega el surtido.",
    stars: 5,
    initials: "EV",
  },
  {
    name: "Patricia L.",
    location: "Puebla",
    text: "Por fin sé cuánto gano al mes. Antes ni idea. Ahora tengo todo claro en el celular.",
    stars: 5,
    initials: "PL",
  },
];

function StarRating({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400 fill-amber-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function PhoneMockup({ src, alt = "App Screenshot", className = "" }) {
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: 220 }}>
      <div className="relative bg-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl ring-4 ring-slate-800/60">
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-full z-10" />
        <div className="rounded-[2rem] overflow-hidden bg-white" style={{ aspectRatio: "9/19" }}>
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.classList.add("flex","items-center","justify-center","bg-gradient-to-b","from-slate-100","to-slate-200");
              const placeholder = document.createElement("div");
              placeholder.className = "text-center p-4";
              placeholder.innerHTML = `<div class="text-4xl mb-2">📱</div><p class="text-xs text-slate-400 font-medium">${alt}</p>`;
              e.target.parentElement.appendChild(placeholder);
            }}
          />
        </div>
      </div>
    </div>
  );
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function ABASTOCKLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-sans bg-gray-50 text-slate-900 overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 select-none">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                <line x1="12" y1="12" x2="12" y2="16" />
                <line x1="10" y1="14" x2="14" y2="14" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">ABASTOCK</span>
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors px-4 py-2 rounded-xl hover:bg-slate-100"
            >
              Iniciar sesión
            </a>
            <a
              href="#cta"
              className="text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
            >
              Empieza gratis
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-3">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-slate-700 py-1">
                {l.label}
              </a>
            ))}
            <a href="#login" className="text-sm font-semibold text-slate-700 py-1">Iniciar sesión</a>
            <a href="#cta" className="text-sm font-semibold bg-blue-600 text-white py-2.5 rounded-xl text-center">Empieza gratis</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 -z-10" />

        <div className="max-w-6xl mx-auto px-5 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <div
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
              style={{ animation: "fadeUp 0.6s ease both" }}
            >
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
              Más de 100 tiendas activas en México
            </div>

            <h1
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-slate-900 mb-5"
              style={{ animation: "fadeUp 0.6s 0.1s ease both" }}
            >
              El control de tu tienda,{" "}
              <span className="text-blue-600">en tu bolsillo</span>
            </h1>

            <p
              className="text-lg text-slate-500 leading-relaxed mb-8 max-w-md"
              style={{ animation: "fadeUp 0.6s 0.2s ease both" }}
            >
              Olvídate de las libretas y las pérdidas ocultas. Con ABASTOCK registras
              tu mercancía en segundos, sabes exactamente qué tienes y cuánto ganas — 
              todo desde tu celular.
            </p>

            <div
              className="flex flex-wrap gap-3"
              style={{ animation: "fadeUp 0.6s 0.3s ease both" }}
            >
              <a
                href="#cta"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-2xl text-base transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
              >
                Empieza gratis hoy
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="#features"
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-2xl text-base transition-all border border-slate-200"
              >
                Ver cómo funciona
              </a>
            </div>

            {/* Trust indicators */}
            <div
              className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-100"
              style={{ animation: "fadeUp 0.6s 0.4s ease both" }}
            >
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">100+</p>
                <p className="text-xs text-slate-400">Tiendas activas</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">4.9★</p>
                <p className="text-xs text-slate-400">Calificación</p>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">0 papel</p>
                <p className="text-xs text-slate-400">Necesario</p>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div
            className="flex justify-center items-center relative"
            style={{ animation: "fadeUp 0.7s 0.25s ease both" }}
          >
            <div className="absolute inset-0 bg-gradient-radial from-blue-100/60 to-transparent -z-10" />
            <PhoneMockup src="/img/pantalla-inventario.jpeg" alt="Pantalla de inventario" />
          </div>
        </div>
      </section>

      {/* ── FEATURES ZIG-ZAG ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <AnimatedSection className="text-center mb-16">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Cómo funciona</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Todo lo que necesitas para llevar tu tienda
            </h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Tres herramientas simples que trabajan juntas para que nunca más pierdas ni un peso.
            </p>
          </AnimatedSection>

          <div className="flex flex-col gap-24">
            {FEATURES.map((feat, i) => (
              <AnimatedSection key={feat.tag} delay={100}>
                <div className={`grid md:grid-cols-2 gap-12 items-center ${feat.reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
                  {/* Text */}
                  <div className="flex flex-col justify-center">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 w-fit uppercase tracking-wider">
                      {feat.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-snug">
                      {feat.title}
                    </h3>
                    <p className="text-slate-500 text-base leading-relaxed mb-6">{feat.desc}</p>
                    <div className="flex items-center gap-2 text-blue-600 text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      {feat.accent}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="flex justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-3xl scale-105 -z-10" />
                      <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-4">
                        <div className="rounded-2xl overflow-hidden bg-slate-100" style={{ width: 280, height: 360 }}>
                          <img
                            src={feat.img}
                            alt={feat.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = "none";
                              e.target.parentElement.classList.add("flex","flex-col","items-center","justify-center","gap-4");
                              e.target.parentElement.innerHTML = `
                                <div class="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                                  <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>
                                </div>
                                <p class="text-sm text-slate-400 font-medium text-center px-4">${feat.title}</p>
                              `;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS BENTO GRID ── */}
      <section id="benefits" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <AnimatedSection className="text-center mb-14">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">Beneficios</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Diseñado para dueños de tienda, no para expertos
            </h2>
            <p className="text-slate-500 mt-3 max-w-lg mx-auto">
              Sin complicaciones. Sin tecnicismos. Solo lo que necesitas para que tu negocio funcione mejor.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b, i) => (
              <AnimatedSection key={b.title} delay={i * 60}>
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 h-full">
                  <div className={`w-12 h-12 ${b.bg} rounded-2xl flex items-center justify-center mb-4 ${b.color}`}>
                    {b.icon}
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2 text-base">{b.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section id="social" className="py-24 bg-slate-900 relative overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 max-w-6xl mx-auto px-5">
          <AnimatedSection className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Tiendas reales, resultados reales
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Más de{" "}
              <span className="text-blue-400">100 tiendas activas</span>
              <br />confían en ABASTOCK
            </h2>

            {/* Rating bar */}
            <div className="flex items-center justify-center gap-3 mt-6">
              <StarRating count={5} />
              <span className="text-3xl font-bold text-white">4.9</span>
              <span className="text-slate-400 text-sm">/ 5.0 promedio</span>
            </div>
          </AnimatedSection>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 100}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
                  <StarRating count={t.stars} />
                  <p className="text-slate-300 text-sm leading-relaxed mt-3 mb-5">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">
                      {t.initials}
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{t.name}</p>
                      <p className="text-slate-500 text-xs">{t.location}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Stats strip */}
          <AnimatedSection delay={200}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { num: "100+", label: "Tiendas activas" },
                { num: "0", label: "Libretas necesarias" },
                { num: "4.9★", label: "Calificación promedio" },
                { num: "5 min", label: "Para aprender a usarlo" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-3xl font-bold text-blue-400">{s.num}</p>
                  <p className="text-slate-400 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section id="cta" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0 items-center">
              {/* Text */}
              <AnimatedSection className="p-10 md:p-14">
                <span className="inline-block bg-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-wider">
                  Empieza hoy
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                  Crea tu cuenta en{" "}
                  <span className="text-blue-400">menos de 1 minuto</span>
                </h2>
                <p className="text-slate-400 text-base leading-relaxed mb-8">
                  Sin tarjeta de crédito, sin contratos complicados. Solo descarga la app,
                  registra tu tienda y empieza a tener el control que siempre quisiste.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="#registro"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-7 py-4 rounded-2xl text-base transition-all shadow-lg shadow-blue-900/30 hover:-translate-y-0.5"
                  >
                    Crear cuenta gratis
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
                <p className="text-slate-500 text-xs mt-4">
                  ✓ Gratis para empezar &nbsp;·&nbsp; ✓ Sin instalar nada &nbsp;·&nbsp; ✓ Cancela cuando quieras
                </p>
              </AnimatedSection>

              {/* Image / Phone */}
              <div className="relative hidden md:flex items-end justify-center bg-gradient-to-br from-blue-500/10 to-indigo-500/10 min-h-[400px] pt-10">
                <PhoneMockup
                  src="/img/pantalla-registro.jpeg"
                  alt="Pantalla de registro"
                  className="!w-[180px] mb-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-slate-900 text-slate-400 pt-14 pb-8">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  </svg>
                </div>
                <span className="text-white font-bold text-base tracking-tight">ABASTOCK</span>
              </div>
              <p className="text-sm leading-relaxed">
                El control de tu tienda en tu bolsillo. Para dueños de abarrotes en todo México.
              </p>
            </div>

            {/* Links */}
            <div>
              <h5 className="text-white font-semibold text-sm mb-4">Producto</h5>
              <ul className="space-y-2.5 text-sm">
                {["Características", "Precios", "Descargar app"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm mb-4">Soporte</h5>
              <ul className="space-y-2.5 text-sm">
                {["Centro de ayuda", "WhatsApp", "Contacto"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold text-sm mb-4">Legal</h5>
              <ul className="space-y-2.5 text-sm">
                {["Privacidad", "Términos de uso", "Cookies"].map((l) => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">© 2026 ABASTOCK. Todos los derechos reservados.</p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { name: "Facebook", path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" },
                { name: "Instagram", path: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2z" },
                { name: "TikTok", path: "M19 3h-4v10a3 3 0 1 1-3-3v-4a7 7 0 1 0 7 7V3z" },
              ].map((s) => (
                <a
                  key={s.name}
                  href="#"
                  aria-label={s.name}
                  className="w-8 h-8 bg-white/5 hover:bg-blue-500/20 rounded-lg flex items-center justify-center text-slate-400 hover:text-blue-400 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}