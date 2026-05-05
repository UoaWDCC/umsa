import { useEffect } from "react"; 


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
        
        <div className = "p-6 border border-white box-border w-full min-h-[200px]" >
            <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}> History </h2> 
            <p> bla bla bla bla </p>
        </div>

        <div className = "p-6 border border-white box-border w-full min-h-[200px]" >
 
           <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}>Vision</h2>
            <p> bla b dev la bla bla bla bla bla </p>
             </div>

        <div className = "p-6 border border-white box-border w-full min-h-[200px]"> 
            <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}>Purpose</h2>
            <p> bla bla bla bla  </p>
             </div>
         

    </div>
    <div className="text-lg mt-8">
        <h2> Meet the team:  </h2>
        <a href = " https://github.com/UoaWDCC/umsa/tree/tadiwa/about-us-page/"> Press here </a>
         </div>
</div>

    )
}
 



