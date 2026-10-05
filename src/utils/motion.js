/**
 * Standardized Motion Physics for Saanj Bagh
 * 
 * CINEMATIC_SPRING: 
 * Used for major environmental motion (scroll progress, large parallax).
 * Provides a heavy, fluid lag that mimics a physical cinema camera moving through space.
 */
export const CINEMATIC_SPRING = {
  damping: 35,
  stiffness: 60,
  mass: 0.6
};

/**
 * FAST_SPRING:
 * Used for responsive UI, custom cursors, and magnetic button interactions.
 * Provides snappy, quick response with very subtle weight.
 */
export const FAST_SPRING = {
  damping: 25,
  stiffness: 120,
  mass: 0.2
};
