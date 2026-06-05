import { useState } from "react";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import yapeLogo from "@/assets/brands/yape.svg.asset.json";
import bcpLogo from "@/assets/brands/bcp.svg.asset.json";
import binanceLogo from "@/assets/brands/binance.svg.asset.json";
import lemonLogo from "@/assets/brands/lemon.png.asset.json";

const PAYMENT_ACCOUNTS = [
  { method: "Yape", account: "914 836 241", name: "Alvaro Avila", logo: yapeLogo.url },
  { method: "Binance", account: "926025651", name: "vipperu", logo: binanceLogo.url },
  { method: "Lemon", account: "902220944", name: "Alvaro Ávila", logo: lemonLogo.url },
  { method: "BCP Soles", account: "19495979711000", name: "Cuenta en Soles", logo: bcpLogo.url },
];

export default function PaymentAccountsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const copy = (text: string, key: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1500);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border border-red-600 bg-gray-950 text-white shadow-[0_0_25px_rgba(255,0,0,0.5)] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-display text-xl font-bold uppercase tracking-wider text-white">
            Cuentas <span className="text-red-500">Bancarias</span>
          </DialogTitle>
        </DialogHeader>
        <div className="mt-2 grid gap-3">
          {PAYMENT_ACCOUNTS.map((p) => (
            <div
              key={p.method}
              className="relative overflow-hidden rounded-xl border border-red-900/50 bg-gradient-to-br from-gray-900 to-black p-4 shadow-[0_0_15px_rgba(255,0,0,0.15)] transition-all hover:border-red-500/60 hover:shadow-[0_0_20px_rgba(255,0,0,0.3)]"
            >
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-red-500 via-red-600 to-red-900" />
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-black/70 p-1.5 ring-1 ring-red-900/50">
                    <img
                      src={p.logo}
                      alt={p.method}
                      className="max-h-full max-w-full object-contain"
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-red-400">{p.method}</p>
                    <p className="mt-0.5 font-mono text-sm font-bold text-white">{p.account}</p>
                    <p className="text-[11px] text-white/50">Titular: {p.name}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => copy(p.account, p.method)}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-red-600/40 bg-black/40 text-red-400 transition-all hover:border-red-500 hover:bg-red-600/10 hover:text-red-300 hover:shadow-[0_0_10px_rgba(255,0,0,0.3)]"
                  aria-label={`Copiar ${p.method}`}
                >
                  {copiedKey === p.method ? (
                    <Check className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-red-900/30 pt-2">
                <span className="text-[10px] uppercase tracking-wider text-white/30">Cuenta activa</span>
                <span className="text-[10px] font-mono text-red-500/60">
                  {p.method === "BCP Soles" ? "SOLES" : "DIGITAL"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-center text-xs text-white/60">
          Tras pagar, envía el comprobante por WhatsApp para activar tu servicio.
        </p>
      </DialogContent>
    </Dialog>
  );
}
