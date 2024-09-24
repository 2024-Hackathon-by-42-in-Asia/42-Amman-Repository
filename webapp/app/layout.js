import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Share Basket",
  description: "42Asia Hackathon 2024",
  icons: {
    icon: "/image.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(`${inter.className} tw-min-h-screen tw-bg-background tw-font-sans tw-antialiased tw-bg-primary tw-text-primary-foreground`)}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
