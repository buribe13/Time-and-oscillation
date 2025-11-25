import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const labMono = localFont({
  src: [
    {
      path: "./fonts/labmono-regular-web.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/labmono-regular-web.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lab-mono",
});

export const metadata: Metadata = {
  title: "Fibonacci Sphere Animation",
  description: "Interactive generative art assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${labMono.variable} font-mono antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
