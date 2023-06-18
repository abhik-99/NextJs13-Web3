import Link from "next/link";
import React from "react";
import cx from "classnames";
import { UrlObject } from "url";

type CampaignCardsProps = {
  link: string | UrlObject
  reverseGradient?:boolean,
  children?: React.ReactNode
}

const CampaignCards = ({link, reverseGradient, children}: CampaignCardsProps) => {
  return (
    <Link href={link} className="flex items-center justify-center">
      <div className="h-48 w-80 relative group">
        <div className={cx("min-h-full min-w-full absolute -inset-1 bg-gradient-to-r rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200", reverseGradient ? "to-red-900 from-cyan-600": "from-cyan-600 to-red-900")}></div>
        <div className="min-h-full min-w-full relative p-4 bg-gray-900 border border-gray-400 ring-1 ring-gray-900/5 rounded-lg leading-none flex flex-col items-start justify-evenly space-x-6">
          {children}
        </div>
      </div>
    </Link>
  );
};

export default CampaignCards;
