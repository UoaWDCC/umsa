import assert from "node:assert/strict";
import { createServer } from "vite";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const vite = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: "custom",
});
try {
  const load = async (path) => (await vite.ssrLoadModule(path)).default;
  const Team = await load("/src/pages/Team.tsx");
  const About = await load("/src/pages/About.tsx");
  const MemberInfo = await load("/src/components/MemberInfo.tsx");
  const Carousel = await load("/src/components/EventCarousel.tsx");
  const Gallery = await load("/src/pages/Gallery.tsx");
  const Marquee = await load("/src/components/Marquee.tsx");
  const client = new QueryClient({
    defaultOptions: { queries: { staleTime: Infinity, retry: false } },
  });
  const render = (element) =>
    renderToStaticMarkup(
      React.createElement(
        MemoryRouter,
        {},
        React.createElement(QueryClientProvider, { client }, element),
      ),
    );
  const members = Array.from({ length: 20 }, (_, i) => ({
    id: String(i),
    fullName: `Member ${i}`,
    role: "Officer",
    committee: i === 19 ? undefined : i < 10 ? "marketing" : "sports",
    instagram: "",
  }));
  client.setQueryData(["members"], members);
  const team = render(React.createElement(Team));
  assert.equal(
    (team.match(/Show profile for/g) ?? []).length,
    40,
    "all 20 records render in desktop and mobile layouts",
  );
  assert(
    team.includes("Member 19"),
    "legacy record with no committee remains visible",
  );
  assert(!team.includes("Person 1"), "PR mock roster is not rendered");
  client.setQueryData(["members"], []);
  assert(render(React.createElement(Team)).includes("once published"));
  const member = render(React.createElement(MemberInfo, { stats: members[0] }));
  assert(!member.includes('src="undefined"'));
  assert(!member.includes("instagram.com/undefined"));
  assert(member.includes('aria-expanded="false"'));
  const about = render(React.createElement(About));
  assert(
    about.includes("Culture") &&
      about.includes("Community") &&
      about.includes("/sign-up"),
  );
  assert(!about.includes('href="#"'), "no placeholder social links from PR");
  assert(
    render(React.createElement(Carousel, { events: [] })).includes(
      "Nothing scheduled",
    ),
  );
  const events = Array.from({ length: 5 }, (_, i) => ({
    id: String(i),
    eventName: `Event ${i}`,
    eventImage: "",
    eventLink: "",
    eventDate: "2026-12-20",
    eventTag: "Social",
    eventDescription: "",
    location: "",
  }));
  const carousel = render(React.createElement(Carousel, { events }));
  assert.equal(
    (carousel.match(/href="\/events"/g) ?? []).length,
    3,
    "carousel displays three unique real records",
  );
  assert(carousel.includes('aria-label="Previous events" disabled=""'));
  client.setQueryData(
    ["gallery"],
    [
      {
        id: "photo",
        src: "https://example.com/photo.jpg",
        caption: "Saved photo",
        album: "Saved album",
      },
    ],
  );
  const gallery = render(React.createElement(Gallery));
  assert(gallery.includes("Saved photo") && gallery.includes("Saved album"));
  assert(!gallery.includes("GalleryTest"));
  const marquee = render(React.createElement(Marquee));
  assert(
    marquee.includes('aria-hidden="true"') && marquee.includes("I ♥ Malaysia"),
  );
  console.log(
    "PASS: PR components render with real contracts, 20-member committee layout, legacy/empty records, optional profiles, About links, bounded carousel, database gallery, and accessible marquee.",
  );
} finally {
  await vite.close();
}
