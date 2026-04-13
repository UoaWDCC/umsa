import React from "react";

type MemberStats = {
  fullName: string;
  age: number;
  ethnicity: string;
  year: string;
  degree: string;
  typingSpeed: string;
  favouritePaper: string;
  favouriteFood: string;
};

type Props = {
  stats: MemberStats;
};

export default function MemberStatsTable({ stats }: Props) {
  const rows = [
    { label: "Full Name", value: stats.fullName },
    { label: "Age", value: stats.age },
    { label: "Ethnicity", value: stats.ethnicity },
    { label: "Year", value: stats.year },
    { label: "Degree", value: stats.degree },
    { label: "Avg Typing Speed", value: stats.typingSpeed },
    { label: "Favourite Paper", value: stats.favouritePaper },
    { label: "Favourite Food", value: stats.favouriteFood },
  ];

  return (
    <div className="max-w-md">
      <table className="border-separate border-spacing-y-2 border-spacing-x-2 w-full text-xs">

        <tbody>

          {rows.map((row) => (
            <tr key={row.label} className="border-b last:border-none">
              <td className="text-left text-gray-400">
                {row.label}
              </td>
              <td className="text-left text-white font-medium">
                {row.value}
              </td>
            </tr>
          ))}

        </tbody>
      </table>
    </div>
  );
}