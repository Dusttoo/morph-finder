// ─────────────────────────────────────────────────────────────────────────────
// @morphfinder/genetics — barrel export
//
// Pure TypeScript package. No React, no Expo, no Supabase, no native modules.
// All crested gecko allele data is embedded as static typed data.
// ─────────────────────────────────────────────────────────────────────────────

// Data
export { CRESTED_GECKO_ALLELES } from './data/crested-gecko-alleles'
export type {
  Allele,
  TraitCategory,
  InheritancePattern,
} from './data/crested-gecko-alleles'

// Phenotype inference
export { generatePhenotypeQuestions, resolveObservation } from './phenotype-inference'
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
