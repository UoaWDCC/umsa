import { useEffect } from "react"; 
import flagphoto from "../assets/about-us/flag.png";
import statuephoto from "../assets/about-us/statue.jpg";

export default function About(){
  useEffect(() => { document.title = "About | gotUMSA"; }, []);

  return (
    <div className="mx-auto px-10 py-8" style={{ color: "white" }}>

      {/*header*/}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">UMSA</h1>
        <p className="opacity-60">Welcome to the UMSA about us page</p>
      </div>

      {/*history */}

        <div className="border border-white p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-bold mb-2">History</h2>
            <p className="opacity-80 text-sm leading-relaxed">
                Evidence of modern human habitation in Malaysia dates back 40,000 years.[41] In the Malay Peninsula, the first inhabitants are thought to be Negritos.[42][43] Areas of Malaysia participated in the Maritime Jade Road between 2000 BC to 1000 AD.[44][45][46][47] Traders and settlers from India and China arrived as early as the first century AD, establishing trading ports and coastal towns in the second and third centuries. Their presence resulted in strong Indian and Chinese influences on the local cultures, and the people of the Malay Peninsula adopted the religions of Hinduism and Buddhism. Sanskrit inscriptions appear as early as the fourth or fifth century.[48] The Kingdom of Langkasuka arose around the second century in the northern area of the Malay Peninsula, lasting until about the 15th century.[36] Between the 7th and 13th centuries, much of the southern Malay Peninsula was part of the maritime Srivijayan empire. By the 13th and the 14th century, the Majapahit empire had successfully wrested control over most of the peninsula and the Malay Archipelago from Srivijaya.[49] In the early 15th century, Parameswara, a runaway king of the former Kingdom of Singapura linked to the old Srivijayan court, founded the Malacca Sultanate.[50] The spread of Islam increased following Parameswaras conversion to that religion. Malacca was an important commercial centre during this time, attracting trade from around the region.[51]
            </p>
</div>
      <div className="flex gap-8 mb-12">

        {/*vison and purpose*/}
        <div className="flex-1 flex flex-col">
          <div className="h-70 overflow-hidden rounded-t-lg">
            <img src={statuephoto} className="w-full h-full object-cover" />
          </div>
          <div className="border border-white p-6 rounded-b-lg flex-1">
            <h2 className="text-2xl font-bold mb-2">Vision</h2>
            <p className="opacity-80 text-sm leading-relaxed"> 
                Malaysia is the 66th largest country by total land area, with a total area of 330,803 km2 (127,724 sq mi).[10] West Malaysia shares land borders with Thailand, while East Malaysia shares land borders with Indonesia and Brunei.[18] Singapore is separated from the West by the Straits of Johor and is linked to it by a narrow causeway and a bridge. The country also shares maritime boundaries with Indonesia, Vietnam[179] and the Philippines.[180] The land borders are defined in large part by geological features such as the Perlis River, the Golok River and the Pagalayan Canal, whilst some of the maritime boundaries are the subject of ongoing contention.[18] Brunei forms what is almost an enclave in Malaysia,[181] with the state of Sarawak dividing it into two parts. Malaysia is the only country with territory on both the Asian mainland and the Malay Archipelago.[182] The Strait of Malacca, lying between Sumatra and Peninsular Malaysia, is one of the most important thoroughfares in global commerce, carrying 40% of the worls trade.[183] The southernmost point of mainland Asia is located at Tanjung Piai, in the state of Johor.[184]
            </p>
          </div>
        </div>

        
        <div className="flex-1 flex flex-col">
          <div className="h-70 overflow-hidden rounded-t-lg">
            <img src={flagphoto} className="w-full h-full object-cover" />
          </div>
          <div className="border border-white p-6 rounded-b-lg flex-1">
            <h2 className="text-2xl font-bold mb-2">Purpose</h2>
            <p className="opacity-80 text-sm leading-relaxed">Malaysia[d] is a country in Southeast Asia. A federal constitutional monarchy, it consists of 13 states and three federal territories, separated by the South China Sea into two regions: Peninsular Malaysia on Mainland Southeast Asia and East Malaysia on the island of Borneo. Peninsular Malaysia shares land and maritime borders with Thailand, as well as maritime borders with Singapore, Vietnam, and Indonesia; East Malaysia shares land borders with Brunei and Indonesia, and maritime borders with the Philippines and Vietnam. Kuala Lumpur is the countrys national capital, largest city, and the seat of the legislative branch of the federal government, while Putrajaya is the federal administrative capital, representing the seat of both the executive branch and the judicial branch of the federal government. With a population of over 34 million, it is the worlds 42nd-most populous country.
The country has its origins in the Malay king </p>
          </div>
        </div>

      </div>

       {/*link*/}

      <div className="flex justify-center mb-8">
        <a href="https://github.com/UoaWDCC/umsa/tree/tadiwa/about-us-page/">
          <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Meet the Team
          </button>
        </a>
      </div>

    </div>
  );
}