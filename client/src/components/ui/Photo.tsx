import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** the one image above the fold on a cold load shouldn't wait its turn */
  priority?: boolean;
};

/* Photos snap in the moment they decode, which on a first (uncached) load reads
   as the page glitching — everything is laid out, then pictures bang in one by
   one. Nothing here changes layout: the box is already reserved by the caller,
   so this only cross-fades the pixels once they are actually ready. */
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
