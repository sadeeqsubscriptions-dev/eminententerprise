import Image, { type ImageProps } from "next/image";

/**
 * Drop-in replacement for next/image used everywhere a listing/project/case
 * study photo is rendered. Mock data stores picsum.photos URLs (the shape a
 * real photo-CDN response takes); this rewrites those to our own branded SVG
 * placeholder route so rendering never depends on external network access.
 * Swap `resolveSrc` when real listing photography replaces the mock data.
 */
function resolveSrc(src: ImageProps["src"]): ImageProps["src"] {
  if (typeof src !== "string") return src;
  const match = src.match(/picsum\.photos\/seed\/([^/]+)\/(\d+)\/(\d+)/);
  if (!match) return src;
  const [, seed, w, h] = match;
  return `/api/placeholder?seed=${encodeURIComponent(seed)}&w=${w}&h=${h}`;
}

export function PropertyImage({ alt, ...props }: ImageProps) {
  const resolvedSrc = resolveSrc(props.src);
  const isPlaceholder = typeof resolvedSrc === "string" && resolvedSrc.startsWith("/api/placeholder");
  return <Image {...props} alt={alt} src={resolvedSrc} unoptimized={isPlaceholder} />;
}
