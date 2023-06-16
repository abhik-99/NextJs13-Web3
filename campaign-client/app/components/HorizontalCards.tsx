import Link from "next/link";
import React from "react";
type HorizontalCardsProps = {
  img: string;
  alt: string;
  heading: string;
  body: string;
  link: string;
  reversed?: boolean;
};
const HorizontalCards = ({ img, alt, heading, body, link, reversed }: HorizontalCardsProps) => {
  return (
    <Link
      href={link}
      className="flex flex-col items-center border rounded-lg shadow md:flex-row md:max-w-xl border-gray-500 bg-gray-900 hover:bg-gray-700"
    >
      {!reversed ? (
        <>
          <img
            className="object-cover rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={img}
            alt={alt}
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {heading}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {body}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {heading}
            </h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {body}
            </p>
          </div>
          <img
            className="object-fill rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-r-lg"
            src={img}
            alt={alt}
          />
        </>
      )}
    </Link>
  );
};

export default HorizontalCards;
