/** Where "sign up" goes: the club's own link hub. */
export const UMSA_LINKTREE = "https://linktr.ee/Umsanz";

// Seed data for the local prototype. The adapter copies these into mutable stores
// at module load, so admin edits mutate the copy and never the seed.
import gongcha from "../assets/sponsors/gongcha.png";
import neneChicken from "../assets/sponsors/nene-chicken.png";

/* Photos come from the `source/` folder of the Figma image export — the
   full-resolution originals the designer placed. The versions that were here
   before had been pulled out of the frame render at display size (213 x 273),
   which is why they turned to mush the moment anything showed them larger. */
import teamPhoto from "../assets/photos/team-photo.jpg";
import lawn from "../assets/photos/lawn.jpg";

const event1 = teamPhoto;
const event2 = teamPhoto;
const event3 = teamPhoto;
const event4 = lawn;
const event5 = teamPhoto;
const event6 = lawn;

const gallery1 = teamPhoto;
const gallery2 = teamPhoto;
const gallery3 = teamPhoto;
const gallery4 = lawn;
const gallery5 = lawn;
const gallery6 = teamPhoto;
const gallery7 = lawn;
const gallery8 = teamPhoto;

export const EVENT_TAGS = ["Social", "Competition", "Cultural"] as const;
export type EventTag = (typeof EVENT_TAGS)[number];

export type Member = {
  id: string;
  fullName: string;
  role: string;
  /** the Figma photo wells are empty, so a member without a photo just gets one */
  img?: string;
  instagram: string;
  degree: string;
  ethnicity: string;
  mbti: string;
  favArtist: string;
  bio: string;
};

export type EventRecord = {
  id: string;
  eventName: string;
  eventImage: string;
  eventLink: string;
  eventDescription: string;
  eventDate: string; // ISO date — "done" is derived from this, never stored
  eventTag: EventTag;
  location: string;
  /** gallery album to send people to once the event has been and gone */
  album?: string;
};

export const REGIONS = ["Central", "East Auckland", "North Shore", "West Auckland"] as const;
export type Region = (typeof REGIONS)[number];

export type Sponsor = {
  id: string;
  name: string;
  /** the headline that goes on the ticket, e.g. "15% OFF" */
  offer: string;
  /** the conditions, shown when the ticket is opened; optional */
  detail?: string;
  /** left empty rather than guessed — an unverified link is worse than none */
  url?: string;
  instagram?: string;
  /** decorative demo logo — see DEMO_LOGOS */
  logo?: string;
  /* PLACEHOLDER. Nobody has confirmed which suburb these businesses trade in;
     these were assigned to demo the grouping and are editable in the admin. */
  region: Region;
};

export type GalleryItem = {
  id: string;
  src: string;
  caption: string;
  album: string;
};

export type FaqItem = { id: string; question: string; answer: string };

