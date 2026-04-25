import React from "react";

type SponsorInfo = {
  sponsorName: string;
  sponsorLink: string;
  sponsorLogo: string; /* Path the image link is string */
  discount: number;
};

type Props = {
  sponsor: SponsorInfo;
};

export default function SponsorInfoBox({ sponsor }: Props) {
  return (
    <div className="flex flex-col items-center p-5 bg-[#FFFFFF] rounded-lg">
      <img
        src={sponsor.sponsorLogo}
        alt={`${sponsor.sponsorName} logo`}
        className="h-30 w-full object-cover rounded-lg"
      />
      <h3 className="mt-4 text-xl font-bold text-white">{sponsor.sponsorName}</h3>
      <p className="text-sm text-gray-400">{sponsor.discount}% off</p>
      <a href={sponsor.sponsorLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline mt-2">
        Visit website
      </a>
    </div>
  );
}
