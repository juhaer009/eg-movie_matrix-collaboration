import { Poppins } from 'next/font/google';
import "./globals.css";
import Navbar from "@/Components/Layout/Navbar";
import Footer from "@/Components/Layout/Footer";

const poppins = Poppins({ 
  weight: ['400','500','700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Movie Matrix",
  description: "Template %s | for movie recommendation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased`}
      >
        <header>
   <Navbar/>
        </header>
   <main className="min-h-screen bg-base-200">{children}</main>
        <footer><Footer/></footer>
      </body>
    </html>
  );
}
