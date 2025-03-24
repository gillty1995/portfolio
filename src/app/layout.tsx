// app/layout.tsx
import "../styles/globals.css";
import { NavProvider } from "@/components/NavContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NavProvider>{children}</NavProvider>
      </body>
    </html>
  );
}
