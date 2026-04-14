import { FaInstagram, FaGithub, FaLinkedin, FaFilm } from "react-icons/fa";
import MemberStatsTable from "../../components/StatsTable";
import bgImage from "../../assets/about-us/IMG_7577.jpeg"; 
import AlexImage from "../../assets/about-us/P1010200.jpeg";
import { useEffect } from "react";

export default function Alex(){
    useEffect(() => {
    document.title = "Alexander(#1 Developer) | UMSA";
    }, []);

    return(
        <>
        <div className="relative h-screen w-full flex items-center justify-center rounded-lg">
            {/* bg image */}
            <div style={{ backgroundImage: `url(${bgImage})` }} className="absolute p-20 h-screen w-full opacity-50 flex item-center justify-center rounded-lg bg-cover bg-center">
            
            </div>
            {/* contents */}
            <div className ="relative h-full max-w-[700px] flex flex-col">
                {/* header */}
                <div className="flex flex-col items-center mt-8">
                    <h1 className="text-3xl font-sans font-bold mb-4">ALEXANDER THE GREAT</h1>
                </div>

                {/* main */}
                <div className="md:grid grid-cols-3 flex flex-col gap-10 item-center justify-center">
                    {/* beautiful photo of me */}
                    <img src={AlexImage} className="col-span-1 object-cover md:mb-0 mb-5 h-full rounded-2xl shadow-lg shadow-xl/30"/>

                    {/* stats */}
                    <div className="col-span-2 max-w-md bg-gray-900 p-6 rounded-lg shadow-lg shadow-xl/30">
                    
                        <MemberStatsTable 
                        stats={{
                            fullName: "Alex Lee",
                            age: 19,
                            ethnicity: "Korean🇰🇷🇰🇷🇰🇷",
                            year: "First year",
                            degree: "compsci & IT mangaement",
                            typingSpeed: "106 wpm",
                            favouritePaper: "n/a",
                            favouriteFood: "Marlboro Gold + Guinness",
                    
                        }}
                        />       
                    </div>
                </div>

                {/* about me */}
                <div> 
                    <p className="text-sm mt-4">
                        insert really cool and interesting about me here.
                    </p>
                </div>

                {/* social media section */}
                <div className="absolute bottom-10 inset-x-0 flex flex-col items-center justify-center">
                    <h1 className="text-3xl mb-1 font-bold italic text-left">✨Socials✨</h1>
                    <div className="flex grid-cols-4 gap-4 mt-1">
                                
                        {/* the <a></a> tags are for creating links */}
                        <a href="https://www.instagram.com/aiex.lee/" target="_blank" rel="noopener noreferrer">
                               <FaInstagram className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://github.com/AiexProjects" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://www.linkedin.com/in/alex-lee-571736358/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://letterboxd.com/alexree121/" target="_blank" rel="noopener noreferrer">
                            <FaFilm className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>


    )
}
