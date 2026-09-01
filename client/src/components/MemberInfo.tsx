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
    <div className="flex flex-col items-center rounded-[10px] bg-[#7B7BEA] p-3 shadow-md w-[254px] h-[317px]">
      <div>
        <img className="w-[200px] h-[181px] rounded-[10px] object-cover" src={stats.img} />
      
        <div className="mt-1 text-left w-full">
          <div className="flex items-center space-x-1 text-white text-xl mb-1">
            <FiHeart></FiHeart>
            <FiMessageCircle></FiMessageCircle>
            <FiSend></FiSend>
          </div>
          <p className="text-lg font-bold">{stats.role}</p>
          <p>{stats.fullName}</p>
        </div>
      </div>
    </div>
  );
}
