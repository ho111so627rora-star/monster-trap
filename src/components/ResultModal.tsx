export function ResultModal({
  playerScore,
  cpuScore,
  onRestart,
}: {
  playerScore: number;
  cpuScore: number;
  onRestart: () => void;
}) {
  const result =
    playerScore > cpuScore ? "WIN" : playerScore < cpuScore ? "LOSE" : "DRAW";

  const resultColor =
    result === "WIN"
      ? "text-emerald-300"
      : result === "LOSE"
        ? "text-rose-300"
        : "text-amber-300";

  const resultLabel =
    result === "WIN"
      ? "勝利！"
      : result === "LOSE"
        ? "敗北…"
        : "引き分け";

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
      <div className="bg-slate-900 border border-white/15 rounded-2xl p-6 w-full max-w-xs text-center animate-pop-in">
        <div className={`text-4xl font-black mb-1 ${resultColor}`}>
          {result}
        </div>
        <div className="text-sm text-slate-300 mb-5">{resultLabel}</div>
        <div className="flex justify-center gap-8 mb-6">
          <div>
            <div className="text-[11px] text-slate-400">YOU</div>
            <div className="text-2xl font-bold text-emerald-300">
              {playerScore}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">CPU</div>
            <div className="text-2xl font-bold text-rose-300">{cpuScore}</div>
          </div>
        </div>
        <button
          type="button"
          onClick={onRestart}
          className="w-full py-2.5 rounded-lg bg-indigo-500 text-white font-bold text-sm active:scale-[0.98] transition"
        >
          もう一度プレイ
        </button>
      </div>
    </div>
  );
}
