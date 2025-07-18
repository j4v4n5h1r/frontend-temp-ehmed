"use client";
import { createContext, useContext, useState, useEffect } from "react";

const TranslationContext = createContext();

export const SUPPORTED_LANGUAGES = {
  en: "English",
  az: "Azərbaycan",
  tr: "Türkçe",
};

export const LANGUAGE_CODES = {
  English: "en",
  Azərbaycan: "az",
  Türkçe: "tr",
};

export function TranslationProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  // Load translations dynamically
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await import(`../translations/${currentLanguage}.js`);
        setTranslations(response.default);
      } catch (error) {
        console.error(
          `Failed to load translations for ${currentLanguage}:`,
          error,
        );
        // Fallback to English if translation fails
        if (currentLanguage !== "en") {
          try {
            const fallback = await import("../translations/en.js");
            setTranslations(fallback.default);
          } catch (fallbackError) {
            console.error(
              "Failed to load fallback translations:",
              fallbackError,
            );
          }
        }
      }
    };

    loadTranslations();
  }, [currentLanguage]);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem("preferred-language");
    if (savedLanguage && SUPPORTED_LANGUAGES[savedLanguage]) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (languageCode) => {
    if (SUPPORTED_LANGUAGES[languageCode]) {
      setCurrentLanguage(languageCode);
      localStorage.setItem("preferred-language", languageCode);

      // Update HTML lang attribute
      document.documentElement.lang = languageCode;
    }
  };

  const t = (key, fallback) => {
    if (!key) return fallback || "";

    const keys = key.split(".");
    let value = translations;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return fallback || key;
      }
    }

    return typeof value === "string" ? value : fallback || key;
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    translations,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
}
