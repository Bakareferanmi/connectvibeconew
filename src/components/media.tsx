import { cn } from "@/lib/utils";

export function Media({
  src,
  alt,
  className,
  framed = true,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  framed?: boolean;
  /** Set true for images visible on first load (above the fold). */
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("object-cover", framed && "media-frame", className)}
    />
  );
}