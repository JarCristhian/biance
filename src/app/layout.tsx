import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import { NavBar } from "@/components/me/NavBar";

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
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>
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
