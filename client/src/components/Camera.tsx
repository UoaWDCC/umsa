/* The camera illustration from the PHOTOS frame. Every rect, circle and curve
   below is copied verbatim out of `assets/frames/PHOTOS.svg` — page coordinates
   and all — so the proportions are the file's, not an approximation. The one
   change is the body's hard offset shadow: Figma exports it as an feOffset
   filter, and it is cheaper here as a second rect drawn 10 left / 20 down. */
export default function Camera({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox="-165 1105 1255 625"
      fill="none"
    >
      <path
        d="M948.501 1451.5C1066.16 1353.42 533.05 1441.89 533.05 1441.89C533.05 1441.89 678.527 1531.55 785.018 1524.63C867.165 1519.3 891.995 1498.6 947.864 1452.03L948.501 1451.5Z"
        stroke="#ADABBA"
        strokeWidth="20"
      />
      <rect
        x="-152"
        y="1311.5"
        width="630"
        height="409"
        rx="10"
        transform="translate(-10 20) rotate(-17.6959 -152 1311.5)"
        fill="var(--color-gray-200)"
      />
      <rect
        x="-152"
        y="1311.5"
        width="630"
        height="409"
        rx="10"
        transform="rotate(-17.6959 -152 1311.5)"
        fill="#07072C"
      />
      <rect
        x="-152"
        y="1311.5"
        width="630"
        height="113"
        rx="10"
        transform="rotate(-17.6959 -152 1311.5)"
        fill="#ADABBA"
      />
      <circle
        cx="290.978"
        cy="1416.83"
        r="120"
        transform="rotate(-17.6959 290.978 1416.83)"
        fill="#2E2B3B"
        stroke="#ADABBA"
        strokeWidth="20"
      />
      <circle
        cx="290.978"
        cy="1416.83"
        r="39"
        transform="rotate(-17.6959 290.978 1416.83)"
        fill="#07072C"
      />
      <rect
        x="-68.168"
        y="1334.08"
        width="115"
        height="19"
        rx="9.5"
        transform="rotate(-17.6959 -68.168 1334.08)"
        fill="#928FA3"
      />
      <rect
        x="308.246"
        y="1181.45"
        width="130"
        height="79"
        rx="10"
        transform="rotate(-17.6959 308.246 1181.45)"
        fill="#07072C"
      />
      <rect
        x="331.251"
        y="1187.75"
        width="90"
        height="55"
        rx="10"
        transform="rotate(-17.6959 331.251 1187.75)"
        fill="#2E2B3B"
      />
      <path
        d="M967 1434.67C1077.83 1315.25 550 1421.67 550 1421.67C550 1421.67 687.147 1530.66 787.5 1522.17C865.206 1515.6 913.952 1491.83 967 1434.67Z"
        stroke="#0E0E58"
        strokeWidth="20"
      />
      <rect
        x="257.117"
        y="1397.37"
        width="22.3519"
        height="20"
        rx="5"
        transform="rotate(-15 257.117 1397.37)"
        fill="#F9F9FB"
      />
      <rect
        x="237"
        y="1404.22"
        width="12.4316"
        height="20"
        rx="5"
        transform="rotate(-15 237 1404.22)"
        fill="#F9F9FB"
      />
      <rect
        x="372.784"
        y="1191.48"
        width="10.5272"
        height="16.9363"
        rx="5"
        transform="rotate(72.6124 372.784 1191.48)"
        fill="#F9F9FB"
      />
    </svg>
  );
}
