"use client";
import { useState, useRef, useEffect } from "react";
import {
  useTranslation,
  SUPPORTED_LANGUAGES,
} from "../context/TranslationContext";

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { value: "en", label: "English", flag: "🇬🇧" },
    { value: "az", label: "Azərbaycan", flag: "🇦🇿" },
    { value: "tr", label: "Türkçe", flag: "🇹🇷" },
    { value: "ru", label: "Русский", flag: "🇷🇺" },
    { value: "ar", label: "عربي", flag: "🇸🇦" },
    { value: "zh", label: "中国人", flag: "🇨🇳" },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    changeLanguage(language.value);
    setIsOpen(false);
  };

  const getCurrentLanguageLabel = () => {
    return SUPPORTED_LANGUAGES[currentLanguage] || "English";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-3 py-2 rounded-lg transition-colors duration-200 text-sm font-medium min-w-0"
      >
        <svg
          className="w-4 h-4 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM128,215.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89ZM96.23,120c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z" />
        </svg>
        <span className="hidden sm:block truncate">
          {getCurrentLanguageLabel()}
        </span>
        <span className="sm:hidden truncate">
          {languages.find((lang) => lang.value === currentLanguage)?.flag ||
            "🌐"}
        </span>
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg border border-neutral-200 py-1 z-50">
          {languages.map((lang) => (
            <button
              key={lang.value}
              onClick={() => handleLanguageSelect(lang)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center gap-2 ${
                currentLanguage === lang.value
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-neutral-700"
              }`}
            >
              <span className="text-lg">{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
