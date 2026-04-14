
import instapic from "../../assets/icons/ibsta.webp";
import MemberStatsTable from "../../components/StatsTable"; 
import linkedinpic from "../../assets/icons/linkedin.png";
import github from "../../assets/icons/github.svg";
import me from "../../assets/icons/pic.jpg";
import pinkme from "../../assets/icons/pinkhair.png";



export default function Tadiwa(){
    return(
        <>
<div className="bg-pink-200 italic text-black">  
    <h1> TADIWA&apos;S ABOUT ME PAGE </h1>

    <p> HI </p>
    <p> My name is tadiwa. I like cats,music,gym and FOOODDDDDD.My favourite food is shibbys and sushi and mini eggs and fries and greek salad
    I work at countdown (woolies) and I used to work at burgerfuel as a shift manager </p>
<div className="text-black">
        <MemberStatsTable 
                        stats={{
                            fullName: "Tadiwa Mudapakati",
                            age: 19,
                            ethnicity: "Zimbabwean",
                            year: "First year",
                            degree: "Compsci, commerce (lol i have decided choen my major yet)",
                            typingSpeed: "Really slow",
                            favouritePaper: "Compsci101",
                            favouriteFood: "Sushi (anything w salmon)",
        
                        }}
                        />
                

    </div>

 <div className="flex grid-cols-4 gap-4 mt-4" > 
      <img 
src={me} 
            className="col-span-1 object-cover md:mb-0 mb-5 h-full rounded-2xl w-32 h-32 object-cover"
            />  
            <p> This is me </p>
        <img 
            src={pinkme}
            className="col-span-1 object-cover md:mb-0 mb-5 h-full rounded-2xl w-32 h - 32 object-cover"
            />           
     <p> This is me with pink hair </p>
</div>  
                   
                    please add my linkedin #verylongroadto500
            
                     {/* social media section */}
                        <div>
                            <h1 className="text-3xl mt-10 mb-5 font-bold italic text-left">if u wanna stalk me</h1>
                            <div className="flex grid-cols-4 gap-4 mt-4">
                                
                                {/* the <a></a> tags are for creating links */}
                                <a href="https://www.instagram.com/tadiwaxm" target="_blank" rel="noopener noreferrer">
                                    <img 
            src={instapic} 
            className="col-span-1 object-cover md:mb-0 mb-5 h-full rounded-2xl"
            /> 
                
                                </a>
                                <a href="https://github.com/tadiwa444" target="_blank" rel="noopener noreferrer">
                                <img
                                src={github}
                                />
                                    
                                </a>
                               
                                 <a href="https://www.linkedin.com/in/tadiwa-mudapakati-343ab3272/" target="_blank" rel="noopener noreferrer">
                                <img
                                src={linkedinpic}
                                />
                                </a>
                            </div>
                
                        </div>
  
</div>




        </>
    )

}