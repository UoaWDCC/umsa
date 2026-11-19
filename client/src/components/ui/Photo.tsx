import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;

  priority?: boolean;
};

export default function Photo({ src, alt, className = "", priority = false }: Props) {
  const [ready, setReady] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setReady(true)}
      onError={() => setReady(true)}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      {...(priority ? { fetchPriority: "high" as const } : {})}
      className={`${className} transition-opacity duration-500 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}
