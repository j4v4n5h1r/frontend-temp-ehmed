import './globals.css';
import { Inter } from 'next/font/google';
import AuthProvider from '../context/AuthContext';  // Burada default import

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Power Bank App',
  description: 'Frontend for power bank rental system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
