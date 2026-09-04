import MemberInfo from "../components/MemberInfo";
import { useEffect } from "react";

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
    ],
    Social: [
      { fullName: "Person 4", role: "Social Officer", img: "...", linkedin: "", instagram: "" },
    ],
    Cultural: [
      { fullName: "Person ", role: "Cultrual Officer", img: "...", linkedin: "", instagram: "" },
    ],
    PublicRelations: [
      { fullName: "Person 4", role: "Public Relation Officer", img: "...", linkedin: "", instagram: "" },
    ],
  },
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
        
        {/* President Section */}
        {teamData.presidents.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-12">
            {teamData.presidents.map((member, idx) => (
              <div key={member.fullName} className={idx % 2 !== 0 ? "md:mt-8" : "md:-mt-4"}>
                <MemberInfo stats={member} />
              </div>
            ))}
          </div>
        )}

        {/* Executive Section */}
        {teamData.executives.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-x-12">
            {teamData.executives.map((member, idx) => (
              <div key={member.fullName} className={idx % 2 !== 0 ? "md:mt-8" : "md:-mt-4"}>
                <MemberInfo stats={member} />
              </div>
            ))}
          </div>
        )}

        {/*Officer Section */}
        {DEPARTMENT_ORDER.map((deptName) => {
          const members = teamData.officersByDepartment[deptName];

          // Skip rendering section if department has no members
          if (!members || members.length === 0) return null;

          return (
            <div key={deptName} className="w-full flex flex-col items-center">
              {/* Department Row Container */}
              <div className="flex flex-wrap justify-center items-center gap-x-12">
                {members.map((member, idx) => (
                  <div key={member.fullName} className={idx % 2 !== 0 ? "md:mt-8" : "md:-mt-4"}>
                    <MemberInfo stats={member} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>
    </>
  );
}
