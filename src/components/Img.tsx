import Image, { type ImageProps } from "next/image";
import blur from "@/lib/blur.json";

const blurs = blur as Record<string, string>;

/** next/image with a blurred preview for every local photo (see scripts/gen-blur.mjs) and a lighter default quality. */
export default function Img({ alt, quality = 60, ...props }: ImageProps) {
  const preview = typeof props.src === "string" ? blurs[props.src] : undefined;
  return <Image alt={alt} quality={quality} {...(preview ? { placeholder: "blur", blurDataURL: preview } : {})} {...props} />;
}
