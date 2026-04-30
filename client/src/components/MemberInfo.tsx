import { FaInstagram, FaLinkedin} from "react-icons/fa";

type MemberInfo = {
  img: string;
  fullName: string;
  role: string;
  linkedin: string; 
  instagram: string;
};

type Props = {
    stats: MemberInfo;
}

export default function MemberInfo({ stats }: Props) {


return (
    <div className="flex flex-col items-center gap-4">
        <img className="w-64 h-64 rounded-4xl " src={stats.img}/>
        <p>{stats.fullName}</p>
        <p className="text-lg font-bold">{stats.role}</p>
        <div className="flex">
        <a href={stats.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-black-300 hover:text-white" />
        </a>
        <a href={stats.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl text-black-500 hover:text-white" />
        </a>
        </div>
    </div>
)}