import type { ImgHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Every photo in /public/images also exists as a much lighter .webp next to the .jpg
 * (see scripts/optimize-images.mjs). "/images/hero.jpg" -> "/images/hero.webp".
 * Anything else (uploads from /admin, outside images) has no sibling and returns null.
 */
function webpSibling(src: string): string | null {
  return /^\/images\/[^?#]+\.(jpe?g|png)$/i.test(src)
    ? src.replace(/\.(jpe?g|png)$/i, ".webp")
    : null;
}

/**
 * An <img> that serves the WebP version to browsers that support it and keeps the
 * original as the fallback. `display: contents` means the wrapper never changes layout.
 */
export function Picture({
  src,
  alt,
  ...rest
}: ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string }) {
  const webp = webpSibling(src);
  const img = <img src={src} alt={alt} {...rest} />;
  if (!webp) return img;
  return (
    <picture className="contents">
      <source srcSet={webp} type="image/webp" />
      {img}
    </picture>
  );
}

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
    <Picture
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={cn("object-cover", framed && "media-frame", className)}
    />
  );
}
