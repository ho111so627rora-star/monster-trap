import { useEffect, useReducer } from "react";
import { Field } from "./components/Field";
import { HandTray } from "./components/HandTray";
import { Header } from "./components/Header";
import { PileBar } from "./components/PileBar";
import { ResultModal } from "./components/ResultModal";
import { createInitialState, gameReducer } from "./game/reducer";

function App() {
  const [state, dispatch] = useReducer(gameReducer, undefined, createInitialState);

  useEffect(() => {
    if (state.phase !== "reveal") return;
    const t = setTimeout(() => dispatch({ type: "RESOLVE" }), 900);
    return () => clearTimeout(t);
  }, [state.phase]);

  const unstagedHand = state.playerHand.filter(
    (c) => !state.playerLanes.includes(c),
  );
  const lanesFilled = state.playerLanes.filter((c) => c !== null).length;

  return (
    <div className="w-full max-w-sm min-h-svh flex flex-col bg-slate-900/40 border-x border-white/10">
      <Header
        turn={state.turn}
        playerScore={state.playerScore}
        cpuScore={state.cpuScore}
      />

      <PileBar
        playerTrophies={state.playerTrophies}
        cpuTrophies={state.cpuTrophies}
        playerGraveyard={state.playerGraveyard}
        cpuGraveyard={state.cpuGraveyard}
      />

      <div className="perspective flex-1 flex flex-col">
        <Field
          phase={state.phase}
          playerLanes={state.playerLanes}
          cpuLanes={state.cpuLanes}
          cpuHandCount={state.cpuHand.length}
          lastResults={state.lastResults}
          onClearLane={(lane) => dispatch({ type: "CLEAR_LANE", lane })}
        />
      </div>

      <HandTray
        phase={state.phase}
        hand={unstagedHand}
        lanesFilled={lanesFilled}
        onSelectCard={(card) => dispatch({ type: "SELECT_CARD", card })}
        onConfirm={() => dispatch({ type: "CONFIRM" })}
        onReveal={() => dispatch({ type: "REVEAL" })}
        onNext={() => dispatch({ type: "NEXT_TURN" })}
        isLastTurn={state.turn >= 5}
      />

      {state.phase === "done" && (
        <ResultModal
          playerScore={state.playerScore}
          cpuScore={state.cpuScore}
          onRestart={() => dispatch({ type: "RESTART" })}
        />
      )}
    </div>
  );
}

export default App;
