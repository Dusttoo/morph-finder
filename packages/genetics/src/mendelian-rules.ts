// ─────────────────────────────────────────────────────────────────────────────
// Mendelian Rules — Phase 2 stubs
//
// Pairing predictor logic for breeding offspring probability.
// NOT implemented for MVP — Morph Finder is identification-only at launch.
// Implement in Phase 2 when pedigree / pairing features are added.
//
// Note: Crested gecko Mendelian prediction is complex because:
// - Tiger (TIG) is fixed in all animals (no Punnett logic needed)
// - Brindle is a TIG × PIN interaction, not a single-locus trait
// - Lilly White (L/L homozygous) is LETHAL — must be guarded at this layer
// - Polygenic traits (WP, OP, FLAME) don't follow simple Punnett ratios
// ─────────────────────────────────────────────────────────────────────────────

export interface PairingInput {
  sireAlleleIds: string[]
  damAlleleIds: string[]
}

export interface OffspringProbability {
  alleleIds: string[]
  morphName: string
  probability: number   // 0–1
}

export interface MendelianResult {
  offspring: OffspringProbability[]
  notes: string[]
}

// MVP stubs — implement in Phase 2
export function calculateMendelianRates(input: PairingInput): MendelianResult {
  throw new Error('calculateMendelianRates: not implemented in MVP')
}

export function calculateInheritanceRates(
  alleleId: string,
  inheritancePattern: string
): number[] {
  throw new Error('calculateInheritanceRates: not implemented in MVP')
}
