import { useState } from "react";
import { useEvents, useDeleteEvent, useCreateEvent, useUpdateEvent } from "../../hooks/useEvents";
import type { EventRecord } from "../../types/content";

export default function EventsEditor() {
    const { data: events = [], isLoading, isError } = useEvents();
    const deleteEvent = useDeleteEvent();
    const updateEvent = useUpdateEvent();
    const createEvent = useCreateEvent();
    const [name, setName] = useState("");
    const [startsAt, setStartsAt ] = useState("");
    const [description, setDescription ] = useState("");
    const [tag, setTag ] = useState("");
    const [link, setLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [editingId, setEditingId] = useState<string | null>(null);
    

    if (isLoading) return <p>Loading events...</p>;
    if (isError) return <p>Could not load events.</p>;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const data = {
            eventName: name,
            eventDate: new Date(startsAt).toISOString(), 
            eventDescription: description,
            eventTag: tag,
            eventLink: link,
            eventImage: imageUrl,
            location: "",
            album: "",
        };

        if (editingId) {
            updateEvent.mutate({ id: editingId, ...data }, { onSuccess: resetForm });
        } else {
            createEvent.mutate(data, { onSuccess: resetForm });
        }
    }

    function toLocalInput(iso: string) {
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
    function startEdit(event: EventRecord) {
        setEditingId(event.id);
        setName(event.eventName);
        setDescription(event.eventDescription);
        setTag(event.eventTag);
        // datetime-local needs "YYYY-MM-DDTHH:mm" in local time
        setStartsAt(toLocalInput(event.eventDate));
        setLink(event.eventLink ?? "");
        setImageUrl(event.eventImage ?? "");
    }

    function resetForm() {
        setEditingId(null);
        setName("");
        setDescription("");
        setTag("");
        setStartsAt("");
        setLink("");
        setImageUrl("");
    }

    return (
    <div>
        <h1>Events</h1>
        <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        <input placeholder="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
        <input placeholder="Link (https://...)" value={link} onChange={(e) => setLink(e.target.value)} />
        <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">submit event</button>
        {editingId && (
                <button type="button" onClick={resetForm}>Cancel</button>
        )}
        </form>
           {(createEvent.isError || updateEvent.isError) && (
     <p>Could not save. Check the fields and try again.</p>
   )}
        {events.length === 0 && <p>No events yet.</p>}

        {events.map((event) => {
            const start = new Date(event.eventDate);
        return (
        <div key={event.id}>
            <span>{event.eventName}</span>{" "}
            <span>{start.toLocaleDateString("en-NZ", { weekday: "short", day: "numeric", month: "short", year: "numeric" })}</span>{" "}
            <span>{start.toLocaleTimeString("en-NZ", { hour: "numeric", minute: "2-digit", hour12: true })}</span>{" "}
            {event.eventImage && <img src={event.eventImage} alt={event.eventName} width={60} />}
            <button onClick={() => startEdit(event)}>Edit</button>
            <button
            onClick={() => {
                if (window.confirm("Delete this event?")) {
                deleteEvent.mutate(event.id);
                }
            }}
            >
            Delete
            </button>
        </div>
        );
    })}
    </div>
    );
}