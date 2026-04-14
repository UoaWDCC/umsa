import { useEffect } from "react";
import JackyPhoto from "../../assets/about-us/jacky.jpg"
import MemberStatsTable from "../../components/StatsTable";
import { FaInstagram, FaGithub, FaLinkedin} from "react-icons/fa";

export default function Jacky(){

  useEffect(() => {
    document.title = "Jacky | UMSA";
  }, []);

  return(
    <>
      <div className="bg-green-500 p-20 w-full flex item-center justify-center rounded-lg ">
      
      <div className="h-full max-w-[700px] flex flex-col">
    
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold italic mb-5 animate-pulse">🛸🛸🛸</h1>
      </div>

      <div className="md:grid grid-cols-3 gap-10 item-center justify-center">
        <img
        src={JackyPhoto}
        className="col-span-1 object-cover md:mb-0 mb-5 h-full rounded-2xl animate-bounce transition-transform duration-300 hover:scale-220 cursor-pointer hover:animate-spin"/>

        <div className="col-span-2 max-w-md bg-green-700 p-6 rounded-lg">
          <MemberStatsTable
          stats={{
            fullName: "jacky chen",
            age: 17,
            ethnicity: "chinese",
            year: "first year",
            degree: "compsci & statistics",
            typingSpeed: "0 wpm",
            favouriteFood: "yummers",
            favouritePaper: "compsci130"
          }}
          />


        </div>
      </div>

      <div>
        <p className="text-sm mt-10 animate-ping duration-700">
          VORP👽
        </p>
      </div>

      <div>
        <div className="flex grid-cols-4 gap-4 mt-4">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-3xl text-green-300 hover:text-white animate-bounce [animation-delay:0.0s]" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaGithub className="text-3xl text-green-300 hover:text-white animate-bounce [animation-delay:0.1s]" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-3xl text-green-300 hover:text-white animate-bounce [animation-delay:0.2s]" />
          </a>
        </div>
      </div>
      </div>
      </div>
    </>
  )

}