import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from '../components/ScrollToTop'; // Assuming components is a sibling of app

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chinese Zodiac",
  description: "Find your Chinese Zodiac sign",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  );
}
