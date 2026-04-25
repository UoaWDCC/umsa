
import { useEffect } from "react";
import SponsorInfoBox from "../components/SponsorBox"
import jayPark from "../assets/sponsors/jay-park.jpg";
import dprIan from "../assets/sponsors/dpr-ian.jpg";
import karina from "../assets/sponsors/karina.jpg";

{/*add sponsor info and make new sponsor boxes here*/}
const sponsors = [
    {
    sponsorName: "Jay Park (real)",
    sponsorLink: "https://JayPark.com",
    sponsorLogo: jayPark,
    discount: 10,
    },
    {
    sponsorName: "Christian Yu (real)",
    sponsorLink: "https://www.instagram.com/dprian/",
    sponsorLogo: dprIan,
    discount: 20,
    },
    {
    sponsorName: "Karina (real)",
    sponsorLink: "https://www.instagram.com/dprian/",
    sponsorLogo: karina,
    discount: 20,
    },
];

export default function Sponsors() {
    useEffect(() => {
        document.title = "Sponsors | UMSA";
        }, []);
    
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <h1 className="text-4xl font-bold">Our Sponsors</h1>
            <p className="mt-4 text-gray-400">
                UMSA Sponsors Page
            </p>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 w-full justify-items-center">
                {sponsors.map((s) => (
                    <SponsorInfoBox key={s.sponsorName} sponsor={s} />
                ))}
            </div>
        </div>
        );
}