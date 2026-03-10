import { CreditCard } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-b bg-background/80 backdrop-blur-xl z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/10">
            <CreditCard size={18} className="text-primary-foreground" />
          </div>
          <div>
            <span className="font-black text-foreground tracking-tight text-lg">
              Track
            </span>
            <span className="ml-1 text-muted-foreground font-black text-lg">
              My Subscriptions
            </span>
          </div>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted border border-border">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Live
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
