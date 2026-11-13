import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  tone?: "red" | "blue" | "outline";
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

const TONES = {
  red: "bg-accent2-primary text-white hover:bg-red-400",
  blue: "bg-accent1-primary text-white hover:bg-blue-400",
  outline:
    "bg-transparent text-accent1-primary border-2 border-accent1-primary hover:bg-accent1-primary hover:text-white",
};

export default function Button({
  children,
  to,
  href,
  onClick,
  tone = "red",
  type = "button",
  disabled,
  className = "",
}: Props) {
  const classes = `inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold
    uppercase tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed
    ${TONES[tone]} ${className}`;

  const motionProps = {
    whileHover: disabled ? undefined : { scale: 1.05 },
    whileTap: disabled ? undefined : { scale: 0.96 },
    transition: { type: "spring" as const, stiffness: 400, damping: 22 },
  };

  if (to) {
    return (
      <motion.div {...motionProps} className="inline-block">
        <Link to={to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if (href) {
    return (
      <motion.a
        {...motionProps}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...motionProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
