//import pic, react icons, react components later
import { useEffect } from "react";
import PrunaPhoto from "../../assets/about-us/pruna.jpg";
import MemberStatsTable from "../../components/StatsTable";
import { FaInstagram, FaGithub, FaLinkedin} from "react-icons/fa";

export default function Pruna() {
    useEffect(() => {
    document.title = "Pruna Lee | UMSA";
    }, []);

    return (
        <>
        <div className="bg-[#BF94E4] p-20 w-full flex item-center justify-center rounded-lg">
        <div className="h-full max-w-[700px] flex flex-col">
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl text-[#486581] font-bold italic mb-5">hellooo! my name is pruna</h1>
        </div>

        <div className="grid grid-rows-2 gap-10 item-center justify-center">
            <img
            src={PrunaPhoto}
            className="row-span-1 object-cover rounded-2xl w-120 mx-auto"
            />

            <div className="row-span-1 bg-[#38302E] text-[#000000] p-10 mx-30 rounded-lg flex item-center justify-center">
                <MemberStatsTable
                stats={{
                    fullName: "pruna lee",
                    age: 19,
                    ethnicity: "korean",
                    year: "second year",
                    degree: "computer science",
                    typingSpeed: "50000 wpm (real)",
                    favouritePaper: "cs110",
                    favouriteFood: "bahn mi",
                }}
                />
            </div>
        </div>
        
        <div>
            <p className="text-base mt-10">
                hi guyss i&apos;m so so excited to be a developer for WDCC&apos;s umsa project :p 
                my fav hobbies are muay thai, music (drums, guitar, bass) and motorbikes (i ride to campus when its not raining :D)
                i&apos;m looking forward to working with all you guys!!!!
            </p>
        </div>

        <div>
            <h1 className="text-3xl my-10 font-bold italic text-center">here are my socials :D</h1>
            <div className="flex grid-cols-3 gap-4 mt-4 item-center justify-center">
                <a href="https://www.instagram.com/prunalee" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-3xl text-pink-300 hover:text-white" />
                </a>
                <a href="https://www.github.com/nryuzl" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-3xl text-pink-300 hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/prunalee" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-3xl text-pink-300 hover:text-white" />
                </a>
            </div>
        </div>

    </div>
    </div>
    </>
  );
}
