import type { CardInstance } from "../types";

type Size = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "w-16 h-22 text-[10px]",
  md: "w-20 h-28 text-xs",
  lg: "w-32 h-44 text-sm",
};

const EMOJI_SIZE: Record<Size, string> = {
  sm: "text-2xl",
  md: "text-3xl",
  lg: "text-5xl",
};

export function CardBack({ size = "md" }: { size?: Size }) {
  return (
    <div
      className={`${SIZE_CLASSES[size]} rounded-lg border-2 border-indigo-300/40 bg-gradient-to-br from-indigo-800 to-slate-900 shadow-md flex items-center justify-center`}
    >
      <span className="text-indigo-300/70 text-xl">✦</span>
    </div>
  );
}

export function CardView({
  card,
  size = "md",
  selected = false,
  dimmed = false,
  showFlavor = false,
  onClick,
}: {
  card: CardInstance;
  size?: Size;
  selected?: boolean;
  dimmed?: boolean;
  showFlavor?: boolean;
  onClick?: () => void;
}) {
  const isTrap = card.category === "trap";
  const isDecoy = card.category === "decoy";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={[
        SIZE_CLASSES[size],
        "relative rounded-lg border-2 bg-gradient-to-br shadow-md flex flex-col items-center justify-center p-1 transition-transform",
        card.gradient,
        selected ? "border-yellow-300 ring-2 ring-yellow-300/70 -translate-y-1" : "border-white/30",
        dimmed ? "opacity-40" : "opacity-100",
        onClick ? "active:scale-95 cursor-pointer" : "cursor-default",
        showFlavor ? "animate-card-flip" : "",
      ].join(" ")}
    >
      <div className={`${EMOJI_SIZE[size]} drop-shadow`}>{card.emoji}</div>
      <div className="mt-0.5 font-bold text-white leading-tight text-center drop-shadow px-0.5 break-keep">
        {card.name}
      </div>
      {showFlavor && size === "lg" && (
        <p className="mt-1 text-[10px] leading-snug text-white/85 text-center px-1">
          {card.flavor}
        </p>
      )}
      <div
        className={`absolute -bottom-1.5 -right-1.5 ${size === "lg" ? "w-8 h-8 text-base" : "w-5 h-5 text-[10px]"} rounded-full ${card.badgeClass} border border-white/60 text-white font-bold flex items-center justify-center shadow`}
      >
        {isTrap ? "罠" : card.power}
      </div>
      {isDecoy && (
        <div className="absolute top-0.5 left-0.5 text-[9px] font-bold text-white/90 bg-black/30 rounded px-1">
          オトリ
        </div>
      )}
    </button>
  );
}
