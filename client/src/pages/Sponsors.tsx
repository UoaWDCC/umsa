
import { useEffect } from "react";
import SponsorInfoBox from "../components/SponsorBox"

{/*add sponsor info and make new sponsor boxes here*/}
const sponsors = [
    {
    sponsorName: "Jay Park (real)",
    sponsorLink: "https://JayPark.com",
    sponsorLogo: "",
    discount: 10,
    },
    {
    sponsorName: "Sponsor Two",
    sponsorLink: "https://example.com",
    sponsorLogo: "",
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
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                {sponsors.map((s) => (
                    <SponsorInfoBox key={s.sponsorName} sponsor={s} />
                ))}
            </div>
        </div>
        );
}