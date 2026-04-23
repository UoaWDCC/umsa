type EventsElement = {
    eventName: string;
    eventImage: string;
    eventLink: string;
    eventDescription: string;
    eventIsDone: boolean;
};

type Props = {
    element: EventsElement;
};

export default function EventsInfo({ element }: Props) {
    return(
        <a href={element.eventLink} target="_blank" rel="noopener noreferrer" className={`flex flex-col h-full w-full cursor-pointer transition rounded-lg p-5 ${element.eventIsDone ? 'bg-gray-700 opacity-50' : 'bg-gray-900 hover:bg-gray-700'}`}>
            <div className="">
                <h1 className="rounded-md w-full object-cover">
                    {element.eventName}
                </h1>

                <img className=""
                    src={element.eventImage} alt={element.eventName}
                />
                <p className="text-sm">
                    {element.eventDescription}
                </p>
            </div>
        </a>
    )
}