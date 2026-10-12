"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Two jobs:
 * 1. Every visit opens on the hero. Browsers otherwise restore the last scroll position on
 *    reload, and links copied after tapping a menu item (…/#location) jump straight to that
 *    section — so we drop the #section from the address and start at the top.
 * 2. Gentle momentum scrolling for mouse wheels and trackpads. Touch devices keep their
 *    native scrolling (Lenis leaves touch alone by default), and anyone who prefers reduced
 *    motion gets plain scrolling. Scrollable overlays opt out with `data-lenis-prevent`.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ autoRaf: true, lerp: 0.1, anchors: true });
    lenis.scrollTo(0, { immediate: true });
    return () => lenis.destroy();
  }, []);
  return null;
}
