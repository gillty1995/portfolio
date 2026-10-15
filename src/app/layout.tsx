// app/layout.tsx
import "../styles/globals.css";
import { NavProvider } from "@/components/NavContext";
import Navbar from "@/components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/LexendZetta-Light.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/LexendZetta-Regular.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <NavProvider>
          <Navbar />
        </NavProvider>
        {children}
      </body>
    </html>
  );
}
