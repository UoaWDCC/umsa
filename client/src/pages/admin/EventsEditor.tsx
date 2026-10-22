import { useEvents, useDeleteEvent } from "../../hooks/useEvents";

export default function EventsEditor() {
  const { data: events = [], isLoading, isError } = useEvents();
  const deleteEvent = useDeleteEvent();

  if (isLoading) return <p>Loading events...</p>;
  if (isError) return <p>Could not load events.</p>;

  return (
    <div>
      <h1>Events</h1>

      {events.length === 0 && <p>No events yet.</p>}

      {events.map((event) => (
        <div key={event._id}>
          <span>{event.name}</span>{" "}
          <span>{new Date(event.startsAt).toLocaleDateString("en-NZ")}</span>{" "}
          <button
            onClick={() => {
              if (window.confirm("Delete this event?")) {
                deleteEvent.mutate(event._id);
              }
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}