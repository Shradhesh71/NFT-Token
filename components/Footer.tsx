import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              SolanaCraft
            </h3>
            <p className="text-gray-400">
              Your platform for Solana token creation and management.
            </p>
            <div className="mt-4 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/api/placeholder/24/24"
                  alt="Twitter"
                  className="h-6 w-6 rounded"
                />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/api/placeholder/24/24"
                  alt="Discord"
                  className="h-6 w-6 rounded"
                />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <img
                  src="/api/placeholder/24/24"
                  alt="Telegram"
                  className="h-6 w-6 rounded"
                />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/create-token"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Create Token
                </Link>
              </li>
              <li>
                <Link
                  href="/metadata"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Search Metadata
                </Link>
              </li>
              <li>
                <Link
                  href="/airdrop"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Airdrop
                </Link>
              </li>
              <li>
                <Link
                  href="/donate"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              Have questions? Reach out to us!
            </p>
            <Link
              href="/contactView"
              className="inline-flex items-center py-2 px-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium transition-all hover:opacity-90"
            >
              Get in Touch
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} SolanaCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
