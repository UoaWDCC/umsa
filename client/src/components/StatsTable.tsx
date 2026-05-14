{/* this sets up the types for the stats table */}
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

{/* this sets up the properties */}
type Props = {
  stats: MemberStats;
};

{/* this is where we export the stats table as a function so we can reuse it */}
export default function MemberStatsTable({ stats }: Props) {
{/* here we set up the const rows by taking the stats from props */}
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

{/* we return the formatted table here */}
  return (
    <div className="max-w-md text-black">
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
