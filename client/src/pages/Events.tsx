import { useEffect } from "react";
import EventsInfo from "../components/EventsElement"; 
import EventImage from "../assets/about-us/Copy of UMSA_Guitar.png"

{/* constant events array */}
const events = [
    {
        eventName: "Jalinan Raya",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DWPgAxmky6q/?img_index=1",
        eventDescription: "very cool and very descriptive description",
        eventIsDone: false,
    },
    {
        eventName: "Bersatu Trials",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DV7o4eZmPHH/?img_index=1",
        eventDescription: "even cooler and even more descriptive description",
        eventIsDone: false,
    },
    {
        eventName: "Clash of UMSA",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: false,
    },
    {
        eventName: "Clash of UMSA",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 supercalifragilisticexpialidocious Hippopotomonstrosesquippedaliophobia Pneumonoultramicroscopicsilicovolcanoconiosis",
        eventIsDone: true,
    },
];

{/* use .map() to make new array depending on events.eventIsDone is true or false */}
const upcomingEvents = events.filter((events) => events.eventIsDone == false);
const pastEvents = events.filter((events) => events.eventIsDone == true);


export default function Events() {

    useEffect(() => {
        document.title = "Events | UMSA";
        }, []);

    return(
        <>
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-4/5">
                <h1 className="text-3xl font-bold mb-6">
                    Upcoming Events
                </h1>
            </div>
            {/* grid only containing upcoming events, using the upcomingEvents grid */}
            <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((upcomingEvent) => (
                    <EventsInfo key={upcomingEvent.eventName} element={upcomingEvent}/>
                ))}
            </div>
            <div className="flex flex-col w-4/5">
                <h1 className="text-3xl font-bold mt-12 mb-6">
                    Past Events
                </h1>
            </div>
            {/* grid only containing past events, using the pastEvents grid */}
            <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.map((pastEvent) => (
                    <EventsInfo key={pastEvent.eventName} element={pastEvent}/>
                ))}
            </div>
        </div>
        </>
    )
}