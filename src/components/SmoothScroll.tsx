"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Gentle momentum scrolling for mouse wheels and trackpads. Touch devices keep
 * their native scrolling (Lenis leaves touch alone by default), and anyone who
 * prefers reduced motion gets plain scrolling.
 * Scrollable overlays opt out with `data-lenis-prevent`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: { offset: -72 } });
    return () => lenis.destroy();
  }, []);
  return null;
}
