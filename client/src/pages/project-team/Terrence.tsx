// at the top, we import all the libraries & components (parts) that we&apos;re going to use in the page 
import { FaInstagram, FaGithub, FaLinkedin} from "react-icons/fa";
import MemberStatsTable from "../../components/StatsTable"; 
import TerrencePhoto from "../../assets/about-us/terrence.jpg"; 
import { useEffect } from "react";

export default function Terrence() {

    // this is a react hook that lets us perform side effects - in this case, changing the title (the name you see in the browser tab)
    useEffect(() => {
        document.title = "Terrence | UMSA";
    }, []);

    // heres where we return the jsx content - its what lets us write html in js
    return(
        <>
        {/* this is the background container */}
        <div className="bg-gray-800 p-20 w-full flex item-center justify-center rounded-lg">

        {/* this manages our page content */}
        <div className="h-full max-w-[700px] flex flex-col">

        {/* header section */}
        <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold italic mb-5">Terrence :o</h1>
        </div>

        {/* stats section */}
        <div className="md:grid gap-10 item-center justify-center">
            {/* we use an img component to display my photo */}
            <img src={TerrencePhoto} className="col-span-2 object-cover md:mb-0 mb-5 w-full rounded-2xl"
            />
            {/* heres where components come in - we use a pre built stats component,
                and just fill in the props (stats). check /components/StatsTable.tsx to see how it works */}
            <div className="col-span-2 w-156 bg-gray-900 p-6 rounded-lg item-center justify-center">
                <MemberStatsTable
                stats={{
                    fullName: "Terrence Wu",
                    age: 17,
                    ethnicity: "Chinese",
                    year: "First year",
                    degree: "Computer Science",
                    typingSpeed: "135wpm",
                    favouritePaper: "CompSci120",
                    favouriteFood: "Fried chicken and Burgers",
                }}
                />

            </div>
        </div>

        {/* abut paragraph section */}
        
        <div className="md: grid gap-10 item-center justify-center">
            <p className="md:text-sm mt-10 bg-gray-900 p-4 rounded-lg">
                Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section 
                Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section 
                Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section 
                Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section 
                Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section Temporary about me section 
            </p>
        </div>

        {/* social media section */}
        <div>
            <h1 className="text-3xl mt-10 mb-5 font-bold text-left">Social Links:</h1>
            {/* <h1 className="text-l mt-10 mb-5 font-bold italic text-left">add me on Linkedin pls</h1> */}
            <div className="flex grid-cols-4 gap-4 mt-4">

                {/* the <a></a> tags are for creating links */}
                <a href="https://www.instagram.com/_tw1738" target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-4xl text-gray-300 transform duration-350 ease-in-out hover:text-white" />
                </a>

                <a href="https://github.com/Twu1738" target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-4xl text-gray-300 transform duration-350 ease-in-out hover:text-white" />
                </a>

                <a href="https://www.linkedin.com/in/terrence-wu-5657a0376/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-4xl text-gray-300 transform duration-350 ease-in-out hover:text-white" />
                </a>

            </div>

        </div>

        </div>
        </div>
        </>
    )
}