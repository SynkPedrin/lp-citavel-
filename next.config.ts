import type { NextConfig } from "next";

/**
 * Site anterior da Citável (blog, case, páginas de SEO, áreas de cliente).
 * Quando definido, esta LP vira só a home de citavel.ai e todo endereço que ela não conhece
 * é servido pelo site anterior, no mesmo caminho (nada quebra para o Google, as IAs ou clientes).
 */
const legacy = process.env.LEGACY_SITE_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  // o blog anterior usa /blog/ com barra e links relativos: não remover a barra final
  skipTrailingSlashRedirect: !!legacy,
  partialPrefetching: true,
  images: {
    qualities: [75],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // vídeos e texturas versionados por nome de arquivo: cache longo
        source: "/assets/ai/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=2592000, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return legacy ? [{ source: "/index.html", destination: "/", permanent: true }] : [];
  },
  async rewrites() {
    if (!legacy) return [];
    return {
      // robots e sitemap do site anterior protegem as áreas de cliente e listam blog e páginas de SEO
      beforeFiles: [
        { source: "/robots.txt", destination: `${legacy}/robots.txt` },
        { source: "/sitemap.xml", destination: `${legacy}/sitemap.xml` },
      ],
      afterFiles: [],
      fallback: [{ source: "/:path*", destination: `${legacy}/:path*` }],
    };
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
