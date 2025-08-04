import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "../context/AuthContext";
import { TranslationProvider } from "../context/TranslationContext";
import Navbar from "../components/Navbar";
import NetworkStatus from "../components/NetworkStatus";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Power Bank App",
  description: "Frontend for power bank rental system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <TranslationProvider>
          <AuthProvider>
            <Navbar />
            <main className="pt-14 sm:pt-16 lg:pt-20 min-h-screen">
              {children}
            </main>
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
