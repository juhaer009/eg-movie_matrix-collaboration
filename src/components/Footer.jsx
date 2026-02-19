import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-gray-300 pt-12 pb-6 border-t border-stone-700">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        
        {/* Logo Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Image
              src="/logo.png"
              width={50}
              height={50}
              alt="MovieMatrix Logo"
              className="rounded-lg"
            />
            <h2 className="text-xl font-bold text-white tracking-wide">
              MUVIEMATRIX
            </h2>
          </div>
          <p className="text-sm text-gray-400">
            Discover, review and explore your favorite movies in one place.
          </p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-amber-400 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/foods" className="hover:text-amber-400 transition">
                Movies
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-amber-400 transition">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/feedback" className="hover:text-amber-400 transition">
                Feedback
              </Link>
            </li>
          </ul>
        </div>

        {/* Extra Links */}
        <div>
          <h3 className="text-white font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="#" className="hover:text-amber-400 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-400 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-amber-400 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Section */}
        <div>
          <h3 className="text-white font-semibold mb-4">Connect</h3>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="hover:text-amber-400 transition">
              Facebook
            </Link>
            <Link href="#" className="hover:text-amber-400 transition">
              Twitter
            </Link>
            <Link href="#" className="hover:text-amber-400 transition">
              GitHub
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-stone-700 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MUVIEMATRIX. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
 