import type { Metadata } from "next";
import { Bodoni_Moda, Bricolage_Grotesque, DM_Sans } from "next/font/google";
import "./globals.css";

// Display font — headings (per docs/Fund_Patients_Cheatsheet.pdf).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Editorial accent — italic only, for the occasional emphasised phrase in a heading.
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["italic"],
});

// Body/UI font.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FundPatients — Every Life Matters.",
    template: "%s | FundPatients",
  },
  description:
    "Directly support individuals facing urgent medical expenses and help them access vital care.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${dmSans.variable} ${bodoni.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
