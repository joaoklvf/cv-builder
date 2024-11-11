import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ResumeProvider from "./providers/resume-provider";
import { NavBar } from "./ui/navbar/navbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const dancingScriptBold = localFont({
  src: "./fonts/DancingScript-Bold.ttf",
  variable: "--font-dancing-script-bold",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    template: '%s | CV Builder',
    default: 'Página Inicial | CV Builder',
  },
  description: 'Criador de currículos online',
  metadataBase: new URL('https://next-learn-dashboard.vercel.sh'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dancingScriptBold.variable} antialiased `}
      >
        <ResumeProvider>
          <NavBar></NavBar>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
