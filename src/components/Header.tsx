export function Header({
  turn,
  playerScore,
  cpuScore,
}: {
  turn: number;
  playerScore: number;
  cpuScore: number;
}) {
  return (
    <header className="px-4 pt-3 pb-2 flex flex-col items-center gap-2 bg-slate-950/40 border-b border-white/10">
      <div className="text-xs tracking-widest text-indigo-300 font-semibold">
        TURN {turn} / 5
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400">YOU</span>
          <span className="text-2xl font-bold text-emerald-300 tabular-nums">
            {playerScore}
          </span>
        </div>
        <span className="text-slate-500 text-xs">VS</span>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-400">CPU</span>
          <span className="text-2xl font-bold text-rose-300 tabular-nums">
            {cpuScore}
          </span>
        </div>
      </div>
    </header>
  );
}
