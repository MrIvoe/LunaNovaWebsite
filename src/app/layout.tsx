import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { loadContent } from "@/lib/content-server";
import { CONTENT_FILES } from "@/lib/content-files";
import { DesignTokens, SeoMetadataContent } from "@/types";

const seoContent = loadContent<SeoMetadataContent>(CONTENT_FILES.site.seoMetadata);

export const metadata: Metadata = {
  title: seoContent.title,
  description: seoContent.description,
  keywords: seoContent.keywords.join(', '),
  openGraph: {
    title: seoContent.openGraph.title,
    description: seoContent.openGraph.description,
    type: seoContent.openGraph.type,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const design = loadContent<DesignTokens>(CONTENT_FILES.site.designTokens);
  const themeVariables = {
    '--color-bg': design.colors.background,
    '--color-surface': design.colors.surface,
    '--color-surface-alt': design.colors.surfaceAlt,
    '--color-brand': design.colors.brand,
    '--color-brand-strong': design.colors.brandStrong,
    '--color-text-primary': design.colors.textPrimary,
    '--color-text-muted': design.colors.textMuted,
    '--color-border': design.colors.border,
    '--hero-gradient': design.gradients.hero,
  } as CSSProperties;

  return (
    <html lang="en" className="h-full antialiased scroll-smooth">
      <body className="min-h-screen flex flex-col" style={themeVariables}>
        {children}
      </body>
    </html>
  );
}
