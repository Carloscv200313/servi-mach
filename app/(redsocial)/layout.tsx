import type { Metadata } from "next";
import "../globals.css";


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
                {children}
            </body>
        </html>
    );
}
