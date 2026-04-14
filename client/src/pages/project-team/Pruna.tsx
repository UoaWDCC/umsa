//import pic, react icons, react components later
import { useEffect } from "react";
import PrunaPhoto from "../../assets/about-us/pruna.jpg";
import MemberStatsTable from "../../components/StatsTable";

export default function Pruna() {
  useEffect(() => {
    document.title = "Pruna Lee | UMSA";
  }, []);

  return (
    <>
      <div className="bg-[#BF94E4] p-20 w-full flex item-center justify-center rounded-lg">
        <div className="h-full max-w-[700px] flex flex-col">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl text-[#486581] font-bold italic mb-5">
              hellooo! my name is pruna
            </h1>
          </div>

          <div className="grid grid-rows-3 gap-10 item-center justify-center">
            <img
              src={PrunaPhoto}
              className="row-span-1 object-cover h-full rounded-2xl"
            />
            <div className="row-span-2 max-w-md bg-[#D8BCAB] text-[#000000] p-10 rounded-lg">
              <MemberStatsTable
                stats={{
                  fullName: "prunalee",
                  age: 19,
                  ethnicity: "korean",
                  year: "second year",
                  degree: "computer science",
                  typingSpeed: "50000 wpm (real)",
                  favouritePaper: "cs110",
                  favouriteFood: "bahn mi",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
