import type { Metadata } from "next";
import { Work_Sans, IBM_Plex_Serif, Roboto_Mono } from "next/font/google";
import "./globals.css";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

const ibmPlexSerif = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cyfiz - Cyber Intelligence & Research",
  description: "Advanced cybersecurity frameworks, research summaries, and AI security intelligence.",
  icons: {
    icon: "/favicon-transparent.png",
    shortcut: "/favicon-transparent.png",
    apple: "/logo-transparent.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${workSans.variable} ${ibmPlexSerif.variable} ${robotoMono.variable} h-full font-sans antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
