
import instapic from "../../assets/icons/ibsta.webp";
import MemberStatsTable from "../../components/StatsTable"; 
import linkedinpic from "../../assets/icons/linkedin.png";
import github from "../../assets/icons/github.svg";
import me from "../../assets/icons/pic.jpg";
import pinkme from "../../assets/icons/pinkhair.png";



export default function Tadiwa(){
    return(
        <>
    <h1 style={{ fontFamily: "Fredoka One"}} >
           TADIWA&apos;S ABOUT ME PAGE 
    </h1>

<div className="bg-pink-300 italic text-black">  
   
    <p> Hello </p>
    <p> My name is Tadiwa. 
        <ul> 
            <li>I like Cats </li>
            <li> Music </li>
            <li> Gym </li>
            <li> Food </li>
            <li> My fave foods is shibby, sushi, minieggs, fries and greeksalad</li>
            </ul>
    I work at countdown (woolies) and I used to work at burgerfuel as a shift manager </p>
<div className="bg-pink-400 p-6 rounded-lg">
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

 <div className="flex justify-center gap-8 mt-4" > 

    <div className="flex flex-col items-center">
      <img 
src={me} 
            className="object-cover rounded-2xl w-32 h-32"
            />  
            <p> This is me </p>
        </div>
 <div className="flex flex-col items-center">
      <img 
src={pinkme} 
            className="object-cover rounded-2xl w-32 h-32"
            />  
            <p> This is me with pink hair </p>
        </div>
    
</div>  
                   
                    please add my linkedin #verylongroadto500
            
                     
                        <div>
                            <h1 className="text-3xl mt-10 mb-5 font-bold italic text-left">if u wanna stalk me..click on the icon </h1>
                            <div className="flex grid-cols-4 gap-4 mt-4">
                                
                                
                                <a href="https://www.instagram.com/tadiwaxm" target="_blank" rel="noopener noreferrer">
                                    <img 
            src={instapic} 
            className="col-span-1 object-cover md:mb-0 mb-5 h-full rounded-2xl"
            className="w-40 h-60 object-cover"
            /> 
                
                                </a>
                                <a href="https://github.com/tadiwa444" target="_blank" rel="noopener noreferrer">
                                <img
                                src={github}
                                className="w-40 h-55 object-cover"
                                />
                                    
                                </a>
                               
                                 <a href="https://www.linkedin.com/in/tadiwa-mudapakati-343ab3272/" target="_blank" rel="noopener noreferrer h-40 w-40">
                                <img
                                src={linkedinpic}
                                className="w-40 h-35 object-cover"
                                />
                                </a>
                            </div>
                
                        </div>
  
</div>




        </>
    )

}