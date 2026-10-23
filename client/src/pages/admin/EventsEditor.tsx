import { useState } from "react";
import { useEvents, useDeleteEvent, useCreateEvent } from "../../hooks/useEvents";

export default function EventsEditor() {
    const { data: events = [], isLoading, isError } = useEvents();
    const deleteEvent = useDeleteEvent();

    const createEvent = useCreateEvent();
    const [name, setName] = useState("");
    const [startsAt, setStartsAt ] = useState("");
    const [description, setDescription ] = useState("");
    const [tag, setTag ] = useState("");

    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Could not load events.</p>;

    function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createEvent.mutate({
        name,
        description,
        tag,
        startsAt: new Date(startsAt),
    });
    }

    return (
    <div>
        <h1>Events</h1>
        <form onSubmit={handleCreate}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        <input placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Save event</button>
        </form>
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