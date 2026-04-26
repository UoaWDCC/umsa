import { FaInstagram, FaGithub, FaLinkedin, FaFilm, FaSpotify } from "react-icons/fa";
import MemberStatsTable from "../../components/StatsTable";
import bgImage from "../../assets/about-us/alexBackground.jpeg"; 
import AlexImage from "../../assets/about-us/alex.jpeg";
import { useEffect } from "react";

export default function Alex(){
    useEffect(() => {
    document.title = "Alex(#1 Developer) | UMSA";
    }, []);

    return(
        <>
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center rounded-lg">
            {/* bg image */}
            <div style={{ backgroundImage: `url(${bgImage})` }} className="absolute inset-0 bg-cover bg-center opacity-50 rounded-lg"></div>

            {/* contents */}
            <div className ="relative h-full max-w-175 flex flex-col">
                {/* header */}
                <div className="flex flex-col items-center mt-8">
                    <h1 className="text-3xl font-sans font-bold mb-4">ALEXANDER THE GREAT</h1>
                </div>

                {/* main */}
                <div className="md:grid grid-cols-3 flex flex-col w-full gap-10 items-center justify-center">
                    {/* beautiful photo of me */}
                    <img src={AlexImage} className="col-span-1 object-cover w-full max-w-sm md:max-w-none h-full min-h-75 rounded-2xl shadow-lg shadow-xl/30"/>

                    {/* stats */}
                    <div className="col-span-2 w-full max-w-sm md:max-w-none flex flex-col bg-gray-900 p-6 rounded-lg shadow-lg shadow-xl/30">
                    
                        <MemberStatsTable 
                        stats={{
                            fullName: "Alex Lee",
                            age: 19,
                            ethnicity: "Korean🇰🇷🇰🇷🇰🇷",
                            year: "First year",
                            degree: "compsci & IT management(im gonna drop this for Finance conjoint)",
                            typingSpeed: "16 wpm",
                            favouritePaper: "A4",
                            favouriteFood: "3am maccas mish(Big Mac, 2 Cheeseburgers, medium fries, 6pcs chicken nugget with 2 sweet and sour sauce and medium Sprite zero)",
                    
                        }}
                        />       
                    </div>
                </div>

                {/* about me */}
                <div className="w-full mb-32"> 
                    <p className="text-sm mt-4 leading-relaxed">
                        about me:<br/>
                    </p>
                    <a href="https://www.instagram.com/p/DXXXjSwxI9m" target="_blank" rel="noopener noreferrer"><u>https://www.instagram.com/p/DXXXjSwxI9m</u></a>
                </div>

                {/* social media section */}
                <div className="w-full flex flex-col items-center pt-20 mb-2">
                    <h1 className="text-3xl mb-1 font-bold italic text-left">✨Socials✨</h1>
                    <div className="flex grid-cols-4 gap-4 mt-1">
                                
                        {/* the <a></a> tags are for creating links */}
                        <a href="https://github.com/AiexProjects" target="_blank" rel="noopener noreferrer">
                            <FaGithub className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://www.linkedin.com/in/alex-lee-571736358/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://www.instagram.com/aiex.lee/" target="_blank" rel="noopener noreferrer">
                               <FaInstagram className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://letterboxd.com/alexree121/" target="_blank" rel="noopener noreferrer">
                            <FaFilm className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                        <a href="https://open.spotify.com/user/cq4c5m8ihueunpkfykn1l3s2f" target="_blank" rel="noopener noreferrer">
                            <FaSpotify className="text-3xl text-grey-300 hover:text-white" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </>


    )
}
