export default function Footer() {
  return (
    <footer className="relative max-w-5xl mx-auto px-6 py-10 mt-16 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">
        Track My Subscriptions v1.0.0
      </div>
      <div className="flex gap-6">
        {["Documentation", "API Status", "Security"].map((item) => (
          <span
            key={item}
            className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50 hover:text-foreground cursor-pointer transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/50">
        © 2026 Nagraj Tadingi
      </div>
    </footer>
  );
}
