import MemberInfo from "../components/MemberInfo";
import { useEffect } from "react";
import glassesSvg from "../assets/team/glasses.svg";
import rPenSvg from "../assets/team/redpen.svg";
import bPenSvg from "../assets/team/bluepen.svg"
import noteSvg from "../assets/team/note.svg";
import rEraserSvg from "../assets/team/rederaser.svg";
import bEraserSvg from "../assets/team/blueeraser.svg";

const DEPARTMENT_ORDER = [
  "presidents",
  "executives",
  "marketing",
  "publicRelations",
  "social",
  "cultural",
  "sports",
] as const;

export type DepartmentName = (typeof DEPARTMENT_ORDER)[number];

type Member = {
  // _id: string;
  fullName: string;
  role: string;
  img: string;
  linkedin: string;
  instagram: string;
};

type TeamData = {
  presidents: Member[];
  executives: Member[];
  sports: Member[];
  marketing: Member[];
  social: Member[];
  cultural: Member[];
  publicRelations: Member[];
};

const teamData: TeamData = {
  presidents: [
    { fullName: "Chester Ow Yong", role: "President", img: "...", linkedin: "", instagram: "" },
    { fullName: "Joie Ting", role: "Vice President", img: "...", linkedin: "", instagram: "" },
  ],
  executives: [
    { fullName: "Person 1", role: "Secretary", img: "...", linkedin: "", instagram: "" },
    { fullName: "Person 2", role: "Treasurer", img: "...", linkedin: "", instagram: "" },
  ],
  sports: [
    { fullName: "PERSON 5", role: "Sports Officer", img: "...", linkedin: "", instagram: "" },
    { fullName: "PERSON 6", role: "Sports Officer", img: "...", linkedin: "", instagram: "" },
  ],
  marketing: [
    { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "" },
    { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "" },
    { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "" },
  ],
  social: [
    { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "" },
    { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "" },
  ],
  cultural: [
    { fullName: "Person ", role: "Cultrual Officer", img: "...", linkedin: "", instagram: "" },
    { fullName: "Person ", role: "Cultrual Officer", img: "...", linkedin: "", instagram: "" },
  ],
  publicRelations: [
    { fullName: "Person 4", role: "Public Relation Officer", img: "...", linkedin: "", instagram: "" },
    { fullName: "Person 4", role: "Public Relation Officer", img: "...", linkedin: "", instagram: "" },
  ],
};

const DEPARTMENT_PATTERNS = [
  { justify: "justify-start md:pl-25", offsetEven: "md:-mt-2 -rotate-4", offsetOdd: "md:mt-4 rotate-4"},
  { justify: "justify-start md:pl-60", offsetEven: "md:-mt-2 -rotate-4", offsetOdd: "md:mt-4 rotate-4"},
  { justify: "justify-start md:pl-30", offsetEven: "md:-mt-2 -rotate-6", offsetOdd: "md:mt-6 rotate-4" },
  { justify: "justify-end md:pr-50", offsetEven: "md:mt-4 -rotate-2", offsetOdd: "md:-mt-4 rotate-1" },
  { justify: "justify-end md:pr-20", offsetEven: "md:-mt-6 -rotate-4", offsetOdd: "md:mt-2 rotate-4" },
  { justify: "justify-start md:pl-70", offsetEven: "md:mt-2 -rotate-4", offsetOdd: "md:-mt-6 rotate-6" },
  { justify: "justify-end md:pr-70", offsetEven: "md:-mt-4 -rotate-4", offsetOdd: "md:mt-4 rotate-6" },
];

export const DEPARTMENT_BG_COLORS: Record<typeof DEPARTMENT_ORDER[number], string> = {
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

  return (
    <>
      <div className="text-left">
        <h1 className="text-8xl font-heading font-bold mb-8 text-accent1-primary">Meet the <span className="text-accent2-primary">Team</span></h1>
      </div>
      <div className="flex flex-col items-center gap-y-16 max-w-6xl mx-auto">

        {DEPARTMENT_ORDER
          .filter((deptName) => {
            const members = teamData[deptName];
            return members && members.length > 0;
          })
          .map((deptName, deptIdx) => {
            const members = teamData[deptName]!;

            // Gets spot pattern for active row index (0, 1, 2, 3...)
            const pattern = DEPARTMENT_PATTERNS[deptIdx % DEPARTMENT_PATTERNS.length];
            const bgColor = DEPARTMENT_BG_COLORS[deptName] || "bg-[var(--color-accent1-primary)]";

            return (
              <div key={deptName} className="w-full flex flex-col items-center">
                <div className={`w-full flex flex-wrap items-center gap-x-12 ${pattern.justify}`}>
                  {members.map((member, idx) => {
                    const cardOffset = idx % 2 === 0 ? pattern.offsetEven : pattern.offsetOdd;

                    return (
                      <div key={member.fullName} className={cardOffset}>
                        <MemberInfo stats={member} bgColor={bgColor}/>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

        <img
          src={glassesSvg}
          alt=""
          className="hidden lg:block absolute top-60 right-4 z-0 pointer-events-none"
        />
        <img
          src={rPenSvg}
          alt=""
          className="hidden lg:block absolute top-160 right-4 z-0 pointer-events-none"
        />
        <img
          src={bPenSvg}
          alt=""
          className="hidden lg:block absolute top-190 right-18 z-0 pointer-events-none"
        />
        <img
          src={noteSvg}
          alt=""
          className="hidden lg:block absolute top-320 left-0 z-0 pointer-events-none"
        />
        <img
          src={rEraserSvg}
          alt=""
          className="hidden lg:block absolute top-550 right-18 z-0 pointer-events-none"
        />
        <img
          src={bEraserSvg}
          alt=""
          className="hidden lg:block absolute top-530 right-50 z-0 pointer-events-none"
        />
      </div>
    </>
  );
}
