"use client";

import { useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SiSolana } from "react-icons/si";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-4 px-6 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center">
            <div className="bg-gradient-to-r from-pink-500 to-orange-400 rounded-full p-1 mr-2">
              {/* <img
                src="/api/placeholder/40/40"
                alt="SolanaCraft Logo"
                className="h-8 w-8 rounded-full"
              /> */}
              <SiSolana className="text-3xl" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              SolanaCraft
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/create-token"
            className="hover:text-purple-300 transition-colors"
          >
            Create Token
          </Link>
          <Link
            href="/metadata"
            className="hover:text-purple-300 transition-colors"
          >
            Metadata
          </Link>
          <Link
            href="/airdrop"
            className="hover:text-purple-300 transition-colors"
          >
            Airdrop
          </Link>
          <Link
            href="/donate"
            className="hover:text-purple-300 transition-colors"
          >
            Donate
          </Link>
          <Link
            href="/contactView"
            className="hover:text-purple-300 transition-colors"
          >
            Contact
          </Link>
          <WalletMultiButton className="!bg-gradient-to-r from-pink-500 to-orange-400 !rounded-lg" />
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg py-4 px-6 z-50">
          <div className="flex flex-col space-y-4">
            <Link
              href="/create-token"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Create Token
            </Link>
            <Link
              href="/metadata"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Metadata
            </Link>
            <Link
              href="/airdrop"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Airdrop
            </Link>
            <Link
              href="/donate"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Donate
            </Link>
            <Link
              href="/contactView"
              className="hover:text-purple-300 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <WalletMultiButton className="!bg-gradient-to-r from-pink-500 to-orange-400 !rounded-lg" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
