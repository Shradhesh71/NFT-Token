"use client";

import { useForm, ValidationError } from "@formspree/react";
import Link from "next/link";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaMediumM,
  FaReddit,
} from "react-icons/fa";

export default function Footer() {
  const [state, handleSubmit] = useForm("xpwzaoql");
  if (state.succeeded) {
    console.log({
      type: "success",
      message: "Successfully subcription",
    });
  }

  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h3 className="text-lg font-bold mb-4">CUSTOMER SERVICE</h3>
          <ul>
            <li>
              <Link href="/contact">Create Token</Link>
            </li>
            <li>
              <Link href="/track-order">Search Metadata</Link>
            </li>
            <li>
              <Link href="/return-order">Airdrop</Link>
            </li>
            <li>
              <Link href="/cancel-order">Donate us</Link>
            </li>
          </ul>
          {/* <div className="mt-4">
            <p>7 Days return policy*</p>
            <p>Cash on delivery*</p>
          </div> */}
        </div>
        {/* <div>
          <h3 className="text-lg font-bold mb-4">COMPANY</h3>
          <ul>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/careers">We're Hiring</Link>
            </li>
            <li>
              <Link href="/terms">Terms & Conditions</Link>
            </li>
            <li>
              <Link href="/privacy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/blog">Blog</Link>
            </li>
          </ul>
        </div> */}
        <div>
          <h3 className="text-lg font-bold mb-4">CONNECT WITH US</h3>
          <div className="flex space-x-4 ml-28">
            <a href="https://www.reddit.com" target="_blank" rel="noreferrer">
              <FaReddit size={24} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://x.com/Shradeshjain835"
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://www.linkedin.com/in/shradesh-jodawat-147730265/"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin size={24} />
            </a>
            <a href="https://www.medium.com" target="_blank" rel="noreferrer">
              <FaMediumM size={24} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">KEEP UP TO DATE</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter Email ID"
              className="p-2 w-full mb-4 text-black"
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-yellow-500 text-black py-2 px-4 w-full"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div>
          <h3 className="text-lg font-bold mb-4">Other Useful Website</h3>
          <ul>
            <li>
              <Link href="https://shradesh-jodawat.vercel.app/">Portfolio</Link>
            </li>
            <li>
              <Link href="/https://raffle-solana.vercel.app/">Lottery</Link>
            </li>
            <li>
              <Link href="https://github.com/Shradhesh71/PixBounty">
                Pixbounty
              </Link>
            </li>
            <li>
              <Link href="https://github.com/Shradhesh71/Game_Xplore/tree/master">
                GameXplore
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">USEFUL LINKS</h3>
          <ul>
            <li>
              <Link href="https://solana.com/developers/nfts" target="_blank">
                NFT Solana
              </Link>
            </li>
            <li>
              <Link href="https://opensea.io/">OpenSea</Link>
            </li>
            <li>
              <Link href="https://solscan.io/">Solscan</Link>
            </li>
            <li>
              <Link href="/faq">FAQs</Link>
            </li>
          </ul>
        </div>
        {/* <div>
          <h3 className="text-lg font-bold mb-4">100% Secure Payment:</h3>
          <div className="flex space-x-4">
            <a href="https://play.google.com" target="_blank" rel="noreferrer">
              <SiPhonepe size={32} />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <FaGooglePay size={32} />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <SiPaytm size={32} />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <FaCcMastercard size={32} />
            </a>
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noreferrer"
            >
              <FaCcVisa size={32} />
            </a>
          </div>
        </div> */}
      </div>
      <div className="container mx-auto text-center mt-8">
        <p className="text-gray-500">
          © 2024 Shradhesh Jodawat. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <p>100% Decentralized</p>
          <p>Premium Features</p>
          <p>User Friendly</p>
        </div>
      </div>
    </footer>
  );
}
