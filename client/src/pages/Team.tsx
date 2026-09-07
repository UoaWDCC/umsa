import MemberInfo from "../components/MemberInfo";
import { useEffect } from "react";
import glassesSvg from "../assets/team/glasses.svg";
import rPenSvg from "../assets/team/redpen.svg";
import bPenSvg from "../assets/team/bluepen.svg"
import noteSvg from "../assets/team/note.svg";
import rEraserSvg from "../assets/team/rederaser.svg";
import bEraserSvg from "../assets/team/blueeraser.svg";

const COMMITTEE_ORDER = [
  "presidents",
  "executives",
  "marketing",
  "publicRelations",
  "social",
  "cultural",
  "sports",
] as const;

export type CommitteeName = (typeof COMMITTEE_ORDER)[number];

type Member = {
  // _id: string;
  fullName: string;
  role: string;
  img: string;
  linkedin: string;
  instagram: string;
  committee: CommitteeName;
};

const teamData: Member[] = [
  // Presidents
  { fullName: "Chester Ow Yong", role: "President", img: "...", linkedin: "", instagram: "", committee: "presidents" },
  { fullName: "Joie Ting", role: "Vice President", img: "...", linkedin: "", instagram: "", committee: "presidents" },

  // Executives
  { fullName: "Person 1", role: "Secretary", img: "...", linkedin: "", instagram: "", committee: "executives" },
  { fullName: "Person 2", role: "Treasurer", img: "...", linkedin: "", instagram: "", committee: "executives" },

  // Marketing
  { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "", committee: "marketing" },
  { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "", committee: "marketing" },
  { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "", committee: "marketing" },

  // Public Relations
  { fullName: "Person 4", role: "Public Relations Officer", img: "...", linkedin: "", instagram: "", committee: "publicRelations" },
  { fullName: "Person 4", role: "Public Relations Officer", img: "...", linkedin: "", instagram: "", committee: "publicRelations" },

  // Social
  { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "", committee: "social" },
  { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "", committee: "social" },

  // Cultural
  { fullName: "Person 7", role: "Cultural Officer", img: "...", linkedin: "", instagram: "", committee: "cultural" },
  { fullName: "Person 8", role: "Cultural Officer", img: "...", linkedin: "", instagram: "", committee: "cultural" },

  // Sports
  { fullName: "Person 5", role: "Sports Officer", img: "...", linkedin: "", instagram: "", committee: "sports" },
  { fullName: "Person 6", role: "Sports Officer", img: "...", linkedin: "", instagram: "", committee: "sports" },
];

const COMMITTEE_PATTERNS = [
  { justify: "md:justify-start md:pl-25", offsetEven: "md:-mt-2 -rotate-4", offsetOdd: "md:mt-4 rotate-4"},
  { justify: "md:justify-start md:pl-60", offsetEven: "md:-mt-2 -rotate-4", offsetOdd: "md:mt-4 rotate-4"},
  { justify: "md:justify-start md:pl-30", offsetEven: "md:-mt-2 -rotate-6", offsetOdd: "md:mt-6 rotate-4" },
  { justify: "md:justify-end md:pr-50", offsetEven: "md:mt-4 -rotate-2", offsetOdd: "md:-mt-4 rotate-1" },
  { justify: "md:justify-end md:pr-20", offsetEven: "md:-mt-6 -rotate-4", offsetOdd: "md:mt-2 rotate-4" },
  { justify: "md:justify-end md:pr-100", offsetEven: "md:mt-2 -rotate-4", offsetOdd: "md:-mt-6 rotate-6" },
  { justify: "md:justify-start md:pl-100", offsetEven: "md:-mt-4 -rotate-4", offsetOdd: "md:mt-4 rotate-6" },
];

export const COMMITTEE_BG_COLORS: Record<typeof COMMITTEE_ORDER[number], string> = {
  presidents: "bg-[var(--color-accent1-secondary)]",
  executives: "bg-blue-400",
  marketing: "bg-red-350",
  publicRelations: "bg-red-600",
  social: "bg-gray-500",
  cultural: "bg-gray-700",
  sports: "bg-[var(--color-accent1-primary)]",
};



