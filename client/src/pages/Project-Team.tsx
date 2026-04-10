import { Link } from "react-router-dom";
export default function ProjectTeam() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Project Team</h1>
      <p className="text-lg mb-4">This project was created by:</p>
      <ul className="list-disc list-inside text-lg">
        <li><Link to="/alanna" className="text-blue-500 hover:underline">Alanna Santoso</Link></li>
      </ul>
    </div>
  );
}