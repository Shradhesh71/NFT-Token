// components/Card.js

import Link from "next/link";
import Image from "next/image";

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  link: string;
}

export default function Card({
  imageSrc,
  title,
  description,
  link,
}: CardProps) {
  return (
    <Link href={link}>
      <div className="p-4 rounded-2xl shadow-2xl transform transition duration-300 ease-in-out hover:shadow-xl hover:scale-105 bg-gradient-to-bl from-blue-200 to-purple-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 hover:text-white cursor-pointer group">
        <div className="overflow-hidden rounded-lg">
          <Image
            height={30}
            width={200}
            src={imageSrc}
            alt={title}
            className="w-full bg-black h-48 object-cover transition duration-300 transform group-hover:scale-110 rounded-md"
          />
        </div>
        <h2 className="text-xl text-white bg-gradient-to-br from-sky-500 to-red-400 hover:bg-gradient-to-bl font-semibold mt-4 transition duration-300 group-hover:text-white p-2 rounded-3xl">
          {title}
        </h2>
        <p className="text-gray-900 mt-2 transition duration-300 group-hover:text-gray-700">
          {description}
        </p>
        <div className="mt-4 inline-block px-4 py-2 text-sm font-semibold text-blue-500 bg-white border border-blue-500 rounded-lg transition duration-300 ease-in-out transform group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105">
          Learn More
        </div>
      </div>
    </Link>
  );
}
