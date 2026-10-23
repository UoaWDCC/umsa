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
    const [link, setLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");

    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Could not load events.</p>;

    function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    createEvent.mutate({
        name,
        description,
        tag,
        startsAt: new Date(startsAt),
        link: link || undefined,
        imageUrl: imageUrl || undefined,
    });
    }

    return (
    <div>
        <h1>Events</h1>
        <form onSubmit={handleCreate}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        <input placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        <input placeholder="Link (https://...)" value={link} onChange={(e) => setLink(e.target.value)} />
        <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Save event</button>
        </form>
        {events.length === 0 && <p>No events yet.</p>}

        {events.map((event) => (
        <div key={event._id}>
            <span>{event.name}</span>{" "}
            <span>{new Date(event.startsAt).toLocaleDateString("en-NZ")}</span>{" "}
            <img src={event.imageUrl}></img>
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