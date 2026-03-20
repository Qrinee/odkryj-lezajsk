import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
});

export const metadata = {
  title: "Odkryj Leżajsk - Zbierz miasto",
  description: "Odkryj ukryte fragmenty miasta Leżajsk! Kup wodę, znajdź kod pod nakrętką i odsłoń kawałek miasta.",
  keywords: ["Leżajsk", "miasto", "zbieranie", "kod", "odkrywanie", "turystyka"],
  authors: [{ name: "Leżajsk Collection" }],
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
