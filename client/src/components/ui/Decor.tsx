import { motion } from "motion/react";

type Tone = "blue" | "red" | "light" | "lilac" | "pink" | "cream";

const TONES: Record<Tone, string> = {
  blue: "var(--color-accent1-primary)",
  red: "var(--color-accent2-primary)",
  light: "var(--color-accent1-secondary)",
  lilac: "var(--color-blue-150)",
  pink: "var(--color-red-100)",
  cream: "var(--color-background-primary)",
};

type Props = {
  className?: string;
  size?: number;
  tone?: Tone;
  spin?: boolean;
};

const spinProps = (spin: boolean, duration: number) =>
  spin
    ? { animate: { rotate: 360 }, transition: { duration, repeat: Infinity, ease: "linear" as const } }
    : {};

export function Sparkle({ className = "", size, tone = "blue", spin = false }: Props) {
  return (
    <motion.svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      width={size}
      height={size && size * (167 / 119)}
      viewBox="0 0 119 167"
      fill="none"
      {...spinProps(spin, 24)}
    >
      <path
        d="M50.1076 68.1297L60.6806 7.9706e-06L71.0724 67.7428L103.96 43.2229L76.5181 71.4466L118.98 80.0833L76.8858 91.3673L105.444 123.63L71.5703 94.7263L63.762 166.972L50.6222 96.0186L18.18 125.24L44.9906 91.9559L0.000165008 82.279L44.623 72.0352L16.6961 44.8333L50.1076 68.1297Z"
        fill={TONES[tone]}
      />
    </motion.svg>
  );
}

export function Star({ className = "", size, tone = "red", spin = false }: Props) {
  return (
    <motion.svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      width={size}
      height={size && size * (100 / 79)}
      viewBox="0 -15 79 100"
      fill="none"
      {...spinProps(spin, 28)}
    >
      <path
        d="M26.9347 -15C26.9347 -15 25.9747 12.0655 15.4649 18.0233C9.98271 21.131 0 19.5736 0 19.5736C0 19.5736 10.114 26.1416 11.5987 33.6822C13.3633 42.6444 3.35073 55.0775 3.35073 55.0775C3.35073 55.0775 11.7276 45.7752 19.3312 47.6357C26.9347 49.4961 49.1011 85 49.1011 85C49.1011 85 37.7602 53.8372 41.3687 45.3101C44.9772 36.7829 79 29.031 79 29.031C79 29.031 37.7602 25.3101 34.2806 18.0233C30.801 10.7364 26.9347 -15 26.9347 -15Z"
        fill={TONES[tone]}
      />
    </motion.svg>
  );
}

export function Starburst({ className = "", size, tone = "blue" }: Props) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M14.0382 3.25763e-05L12.6465 7.78823L7.84584 1.49064L10.0303 9.10204L2.963 5.25559L8.37404 11.1154L7.37578e-05 10.8571L7.85199 13.7406L0.00310355 16.8946L8.37676 16.5404L2.97169 22.5806L10.0352 18.727L7.8584 26.5156L12.6525 19.6882L14.0523 28L15.4438 19.6868L20.4191 26.5093L18.1473 18.723L25.0402 22.5695L19.5419 16.5348L28.0031 16.8805L20.4127 13.7343L28.0001 10.843L19.9753 11.1096L25.3804 5.24434L18.1425 9.09797L20.4066 1.48434L15.4378 7.78683L14.0382 3.25763e-05Z"
        fill={TONES[tone]}
      />
    </svg>
  );
}

export function Cloud({ className = "", tone = "blue" }: Props) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      viewBox="0 0 260 90"
      fill={TONES[tone]}
    >
      <circle cx="45" cy="55" r="42" />
      <circle cx="105" cy="38" r="38" />
      <circle cx="160" cy="30" r="30" />
      <circle cx="210" cy="55" r="42" />
      <rect x="45" y="55" width="165" height="40" />
    </svg>
  );
}

export function Zigzag({ className = "", tone = "blue" }: Props) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none w-full ${className}`}
      viewBox="0 0 400 14"
      preserveAspectRatio="none"
      height="14"
    >
      <polyline
        points="0,10 25,2 50,10 75,2 100,10 125,2 150,10 175,2 200,10 225,2 250,10 275,2 300,10 325,2 350,10 375,2 400,10"
        fill="none"
        stroke={TONES[tone]}
        strokeWidth="5"
      />
    </svg>
  );
}

export function StarTrio({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <div className={`flex shrink-0 items-center gap-3 ${className}`}>
      <Star size={size} tone="red" />
      <Star size={size} tone="light" />
      <Star size={size} tone="pink" />
    </div>
  );
}

export function SparkleTrio({ className = "", size = 22 }: { className?: string; size?: number }) {
  return (
    <div className={`flex shrink-0 items-center gap-2 ${className}`}>
      <Sparkle size={size} tone="lilac" />
      <Sparkle size={size} tone="lilac" />
      <Sparkle size={size} tone="lilac" />
    </div>
  );
}

export function OutlineStar({ className = "", size = 26 }: { className?: string; size?: number }) {
  return (
    <svg
      aria-hidden
      className={`pointer-events-none ${className}`}
      width={size}
      height={size}
      viewBox="-8 299 36 35"
      fill="none"
    >
      <path
        d="M9.53579 300.465C9.3959 300.552 9.28307 300.676 9.21003 300.823L5.3617 308.622C5.10787 309.136 4.733 309.58 4.26934 309.917C3.80568 310.254 3.26713 310.473 2.70003 310.555L-5.9083 311.813C-6.07213 311.837 -6.22616 311.905 -6.35284 312.012C-6.47952 312.118 -6.57377 312.258 -6.62484 312.415C-6.67591 312.573 -6.68175 312.741 -6.6417 312.902C-6.60165 313.062 -6.51731 313.209 -6.3983 313.323L-0.171636 319.385C0.239378 319.785 0.546851 320.28 0.724261 320.825C0.90167 321.371 0.943691 321.951 0.846697 322.517L-0.621636 331.082C-0.650206 331.245 -0.632503 331.412 -0.570542 331.565C-0.508581 331.719 -0.404849 331.852 -0.271144 331.949C-0.137439 332.046 0.0208726 332.104 0.185783 332.116C0.350693 332.127 0.515583 332.092 0.661697 332.015L8.3567 327.968C8.86384 327.702 9.42807 327.563 10.0009 327.563C10.5737 327.563 11.1379 327.702 11.645 327.968L19.3417 332.015C19.4879 332.093 19.653 332.128 19.8181 332.117C19.9833 332.105 20.142 332.047 20.2759 331.95C20.4099 331.853 20.5138 331.72 20.5759 331.566C20.6379 331.413 20.6555 331.245 20.6267 331.082L19.1567 322.515C19.0601 321.95 19.1024 321.37 19.2798 320.825C19.4572 320.279 19.7644 319.785 20.175 319.385L26.4017 313.322C26.5197 313.207 26.6032 313.061 26.6427 312.901C26.6821 312.741 26.676 312.573 26.6251 312.416C26.5741 312.259 26.4803 312.12 26.3542 312.014C26.2281 311.908 26.0748 311.839 25.9117 311.815L17.3017 310.555C16.7352 310.472 16.1974 310.253 15.7344 309.916C15.2714 309.579 14.897 309.135 14.6434 308.622L10.7934 300.823C10.7203 300.676 10.6075 300.552 10.4676 300.465C10.3277 300.378 10.1663 300.332 10.0017 300.332C9.83705 300.332 9.67567 300.378 9.53579 300.465Z"
        stroke="var(--color-accent2-primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
