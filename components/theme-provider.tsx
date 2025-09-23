"use client"
import { createContext, useContext, type ReactNode } from "react"

type ThemeProviderProps = {
  children: ReactNode
}

const ThemeContext = createContext<{ theme: string }>({ theme: "light" })

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <ThemeContext.Provider value={{ theme: "light" }}>{children}</ThemeContext.Provider>
}
