import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { site } from "@/content/site";
import { getSiteEnv } from "@/lib/env";
import "./globals.css";

// Archivo variável: pesos 100–900 (ExtraBold/Black para títulos) + eixo de largura para condensação.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});


const isPreview = getSiteEnv() !== "production";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "reputação em inteligência artificial",
    "GEO",
    "AEO",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Método PULSO",
    "PULSO Score",
    "reputação de marca",
    "Citável",
  ],
  authors: [{ name: site.plainName, url: site.url }],
  creator: site.company.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.shortDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.shortDescription,
  },
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#1c1d1a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* Ativa o motion antes da primeira pintura (respeita prefers-reduced-motion). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')}catch(e){}",
          }}
        />
      </head>
      <body className="t-dark min-h-svh">
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-lima px-5 py-3 text-sm font-bold text-grafite focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
