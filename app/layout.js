import { Outfit } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistration from "./components/ServiceWorkerRegistration";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Odkryj Leżajsk - Zbierz miasto",
  description: "Odkryj ukryte fragmenty miasta Leżajsk! Kup wodę, znajdź kod pod nakrętką i odsłoń kawałek miasta.",
  keywords: ["Leżajsk", "miasto", "zbieranie", "kod", "odkrywanie", "turystyka"],
  authors: [{ name: "Leżajsk Collection" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "Odkryj Leżajsk - Zbierz miasto",
    description: "Odkryj ukryte fragmenty miasta Leżajsk!",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="pl"
      className={`${outfit.variable} h-full antialiased`}
    >
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#06b6d4" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Odkryj Leżajsk" />
      </head>
      <body className="min-h-full flex flex-col">
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  );
}
