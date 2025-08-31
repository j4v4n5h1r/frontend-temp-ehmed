"use client";

import { useState, useEffect } from 'react';
import { testNetworkConnection } from '../utils/networkDebug';
import { useTranslation } from '../context/TranslationContext';

export default function NetworkStatus() {
  const { t } = useTranslation();
  const [networkStatus, setNetworkStatus] = useState('checking');
  const [statusMessage, setStatusMessage] = useState('');
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    // Disable network checking for now to prevent errors
    // const checkNetwork = async () => {
    //   try {
    //     const result = await testNetworkConnection();
    //     if (result.success) {
    //       setNetworkStatus('connected');
    //       setStatusMessage(result.message);
    //       setShowStatus(false); // Hide if connection is good
    //     } else {
    //       setNetworkStatus('error');
    //       setStatusMessage(result.message);
    //       setShowStatus(true); // Show if there's an issue
    //     }
    //   } catch (error) {
    //     setNetworkStatus('error');
    //     setStatusMessage('Unable to check network status');
    //     setShowStatus(true);
    //   }
    // };

    // checkNetwork();

    // // Check network status every 30 seconds
    // const interval = setInterval(checkNetwork, 30000);

    // return () => clearInterval(interval);
  }, []);

  if (!showStatus) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`p-3 rounded-lg shadow-lg ${
        networkStatus === 'error' 
          ? 'bg-red-50 border border-red-200 text-red-800' 
          : networkStatus === 'connected'
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            networkStatus === 'error' 
              ? 'bg-red-500' 
              : networkStatus === 'connected'
                ? 'bg-green-500'
                : 'bg-yellow-500'
          }`} />
          <span className="text-sm font-medium">
            {networkStatus === 'error' 
              ? t("errors.network")
              : networkStatus === 'connected'
                ? 'Connected'
                : 'Checking...'
            }
          </span>
          <button
            onClick={() => setShowStatus(false)}
            className="ml-2 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        {statusMessage && (
          <p className="text-xs mt-1 opacity-75">{statusMessage}</p>
        )}
      </div>
    </div>
  );
}
