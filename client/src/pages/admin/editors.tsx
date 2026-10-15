// Thin configuration over the generic CollectionEditor — one export per resource.
import CollectionEditor, { type Field } from "./CollectionEditor";
import {
  EVENT_TAGS,
  REGIONS,
  COMMITTEE_ORDER,
  COMMITTEE_LABELS,
} from "../../types/content";

const memberFields: Field[] = [
  {
    name: "committee",
    label: "Committee",
    type: "select",
    options: COMMITTEE_ORDER,
    optionLabels: COMMITTEE_LABELS,
  },
  { name: "fullName", label: "Name" },
  { name: "role", label: "Role" },
  { name: "img", label: "Photo", type: "image" },
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
  { name: "eventImage", label: "Image", type: "image" },
  { name: "eventLink", label: "Link" },
];

const sponsorFields: Field[] = [
  { name: "name", label: "Name" },
  { name: "offer", label: "Offer (goes on the ticket)" },
  { name: "logo", label: "Logo", type: "image" },
  { name: "region", label: "Area", type: "select", options: REGIONS },
  {
    name: "detail",
    label: "Conditions (shown when the ticket opens)",
    type: "textarea",
  },
  { name: "url", label: "Website" },
  { name: "instagram", label: "Instagram URL" },
];

const galleryFields: Field[] = [
  { name: "caption", label: "Caption" },
  { name: "album", label: "Album" },
  { name: "src", label: "Photo", type: "image" },
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
