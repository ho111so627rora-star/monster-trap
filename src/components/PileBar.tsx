import { useState } from "react";
import type { CardInstance } from "../types";
import { CardView } from "./CardView";

function PileModal({
  title,
  cards,
  onClose,
}: {
  title: string;
  cards: CardInstance[];
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-white/15 rounded-xl p-4 max-w-sm w-full max-h-[70vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-sm font-bold text-white mb-3 text-center">
          {title}（{cards.length}枚）
        </h3>
        {cards.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-6">
            まだありません
          </p>
        ) : (
          <div className="flex flex-wrap gap-2 justify-center">
            {cards.map((c) => (
              <CardView key={c.uid} card={c} size="sm" />
            ))}
          </div>
        )}
        <button
          type="button"
          onClick={onClose}
          className="mt-3 w-full py-2 rounded-lg bg-indigo-600 text-white text-sm font-bold"
        >
          閉じる
        </button>
      </div>
    </div>
  );
}

function PileButton({
  label,
  count,
  onClick,
}: {
  label: string;
  count: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex flex-col items-center py-1.5 rounded-md bg-white/5 active:bg-white/10 border border-white/10"
    >
      <span className="text-[10px] text-slate-400">{label}</span>
      <span className="text-sm font-bold text-white">{count}</span>
    </button>
  );
}

export function PileBar({
  playerTrophies,
  cpuTrophies,
  playerGraveyard,
  cpuGraveyard,
}: {
  playerTrophies: CardInstance[];
  cpuTrophies: CardInstance[];
  playerGraveyard: CardInstance[];
  cpuGraveyard: CardInstance[];
}) {
  const [modal, setModal] = useState<null | {
    title: string;
    cards: CardInstance[];
  }>(null);

  return (
    <div className="px-3 pb-2">
      <div className="flex gap-2">
        <PileButton
          label="YOU 獲得"
          count={playerTrophies.length}
          onClick={() =>
            setModal({ title: "あなたの獲得カード", cards: playerTrophies })
          }
        />
        <PileButton
          label="YOU 墓地"
          count={playerGraveyard.length}
          onClick={() =>
            setModal({ title: "あなたの墓地", cards: playerGraveyard })
          }
        />
        <PileButton
          label="CPU 獲得"
          count={cpuTrophies.length}
          onClick={() =>
            setModal({ title: "CPUの獲得カード", cards: cpuTrophies })
          }
        />
        <PileButton
          label="CPU 墓地"
          count={cpuGraveyard.length}
          onClick={() => setModal({ title: "CPUの墓地", cards: cpuGraveyard })}
        />
      </div>
      {modal && (
        <PileModal
          title={modal.title}
          cards={modal.cards}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}
