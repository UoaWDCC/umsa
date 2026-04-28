import { useEffect } from "react"; 
import'./about.css';

export default function About(){
    useEffect(() => { document.title = "About | UMSA";},
    []);

    return(
<div className="about">
    <div className=" header">
        <h1> UMSA </h1>
        <p> Welcome to umsa about us page </p>
    </div>


    <div className = "main" style={{ color: "white"}}> 

        <div className = "box" id="history" >
            <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}> History </h2> 
            <p> bla bla bla bla </p>
        </div>

        <div className = "box" id="vision"> 
            <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}>Vision</h2>
            <p> bla bla bla bla bla bla bla </p>
             </div>

        <div className = "box" id= "purpose"> 
            <h2 style= {{ fontSize: "1.5rem" , position: "relative" , top: "-10px" }}>Purpose</h2>
            <p> bla bla bla bla  </p>
             </div>
        
    </div>
    <div className="link">
        <h2> Meet the team: </h2>
         </div>
</div>

    )
}
 



