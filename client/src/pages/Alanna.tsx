import MemberStatsTable from "../components/StatsTable"; // this imports a component that we want to use later! 

export default function Alanna(){ // this exports the component as a function so we can use it around the app
    return(
        <>
        {/* this is the header section */}
        <div>
            <h1 className="text-3xl font-bold mb-8">hi, i am alanna!</h1>
        </div>

        {/* this is a quick facts section, using a table component */}
        <div className="flex item-center justify-center"> {/* how to center a div! */}
        <div className="mb-8 max-w-md bg-gray-800 p-6 rounded-lg shadow">
            <MemberStatsTable 
            stats={{
                fullName: "Alanna Santoso",
                age: 20,
                ethnicity: "indonesian-chinese",
                year: "2",
                degree: "compsci, finance & business analytics",
                wpm: 150,
                favouritePaper: "CS225",
                favouriteFood: "french fries",
            }}
            />

        </div>
        </div>



        <div> 
            <p className="text-lg mb-4">
                hi, my name is alanna!
            </p>
        </div>
        </>
)}