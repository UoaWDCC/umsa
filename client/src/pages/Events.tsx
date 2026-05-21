import { useEffect, useState } from "react";
import EventsInfo from "../components/EventsElement"; 
import EventImage from "../assets/about-us/Copy of UMSA_Guitar.png";

{/* constant events array */}
const events = [
    {
        eventName: "Jalinan Raya",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DWPgAxmky6q/?img_index=1",
        eventDescription: "very cool and very descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-05-20"),
        eventTag: "Social",
    },
    {
        eventName: "Bersatu Trials",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DV7o4eZmPHH/?img_index=1",
        eventDescription: "even cooler and even more descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-05-28"),
        eventTag: "Social",
    },
    {
        eventName: "Clash of UMSA",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-06-21"),
        eventTag: "Competition",
    },
    {
        eventName: "Clash of UMSA",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-03-21"),
        eventTag: "Social",
    },
    {
        eventName: "Clash of UMSA",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: true,
        eventDate: new Date("2026-04-20"),
        eventTag: "Competition",
    },
];

{/* eventIsDone is overriden depending on if event.eventDate is before todays date */}
const today = new Date();
const processedEvents = events.map((event) => ({
    ...event, eventIsDone: event.eventDate < today,
}))
.sort((a, b) => { //sorting the array based on how close the date is to origin(today)
    if (a.eventIsDone == false && b.eventIsDone == false) {
        return a.eventDate.getTime() - b.eventDate.getTime();
    } 
    else {
        return b.eventDate.getTime() - a.eventDate.getTime();
    }
});

{/* use .filter() to make new array depending on events.eventIsDone is true or false */}
const upcomingEvents = processedEvents.filter((event) => event.eventIsDone == false);
const pastEvents = processedEvents.filter((event) => event.eventIsDone == true);

export default function Events() {

    useEffect(() => {
        document.title = "Events | UMSA";
        }, []);

    {/* state variable and setter function using useState with default value All, to rerender the activeTag based on onClick event from button */}
    const [activeTag, setActiveTag] = useState("All");
    {/* when initial or new activeTag, EventsArrays are filtered for activeTag */}
    const filteredUpcomingEvents = 
        activeTag == "All" ? upcomingEvents : upcomingEvents.filter((event) => event.eventTag == activeTag);

    const filteredPastEvents = 
        activeTag == "All" ? pastEvents : pastEvents.filter((event) => event.eventTag == activeTag);

    return(
        <>
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col w-4/5" id="upcoming-events-section">
                <h1 className="text-3xl font-bold my-6">
                    Upcoming Events
                </h1>
            </div>
            <div className="flex flex-wrap-reverse justify-end w-4/5 mb-3 gap-4">
                <button onClick={() => setActiveTag("All")} //onClick calls setActiveTag function, useState updates - react rerenders - activeTag returns new value
                    className={
                        `w-fit text-sm text-gray-400 hover:text-white cursor-pointer 
                        ${activeTag == "All" ? "text-white font-bold" : ""}`
                    }>
                    all
                </button>
                <button onClick={() => setActiveTag("Social")} 
                    className={
                        `w-fit text-sm text-gray-400 hover:text-white cursor-pointer 
                        ${activeTag == "Social" ? "text-white font-bold" : ""}`
                    }>
                    social
                </button>
                <button onClick={() => setActiveTag("Competition")} 
                    className={
                        `w-fit text-sm text-gray-400 hover:text-white cursor-pointer 
                        ${activeTag == "Competition" ? "text-white font-bold" : ""}`
                    }>
                    competition
                </button>

            </div>
            {/* grid only containing upcoming events, using the upcomingEvents array */}
            <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUpcomingEvents.map((upcomingEvent) => (
                    <EventsInfo key={upcomingEvent.eventName} element={upcomingEvent}/>
                ))}
            </div>

            <div className="my-8"></div>

            <div className="flex flex-col w-4/5"  id="past-events-section">
                <h1 className="text-3xl font-bold my-6">
                    Past Events
                </h1>
            </div>
            {/* grid only containing past events, using the pastEvents array */}
            <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPastEvents.map((pastEvent) => (
                    <EventsInfo key={pastEvent.eventName} element={pastEvent}/>
                ))}
            </div>
        </div>
        </>
    )
}