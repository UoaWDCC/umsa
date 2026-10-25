import { useEffect, useState } from "react";
import EventsInfo from "../components/EventsElement";
import EventImage from "../assets/about-us/Copy of UMSA_Guitar.png";
import Page from "../components/EventsPageButton";
import { useEvents } from "../hooks/useEvents";

const maxItemPage = 6;
const pagesPerGroup = 5;

export default function Events() {
  useEffect(() => {
    document.title = "Events | UMSA";
  }, []);

  const { data: events = [], isLoading, isError } = useEvents();
  const [activeTag, setActiveTag] = useState("All");
  const [activePage, setActivePage] = useState(1);
  const [pageGroupOffset, setPageGroupOffset] = useState(0);

  if (isLoading) return <p className="text-center my-10">Loading events...</p>;
  if (isError) return <p className="text-center my-10">Could not load events.</p>;

  // Convert server data into the shape this page uses
  const now = Date.now();
  const processedEvents = events.map((event) => ({
    eventName: event.name,
    eventDate: new Date(event.startsAt),
    eventImage: event.imageUrl || EventImage,
    eventLink: event.link ?? '',
    eventDescription: event.description,
    eventTag: event.tag,
    eventIsDone: new Date(event.startsAt).getTime() < now,
    _id: event._id,
  }));

  // Upcoming: soonest first
  const upcomingEvents = processedEvents
    .filter((event) => !event.eventIsDone)
    .sort((a, b) => a.eventDate.getTime() - b.eventDate.getTime());

  // Past: newest first (as the server sends them), split into pages
  const pastEventsGrouped = processedEvents
    .filter((event) => event.eventIsDone)
    .map((event, index) => ({
      ...event,
      page: Math.floor(index / maxItemPage) + 1,
    }));

  const filteredUpcomingEvents =
    activeTag === "All"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.eventTag === activeTag);
  const filteredPastEvents =
    activeTag === "All"
      ? pastEventsGrouped
      : pastEventsGrouped.filter((event) => event.eventTag === activeTag);

  const filteredPageNum = Math.max(
    1,
    Math.ceil(filteredPastEvents.length / maxItemPage),
  );
  const currentPage = Math.min(activePage, filteredPageNum);
  const filteredPastEventsPage = filteredPastEvents.filter(
    (event) => event.page === currentPage,
  );
  const pageButtons = Array.from({ length: filteredPageNum }, (_, index) => ({
    page: index + 1,
    setterFunction: (page: number) => setActivePage(page),
  }));

  const handleTagChange = (tag: string) => {
    setActiveTag(tag);
    setActivePage(1);
    setPageGroupOffset(0);
  };

  const startIndex = pageGroupOffset * pagesPerGroup;
  const visiblePages = pageButtons.slice(startIndex, startIndex + pagesPerGroup);
  const hasNextGroup = startIndex + pagesPerGroup < pageButtons.length;
  const hasPrevGroup = pageGroupOffset > 0;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col w-4/5" id="upcoming-events-section">
          <h1 className="text-3xl font-bold my-6">Upcoming Events</h1>
        </div>
        <div className="flex flex-wrap-reverse justify-end w-4/5 mb-3 gap-4">
          <button onClick={() => handleTagChange("All")}
            className={`w-fit text-sm text-gray-400 hover:text-white cursor-pointer ${activeTag === "All" ? "text-white font-bold" : ""}`}>
            all
          </button>
          <button onClick={() => handleTagChange("Social")}
            className={`w-fit text-sm text-gray-400 hover:text-white cursor-pointer ${activeTag === "Social" ? "text-white font-bold" : ""}`}>
            social
          </button>
          <button onClick={() => handleTagChange("Competition")}
            className={`w-fit text-sm text-gray-400 hover:text-white cursor-pointer ${activeTag === "Competition" ? "text-white font-bold" : ""}`}>
            competition
          </button>
        </div>

        {/* grid only containing upcoming events */}
        <div className="w-4/5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUpcomingEvents.map((upcomingEvent) => (
            <EventsInfo key={upcomingEvent._id} element={upcomingEvent} />
          ))}
        </div>

        <div className="my-8"></div>

        <div className="flex flex-col w-4/5" id="past-events-section">
          <h1 className="text-3xl font-bold my-6">Past Events</h1>
        </div>

        {/* grid only containing past events, for the current page */}
        <div className="w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPastEventsPage.map((pastEvent) => (
            <EventsInfo key={pastEvent._id} element={pastEvent} />
          ))}
        </div>

        <div className="flex flex-wrap justify-center w-4/5 mt-4 mb-4 gap-4">
          <div className="flex flex-row gap-4">
            {hasPrevGroup && (
              <button onClick={() => setPageGroupOffset(pageGroupOffset - 1)}
                className="text-gray-400 hover:text-white">
                &lt;
              </button>
            )}
            {visiblePages.map((button) => (
              <Page key={button.page} element={button} currentPage={currentPage} />
            ))}
            {hasNextGroup && (
              <button onClick={() => setPageGroupOffset(pageGroupOffset + 1)}
                className="text-gray-400 hover:text-white">
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}