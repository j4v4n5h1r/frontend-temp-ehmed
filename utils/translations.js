"use client";

import { useState, useEffect, useCallback } from 'react';
import en from '../translations/en.js';
import ru from '../translations/ru.js';
import ar from '../translations/ar.js';
import zh from '../translations/zh.js';
import tr from '../translations/tr.js';
import az from '../translations/az.js';

const translations = {
  en,
  ru,
  ar,
  zh,
  tr,
  az
};

export const SUPPORTED_LANGUAGES = {
  English: "en",
  Русский: "ru",
  العربية: "ar",
  中国人: "zh",
  Türkçe: "tr",
  Azərbaycan: "az",
};

export const LANGUAGE_CODES = {
  en: "English",
  ru: "Русский",
  ar: "العربية",
  zh: "中国人",
  tr: "Türkçe",
  az: "Azərbaycan",
};

// Get current language from localStorage or default to 'en'
export function getCurrentLanguage() {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferred-language') || 'en';
  }
  return 'en';
}

// Set language preference
export function setLanguage(languageCode) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', languageCode);
    document.documentElement.lang = languageCode;
  }
}

// Translation function
export function t(key, fallback = key) {
  const currentLang = getCurrentLanguage();
  const langTranslations = translations[currentLang] || translations.en;
  
  // Split key by dots to access nested properties
  const keys = key.split('.');
  let value = langTranslations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return fallback;
    }
  }
  
  return value || fallback;
}

// Hook for React components - handles SSR properly
export function useTranslation() {
  const [currentLanguage, setCurrentLanguageState] = useState(getCurrentLanguage());
  
  useEffect(() => {
    // Update state on client side after hydration
    setCurrentLanguageState(getCurrentLanguage());
  }, []);
  
  const t = useCallback((key, fallback = key) => {
    const langTranslations = translations[currentLanguage] || translations.en;
    
    // Split key by dots to access nested properties
    const keys = key.split('.');
    let value = langTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
    
    return value || fallback;
  }, [currentLanguage]);
  
  return { t, currentLanguage, setLanguage };
}
