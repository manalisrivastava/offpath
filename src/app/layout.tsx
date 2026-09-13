import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import AnimatedBackground from "@/components/AnimatedBackground";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Offpath",
  description: "Find the edge cases your happy path missed.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <AnimatedBackground />
        {children}
      </body>
    </html>
  );
}
