import type { Metadata } from "next";
import "../globals.css";
import { Homepage } from "@/components/homepage";

export const metadata: Metadata = {
  title: "Servi-Mach",
  description: "Pagina de servicios y coneccion a usuarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Homepage />
        {children}
      </body>
    </html>
  );
}
