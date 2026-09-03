// import { useHomeContent } from "./hooks/useHomeContent";
// import type { HomeContentValues } from "./schemas/content";
import umsa_sit from "./assets/icons/umsa_sit.png";
import umsa_cool from "./assets/icons/umsa_cool.png";
import sun from "./assets/icons/sun.svg"
import redstar from "./assets/stars/fullredstar.png"
import whitestar from "./assets/stars/white_star.svg"
import pinkstar from "./assets/stars/pinkstar1111.svg"
import bluestar from "./assets/stars/bluestar1111.svg"
import redstar_right from "./assets/stars/redstar_right.svg"
import bluestar_left from "./assets/stars/bluestar_left.svg"
import pinkstar_right from "./assets/stars/pinkstar_right.svg"
import events_photo from "./assets/events_photo.jpg"
import humans from "./assets/humans.png"
import right_arrow from "./assets/right_arrow.svg"
import left_arrow from "./assets/left_arrow.svg"
import { NavLink } from "react-router-dom";

// exemplar CMS default data -> shown when data does not exist / API is down 
// const DEFAULTS: HomeContentValues = {
//   heading: "Welcome to Project UMSA!",
//   subtitle: "to get started, go to the project team section and have a look :)",
// };

function App() {
  // const { data } = useHomeContent();
  // const content = data ?? DEFAULTS;


  return (
    <div className="flex flex-col items-center overflow-x-hidden">
    
    {/* big welcome to umsa + text */}
    <div className="w-full">
      <p className="w-full gap-3 text-[5.82rem] text-accent1-primary">Welcome to <span className="text-red-300">UMSA</span></p>
      <p className="mr-2.5 mb-2.5 text-red-200 text-right">The Union of Malaysian</p>
      <p className="mr-2.5 text-red-200 text-right">Students in Auckalnd</p>
    </div>

    {/* umsa sitting cat thing */}
    <div>
      <img src={umsa_sit} className="mb-[3.5vw] -mt-[3vw] w-[clamp(20rem,10vw,10rem)]"/>
    </div>

    {/* star decorations */}
    <div className="relative w-full h-[clamp(4rem,10vw,40rem)]">
      <img src={redstar} className="absolute left-[0%] bottom-50 h-[clamp(9rem,22vw,17rem)] w-auto"/>
      <img src={pinkstar} className="absolute left-[6%] bottom-37 h-[clamp(4rem,10vw,10rem)] w-auto"/>
      <img src={bluestar} className="absolute right-[10%] bottom-37 h-[clamp(4rem,10vw,10rem)] w-auto"/>
      <img src={pinkstar} className="absolute right-[-4%] -top-full bottom-37 h-[clamp(6rem,30vw,20rem)] w-auto"/>
    </div>

    {/* text right above image */}
    <div className="w-full gap-2">
      <p className="text-red-150 text-left text-sm gap-2">Non-Profit Malaysian</p>
      <p className="text-red-150 text-left text-sm gap-2">Student-Run Club Affiliated With</p>
      <p className="text-red-150 text-left text-sm gap-2">The University of Auckland New Zealand</p>
    </div>
    
    {/* human group photo */}
    <div className="w-full items-center mt-10">
      <img src={humans} className="w-full"/>
    </div>

    {/* read more section */}
    <div className="flex flex-col w-full min-h-100 bg-blue-50">
      <div className="flex flex-row w-full">
        <p className="text-left text-[5.82rem]">What is UMSA?</p>
        <img src={redstar_right}/>
        <img src={bluestar_left}/>
        <img src={pinkstar_right}/>
      </div>
      <p className="text-right text-2xl">Lorem ipsum dolor sit amet, 
      consectetur adipiscing elit. Vivamus fermentum, sapien</p>
      <img src={umsa_cool} className="w-[40vh] self-center"/>

      {/* im sorry this is so long 😭 */}
      <NavLink to="/About" className="flex items-center gap-2w-fit self-center -mt-24
       bg-accent2-primary rounded-3xl px-6 py-4 text-white whitespace-nowrap">
      <img src={sun} className="max-w-[3vh] mr-1.5"/>Read More</NavLink>
     

      <div className="flex flex-row ml-10">
        <img src={whitestar} className="max-h-20 mb-10"/>
        <img src={whitestar} className="max-h-20 mb-10"/>
        <img src={whitestar} className="max-h-20 mb-10"/>
      </div>
    </div>

    {/* our events section */}
    <div className="flex flex-col w-full gap-7 mb-3">
      <div className="flex flex-wrap items-center gap-2 w-full">
        <img src={redstar_right} className="max-h-17"/>
        <img src={bluestar_left} className="max-h-22"/>
        <img src={pinkstar_right} className="max-h-22"/>
        <p className="text-right text-[clamp(2.25rem,7vw,5.82rem)] text-accent2-primary">Our Events</p>
      </div>

      {/* NOTE: this aspect is just for showcase, it fits the iphone 3/4 aspect ratio but 
      if its a photo taken on something else then it will break e.g. massive gaps between each photo
                 i think */}
      <div className="flex flex-row justify-center items-center gap-20">
        <img src={left_arrow}/>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-324">
          <img src={events_photo} className="w-full aspect-[3/4] object-contain rounded-md"/>
          <img src={events_photo} className="w-full aspect-[3/4] object-contain rounded-md"/>
          <img src={events_photo} className="w-full aspect-[3/4] object-contain rounded-md"/>
        </div>
        <img src={right_arrow}/>
      </div>
    </div>

    {/* home page content -- removed it for now for miltestone 2 showcase */}
    {/* <div className="min-h-150">
      <h1 className="text-4xl mt-7 font-bold text-blue-500">{content.heading}</h1>
      <div className="text-sm mt-3 text-blue-400">
        <p>{content.subtitle}</p>
      </div>
    </div> */}

    </div>
  );
}
export default App;
