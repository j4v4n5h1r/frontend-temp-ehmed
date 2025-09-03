"use client";
import { useEffect, useCallback } from 'react';
import { useAuth } from '../utils/auth';

const GOOGLE_CLIENT_ID = '736409138385-rvortn6o1qjl8qlrei1aqvc7uk2mjp0q.apps.googleusercontent.com';

export default function GoogleLogin() {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = useCallback(async (response) => {
    console.log('🔍 GoogleLogin - handleGoogleLogin called with:', response);
    if (response.credential) {
      console.log('🔍 Google OAuth - Received credential, calling backend...');
      try {
        const result = await googleLogin(response.credential);
        console.log('🔍 Google OAuth - Backend response:', result);
        if (result.success) {
          console.log('✅ Google OAuth - Login successful, redirecting to dashboard');
          window.location.href = '/dashboard';
        } else {
          console.error('❌ Google OAuth - Login failed:', result.error);
          alert('Google login failed: ' + result.error);
        }
      } catch (error) {
        console.error('❌ Google OAuth - Error:', error);
        alert('Google login error: ' + error.message);
      }
    } else {
      console.warn('⚠️ Google OAuth - No credential received:', response);
    }
  }, [googleLogin]);

  useEffect(() => {
    console.log('🔍 GoogleLogin - useEffect starting, loading Google OAuth script...');
    
    // Prevent any global event delegation that might be intercepting clicks
    const preventGlobalOAuth = (e) => {
      const target = e.target;
      if (target && target.closest('#google-login-button')) {
        console.log('🔍 GoogleLogin - Preventing global OAuth interception');
        e.stopImmediatePropagation();
      }
    };
    
    document.addEventListener('click', preventGlobalOAuth, true);
    
    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('🔍 GoogleLogin - Google script loaded successfully');
      if (window.google) {
        console.log('🔍 GoogleLogin - Initializing Google OAuth with client ID:', GOOGLE_CLIENT_ID);
        
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleLogin,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render the button
        const buttonElement = document.getElementById('google-login-button');
        if (buttonElement) {
          console.log('🔍 GoogleLogin - Rendering Google button');
          window.google.accounts.id.renderButton(
            buttonElement,
            {
              theme: 'outline',
              size: 'large',
              type: 'standard',
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left',
              width: 300,
            }
          );
          console.log('✅ GoogleLogin - Google button rendered successfully');
        } else {
          console.error('❌ GoogleLogin - Button element not found!');
        }
      } else {
        console.error('❌ GoogleLogin - window.google not available');
      }
    };
    
    script.onerror = (error) => {
      console.error('❌ GoogleLogin - Failed to load Google script:', error);
    };
    
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.removeEventListener('click', preventGlobalOAuth, true);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
        console.log('🔍 GoogleLogin - Cleanup: Removed Google script');
      }
    };
  }, [handleGoogleLogin]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div id="google-login-button"></div>
      
      <p className="text-sm text-neutral-600">
        Or continue with email
      </p>
    </div>
  );
}
