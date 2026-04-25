{/* types for events variables */}
type EventsElement = {
    eventName: string;
    eventImage: string;
    eventLink: string;
    eventDescription: string;
    eventIsDone: boolean;
    eventDate: Date;
};

{/* properties */}
type Props = {
    element: EventsElement;
};

{/* eventsInfo function that define how each event element should look in the grid */}
export default function EventsInfo({ element }: Props) {
    return(
        <>
        {/* opens link when clicked, and change visual depending on the true or false argument of element.eventIsDone */}
        <a href={element.eventLink} target="_blank" rel="noopener noreferrer" 
        className={`flex flex-col h-full w-full cursor-pointer rounded-lg p-5 
        ${element.eventIsDone ? 'bg-gray-700 opacity-50' : 'bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-105'}`}
        >
            <h1 className="font-bold text-xl mb-2">
                {element.eventName}
            </h1>

            <img className="rounded-md object-cover"
                src={element.eventImage} alt={element.eventName}
            />
            <p className="text-sm mt-2 hyphens-auto">
                {element.eventDescription}
            </p>
        </a>
        </>
    )
}