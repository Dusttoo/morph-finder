// ─────────────────────────────────────────────────────────────────────────────
// Display helpers for allele metadata
//
// Maps allele IDs from CRESTED_GECKO_ALLELES to UI-ready display information.
// Badge colors use the BBD (Built By Dusty) palette.
//
// NOTE: The Geckistry getAlleleDisplayInfo() takes a live GeckoAlleleWithDetails
// object from Supabase (with zygosity tracking). This version takes only an
// allele ID string — appropriate for the standalone Morph Finder wizard, which
// has no pedigree context and works purely from visual observation.
// ─────────────────────────────────────────────────────────────────────────────

import { CRESTED_GECKO_ALLELES } from './data/crested-gecko-alleles'
import type { InheritancePattern, TraitCategory } from './data/crested-gecko-alleles'

export interface AlleleDisplayInfo {
  id: string
  displayName: string
  badgeColor: string       // hex string — BBD palette
  badgeLabel: string       // short label for a UI chip, max 12 chars
  inheritanceLabel: string // plain English: 'Recessive', 'Polygenic', etc.
  tooltipText: string      // 1-2 sentence explanation for curious users
}

// ─────────────────────────────────────────────
// BBD palette → category badge colors
// ─────────────────────────────────────────────

const CATEGORY_BADGE_COLORS: Record<TraitCategory, string> = {
  structural: '#2D5016',  // Forest green — structural traits
  modifier:   '#C4783A',  // Amber — color modifiers
  base_color: '#4A5C46',  // Muted sage — base colors
  pattern:    '#A8C89A',  // Light sage — pattern traits
}

// ─────────────────────────────────────────────
// Inheritance → human-readable label
// ─────────────────────────────────────────────

const INHERITANCE_LABELS: Record<InheritancePattern, string> = {
  recessive:           'Recessive',
  dominant:            'Dominant',
  incomplete_dominant: 'Incomplete Dominant',
  polygenic:           'Polygenic',
  codominant:          'Co-Dominant',
}

// ─────────────────────────────────────────────
// Badge label — abbreviated, ≤12 chars
// ─────────────────────────────────────────────

function buildBadgeLabel(displayName: string, inheritance: InheritancePattern): string {
  // Prefer concise inheritance shorthand for structural and recessive traits
  if (inheritance === 'recessive') return 'Recessive'
  if (inheritance === 'incomplete_dominant') return 'Inc. Dom.'
  if (inheritance === 'dominant') return 'Dominant'
  if (inheritance === 'polygenic') return 'Polygenic'
  if (inheritance === 'codominant') return 'Co-Dom.'

  // Fallback: truncate display name
  return displayName.length > 12 ? displayName.slice(0, 11) + '…' : displayName
}

// ─────────────────────────────────────────────
// Tooltip text — derived from allele description
// ─────────────────────────────────────────────

function buildTooltip(allele: typeof CRESTED_GECKO_ALLELES[number]): string {
  // Use first sentence of description for brevity
  const firstSentenceMatch = allele.description.match(/^[^.!?⚠️]+[.!?]/)
  const firstSentence = firstSentenceMatch
    ? firstSentenceMatch[0].replace(/^⚠️\s*/, '').trim()
    : allele.description.slice(0, 120)

  const inheritanceLabel = INHERITANCE_LABELS[allele.inheritance]
  return `${firstSentence} (${inheritanceLabel})`
}

// ─────────────────────────────────────────────
// getAlleleDisplayInfo
// ─────────────────────────────────────────────

/**
 * Returns UI display metadata for a given allele ID.
 *
 * @param alleleId - The snake_case id from CRESTED_GECKO_ALLELES (e.g. 'lilly_white')
 * @returns AlleleDisplayInfo, or null if the allele ID is not found
 */
export function getAlleleDisplayInfo(alleleId: string): AlleleDisplayInfo | null {
  const allele = CRESTED_GECKO_ALLELES.find((a) => a.id === alleleId)
  if (!allele) return null

  return {
    id: allele.id,
    displayName: allele.displayName,
    badgeColor: CATEGORY_BADGE_COLORS[allele.category],
    badgeLabel: buildBadgeLabel(allele.displayName, allele.inheritance),
    inheritanceLabel: INHERITANCE_LABELS[allele.inheritance],
    tooltipText: buildTooltip(allele),
  }
}
