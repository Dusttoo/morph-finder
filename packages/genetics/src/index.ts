// ─────────────────────────────────────────────────────────────────────────────
// @morphfinder/genetics — barrel export
//
// Pure TypeScript package. No React, no Expo, no Supabase, no native modules.
// All crested gecko allele data is embedded as static typed data.
// ─────────────────────────────────────────────────────────────────────────────

// Data — alleles
export { CRESTED_GECKO_ALLELES } from './data/crested-gecko-alleles'
export type {
  Allele,
  TraitCategory,
  InheritancePattern,
} from './data/crested-gecko-alleles'

// Data — combo morphs
export { CRESTED_GECKO_COMBO_MORPHS } from './data/combo-morphs'
export type { ComboMorph } from './data/combo-morphs'

// Data — trait interactions
export { CRESTED_GECKO_TRAIT_INTERACTIONS } from './data/trait-interactions'
export type { TraitInteraction, InteractionType } from './data/trait-interactions'

// Phenotype inference
export {
  generatePhenotypeQuestions,
  resolveObservation,
  // Hard-rule constants
  FIXED_ALLELES,
  NOT_AN_ALLELE,
  PHANTOM_EXPRESSIONS,
  C2_FORMULA,
  C2_MISCONCEPTION,
  LETHAL_HOMOZYGOUS,
  EARLY_STAGE_RESEARCH,
  EPISTATIC_DEPENDENCIES,
  ALLELIC_PAIRS,
} from './phenotype-inference'
export type {
  PhenotypeQuestion,
  PhenotypeOption,
  ObservationInput,
  ResolutionResult,
} from './phenotype-inference'

// Display helpers
export { getAlleleDisplayInfo } from './display'
export type { AlleleDisplayInfo } from './display'

// Mendelian rules (stubs — Phase 2)
export { calculateMendelianRates, calculateInheritanceRates } from './mendelian-rules'
export type {
  PairingInput,
  OffspringProbability,
  MendelianResult,
} from './mendelian-rules'
