"use client";

import { useState, useEffect } from 'react';
import { useTranslation } from '../context/TranslationContext';

export default function DevModeIndicator() {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    // Show indicator if we're in development mode and using mock API
    const isDev = process.env.NODE_ENV === 'development';
    const hasMockParam = typeof window !== 'undefined' && window.location.search.includes('mock=true');
    
    if (isDev || hasMockParam) {
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
            Development Mode
          </span>
          <button
            onClick={() => setShowIndicator(false)}
            className="ml-2 text-yellow-600 hover:text-yellow-800"
          >
            ×
          </button>
        </div>
        <p className="text-xs mt-1 opacity-75">
          Using mock API - server may be unavailable
        </p>
      </div>
    </div>
  );
}
