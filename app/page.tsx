import BalanceDisplay from "@/components/BalanceDisplay";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  const cardsData = [
    { imageSrc: '/assets/images/logo1.png', title: 'Solana Token Creator', description: 'Creator can create Solana token.', link: '/create-token' },
    { imageSrc: '/assets/images/ai/img-7.jpg', title: 'Search Metadata', description: 'Get Token Metadata Detail.', link: '/metadata' },
    { imageSrc: '/assets/images/ai/img-8.jpg', title: 'AirDrop', description: 'You can claim your 1 Airdrop.', link: '/airdrop' },
    { imageSrc: '/assets/images/ai/img-9.jpg', title: 'Donate us', description: 'Now you can Donate, to the create token in our platfrom.', link: '/donate' },
    { imageSrc: '/assets/images/ai/img-10.jpg', title: 'Contact us', description: 'Send your message so we provide you more details.', link: '/contactView' },
  ];

  return (
    <div className=" justify-center text-center bg-black/20">
      <Navbar />
      <button
        type="button"
        className=" cursor-not-allowed text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-7 py-3.5 text-center me-2 mb-2 mt-10"
      >
        <BalanceDisplay />
      </button>
      <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <Footer/>
    </div>
  );
}
