"use client";

import { useEffect, useContext } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { useTranslation } from "../context/TranslationContext";

const OAuthCallback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useContext(AuthContext);
  const { t } = useTranslation();

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const accessToken = searchParams.get("access_token");
        const refreshToken = searchParams.get("refresh_token");
        const provider = searchParams.get("provider");
        const error = searchParams.get("error");

        if (error) {
          console.error("OAuth error:", error);
          router.push("/login?error=oauth_failed");
          return;
        }

        if (!accessToken || !refreshToken) {
          console.error("Missing tokens from OAuth callback");
          router.push("/login?error=oauth_failed");
          return;
        }

        // Store tokens and login user
        const userData = {
          token: accessToken,
          refreshToken: refreshToken,
          provider: provider,
        };

        await login(userData);
        
        // Redirect to dashboard or home page
        router.push("/dashboard");
      } catch (error) {
        console.error("OAuth callback error:", error);
        router.push("/login?error=oauth_failed");
      }
    };

    handleOAuthCallback();
  }, [searchParams, login, router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "3rem",
          borderRadius: "1rem",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          maxWidth: "400px",
          width: "90%",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "4px solid #e5e7eb",
            borderTop: "4px solid #667eea",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 2rem",
          }}
        ></div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
        >
          {t("auth.oauthProcessing", "Processing OAuth Login...")}
        </h2>
        <p
          style={{
            color: "#6b7280",
            fontSize: "0.875rem",
          }}
        >
          {t("auth.oauthRedirecting", "Please wait while we complete your login.")}
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default OAuthCallback;
