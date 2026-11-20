import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenis: Lenis | null = null;

// Smooth scrolling only for users who haven't asked for reduced motion
export const initSmoothScroll = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  lenis = new Lenis();

  // Synchronize Lenis scrolling with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update);

  // Add Lenis to the GSAP ticker
  gsap.ticker.add((time) => {
    lenis?.raf(time * 1000);
  });

  // Disable lag smoothing for consistent movement
  gsap.ticker.lagSmoothing(0);
};

/**
 * Scroll to a section by id (or to the top with 0).
 * Pinned sections are wrapped by GSAP in a ".pin-spacer" that stays in the normal flow,
 * so we measure that wrapper — the pinned element itself may be position: fixed.
 */
export const scrollToTarget = (target: string | 0) => {
  let top = 0;
  if (target !== 0) {
    const el = document.getElementById(target);
    if (!el) return;
    const anchor = (el.closest('.pin-spacer') as HTMLElement | null) ?? el;
    top = anchor.getBoundingClientRect().top + window.scrollY;
  }

  if (lenis) {
    lenis.scrollTo(top, { duration: 1.4 });
  } else {
    window.scrollTo({ top, behavior: 'auto' });
  }
};
