import NewNavbar from "./NewNavbar";
import Marquee from "./Marquee";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <NewNavbar />
      <Marquee />
    </header>
  );
}
