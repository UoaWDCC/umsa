import MinahilPhoto from "../../assets/about-us/minahil.jpg"; 
import MemberStatsTable from "../../components/StatsTable"; 

export default function Minahil() {
    return (
        <>  
        <div className="bg-[#8C7AA9] w-full p-20 item-center justify-center rounded-lg">
            <h1 className="text-4xl font-bold text-white">HI! My name is Minahil ⸜(｡˃ ᵕ ˂ )⸝♡ </h1>

            <p>hi!</p>
            
            <img 
            src={MinahilPhoto} 
            className="col-span-1 object-cover md:mb-1 mb-2 h-full rounded-2xl"
            /> 
        </div>
        <div className="col-span-2 max-w-md bg-pink-900 p-6 item-center justify-center rounded-lg">
        
                        <MemberStatsTable 
                        stats={{
                            fullName: "Minahil Saqib",
                            age: 20,
                            ethnicity: "Pakistani",
                            year: "Second year",
                            degree: "compsci and biotech",
                            typingSpeed: "150 wpm",
                            favouritePaper: "biosci 106",
                            favouriteFood: "Pasta",
        
                        }}
                        />
        
                    </div>
        </>
        
        

    )}