import { useHomeContent } from "./hooks/useHomeContent";
import type { HomeContentValues } from "./schemas/content";

// exemplar CMS default data -> shown when data does not exist / API is down 
const DEFAULTS: HomeContentValues = {
  heading: "Welcome to Project UMSA!",
  subtitle: "to get started, go to the project team section and have a look :)",
};

function App() {
  const { data } = useHomeContent();
  const content = data ?? DEFAULTS;

  return (
    <div className="flex flex-col min-h-200 justify-center items-center">
      <h1 className="text-4xl mt-7 font-bold text-blue-500">{content.heading}</h1>
      <div className="text-sm mt-3 text-blue-400">
        <p>{content.subtitle}</p>
      </div>
    </div>
  );
}
export default App;
