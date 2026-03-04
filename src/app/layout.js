import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/Authprovider/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MovieMatrix - Stream Unlimited Movies & TV Shows",
  description: "Discover, review and explore your favorite movies in one place. Stream unlimited entertainment.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        <Navbar />

        <main className="min-h-screen pt-20">
          <AuthProvider>{children}</AuthProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}
