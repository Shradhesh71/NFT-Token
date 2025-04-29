import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, title, description, link }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
      <div className="h-48 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <Link
          href={link}
          className="inline-flex items-center py-2 px-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg font-medium transition-transform hover:translate-y-1 hover:shadow-lg"
        >
          Explore <ArrowUpRight size={16} className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default Card;
