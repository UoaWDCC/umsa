import { useEffect } from "react";
import EventsInfo from "../components/EventsElement"; 
import EventImage from "../assets/about-us/Copy of UMSA_Guitar.png"

{/* constant events array */}
const events = [
    {
        eventName: "Jalinan Raya 2",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DWPgAxmky6q/?img_index=1",
        eventDescription: "very cool and very descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-05-28"),
    },
    {
        eventName: "Bersatu Trials 1",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DV7o4eZmPHH/?img_index=1",
        eventDescription: "even cooler and even more descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-05-20"),
    },
    {
        eventName: "Clash of UMSA 3",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-06-21"),
    },
    {
        eventName: "Clash of UMSA 2",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: false,
        eventDate: new Date("2026-03-21"),
    },
    {
        eventName: "Clash of UMSA 1",
        eventImage: EventImage,
        eventLink: "https://www.instagram.com/p/DVrOmhNk_kI/",
        eventDescription: "even even cooler and way wayyyyy more descriptive description",
        eventIsDone: true,
        eventDate: new Date("2026-04-20"),
    },
];

{/* eventIsDone is overriden depending on if event.eventDate is before todays date */}
const today = new Date();
const processedEvents = events.map(
    (event) => ({
        ...event, eventIsDone: event.eventDate < today,
    })
)
.sort( //sorting the array based on how close the date is to origin(today)
    (a, b) => {
        if (a.eventIsDone == false && b.eventIsDone == false) {
            return a.eventDate.getTime() - b.eventDate.getTime();
        } 
        else {
            return b.eventDate.getTime() - a.eventDate.getTime();
        }
    }
);

{/* use .filter() to make new array depending on events.eventIsDone is true or false */}
const upcomingEvents = processedEvents.filter((event) => event.eventIsDone == false);
const pastEvents = processedEvents.filter((event) => event.eventIsDone == true);


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
            {/* grid only containing upcoming events, using the upcomingEvents array */}
            <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {upcomingEvents.map((upcomingEvent) => (
                    <EventsInfo key={upcomingEvent.eventName} element={upcomingEvent}/>
                ))}
            </div>
            <div className="flex flex-col w-4/5">
                <h1 className="text-3xl font-bold mt-12 mb-6">
                    Past Events
                </h1>
            </div>
            {/* grid only containing past events, using the pastEvents array */}
            <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pastEvents.map((pastEvent) => (
                    <EventsInfo key={pastEvent.eventName} element={pastEvent}/>
                ))}
            </div>
        </div>
        </>
    )
}