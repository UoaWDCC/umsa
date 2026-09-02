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
        <div className="text-left w-full">
          <div className="mb-2 mt-3 flex items-center space-x-1 text-white text-xl">
            <FiHeart></FiHeart>
            <FiMessageCircle></FiMessageCircle>
            <FiSend></FiSend>
          </div>
          <p className="mb-0 text-lg font-bold leading-none">{stats.role}</p>
          <p className="m-0 leading-none">{stats.fullName}</p>
        </div>
      </div>
    </div>
  );
}