export const members: Member[] = [
  {
    id: "m1",
    fullName: "Chester",
    role: "President",
    instagram: "https://www.instagram.com/chester.owyong/",
    degree: "Retired Law Student",
    ethnicity: "Malaysian Chinese",
    mbti: "ESFJ",
    favArtist: "Keshi / Firdhaus",
    bio: "Self proclaimed no.1 lalazai in NZ",
  },
  {
    id: "m2",
    fullName: "Joie",
    role: "Vice President",
    instagram: "https://www.instagram.com/joi.eee/",
    degree: "Design",
    ethnicity: "Malaysian Chinese",
    mbti: "ESTP-A",
    favArtist: "Daniel Caesar",
    bio: "Life is hard, so I decided to become xmm in UMSA",
  },
  {
    id: "m3",
    fullName: "Tiffany",
    role: "Secretary",
    instagram: "https://www.instagram.com/ti.ffanyyy/",
    degree: "LLB/BCom",
    ethnicity: "Malaysian Chinese",
    mbti: "ENFJ-T",
    favArtist: "SZA",
    bio: "We can grab açai bowls together if you join UMSA",
  },
  {
    id: "m4",
    fullName: "Ashton",
    role: "Treasurer",
    instagram: "https://www.instagram.com/ashtonowyong/",
    degree: "Accounting",
    ethnicity: "Malaysian Chinese",
    mbti: "ISFP",
    favArtist: "IU",
    bio: "Sleeping available after 12pm",
  },
  {
    id: "m5",
    fullName: "Kate",
    role: "Content Creator",
    instagram: "https://www.instagram.com/_iicebing_/",
    degree: "Computer Science",
    ethnicity: "Chinese",
    mbti: "ENFJ-A",
    favArtist: "Kanye West",
    bio: "Blacked out like a phantom",
  },
  {
    id: "m6",
    fullName: "Daniel",
    role: "Designer",
    instagram: "https://www.instagram.com/rockhopp_/",
    degree: "Design (Fashion and Industrial)",
    ethnicity: "Cambodian",
    mbti: "INFP",
    favArtist: "Dominic Fike",
    bio: "Please don’t watch me draw, it’s too much pressure 🥹",
  },
  {
    id: "m7",
    fullName: "Venus",
    role: "Photographer",
    instagram: "https://www.instagram.com/venusty_0917/",
    degree: "BCom",
    ethnicity: "Malaysian Chinese",
    mbti: "INFP",
    favArtist: "G.E.M. Deng Zi Qi",
    bio: "Emotionally in bed",
  },
  {
    id: "m8",
    fullName: "Rohan",
    role: "Public Relations Officer",
    instagram: "https://www.instagram.com/rohananthon.y/",
    degree: "BCom/BDes Conjoint",
    ethnicity: "Malaysian Tamil",
    mbti: "INFP-T",
    favArtist: "Kendrick Lamar",
    bio: "#highcortisol ❌",
  },
  {
    id: "m9",
    fullName: "Benaiah",
    role: "Public Relations Officer",
    instagram: "https://www.instagram.com/benaiahkueh/",
    degree: "Civil Engineering",
    ethnicity: "Malaysian Chinese",
    mbti: "ENTJ",
    favArtist: "Don Toliver",
    bio: "#lowcortisol ✅",
  },
  {
    id: "m10",
    fullName: "Cassandra",
    role: "Social Officer",
    instagram: "https://www.instagram.com/_cass.dd/",
    degree: "BCom",
    ethnicity: "Malaysian (Chinese/Iban) & Vietnamese",
    mbti: "INFP",
    favArtist: "Refuses to pick — ask for her Spotify",
    bio: "I touch grass, I promise.",
  },
  {
    id: "m11",
    fullName: "Mikail",
    role: "Social Officer",
    instagram: "https://www.instagram.com/syyyyyyyyyke/",
    degree: "Computer Science",
    ethnicity: "Pakistani",
    mbti: "ENFJ-A",
    favArtist: "Keshi",
    bio: "Don’t deport me 🙏🙏",
  },
  {
    id: "m12",
    fullName: "Sanya",
    role: "Cultural Officer",
    instagram: "https://www.instagram.com/sanya_bhullar05/",
    degree: "BSc in Chemistry",
    ethnicity: "Malaysian Indian",
    mbti: "INFJ",
    favArtist: "Diljit Dosanjh",
    bio: "Mixing molecules by day, social events by night",
  },
  {
    id: "m13",
    fullName: "Qamarrudin",
    role: "Cultural Officer",
    instagram: "https://www.instagram.com/qamarrudin_/",
    degree: "Postgraduate Diploma in English Language",
    ethnicity: "Malaysian",
    mbti: "ISTJ",
    favArtist: "Woodkid",
    bio: "Shinzou wo sasageyo",
  },
  {
    id: "m14",
    fullName: "Ivan",
    role: "Sports Officer",
    instagram: "https://www.instagram.com/1van.wong/",
    degree: "Civil Engineering",
    ethnicity: "Malaysian Chinese",
    mbti: "ISTJ",
    favArtist: "Bruno Mars",
    bio: "I love KFC",
  },
  {
    id: "m15",
    fullName: "Zarif",
    role: "Sports Officer",
    instagram: "https://www.instagram.com/zarifind/",
    degree: "Bachelor of Sports, Health & PE",
    ethnicity: "Malaysian",
    mbti: "ISFJ-A",
    favArtist: "Benson Boone",
    bio: "Ball don’t lie",
  },
];

