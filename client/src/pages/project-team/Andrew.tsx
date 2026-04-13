// at the top, we import all the libraries & components (parts) that we&apos;re going to use in the page 
import { FaInstagram, FaGithub, FaLinkedin, FaFilm} from "react-icons/fa";
import MemberStatsTable from "../../components/StatsTable"; 
import AlannaPhoto from "../../assets/about-us/alanna.jpg"; 
import { useEffect } from "react";

// now to create the page! we export it as a function so we can use it in the router (main.tsx)
export default function Andrew(){

    // this is a react hook that lets us perform side effects - in this case, changing the title (the name you see in the browser tab) 
    useEffect(() => {
    document.title = "Andrew | UMSA";
    }, []);

    // here's where we return the jsx content - this is what lets us write HTML in our javascript!
    return(
        <>
        {/* this is the pink background container */}
        <div className="bg-pink-600 p-20 w-full flex item-center justify-center rounded-lg"> 
        
        {/* this manages our page content */}
        <div className ="h-full max-w-[700px] flex flex-col">
        
        {/* header section */}
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold italic mb-5">hi, my name is andrew :D</h1>
        </div>

        {/* stats section */}
        <div className="grid grid-cols-3 gap-10 item-center justify-center"> 
            {/* we use an img component to display my photo! */}
            <img 
            src={AlannaPhoto} 
            className="col-span-1 object-cover h-full rounded-2xl"
            /> 

            {/* here's where components come in - we use a pre built stats component, 
                and just fill in the props (stats). check /components/StatsTable.tsx to see how it works! */}
            <div className="col-span-2 max-w-md bg-pink-900 p-6 rounded-lg">

                <MemberStatsTable 
                stats={{
                    fullName: "alanna santoso",
                    age: 20,
                    ethnicity: "indonesian-chinese",
                    year: "third year",
                    degree: "compsci, finance & business analytics",
                    typingSpeed: "150 wpm",
                    favouritePaper: "compsci225",
                    favouriteFood: "french fries",

                }}
                />
        
            </div>
        </div>

        {/* about paragraph section */}
        <div> 
            <p className="text-sm mt-10">
                hey everyone :) i&apos;m super excited to be umsa&apos;s tech lead for 2026! <br/> a couple fun facts
                about me: i&apos;m a huge fan of sitcoms (how i met your mother!), movies, 
                photography & murder mysteries. i love compsci because it lets me get creative, see how things work
                and meet super cool people :)) i&apos;m always down for a coffee/milk-tea/matcha 
                run,, and love to yap about everything from world history
                to your latest travels & hobby findings.
            </p>
        </div>

        {/* social media section */}
        <div>
            <h1 className="text-3xl mt-10 mb-5 font-bold italic text-left">find me online!~</h1>
            <div className="flex grid-cols-4 gap-4 mt-4">
                
                {/* the <a></a> tags are for creating links */}
                <a href="https://www.instagram.com/alanna_ds" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-3xl text-pink-300 hover:text-white" />
                </a>
                <a href="https://www.github.com/alannasantoso" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-3xl text-pink-300 hover:text-white" />
                </a>
                <a href="https://www.linkedin.com/in/alannasantoso" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-3xl text-pink-300 hover:text-white" />
                </a>
                <a href="https://letterboxd.com/alannadee" target="_blank" rel="noopener noreferrer">
                    <FaFilm className="text-3xl text-pink-300 hover:text-white" />
                </a>
            </div>

        </div>



        </div>
        </div>
        </>
)}