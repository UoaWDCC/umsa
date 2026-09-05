import MemberInfo from "../components/MemberInfo";
import { useEffect } from "react";
import glassesSvg from "../assets/team/glasses.svg";
import rPenSvg from "../assets/team/redpen.svg";
import bPenSvg from "../assets/team/bluepen.svg"
import noteSvg from "../assets/team/note.svg";
import rEraserSvg from "../assets/team/rederaser.svg";
import bEraserSvg from "../assets/team/blueeraser.svg";

const DEPARTMENT_ORDER = [
  "Marketing",
  "PublicRelations",
  "Social",
  "Cultural",
  "Sports",
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
  officersByDepartment: Partial<Record<DepartmentName, Member[]>>;
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
  officersByDepartment: {
    Sports: [
      { fullName: "PERSON 5", role: "Sports Officer", img: "...", linkedin: "", instagram: "" },
      { fullName: "PERSON 6", role: "Sports Officer", img: "...", linkedin: "", instagram: "" },
    ],
    Marketing: [
      { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "" },
      { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "" },
      { fullName: "Person 3", role: "Marketing Officer", img: "...", linkedin: "", instagram: "" },
    ],
    Social: [
      { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "" },
      { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "" },
    ],
    Cultural: [
      { fullName: "Person ", role: "Cultrual Officer", img: "...", linkedin: "", instagram: "" },
      { fullName: "Person ", role: "Cultrual Officer", img: "...", linkedin: "", instagram: "" },
    ],
    PublicRelations: [
      { fullName: "Person 4", role: "Public Relation Officer", img: "...", linkedin: "", instagram: "" },
      { fullName: "Person 4", role: "Public Relation Officer", img: "...", linkedin: "", instagram: "" },
    ],
  },
};

const DEPARTMENT_PATTERNS = [
  { justify: "justify-start md:pl-16", offsetEven: "md:-mt-2", offsetOdd: "md:mt-6" },
  { justify: "justify-end md:pr-16", offsetEven: "md:mt-4", offsetOdd: "md:-mt-4" },
  { justify: "justify-center", offsetEven: "md:-mt-6", offsetOdd: "md:mt-2" },
  { justify: "justify-start md:pl-8", offsetEven: "md:mt-2", offsetOdd: "md:-mt-6" },
  { justify: "justify-end md:pr-24", offsetEven: "md:-mt-4", offsetOdd: "md:mt-4" },
];

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
          className="hidden lg:block absolute top-320 right-18 z-0 pointer-events-none"
        />
        <img
          src={bEraserSvg}
          alt=""
          className="hidden lg:block absolute top-320 right-18 z-0 pointer-events-none"
        />

        {/* President Section */}
        {teamData.presidents.length > 0 && (
          <div className="w-full flex flex-wrap justify-start md:pl-25 items-center gap-x-12">
            {teamData.presidents.map((member, idx) => (
              <div key={member.fullName} className={idx % 2 !== 1 ? "md:mt-2" : "md:-mt-4"}>
                <MemberInfo stats={member} />
              </div>
            ))}
          </div>
        )}

        {/* Executive Section */}
        {teamData.executives.length > 0 && (
          <div className="w-full flex flex-wrap justify-center items-center gap-x-12">
            {teamData.executives.map((member, idx) => (
              <div key={member.fullName} className={idx % 2 !== 1 ? "md:mt-2" : "md:-mt-4"}>
                <MemberInfo stats={member} />
              </div>
            ))}
          </div>
        )}

        {/*Officer Section */}
        {DEPARTMENT_ORDER
          .filter((deptName) => {
            const members = teamData.officersByDepartment[deptName];
            return members && members.length > 0;
          })
          .map((deptName, deptIdx) => {
            const members = teamData.officersByDepartment[deptName]!;

            // Gets spot pattern for active row index (0, 1, 2, 3...)
            const pattern = DEPARTMENT_PATTERNS[deptIdx % DEPARTMENT_PATTERNS.length];

            return (
              <div key={deptName} className="w-full flex flex-col items-center">
                <div className={`w-full flex flex-wrap items-center gap-x-12 ${pattern.justify}`}>
                  {members.map((member, idx) => {
                    const cardOffset = idx % 2 === 0 ? pattern.offsetEven : pattern.offsetOdd;

                    return (
                      <div key={member.fullName} className={cardOffset}>
                        <MemberInfo stats={member} />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

      </div>
    </>
  );
}