export const events: EventRecord[] = [
  {
    id: "e1",
    eventName: "Jalinan Raya",
    eventImage: event1,
    eventLink: UMSA_LINKTREE,
    eventDescription:
      "Our flagship Raya celebration — food, music, and a hall full of people who miss home.",
    eventDate: "2026-09-20",
    eventTag: "Cultural",
    location: "Shadows Bar, City Campus",
    album: "Jalinan Raya",
  },
  {
    id: "e2",
    eventName: "Bersatu Trials",
    eventImage: event2,
    eventLink: UMSA_LINKTREE,
    eventDescription: "Open trials for the Bersatu inter-university sports squad. All levels welcome.",
    eventDate: "2026-10-05",
    eventTag: "Social",
    location: "Auckland Domain",
  },
  {
    id: "e3",
    eventName: "Clash of UMSA 2026",
    eventImage: event3,
    eventLink: UMSA_LINKTREE,
    eventDescription: "The annual inter-faculty tournament. Bragging rights on the line.",
    eventDate: "2026-11-21",
    eventTag: "Competition",
    location: "Rec Centre",
  },
  {
    id: "e4",
    eventName: "Sports Day 2026",
    eventImage: event4,
    eventLink: UMSA_LINKTREE,
    eventDescription: "A full day of games, snacks, and mild sunburn.",
    eventDate: "2026-04-20",
    eventTag: "Social",
    location: "Outer Fields",
    album: "Sports Day",
  },
  {
    id: "e5",
    eventName: "Malaysian Night 2026",
    eventImage: event5,
    eventLink: UMSA_LINKTREE,
    eventDescription: "A night of performances, culture, and far too much food.",
    eventDate: "2026-03-14",
    eventTag: "Cultural",
    location: "SkyCity Theatre",
  },
  {
    id: "e6",
    eventName: "Welcome BBQ",
    eventImage: event6,
    eventLink: UMSA_LINKTREE,
    eventDescription: "First-years met the exec over a very windy barbecue.",
    eventDate: "2026-03-02",
    eventTag: "Social",
    location: "Albert Park",
    album: "Socials",
  },
  {
    id: "e7",
    eventName: "Clash of UMSA 2025",
    eventImage: event1,
    eventLink: UMSA_LINKTREE,
    eventDescription: "Last year's tournament — a narrow win for Engineering.",
    eventDate: "2025-04-20",
    eventTag: "Competition",
    location: "Rec Centre",
  },
  {
    id: "e8",
    eventName: "Batik Workshop",
    eventImage: event2,
    eventLink: UMSA_LINKTREE,
    eventDescription: "Hands-on batik painting with a guest artist.",
    eventDate: "2025-08-11",
    eventTag: "Cultural",
    location: "Design Studio 4",
    album: "Workshops",
  },
  {
    id: "e9",
    eventName: "Pasar Malam",
    eventImage: event3,
    eventLink: UMSA_LINKTREE,
    eventDescription: "A night market on campus. Bring cash and an appetite.",
    eventDate: "2024-09-30",
    eventTag: "Cultural",
    location: "Quad",
  },
];

/* The design board mocks the ticket logo slot with just two brands. Only those
   two are real, so every other sponsor borrows one of them for the demo —
   `logo` is decorative here, not a claim about who the sponsor is. */
const DEMO_LOGOS = [gongcha, neneChicken];

