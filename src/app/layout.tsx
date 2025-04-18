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
      <body>
        <NavProvider>
          <Navbar />
          {children}
        </NavProvider>
      </body>
    </html>
  );
}
