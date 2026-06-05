import { Check } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ProductDialogService = {
  name: string;
  price: string;
  logoUrl?: string;
  logoAlt?: string;
  badge?: ReactNode;
  icon?: ReactNode;
};

const WA = "https://wa.me/51914836241";
const waLink = (product: string) =>
  `${WA}?text=${encodeURIComponent(`Hola, me interesa adquirir ${product}`)}`;

const FEATURES: Record<string, string[]> = {
  "Netflix Premium": ["Calidad Ultra HD 4K", "Perfiles personalizables", "Acceso a todo el catálogo", "Garantía total"],
  "Paramount+": ["Catálogo completo en HD", "Estrenos exclusivos", "Sin anuncios", "Garantía total"],
  Max: ["HBO Originals + Warner", "Calidad 4K disponible", "Múltiples perfiles", "Garantía total"],
  "Vix+": ["Telenovelas y deportes", "Contenido latino exclusivo", "Sin anuncios", "Garantía total"],
  "Prime Video": ["Catálogo Amazon Originals", "Calidad 4K UHD", "Descarga offline", "Garantía total"],
  "YouTube Premium": ["YouTube sin anuncios", "YouTube Music incluido", "Reproducción en segundo plano", "Garantía total"],
  "Disney+ Standard": ["Disney, Pixar, Marvel y Star Wars", "Calidad Full HD", "2 pantallas simultáneas", "Garantía total"],
  DGO: ["Fútbol y deportes en vivo", "Películas y series premium", "Multi-dispositivo", "Garantía total"],
  "Disney+ Premium": ["Calidad 4K UHD + HDR", "4 pantallas simultáneas", "Audio Dolby Atmos", "Garantía total"],
  "Movistar Play": ["Canales en vivo y a la carta", "Películas y series premium", "Multi-dispositivo", "Garantía total"],
  Crunchyroll: ["Anime simulcast desde Japón", "Calidad HD sin anuncios", "Catálogo completo", "Garantía total"],
  "IPTV Premium": ["+10,000 canales en vivo", "Películas y series VOD", "EPG y multi-dispositivo", "Garantía total"],
  "Universal+": ["Series Universal exclusivas", "Películas premium HD", "Sin anuncios", "Garantía total"],
  "ChatGPT Go": ["Acceso al modelo más avanzado", "Respuestas ilimitadas", "Mayor velocidad y prioridad", "Garantía total"],
  "Canva Pro": ["Plantillas Premium ilimitadas", "Kit de marca y Magic Resize", "Quitafondos automático", "100 GB de almacenamiento"],
  "VPN Surfshark": ["Conexiones ilimitadas", "Servidores en +100 países", "CleanWeb y No-logs", "Garantía total"],
  "Diamantes Free Fire": ["Recarga segura y rápida", "Entrega en minutos", "Precios bajos garantizados", "Soporte 24/7"],
  "Seguidores para Redes Sociales": ["Crecimiento real y seguro", "Entrega progresiva", "Garantía de reposición", "Soporte 24/7"],
  Doxeo: ["Investigación profesional", "Resultados confidenciales", "Entrega rápida", "Soporte directo"],
};

export default function ProductDialog({
  service,
  open,
  onOpenChange,
}: {
  service: ProductDialogService | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  if (!service) return null;
  const features = FEATURES[service.name] ?? ["Activación rápida", "Soporte 24/7", "Garantía total"];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-red-600 bg-gray-950 text-white shadow-[0_0_25px_rgba(255,0,0,0.5)] sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 flex-none items-center justify-center rounded-md bg-black/40 p-1.5">
              {service.logoUrl ? (
                <img
                  src={service.logoUrl}
                  alt={service.logoAlt ?? service.name}
                  className="h-full w-full object-contain"
                  width={48}
                  height={48}
                  decoding="async"
                />
              ) : service.badge ? (
                service.badge
              ) : (
                service.icon
              )}
            </div>
            <DialogTitle className="text-left font-display text-xl font-bold uppercase tracking-wider text-white">
              {service.name}
            </DialogTitle>
          </div>
        </DialogHeader>

        <p className="mt-2 text-2xl font-bold text-red-500 drop-shadow-[0_0_10px_rgba(255,0,0,0.5)]">
          {service.price}
        </p>

        <ul className="mt-3 space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm text-white/90">
              <Check className="mt-0.5 h-4 w-4 flex-none text-green-500" />
              <span>{f}</span>
            </li>
          ))}
        </ul>

        <a
          href={waLink(service.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-base font-bold uppercase tracking-wider text-black shadow-[0_0_20px_rgba(37,211,102,0.6)] transition-transform hover:scale-[1.02]"
        >
          <SiWhatsapp className="h-5 w-5" />
          Comprar por WhatsApp
        </a>
      </DialogContent>
    </Dialog>
  );
}
