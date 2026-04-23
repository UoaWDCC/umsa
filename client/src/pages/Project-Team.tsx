import { Link } from "react-router-dom";
export default function ProjectTeam() {

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Project Team</h1>
      <p className="text-lg mb-4">This project was created by:</p>
      <ul className="list-disc list-inside text-lg">
        <li><Link to="/alanna" className="text-blue-500 hover:underline">Alanna Santoso</Link></li>
        <li><Link to="/pruna" className="text-blue-500 hover:underline">Pruna Lee</Link></li>
      </ul>

      <p className="text-sm mb-10">
        welcome! today, you&apos;re going to make your own intro page - click on my name
        to have a look. you can use this page as a template to make your own one, 
        and learn some frontend react along the way :)
      </p>
      
      <p className="pl-15 text-left">
      {/* make a link to your page here! */}
      <Link to="/alanna" className="text-white-500 text-lg hover:italic">Alanna Santoso</Link>
      <br></br><Link to="/terrence" className="text-white-500 text-lg hover:italic">Terrence Wu</Link>
      </p>
    </div>
    </div>
  );
}
