"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from '../utils/translations';

export default function DevModeIndicator() {
  const { t } = useTranslation();
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Show indicator only if mock parameter is explicitly set
    const hasMockParam = typeof window !== 'undefined' && window.location.search.includes('mock=true');

    if (hasMockParam) {
      setShowIndicator(true);
    }
  }, []);

  if (!showIndicator) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-3 py-2 rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium">
            {t("dev.mode")}
          </span>
          <button
            onClick={() => setShowIndicator(false)}
            className="ml-2 text-yellow-600 hover:text-yellow-800"
          >
            ×
          </button>
        </div>
        <p className="text-xs mt-1 opacity-75">
          {t("dev.mockApi")}
        </p>
      </div>
    </div>
  );
}
