import Image, { type ImageProps } from "next/image";
import blur from "@/lib/blur.json";

const blurs = blur as Record<string, string>;

/** next/image with a blurred preview for every local photo (see scripts/gen-blur.mjs). */
export default function Img({ alt, ...props }: ImageProps) {
  const preview = typeof props.src === "string" ? blurs[props.src] : undefined;
  return <Image alt={alt} {...(preview ? { placeholder: "blur", blurDataURL: preview } : {})} {...props} />;
}
