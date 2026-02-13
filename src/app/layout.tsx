import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vansh — AI/ML Engineer",
  description: "Building intelligent systems with cutting-edge AI and machine learning. Specializing in transformer models, LLM applications, RAG systems, and custom AI solutions.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="noise-bg">
        {children}
      </body>
    </html>
  );
}
