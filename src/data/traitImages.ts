/**
 * Maps trait/allele option keys to their reference image paths.
 *
 * Images live in public/images/traits/. Drop replacement photos there and
 * update the map — no component changes needed.
 *
 * Supported formats: .jpg, .png, .webp
 *
 * Keys use SCREAMING_SNAKE_CASE to match the store values written by each
 * wizard step (e.g. answers[0] === 'BLACK').
 */

export type TraitImageMap = Record<string, string>

// ── Step 1 — Base color ───────────────────────────────────────────────────────

export const baseColorImages: TraitImageMap = {
  BLACK:      '/images/traits/black-base.jpg',
  RED:        '/images/traits/red-base.jpg',
  YELLOW:     '/images/traits/yellow-base.jpg',
  WILD_TYPE:  '/images/traits/wild-type-base.jpg',
}

// ── Step 2 — Pattern type ─────────────────────────────────────────────────────

export const patternImages: TraitImageMap = {
  HARLEQUIN:  '/images/traits/harlequin-pattern.jpg',
  FLAME:      '/images/traits/flame-pattern.jpg',
  TIGER:      '/images/traits/tiger-pattern.jpg',
  PATTERNLESS: '/images/traits/patternless-pattern.jpg',
  UNKNOWN:    '/images/traits/unknown-pattern.jpg',
}

// Future steps — add maps here as each step is built (PROD-19 through PROD-21):
// export const structureImages: TraitImageMap = { ... }

// ── Fallback colors when no image is configured ───────────────────────────────

/**
 * Hex color shown as a placeholder swatch when no image is available.
 * Keyed by the same option values as the image maps.
 */
export const BASE_COLOR_FALLBACKS: Record<string, string> = {
  BLACK:     '#3A3A3A',  // dark charcoal
  RED:       '#7A2A2A',  // deep burgundy
  YELLOW:    '#BF9620',  // warm gold
  WILD_TYPE: '#7A6040',  // warm brown / buckskin
}

// ── Generic getter ─────────────────────────────────────────────────────────────

/**
 * Returns the image path for a given key, or null if none is configured.
 * The TraitImage component falls back to a colored placeholder on null.
 */
export function getTraitImage(map: TraitImageMap, key: string): string | null {
  return map[key] ?? null
}
