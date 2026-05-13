import { useEffect } from "react"; 
import sunsetphoto from "../assets/about-us/sunset.jpg";
import parisphoto from "../assets/about-us/paris.jpg";
import stonephoto from "../assets/about-us/stones.jpg";

export default function About(){
    useEffect(() => { document.title = "About | gotUMSA";},
    []);

    return(
       
<div className="mx-auto " >
    <div className=" header mb-8">
        <h1> UMSA </h1>
        <p> Welcome to umsa about us page </p>
    </div>


    <div className = "flex flex-col gap-8" style={{ color: "white"}}> 

   


      <div className = " flex items-start justify-center w-full gap-10"> 
        <div className = "p-6 border border-white box-border w-1/2 h-80 overflow-auto" >
            <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}> History </h2> 
            <p> 	
Robert Pattinson (born 13 May 1986) is an English actor. He is known for starring in both major studio productions and independent films, in which he often portrays eccentric characters across a diverse range of genres. Pattinson made early screen appearances in supporting roles, including in Vanity Fair (2004) and as Cedric Diggory in Harry Potter and the Goblet of Fire (2005), before achieving global recognition as Edward Cullen in The Twilight Saga film series. He subsequently began working in independent films from auteur directors, including Cosmopolis (2012), The Lost City of Z (2016), Good Time (2017), High Life (2018) and The Lighthouse (2019). Pattinson then returned to big-budget mainstream cinema, starring in Tenet (2020), The Batman (2022) and Mickey 17 (2025). He is set to appear in the 2026 films The Odyssey and Dune: Part Three. This photograph of Pattinson was taken in 2025 at the 75th Berlin International Film Festival.</p>
        </div>
        <div className = " w-1/2 h-80 flexshrink-0  overflow-hidden rounded-lg">
            <img src= {sunsetphoto} className= "w-full h-full object-cover"/>
        </div>
      </div>
    

      <div className = " flex items-start justify-center w-full gap-10"> 
        <div className = " w-1/2 h-80 flex-shrink-0 overflow-hidden rounded-lg">
            <img src= {parisphoto} className="w-full h-full object-cover"/>
         </div>
        <div className = "p-6 border border-white box-border w-1/2 h-80 overflow-auto" >
           <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}>Vision</h2>
            <p> bla b dev la bla bla bla bla bla </p>
        </div>
         </div>

        <div className = " flex items-start justify-center w-full gap-10">
            <div className = "p-6 border border-white box-border w-1/2 h-80 overflow-auto"> 
                <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}>Purpose</h2>
                <p> bal bla bla blbalb balabaj </p>
            </div>
            <div  className = " w-1/2 h-80 flex-shrink-0  overflow-hidden rounded-lg"> 
                <img src= {stonephoto} className="w-full h-full object-cover"/> 
                
            </div>


        </div>

    


    </div>
    <div className="text-lg mt-8">
        <h2> Meet the team:  </h2>
        <a href = " https://github.com/UoaWDCC/umsa/tree/tadiwa/about-us-page/"> Press here </a>
         </div>
</div>

    )
}
 



