import { cn } from "@/lib/utils";

export function Media({
  src,
  alt,
  className,
  framed = true,
}: {
  src: string;
  alt: string;
  className?: string;
  framed?: boolean;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("object-cover", framed && "media-frame", className)}
    />
  );
}
