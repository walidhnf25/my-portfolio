import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import SceneBackground from "@/components/three/SceneBackground";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ScrollRat } from "@/components/ui/scroll-rat";
import SplashScreen from "@/components/SplashScreen";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://aboutwal.id"),
  title: "Walid Hanif Ataullah | Software Engineer & ML/DL Enthusiast",
  description:
    "Bachelor's graduate in Software Engineering specializing in Information Technology Adoption, Machine Learning, Deep Learning, and Internet of Things. Explore my research publications, projects, and get in touch.",
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
  alternates: { canonical: "https://aboutwal.id" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aboutwal.id",
    siteName: "Walid Hanif Ataullah Portfolio",
    title: "Walid Hanif Ataullah | Software Engineer & ML/DL Enthusiast",
    description:
      "Software Engineer & ML/DL Enthusiast focused on Machine Learning, Deep Learning, and IoT. Explore my publications and projects.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Walid Hanif Ataullah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Walid Hanif Ataullah | Software Engineer & ML/DL Enthusiast",
    description:
      "Software Engineer & ML/DL Enthusiast focused on Machine Learning, Deep Learning, and IoT.",
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
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
            <ScrollRat />
            {/* Last child, so it paints over everything including the navbar. */}
            <SplashScreen />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
