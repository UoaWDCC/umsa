import { useState } from "react";
import { events } from "../components/EventData";
import right_arrow from "../assets/right_arrow.svg";
import left_arrow from "../assets/left_arrow.svg";

const VISIBLE = 3; // the amount of cards shown at once

export function EventsCarousel() {
    const [index, setIndex] = useState(0);
    const maxIndex = Math.max(0, events.length - VISIBLE);

    // hardcoded opacity values
    const opacityLevel = ["opacity-70", "opacity-100", "opacity-70"]; 

    // shifts the cards left/right
    const shiftRight = () => setIndex((i) => Math.min(i + 1, maxIndex));
    const shiftLeft = () => setIndex((i) => Math.max(i - 1, 0)); 

    // takes 3 events from the list of events
    const visibleEvents = events.slice(index, index + VISIBLE)

    return(
      <>
        <div className="flex flex-row justify-center items-center gap-5 px-6">
          <button onClick={shiftLeft} disabled={index === 0} className="disabled:opacity-50">
            <img src={left_arrow} className="h-20 w-auto cursor-pointer"/></button>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-324">
          {visibleEvents.map((event, counter) =>(
              <p key={event.id}><img src={event.eventImage} className={`w-full
              aspect-[3/4] object-contain rounded-md ${opacityLevel[counter]}`}/>{event.eventName}</p>
              ))}
          </div>
          <button onClick={shiftRight} disabled={index === maxIndex} className="disabled:opacity-50">
            <img src={right_arrow} className="h-20 w-auto cursor-pointer"/></button>
        </div>
      </>
    )
}