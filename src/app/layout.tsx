import type { Metadata } from "next";
import { montserrat } from '@/app/ui/font';
import "@/app/globals.css";


export const metadata: Metadata = {
  title: "Calculadora de comisiones - UP Home Solution",
  description: "Calculadora para saber las comisiones de los vendedores a la hora ed realizar una venta.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
