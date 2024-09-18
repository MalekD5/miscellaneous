import { Game } from "@/lib/game";
import { useContext, createContext } from "react";

const GameContext = createContext<Game>(new Game());

export function GameContextProvider({ children }: React.PropsWithChildren) {
  return (
    <GameContext.Provider value={new Game()}>{children}</GameContext.Provider>
  );
}

export const useGame = () => useContext(GameContext);