export const sponsors: Sponsor[] = [
  { id: "s1", name: "Kompass Coffee", offer: "15% Off", region: "Central" },
  { id: "s2", name: "Meeso Coffee", offer: "10% Off", region: "Central" },
  {
    id: "s3",
    name: "Gong Cha",
    offer: "Free Toppings",
    url: "https://gongcha.co.nz/",
    instagram: "https://www.instagram.com/gongcha_nz/",
    region: "Central",
  },
  {
    id: "s4",
    name: "Tsujiri",
    offer: "Free Upsize",
    detail: "Free upsize on drinks, plus one free topping for soft serve and floats.",
    url: "https://tsujiri.co.nz/",
    instagram: "https://www.instagram.com/tsujiri_newzealand/",
    region: "Central",
  },
  {
    id: "s5",
    name: "Nene Chicken",
    offer: "$2.50 Combo",
    detail: "Add a $2.50 combo to any main.",
    url: "https://www.nenechicken.co.nz/",
    instagram: "https://www.instagram.com/nenechickennz/",
    region: "Central",
  },
  { id: "s6", name: "OBar", offer: "10% Off", region: "Central" },
  {
    id: "s7",
    name: "Ippondo",
    offer: "15% Off",
    instagram: "https://www.instagram.com/ippondojapanese/",
    region: "Central",
  },
  { id: "s8", name: "The Cosmetic Store", offer: "5% Off", region: "Central" },
  { id: "s9", name: "Optics 1", offer: "10% Off", region: "Central" },
  { id: "s10", name: "N8 Hair Culture", offer: "15% Off", region: "Central" },
  {
    id: "s11",
    name: "SO Fitness",
    offer: "30% Off",
    detail: "30% off regular price class packs, plus 10 spots for members to attend a class.",
    region: "Central",
  },
  {
    id: "s12",
    name: "Escape Masters",
    offer: "$2 Off",
    url: "https://escapemasters.co.nz/",
    region: "Central",
  },
  {
    id: "s13",
    name: "Burger Time",
    offer: "15% Off",
    detail: "On purchases over $15, with a free drink add-on.",
    region: "East Auckland",
  },
  { id: "s14", name: "Saigon Chill", offer: "10% Off", region: "East Auckland" },
  { id: "s15", name: "Petaling Restaurant", offer: "10% Off", region: "East Auckland" },
  { id: "s16", name: "Pickdog", offer: "10% Off", region: "East Auckland" },
  {
    id: "s17",
    name: "Sambal Station",
    offer: "10% Off",
    url: "https://sambalstation.com/",
    region: "East Auckland",
  },
  { id: "s18", name: "Lepak", offer: "15% Off", region: "East Auckland" },
  { id: "s19", name: "Amai House", offer: "10% Off", detail: "10% off drinks.", region: "East Auckland" },
  {
    id: "s20",
    name: "Victoria Sushi",
    offer: "10% Off",
    detail: "10% off display items. Drinks excluded.",
    region: "East Auckland",
  },
  { id: "s21", name: "Habits", offer: "10% Off", region: "North Shore" },
  {
    id: "s22",
    name: "Afterlife Billiards",
    offer: "$12 An Hour",
    detail: "Table rate discounted to $12 an hour.",
    region: "North Shore",
  },
  {
    id: "s23",
    name: "Game On",
    offer: "Student VIP",
    detail:
      "Student VIP card status: one free game daily and discounted arcade games. VIP normally costs $150.",
    url: "https://gameon.co.nz/",
    region: "North Shore",
  },
  {
    id: "s24",
    name: "Mermaid Cafe",
    offer: "10% Off",
    detail: "On purchases over $15.",
    region: "North Shore",
  },
  { id: "s25", name: "Morning Goo Goo", offer: "10% Off", region: "North Shore" },
  { id: "s26", name: "Tanqi Matcha", offer: "10% Off", region: "North Shore" },
  { id: "s27", name: "Crochetnflowers", offer: "10% Off", region: "North Shore" },
  { id: "s28", name: "Moonberry Studios", offer: "15% Off", region: "West Auckland" },
  { id: "s29", name: "Chubby Boy", offer: "10% Off", region: "West Auckland" },
  { id: "s30", name: "SugarBae Desserts", offer: "20% Off", region: "West Auckland" },
  { id: "s31", name: "HoCiak", offer: "10% Off", region: "West Auckland" },
  {
    id: "s32",
    name: "OnQ Minigolf",
    offer: "20% Off",
    url: "https://www.skyworld.co.nz/onq/",
    region: "West Auckland",
  },
  { id: "s33", name: "Bake My Day", offer: "20% Off", detail: "20% off coffee.", region: "West Auckland" },
  {
    id: "s34",
    name: "Metrolanes",
    offer: "20% Off",
    url: "https://www.metrolanes.co.nz/",
    region: "West Auckland",
  },
];

// alternate the two demo logos down the list
sponsors.forEach((s, i) => {
  s.logo = DEMO_LOGOS[i % DEMO_LOGOS.length];
});

export const gallery: GalleryItem[] = [
  { id: "g1", src: gallery1, caption: "Sports Day, first heat", album: "Sports Day" },
  { id: "g2", src: gallery2, caption: "The winning team", album: "Sports Day" },
  { id: "g3", src: gallery3, caption: "Raya setup crew", album: "Jalinan Raya" },
  { id: "g4", src: gallery4, caption: "Full house", album: "Jalinan Raya" },
  { id: "g5", src: gallery5, caption: "Batik in progress", album: "Workshops" },
  { id: "g6", src: gallery6, caption: "Finished pieces", album: "Workshops" },
  { id: "g7", src: gallery7, caption: "Welcome BBQ", album: "Socials" },
  { id: "g8", src: gallery8, caption: "Committee, 2026", album: "Socials" },
];

export const faqs: FaqItem[] = [
  {
    id: "f1",
    question: "Do I have to be Malaysian to join?",
    answer:
      "Not at all. UMSA is open to every student at the University of Auckland — plenty of our members joined because they liked the food and stayed for the people.",
  },
  {
    id: "f2",
    question: "How much is membership?",
    answer: "Membership is $5 for the year, and it gets you discounted entry to every ticketed event.",
  },
  {
    id: "f3",
    question: "When do events usually run?",
    answer:
      "Most socials are on Friday evenings, and bigger cultural events land near the middle of each semester. Check the Events page for exact dates.",
  },
  {
    id: "f4",
    question: "Can I help run events?",
    answer:
      "Yes — we take on volunteers throughout the year, and committee applications open near the end of Semester 2.",
  },
];

export const homeContent = {
  heading: "WELCOME TO UMSA",
  subtitle: "The home of Malaysian students in Auckland.",
  aboutHeading: "WHAT IS UMSA?",
  aboutBody:
    "The University of Auckland Malaysian Students' Association is a home away from home. We run cultural nights, sports days, and the kind of socials where you leave with new friends and leftovers.",
};

export const adminUser = { email: "umsa@projects.wdcc.co.nz", password: "umsa" };
