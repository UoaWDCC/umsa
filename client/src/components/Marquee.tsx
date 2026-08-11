import starLarge from "../assets/star-solid.png";
import starSmall from "../assets/star-outline.png";

const MARQUEE_ITEMS = Array.from({ length: 6 });

export default function Marquee() {
  return (
    <div
      className="w-full overflow-hidden bg-[#2626e0]"
      role="marquee"
      aria-label="Welcome to UMSA"
    >
      <div className="flex h-14 w-max animate-marquee">
        {[0, 1].map((group) => (
          <div
            key={group}
            className="flex h-full items-center"
            aria-hidden={group === 1 ? true : undefined}
          >
            {MARQUEE_ITEMS.map((_, i) => (
              <div key={i} className="flex h-full items-center">
                <img
                  src={i % 2 === 0 ? starLarge : starSmall}
                  alt=""
                  className={
                    i % 2 === 0
                      ? "h-full w-auto flex-shrink-0 -mr-1"
                      : "h-full w-auto flex-shrink-0 mr-2"
                  }
                />
                <span className="whitespace-nowrap px-6 text-lg font-sekuya uppercase tracking-wide text-white">
                  Welcome to UMSA
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}