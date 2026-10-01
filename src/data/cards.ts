import type { CardDef, CardInstance } from "../types";

export const CARD_DEFS: CardDef[] = [
  {
    defId: "slime",
    name: "プチスライム",
    category: "monster",
    power: 1,
    flavor: "ぽけーっと地面にすわっている。無害そのもので、捕まってもあまり痛くない。",
    emoji: "\u{1F4A7}",
    gradient: "from-emerald-300 to-green-500",
    badgeClass: "bg-green-600",
  },
  {
    defId: "togekoro",
    name: "とげころ",
    category: "monster",
    power: 2,
    flavor: "威嚇しているつもりだがトゲはゴムみたいに柔らかい。木の実が大好物。",
    emoji: "\u{1F994}",
    gradient: "from-amber-300 to-orange-700",
    badgeClass: "bg-orange-700",
  },
  {
    defId: "mofukitsune",
    name: "モフキツネ",
    category: "monster",
    power: 3,
    flavor: "身体の半分以上がしっぽ。すばしっこいが、おだてられるとすぐ油断する。",
    emoji: "\u{1F98A}",
    gradient: "from-sky-300 to-blue-600",
    badgeClass: "bg-blue-600",
  },
  {
    defId: "griffonbear",
    name: "グリフォンベア",
    category: "monster",
    power: 4,
    flavor: "小さな翼で浮いている小熊。どっしり構えて冷ややかな視線を送ってくる。",
    emoji: "\u{1F43B}",
    gradient: "from-violet-300 to-purple-600",
    badgeClass: "bg-purple-600",
  },
  {
    defId: "kingdragon",
    name: "キングドラゴン",
    category: "monster",
    power: 5,
    flavor: "全てを見通すオーラを放つ小さな覇王。こいつを捕獲されたら致命傷だ！",
    emoji: "\u{1F409}",
    gradient: "from-fuchsia-500 via-indigo-500 to-amber-400",
    badgeClass: "bg-red-600",
  },
  {
    defId: "migawari",
    name: "みがわりぬいぐるみ",
    category: "decoy",
    power: 0,
    flavor: "中から綿が少し出ている偽物。罠にかかっても相手に点数を与えない！",
    emoji: "\u{1F9F8}",
    gradient: "from-stone-300 to-stone-500",
    badgeClass: "bg-stone-500",
  },
  {
    defId: "migawari",
    name: "みがわりぬいぐるみ",
    category: "decoy",
    power: 0,
    flavor: "中から綿が少し出ている偽物。罠にかかっても相手に点数を与えない！",
    emoji: "\u{1F9F8}",
    gradient: "from-stone-300 to-stone-500",
    badgeClass: "bg-stone-500",
  },
  {
    defId: "magicnet",
    name: "マジックネット",
    category: "trap",
    power: 0,
    flavor: "星屑をまとい宙を舞う不思議な網。向かい合った相手のモンスターを捕獲する！",
    emoji: "✨",
    gradient: "from-indigo-900 to-purple-900",
    badgeClass: "bg-slate-900",
  },
  {
    defId: "magicnet",
    name: "マジックネット",
    category: "trap",
    power: 0,
    flavor: "星屑をまとい宙を舞う不思議な網。向かい合った相手のモンスターを捕獲する！",
    emoji: "✨",
    gradient: "from-indigo-900 to-purple-900",
    badgeClass: "bg-slate-900",
  },
  {
    defId: "magicnet",
    name: "マジックネット",
    category: "trap",
    power: 0,
    flavor: "星屑をまとい宙を舞う不思議な網。向かい合った相手のモンスターを捕獲する！",
    emoji: "✨",
    gradient: "from-indigo-900 to-purple-900",
    badgeClass: "bg-slate-900",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck(ownerPrefix: string): CardInstance[] {
  const deck = CARD_DEFS.map((def, i) => ({
    ...def,
    uid: `${ownerPrefix}-${def.defId}-${i}`,
  }));
  return shuffle(deck);
}
