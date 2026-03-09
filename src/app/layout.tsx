import type { Metadata } from "next";
import { Inter, Fira_Mono, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaMono = Fira_Mono({
  weight: "400",
  variable: "--font-fira-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "INTERSTELLAR SYMPOSIUM EXPLORATION",
  description: "A 3D space exploration mission for our technical and non-technical events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${firaMono.variable} ${orbitron.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
