// Thin configuration over the generic CollectionEditor — one export per resource.
import CollectionEditor, { type Field } from "./CollectionEditor";
import { EVENT_TAGS, REGIONS } from "../../mocks/data";

// image picker, so the demo never needs a real upload pipeline
const scenes = Object.entries(
  import.meta.glob("../../assets/placeholders/{event,gallery,sponsor}-*.svg", {
    eager: true,
    query: "?url",
    import: "default",
  }),
).map(([path, url]) => ({ label: path.split("/").pop()!, value: url as string }));

const memberFields: Field[] = [
  { name: "fullName", label: "Name" },
  { name: "role", label: "Role" },
  { name: "degree", label: "Degree" },
  { name: "ethnicity", label: "Ethnicity" },
  { name: "mbti", label: "MBTI" },
  { name: "favArtist", label: "Favourite artist" },
  { name: "bio", label: "Bio", type: "textarea" },
  { name: "instagram", label: "Instagram URL" },
];

const eventFields: Field[] = [
  { name: "eventName", label: "Event name" },
  { name: "eventDate", label: "Date", type: "date" },
  { name: "eventTag", label: "Category", type: "select", options: EVENT_TAGS },
  { name: "location", label: "Location" },
  { name: "album", label: "Photo album (past events)" },
  { name: "eventDescription", label: "Description", type: "textarea" },
  { name: "eventImage", label: "Image", type: "image", choices: scenes },
  { name: "eventLink", label: "Link" },
];

const sponsorFields: Field[] = [
  { name: "name", label: "Name" },
  { name: "offer", label: "Offer (goes on the ticket)" },
  { name: "region", label: "Area", type: "select", options: REGIONS },
  { name: "detail", label: "Conditions (shown when the ticket opens)", type: "textarea" },
  { name: "url", label: "Website" },
  { name: "instagram", label: "Instagram URL" },
];

const galleryFields: Field[] = [
  { name: "caption", label: "Caption" },
  { name: "album", label: "Album" },
  { name: "src", label: "Photo", type: "image", choices: scenes },
];

const faqFields: Field[] = [
  { name: "question", label: "Question" },
  { name: "answer", label: "Answer", type: "textarea" },
];

export const TeamEditor = () => (
  <CollectionEditor
    collection="members"
    title="Team members"
    fields={memberFields}
    primary="fullName"
    secondary="role"
    thumb="img"
  />
);

export const EventsEditor = () => (
  <CollectionEditor
    collection="events"
    title="Events"
    fields={eventFields}
    primary="eventName"
    secondary="eventDate"
    thumb="eventImage"
  />
);

export const SponsorsEditor = () => (
  <CollectionEditor
    collection="sponsors"
    title="Sponsors"
    fields={sponsorFields}
    primary="name"
    secondary="region"
  />
);

export const GalleryEditor = () => (
  <CollectionEditor
    collection="gallery"
    title="Gallery"
    fields={galleryFields}
    primary="caption"
    secondary="album"
    thumb="src"
  />
);

export const FaqEditor = () => (
  <CollectionEditor
    collection="faqs"
    title="FAQs"
    fields={faqFields}
    primary="question"
    secondary="answer"
  />
);
