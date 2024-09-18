"use client";

import { GameContextProvider } from "@/context/GameContext";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export default function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <GameContextProvider>{children}</GameContextProvider>
    </NextThemesProvider>
  );
}
