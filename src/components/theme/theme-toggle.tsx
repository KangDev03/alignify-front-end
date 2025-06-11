"use client"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "./theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <>
      <Button
        size="icon"
        onClick={toggleTheme}
        className="bg-transparent"
        aria-label="Chuyển đổi chế độ tối/sáng"
      >
        {isDark ? <Sun className="h-5 w- text-foreground" /> : <Moon className="h-5 w-5" />}
      </Button>
    </>
  )
}
