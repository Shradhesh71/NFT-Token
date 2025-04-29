import BalanceDisplay from "@/components/BalanceDisplay";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  const cardsData = [
    {
      imageSrc: "/assets/images/logo1.png",
      title: "Solana Token Creator",
      description:
        "Create your own Solana token with just a few clicks. Fast, secure, and easy to use.",
      link: "/create-token",
    },
    {
      imageSrc: "/assets/images/ai/img-7.jpg",
      title: "Search Metadata",
      description:
        "Explore and retrieve detailed token metadata information for any Solana token.",
      link: "/metadata",
    },
    {
      imageSrc: "/assets/images/ai/img-8.jpg",
      title: "AirDrop",
      description:
        "Claim your free airdrop! Get started with Solana tokens right away.",
      link: "/airdrop",
    },
    {
      imageSrc: "/assets/images/ai/img-9.jpg",
      title: "Donate",
      description:
        "Support our platform by donating. Help us build the future of token creation.",
      link: "/donate",
    },
    {
      imageSrc: "/assets/images/ai/img-10.jpg",
      title: "Contact Us",
      description:
        "Have questions or need assistance? Reach out to our team for support.",
      link: "/contactView",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 text-white">
      <Navbar />

      <div className="py-16 px-6 md:py-24">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-orange-400 bg-clip-text text-transparent">
              Create Solana Tokens
            </span>
            <br />
            with Ease
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            The easiest platform to create, manage and distribute your Solana
            tokens
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg shadow-lg text-white font-medium hover:opacity-90 transition-all">
              <BalanceDisplay />
            </button>
            <Link
              href="/create-token"
              className="px-8 py-3 bg-purple-700 bg-opacity-50 border border-purple-500 rounded-lg text-white font-medium hover:bg-opacity-70 transition-all"
            >
              Start Creating
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to create and manage Solana tokens in one place
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardsData.map((card, index) => (
            <Card
              key={index}
              imageSrc={card.imageSrc}
              title={card.title}
              description={card.description}
              link={card.link}
            />
          ))}
        </div>
      </div>

      <div className="bg-gray-800 bg-opacity-50 py-12 my-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <h3 className="text-3xl font-bold text-pink-400">10K+</h3>
              <p className="text-gray-300">Tokens Created</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-orange-400">5K+</h3>
              <p className="text-gray-300">Active Users</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-pink-400">99%</h3>
              <p className="text-gray-300">Success Rate</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-orange-400">24/7</h3>
              <p className="text-gray-300">Support</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-purple-800 to-indigo-700 rounded-2xl p-8 md:p-12 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your Token?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Join thousands of creators who have successfully launched their
              tokens on Solana with our platform.
            </p>
            <Link
              href="/create-token"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-orange-400 rounded-lg shadow-lg text-white font-medium hover:opacity-90 transition-all"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
