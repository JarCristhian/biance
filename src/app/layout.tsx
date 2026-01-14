import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { NavBar } from "@/components/me/NavBar";
import { ThemeColorManager } from "@/components/theme-color-manager";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Biance",
  description: "Biance App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </Head>

      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
            <ThemeColorManager />
            <SessionAuthProvider>
              {<NavBar />}

              {children}
            </SessionAuthProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
