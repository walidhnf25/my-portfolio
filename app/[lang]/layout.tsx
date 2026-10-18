import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "../globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import SceneBackground from "@/components/three/SceneBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import SplashScreen from "@/components/SplashScreen";
import { hasLocale, localePath, locales, ogLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

// Every locale is known at build time; anything else is a 404.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;

  return {
    metadataBase: new URL("https://aboutwal.id"),
    title: t.title,
    description: t.description,
    keywords: [
      "Walid Hanif Ataullah",
      "Software Engineer",
      "ML/DL Enthusiast",
      "Machine Learning",
      "Deep Learning",
      "IoT",
      "Portfolio",
      "Telkom University",
    ],
    authors: [{ name: "Walid Hanif Ataullah" }],
    creator: "Walid Hanif Ataullah",
    // Each language is its own canonical page; hreflang links the pair together.
    alternates: {
      canonical: localePath(lang),
      languages: {
        en: localePath("en"),
        id: localePath("id"),
        "x-default": localePath("en"),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      url: localePath(lang),
      siteName: t.siteName,
      title: t.title,
      description: t.ogDescription,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Walid Hanif Ataullah" }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.twitterDescription,
      images: ["/og-image.png"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    icons: { icon: "/logo.png", shortcut: "/logo.png" },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <LocaleProvider locale={lang} dict={dict}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SmoothScroll>
              <SceneBackground />
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ScrollProgress />
              {/* Last child, so it paints over everything including the navbar. */}
              <SplashScreen />
            </SmoothScroll>
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