export default function Team() {
  useEffect(() => {
    document.title = "Meet the Team | UMSA";
  }, []);

  const allMembers = COMMITTEE_ORDER.flatMap((committeeName) => {
  const bgColor =
    COMMITTEE_BG_COLORS[committeeName] || "bg-[var(--color-accent1-primary)]";
  return teamData
    .filter((m) => m.committee === committeeName)
    .map((m) => ({ ...m, bgColor }));
  });

  return (
    <>
    <img
          src={glassesSvg}
          alt=""
          className="hidden [@media(min-width:1215px)]:block absolute top-60 right-4 z-0 pointer-events-none"
        />
        <img
          src={rPenSvg}
          alt=""
          className="hidden [@media(min-width:1215px)]:block absolute top-160 right-4 z-0 pointer-events-none"
        />
        <img
          src={bPenSvg}
          alt=""
          className="hidden [@media(min-width:1215px)]:block absolute top-190 right-18 z-0 pointer-events-none"
        />
        <img
          src={noteSvg}
          alt=""
          className="hidden [@media(min-width:1215px)]:block absolute top-320 left-0 z-0 pointer-events-none"
        />
        <img
          src={rEraserSvg}
          alt=""
          className="hidden [@media(min-width:1215px)]:block absolute top-550 right-18 z-0 pointer-events-none"
        />
        <img
          src={bEraserSvg}
          alt=""
          className="hidden [@media(min-width:1215px)]:block absolute top-530 right-50 z-0 pointer-events-none"
        />
        

      <div className="text-left">
        <h1 className="text-8xl font-heading font-bold mb-8 text-accent1-primary">Meet the <span className="text-accent2-primary">Team</span></h1>
      </div>

      <div className="md:hidden overflow-x-auto -mx-4 px-4 pt-2 scale-85">
      <div className={`w-full flex flex-wrap items-center gap-x-5`}>
        {allMembers.map((member, idx) => (
          <div key={member.fullName + member.role + idx} className={`mb-5 ${["-rotate-2", "rotate-3", "-rotate-4", "rotate-2"][idx % 4]}`}>
            <MemberInfo stats={member} bgColor={member.bgColor} />
          </div>
        ))}
      </div>
    </div>
      <div className="flex flex-col items-center gap-y-16 max-w-6xl mx-auto">

        {COMMITTEE_ORDER
  .filter((committeeName) => {
    const members = teamData.filter(
      (member) => member.committee === committeeName
    );

    return members.length > 0;
  })
  .map((committeeName, committeeIdx) => {
    const members = teamData.filter(
      (member) => member.committee === committeeName
    );

    // Gets spot pattern for active row index (0, 1, 2, 3...)
    const pattern =
      COMMITTEE_PATTERNS[
        committeeIdx % COMMITTEE_PATTERNS.length
      ];

    const bgColor =
      COMMITTEE_BG_COLORS[committeeName] ||
      "bg-[var(--color-accent1-primary)]";

    return (
            <div
              key={committeeName}
              className="hidden md:w-full md:flex md:flex-col md:items-center"
            >
              <div className={`hidden md:w-full md:flex md:flex-wrap md:items-center md:gap-x-12 ${pattern.justify}`}>
                {members.map((member, idx) => {
                  const cardOffset = idx % 2 === 0 ? pattern.offsetEven : pattern.offsetOdd;
                  return (
                    <div
                      key={member.fullName}
                      className={cardOffset}
                    >
                      <MemberInfo
                        stats={member}
                        bgColor={bgColor}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

      </div>
      <p className="
        font-heading text-accent1-primary text-center
        relative mx-auto mt-16 mb-8 text-2xl

        [@media(min-width:1215px)]:absolute
        [@media(min-width:1215px)]:left-20
        [@media(min-width:1215px)]:top-650
        [@media(min-width:1215px)]:mx-0
        [@media(min-width:1215px)]:mt-0
        [@media(min-width:1215px)]:mb-0
        [@media(min-width:1215px)]:text-left
        "><span className="text-accent2-primary">UMSA</span> 2026 <br />Committee</p>
    </>
  );
}
