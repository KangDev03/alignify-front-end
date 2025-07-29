"use client"

import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { cn } from "@/lib/utils"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
  { code: "en", name: "English", flag: "🇺🇸" },
]

interface LanguageSelectProps {
  variant?: "default" | "compact" | "minimal"
}

export function LanguageSelect({ variant = "default" }: LanguageSelectProps) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language)

  useEffect(() => {
    setCurrentLanguage(i18n.language)
  }, [i18n.language])

  const handleLanguageChange = (languageCode: string) => {
    setCurrentLanguage(languageCode)
    i18n.changeLanguage(languageCode)
    // onLanguageChange?.(languageCode)
  }

  const getCurrentLanguage = () => languages.find((lang) => lang.code === currentLanguage) || languages[0]

  if (variant === "minimal") {
    return (
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className={cn("w-16 h-8 border-0 bg-transparent hover:bg-accent")}>
          <SelectValue>
            <span className="text-lg">{getCurrentLanguage().flag}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  if (variant === "compact") {
    return (
      <Select value={currentLanguage} onValueChange={handleLanguageChange}>
        <SelectTrigger className={cn("w-20 h-8")}>
          <SelectValue>
            <div className="flex items-center space-x-1">
              <span className="text-sm">{getCurrentLanguage().flag}</span>
              <span className="text-xs font-medium">{currentLanguage.toUpperCase()}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                <span className="text-lg">{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    )
  }

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className={cn("w-32")}>
        <SelectValue>
          <div className="flex items-center space-x-2">
            <span className="font-medium">{getCurrentLanguage().name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center space-x-2">
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
