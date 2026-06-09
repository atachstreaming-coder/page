import { createFileRoute } from "@tanstack/react-router";
import { SiFacebook, SiInstagram, SiWhatsapp } from "react-icons/si";
import {
  Zap,
  Headphones,
  ShieldCheck,
  Tag,
  Play,
  Settings as Gear,
  Gamepad2,
  Users,
  Sparkles,
  HeartHandshake,
  CreditCard,
  Trophy,
  Tv,
  Ghost,
  Wallet,
} from "lucide-react";
import { lazy, memo, Suspense, useCallback, useState } from "react";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import type { ProductDialogService } from "@/components/ProductDialog";

const ProductDialog = lazy(() => import("@/components/ProductDialog"));
const PaymentAccountsDialog = lazy(() => import("@/components/PaymentAccountsDialog"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atach Streaming — Entretenimiento y Herramientas Premium" },
      {
        name: "description",
        content:
          "Netflix, Max, Disney+, ChatGPT, Canva y más al mejor precio. Activación rápida y soporte 24/7. Compra por WhatsApp.",
      },
      { property: "og:title", content: "Atach Streaming — Premium al mejor precio" },
      {
        property: "og:description",
        content: "Streaming, herramientas y gaming premium. Activación rápida, soporte 24/7.",
      },
    ],
    links: [
      // AQUÍ ESTÁ LA CORRECCIÓN DEL GLOBITO (FAVICON)
      { rel: "icon", type: "image/png", href: "/logo-atach.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

const WA = "https://wa.me/51914836241";
const waLink = (product: string) =>
  `${WA}?text=${encodeURIComponent(`Hola, me interesa adquirir ${product}`)}`;

type Service = ProductDialogService;

const LOGO_CLASS = "w-8 h-8 object-contain";

const streaming: Service[] = [
  { name: "Netflix Premium", price: "S/15.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Netflix-new-icon.png", logoAlt: "Netflix Logo" },
  { name: "Paramount+", price: "S/10.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Paramount_Plus.svg", logoAlt: "Paramount+ Logo" },
  { name: "Max", price: "S/6.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/c/ce/Max_logo.svg", logoAlt: "Max Logo" },
  {
    name: "Vix+",
    price: "S/5.00",
    badge: (
      <div className="bg-orange-600 text-white font-black px-2 py-0.5 rounded text-[11px] tracking-wider shrink-0 flex items-center justify-center">
        vix+
      </div>
    ),
  },
  { name: "Prime Video", price: "S/7.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg", logoAlt: "Prime Video Logo" },
  { name: "YouTube Premium", price: "S/5.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg", logoAlt: "YouTube Premium Logo" },
  { name: "Disney+ Standard", price: "S/10.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg", logoAlt: "Disney+ Logo" },
  { name: "DGO", price: "S/25.00", logoUrl: "/logo-dgo.png", logoAlt: "DGO Logo" },
  { name: "Disney+ Premium", price: "S/15.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg", logoAlt: "Disney+ Logo" },
  { name: "Movistar Play", price: "S/25.00", logoUrl: "/logo-movistar.png", logoAlt: "Movistar Play Logo" },
  { name: "Crunchyroll", price: "S/5.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/08/Crunchyroll_Logo.png", logoAlt: "Crunchyroll Logo" },
  { name: "IPTV Premium", price: "S/10.00", icon: <Tv className="w-8 h-8 text-blue-400" /> },
  { name: "Universal+", price: "S/10.00", logoUrl: "/logo-universal.png", logoAlt: "Universal+ Logo" },
];

const tools: Service[] = [
  { name: "ChatGPT Go", price: "S/10.00", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", logoAlt: "ChatGPT Logo" },
  { name: "Canva Pro", price: "S/3.00", logoUrl: "/logo-canva.png", logoAlt: "Canva Pro Logo" },
  { name: "VPN Surfshark", price: "S/10.00", logoUrl: "/logo-surfshark.png", logoAlt: "Surfshark Logo" },
];

const gaming: Service[] = [
  { name: "Diamantes Free Fire", price: "DESDE S/5.00", logoUrl: "/logo-freefire.png", logoAlt: "Free Fire Logo" },
];

const social: Service[] = [
  { name: "Seguidores para Redes Sociales", price: "DESDE S/5.00", icon: <Users className="w-8 h-8 text-gray-300" /> },
];

const special: Service[] = [
  { name: "Doxeo", price: "DESDE S/1.50", icon: <Ghost className="w-8 h-8 text-white" /> },
];

const PAYMENT_LOGOS = [
  { url: "/logo-yape.png", alt: "Yape" },
  { url: "/logo-bcp.png", alt: "BCP" },
  { url: "/logo-binance.png", alt: "Binance" },
  { url: "/logo-lemon.png", alt: "Lemon" },
];

const LogoTile = memo(function LogoTile({ s }: { s: Service }) {
  if (s.logoUrl) {
    return (
      <div className="flex h-8 w-8 flex-none items-center justify-center">
        <img
          src={s.logoUrl}
          alt={s.logoAlt ?? s.name}
          className={LOGO_CLASS}
          width={32}
          height={32}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }
  if (s.badge) {
    return <div className="flex h-8 min-w-8 flex-none items-center justify-center">{s.badge}</div>;
  }
  if (s.icon) {
    return <div className="flex h-8 w-8 flex-none items-center justify-center">{s.icon}</div>;
  }
  return null;
});

const ServiceRow = memo(function ServiceRow({
  s,
  onSelect,
}: {
  s: Service;
  onSelect: (s: Service) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(s)}
      className="group flex w-full items-center justify-between gap-3 rounded-lg border border-red-900/40 bg-gradient-to-r from-black to-zinc-950 px-3 py-2.5 text-left transition-all hover:border-red-500 hover:shadow-[0_0_15px_rgba(255,0,0,0.45)]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <LogoTile s={s} />
        <span className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">
          {s.name}
        </span>
      </div>
      <span className="flex-none rounded-md bg-red-600/10 px-2.5 py-1 text-sm font-bold text-red-500 ring-1 ring-red-600/40 sm:text-base">
        {s.price}
      </span>
    </button>
  );
});

function NeonBox({
  title,
  Icon,
  children,
  className = "",
  id,
}: {
  title: string;
  Icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={
        "relative rounded-2xl border-2 border-red-600 bg-black/80 p-5 shadow-[0_0_25px_rgba(255,0,0,0.35)] sm:p-6 " +
        className
      }
    >
      <header className="mb-4 flex items-center gap-3 border-b border-red-900/60 pb-3">
        <Icon className="h-7 w-7 text-red-500 drop-shadow-[0_0_8px_rgba(255,0,0,0.8)]" />
        <h2 className="font-display text-xl font-bold uppercase tracking-wider text-white sm:text-2xl">
          {title}
        </h2>
      </header>
      {children}
    </section>
  );
}

function Feature({
  Icon,
  label,
  red = true,
}: {
  Icon: ComponentType<{ className?: string }>;
  label: string;
  red?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div
        className={
          "flex h-14 w-14 items-center justify-center rounded-full ring-2 " +
          (red
            ? "bg-red-600/10 text-red-500 ring-red-600 shadow-[0_0_15px_rgba(255,0,0,0.5)]"
            : "bg-white/5 text-white ring-white/30")
        }
      >
        <Icon className="h-6 w-6" />
      </div>
      <span className="text-xs font-semibold uppercase tracking-wide text-white sm:text-sm">
        {label}
      </span>
    </div>
  );
}

const NAV_LINKS: Array<[string, string]> = [
  ["INICIO", "#inicio"],
  ["STREAMING", "#streaming"],
  ["HERRAMIENTAS", "#herramientas"],
  ["GAMING", "#gaming"],
  ["REDES SOCIALES", "#redes"],
  ["CONTACTO", "#contacto"],
];

function Index() {
  const [payOpen, setPayOpen] = useState(false);
  const [selected, setSelected] = useState<Service | null>(null);
  const [productOpen, setProductOpen] = useState(false);

  const handleSelect = useCallback((s: Service) => {
    setSelected(s);
    setProductOpen(true);
  }, []);

  return (
    <div
      className="min-h-screen bg-black font-body text-white"
      style={{ fontFamily: "Inter, system-ui, sans-serif" }}
    >
      <header className="border-b border-red-900/40 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <a href="#" className="flex items-center gap-3">
            <div className="w-24 h-24 shrink-0 flex items-center justify-center">
              <img
                src="/logo-atach.png"
                alt="Atach Streaming Logo"
                className="w-full h-full object-contain"
                width={96}
                height={96}
                fetchPriority="high"
                decoding="async"
              />
            </div>
            <span className="hidden font-display text-lg font-bold uppercase tracking-widest sm:inline">
              <span className="text-white">ATACH</span> <span className="text-red-600">STREAMING</span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-semibold tracking-wider text-white transition-colors hover:text-red-500"
              >
                {label}
              </a>
            ))}
          </nav>

          <a
            href={waLink("el catálogo completo")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-[#25D366] bg-transparent px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#25D366] shadow-[0_0_15px_rgba(37,211,102,0.4)] transition-all hover:bg-[#25D366] hover:text-black sm:px-4 sm:text-sm"
          >
            <SiWhatsapp className="h-4 w-4" />
            <span className="hidden sm:inline">Comprar por WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(255,0,0,0.25), transparent 60%), radial-gradient(ellipse at bottom, rgba(255,0,0,0.15), transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <h1 className="font-display text-3xl font-bold uppercase leading-tight tracking-wider text-white sm:text-5xl md:text-6xl">
            Todo tu
            <br />
            <span className="text-red-600 drop-shadow-[0_0_25px_rgba(255,0,0,0.7)]">
              Entretenimiento
            </span>
            <br />
            <span className="text-2xl sm:text-4xl md:text-5xl">
              y Herramientas Premium
            </span>
            <br />
            <span className="text-xl font-semibold text-white/90 sm:text-2xl md:text-3xl">
              en un solo lugar
            </span>
          </h1>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-4">
            <Feature Icon={Zap} label="Activación Rápida" />
            <Feature Icon={Headphones} label="Soporte 24/7" />
            <Feature Icon={ShieldCheck} label="Confianza y Garantía" />
            <Feature Icon={Tag} label="Precios Accesibles" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <NeonBox id="streaming" title="Streaming Premium" Icon={Play}>
            <div className="grid gap-2 sm:grid-cols-2">
              {streaming.map((s) => (
                <ServiceRow key={s.name} s={s} onSelect={handleSelect} />
              ))}
            </div>
          </NeonBox>

          <div className="flex flex-col gap-6">
            <NeonBox id="herramientas" title="Herramientas Premium" Icon={Gear}>
              <div className="grid gap-2">
                {tools.map((s) => (
                  <ServiceRow key={s.name} s={s} onSelect={handleSelect} />
                ))}
              </div>
            </NeonBox>

            <NeonBox id="gaming" title="Gaming" Icon={Gamepad2}>
              {gaming.map((s) => (
                <ServiceRow key={s.name} s={s} onSelect={handleSelect} />
              ))}
            </NeonBox>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <NeonBox id="redes" title="Redes Sociales" Icon={Users}>
            {social.map((s) => (
              <ServiceRow key={s.name} s={s} onSelect={handleSelect} />
            ))}
          </NeonBox>
          <NeonBox title="Servicios Especiales" Icon={Sparkles}>
            {special.map((s) => (
              <ServiceRow key={s.name} s={s} onSelect={handleSelect} />
            ))}
          </NeonBox>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="text-center font-display text-2xl font-bold uppercase tracking-widest text-white sm:text-3xl">
          ¿Por qué <span className="text-red-500">elegirnos?</span>
        </h2>
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          <Feature Icon={Zap} label="Activación Rápida" red={false} />
          <Feature Icon={HeartHandshake} label="Atención Personalizada" red={false} />
          <Feature Icon={Headphones} label="Soporte 24/7" red={false} />
          <Feature Icon={CreditCard} label="Pago Seguro y Confiable" red={false} />
          <Feature Icon={Trophy} label="100+ Clientes Satisfechos" red={false} />
        </div>
      </section>

      <section id="contacto" className="border-t border-red-900/50 bg-zinc-950/60">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-widest text-white">
              Métodos de <span className="text-red-500">pago</span>
            </h3>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              {PAYMENT_LOGOS.map((p) => (
                <div
                  key={p.alt}
                  className="flex h-16 w-24 items-center justify-center overflow-hidden rounded-lg border border-red-600/60 bg-black p-2 shadow-[0_0_12px_rgba(255,0,0,0.25)]"
                >
                  <img
                    src={p.url}
                    alt={p.alt}
                    className="h-10 w-auto max-w-full object-contain"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPayOpen(true)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-red-600 bg-black px-5 py-3 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(255,0,0,0.45)] transition-all hover:bg-red-600/10"
            >
              <Wallet className="h-5 w-5 text-red-500" />
              Ver Cuentas Bancarias
            </button>
          </div>

          <div className="lg:text-right">
            <h3 className="font-display text-xl font-bold uppercase tracking-widest text-white">
              Contác<span className="text-red-500">tanos</span>
            </h3>
            <a
              href={waLink("información")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-3 rounded-xl bg-[#25D366] px-5 py-3 text-lg font-bold text-black shadow-[0_0_25px_rgba(37,211,102,0.5)] transition-transform hover:scale-105"
            >
              <SiWhatsapp className="h-7 w-7" />
              +51 914 836 241
            </a>
            <div className="mt-5 flex flex-wrap items-center gap-4 lg:justify-end">
              <a
                href="https://facebook.com/AtachStreaming"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-500"
              >
                <SiFacebook className="h-5 w-5" style={{ color: "#1877F2" }} />
                @Atach Streaming
              </a>
              <a
                href="https://instagram.com/atach.streaming"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-red-500"
              >
                <SiInstagram className="h-5 w-5" style={{ color: "#E1306C" }} />
                @atach.streaming
              </a>
            </div>
          </div>
        </div>

        <div className="relative border-t-2 border-red-600 bg-black py-4 shadow-[0_-10px_25px_-5px_rgba(255,0,0,0.4)]">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-white sm:text-sm">
            Atach Streaming{" "}
            <span className="text-red-500">| Confianza • Seguridad • Garantía</span>
          </p>
        </div>
      </section>

      <Suspense fallback={null}>
        {productOpen && (
          <ProductDialog
            service={selected}
            open={productOpen}
            onOpenChange={setProductOpen}
          />
        )}
        {payOpen && (
          <PaymentAccountsDialog open={payOpen} onOpenChange={setPayOpen} />
        )}
      </Suspense>
    </div>
  );
}
