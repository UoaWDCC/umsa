import { FiHeart, FiMessageCircle, FiSend } from 'react-icons/fi';

type MemberInfo = {
  img: string;
  fullName: string;
  role: string;
  linkedin: string;
  instagram: string;
};

type Props = {
  stats: MemberInfo;
};

export default function MemberInfo({ stats }: Props) {
  return (
    <div className=" flex flex-col items-center rounded-[10px] bg-[#7B7BEA] p-3 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.2)] w-52 aspect-3/4">
      <div>
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
    </div>
  );
}
