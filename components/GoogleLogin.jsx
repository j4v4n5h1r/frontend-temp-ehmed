"use client";
import { useEffect, useCallback } from 'react';
import { useAuth } from '../utils/auth';

const GOOGLE_CLIENT_ID = '736409138385-rvortn6o1qjl8qlrei1aqvc7uk2mjp0q.apps.googleusercontent.com';

export default function GoogleLogin() {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = useCallback(async (response) => {
    if (response.credential) {
      console.log('🔍 Google OAuth - Received credential');
      try {
        const result = await googleLogin(response.credential);
        if (result.success) {
          console.log('✅ Google OAuth - Login successful');
          // Redirect or show success message
          window.location.href = '/dashboard';
        } else {
          console.error('❌ Google OAuth - Login failed:', result.error);
          alert('Google login failed: ' + result.error);
        }
      } catch (error) {
        console.error('❌ Google OAuth - Error:', error);
        alert('Google login error: ' + error.message);
      }
    }
  }, [googleLogin]);

  useEffect(() => {
    // Load Google OAuth script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleLogin,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Render the button
        window.google.accounts.id.renderButton(
          document.getElementById('google-login-button'),
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
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (document.head.contains(script)) {
        document.head.removeChild(script);
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
