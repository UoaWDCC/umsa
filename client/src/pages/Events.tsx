import { useEffect } from "react";
import EventsInfo from "../components/EventsElement"; 
import EventImage from "../assets/about-us/Copy of UMSA_Guitar.png"

export default function Events() {

    useEffect(() => {
        document.title = "Events | UMSA";
        }, []);

    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-full">
                <h1 className="text-3xl font-bold mb-4">
                    Events
                </h1>
            </div>
            <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <EventsInfo
                    element={{
                        eventName: "Jalinan Raya",
                        eventImage: EventImage,
                        eventLink: "https://www.instagram.com/p/DWPgAxmky6q/?img_index=1",
                        eventDescription: "very cool and very descriptive description",
                        eventIsDone: false,

                    }}
                />
                <EventsInfo
                    element={{
                        eventName: "Bersatu Trials",
                        eventImage: EventImage,
                        eventLink: "https://www.instagram.com/p/DV7o4eZmPHH/?img_index=1",
                        eventDescription: "even cooler and even more descriptive description",
                        eventIsDone: false,

                    }}
                />
                <EventsInfo
                    element={{
                        eventName: "Clash of UMSA",
                        eventImage: EventImage,
                        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
                        eventDescription: "even even cooler and way wayyyyy more descriptive description",
                        eventIsDone: true,

                    }}
                />
            </div>
        </div>
    )
}