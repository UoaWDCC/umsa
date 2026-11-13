import { FaInstagram } from "react-icons/fa";
import { FiHeart, FiMessageCircle, FiSend } from "react-icons/fi";

import { useState } from "react";
import type { Member } from "../types/content";

type Props = {
  stats: Member;
  bgColor?: string;
};

export default function MemberInfo({
  stats,
  bgColor = "bg-[var(--color-accent1-primary)]",
}: Props) {
  const [expanded, setExpanded] = useState(false);
  const instagram = stats.instagram
    ?.replace(/^https?:\/\/(www\.)?instagram\.com\//, "")
    .replace(/^@/, "")
    .replace(/\/+$/, "");
  return (
    <article
      className={`group relative flex flex-col items-center rounded-[10px] ${bgColor} p-3 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] w-52 aspect-3/4`}
    >
      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-label={`${expanded ? "Hide" : "Show"} profile for ${stats.fullName}`}
        className="absolute right-2 top-2 z-20 rounded-full bg-white px-2 py-1 text-xs text-accent1-primary"
      >
        {expanded ? "Close" : "Info"}
      </button>
      {/* Prehover */}
      <div
        className={`transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0 ${expanded ? "opacity-0" : ""}`}
      >
        {stats.img ? (
          <img
            className="w-45 h-40 rounded-[10px] object-cover"
            src={stats.img}
            alt={stats.fullName}
            loading="lazy"
          />
        ) : (
          <div
            className="h-40 w-45 rounded-[10px] bg-white/20"
            aria-hidden="true"
          />
        )}
        <div className="text-left w-full">
          <div className="mb-2 mt-3 flex items-center space-x-1 text-white text-base">
            <FiHeart></FiHeart>
            <FiMessageCircle></FiMessageCircle>
            <FiSend></FiSend>
          </div>
          <p className="mb-0 leading-none font-heading text-sm font-bold text-white">
            {stats.role}
          </p>
          <p className="mt-1 leading-none font-heading text-xs text-white/80 break-all">
            {stats.fullName}
          </p>
        </div>
      </div>
      {/* Posthover */}
      <div
        className={`pointer-events-none absolute inset-0 flex flex-col justify-center p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:pointer-events-auto ${expanded ? "opacity-100 pointer-events-auto" : ""}`}
      >
        <p className="font-heading text-xl font-bold uppercase leading-none text-white">
          {stats.fullName}
        </p>
        {stats.degree && (
          <p className="text-sm text-white/80">{stats.degree}</p>
        )}
        {stats.ethnicity && (
          <p className="text-sm text-white/80">{stats.ethnicity}</p>
        )}
        {(stats.mbti || stats.favArtist) && (
          <p className="text-sm text-white/80">
            {[stats.mbti, stats.favArtist].filter(Boolean).join(" · ")}
          </p>
        )}
        {stats.bio && (
          <p className="text-sm italic text-white">{`"${stats.bio}"`}</p>
        )}
        {stats.instagram && (
          <div className="mt-2 text-white/80">
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm hover:no-underline"
            >
              <FaInstagram size={20} />
              <span className="text-sm">{`@${instagram}`}</span>
            </a>
          </div>
        )}
      </div>
    </article>
  );
}
