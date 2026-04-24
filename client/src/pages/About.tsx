import { useEffect } from "react"; 
import'./about.css';

export default function About(){
    useEffect(() => { document.title = "About | UMSA";},
    []);

    return(
<div>
    <div className=" header">
        <header style={{ fontSize: "2rem" , marginBottom: "3rem"}} >
            UMSA
        </header>
    </div>
    <div className = " biggest flex container " style={{ color: "black"}}> 
        <div className = "box" id="history" >
            <p> history</p> 
            <p> The history of umsa is as follows:</p>
        </div>

        <div className = "box" id="vision">  Vision </div>
        <div className = "box" id= "purpose"> Purpose </div>
    </div>
</div>

    )
}




