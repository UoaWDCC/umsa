import { FaInstagram } from 'react-icons/fa';
import { FiHeart, FiMessageCircle, FiSend } from 'react-icons/fi';

type MemberInfo = {
  img: string;
  fullName: string;
  role: string;
  instagram?: string;
  ethnicity?: string;
  degree?: string;
  mbti?: string;
  favouriteArtist?: string;
  quote?: string;
};

type Props = {
  stats: MemberInfo;
  bgColor?: string;
};

export default function MemberInfo({ stats, bgColor = "bg-[var(--color-accent1-primary)]" }: Props) {
  return (
    <div className={` flex flex-col items-center rounded-[10px] ${bgColor} p-3 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] w-52 aspect-3/4`}>
      {/* Prehover */}
      <div className={`transition-opacity duration-300 group-hover:opacity-0`}>
        <img className="w-45 h-40 rounded-[10px] object-cover" src={stats.img} />
        <div className="text-left w-full">
          <div className="mb-2 mt-3 flex items-center space-x-1 text-white text-base">
            <FiHeart></FiHeart>
            <FiMessageCircle></FiMessageCircle>
            <FiSend></FiSend>
          </div>
          <p className="mb-0 leading-none font-display text-sm font-bold">{stats.role}</p>
          <p className="mt-1 leading-none font-display text-xs text-white/80 break-all">{stats.fullName}</p>
        </div>
      </div>
      {/* Posthover */}
      <div className="absolute inset-0 flex flex-col justify-center p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-heading text-xl font-bold uppercase leading-none text-white">{stats.fullName}</p>
        {stats.degree && (<p className="text-sm text-white/80">{stats.degree}</p>)}
        {stats.degree && (<p className="text-sm text-white/80">{stats.ethnicity}</p>)}
        {(stats.mbti || stats.favouriteArtist) && (<p className="text-sm text-white/80">{[stats.mbti, stats.favouriteArtist].filter(Boolean).join(" · ")}</p>)}
        {stats.quote && (<p className="text-sm italic text-white">{`"${stats.quote}"`}</p>)}
        {stats.instagram && (<div className="mt-2 text-white/80"><a 
        href={`https://www.instagram.com/${stats.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm hover:no-underline"
        ><FaInstagram size={20}/><span className="text-sm">{`@${stats.instagram}`}</span></a></div>)}
      </div>
    </div>
  );
}
