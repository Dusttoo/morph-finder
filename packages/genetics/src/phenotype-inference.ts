// ─────────────────────────────────────────────────────────────────────────────
// Phenotype Inference Engine
//
// Generates the ordered question list for the Morph Finder wizard and resolves
// a set of answers into a morph name + confidence score.
//
// Direction: FORWARDS — from visual observations to morph name.
//
// KEY GENETIC FACTS encoded in this logic:
// - Brindle is a Tiger × Pinstripe visual interaction — not an allele.
//   The wizard still includes it as a visual option; the morph name reflects
//   the interaction and notes explain the genetics.
// - "Patternless" in colloquial usage may mean Phantom (PH) suppressing
//   pattern color, OR the true Patternless allele (PTL). The wizard cannot
//   distinguish these without a breeding test, so confidence is noted.
// - Lilly White requires Harlequin or Flame to visually express — asking about
//   it only makes sense for those pattern animals (enforced via dependsOn).
// - Tiger (TIG) is FIXED — present in every crested gecko. Always included in
//   matchedAlleleIds, never asked as a wizard question.
// ─────────────────────────────────────────────────────────────────────────────

import type { TraitCategory } from './data/crested-gecko-alleles'
import { CRESTED_GECKO_COMBO_MORPHS } from './data/combo-morphs'
import type { ComboMorph } from './data/combo-morphs'
import { CRESTED_GECKO_TRAIT_INTERACTIONS } from './data/trait-interactions'

// ─────────────────────────────────────────────
// Hard-rule constants (Phase 2 genetics engine)
// ─────────────────────────────────────────────

/** Tiger (TIG) is fixed — present in every crested gecko, never a wizard question */
export const FIXED_ALLELES = ['tiger'] as const

/** These are visual effects / interactions, NOT discrete alleles */
export const NOT_AN_ALLELE = ['brindle', 'reverse_pin'] as const

/** Phenotypic expressions of Phantom (PH) allele — not separate alleles */
export const PHANTOM_EXPRESSIONS = ['bicolor', 'patternless_ph', 'buckskin', 'cream', 'tan'] as const

/** Allele IDs that compose C2 — "Citrus" is a hobby misconception for this combination */
export const C2_FORMULA = ['yellow_base', 'hypo'] as const

/** Plain-English correction for the C2 / Citrus misconception */
export const C2_MISCONCEPTION =
  '"Citrus" is a widespread hobby misconception for C2 (Yellow Base + Hypo). ' +
  'C2 is the genetically accurate term — it results from Yellow Base (y, dominant) combined with Hypo (H), not from a distinct "Citrus" allele.'

/** Alleles where L/L homozygous (Super form) is lethal — offspring die within days */
export const LETHAL_HOMOZYGOUS = ['lilly_white'] as const

/** Alleles still under active research — treat results with lower confidence */
export const EARLY_STAGE_RESEARCH = ['marbling', 'furry'] as const

/** Alleles that require a specific other allele to visually express */
export const EPISTATIC_DEPENDENCIES: Record<string, string> = {
  snowflake: 'white_pattern',
}

/** Allele pairs that occupy the same gene locus — animal can have at most one copy of each */
export const ALLELIC_PAIRS: readonly (readonly string[])[] = [
  ['sable', 'cappuccino'],
] as const

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface PhenotypeOption {
  id: string
  label: string
  description?: string
  imageHint?: string  // reserved for Phase 2 image support
}

export interface PhenotypeQuestion {
  id: string               // e.g. 'base_color'
  prompt: string           // question shown to user
  category: TraitCategory
  options: PhenotypeOption[]
  allowsMultiple: boolean  // true for modifier questions
  dependsOn?: {            // only show this question if...
    questionId: string
    selectedOptionIds: string[]
  }
}

export interface ObservationInput {
  questionId: string
  selectedOptionIds: string[]
}

export interface ResolutionResult {
  morphName: string           // e.g. 'Harlequin Pinstripe Dalmatian'
  confidence: 'high' | 'medium' | 'low'
  matchedAlleleIds: string[]
  notes?: string              // e.g. 'Firing state variability may affect accuracy'
  /**
   * Het hint for the result screen — shown when blush_indicator is answered 'yes'
   * and the base color is not Red (suggesting the animal may carry one copy of
   * the recessive Red Base allele, causing a "Blush" marker on the cheeks).
   */
  hetHint?: string
  reptiDexPrompt?: string     // CTA copy for the result screen
}

// ─────────────────────────────────────────────
// Question generation
// ─────────────────────────────────────────────

/**
 * Returns the full ordered question list for the Morph Finder wizard.
 *
 * Order:
 *   1. Base color
 *   2. Pattern type
 *   3. Pattern color modifiers (white / orange presence)
 *   4. Structural — pinstripe degree
 *   5. Color modifier (hypo / phantom / tangerine / sable / cappuccino)
 *   6. Modifiers — dalmatian
 *   7. Modifiers — axanthic
 *   8. White expression (dependsOn harlequin or flame)
 *   9. Blush indicator (dependsOn non-red base color)
 *  10. Firing state confidence
 *
 * Genetic note: Tiger (TIG) is fixed in all crested geckos and is not
 * asked about directly. Brindle is offered as a visual option for pattern
 * type but is internally flagged as a Tiger × Pinstripe interaction.
 */
export function generatePhenotypeQuestions(): PhenotypeQuestion[] {
  return [
    // ── 1. Base color ─────────────────────────────────────────────────────
    {
      id: 'base_color',
      prompt: "What is the gecko's overall base / background color?",
      category: 'base_color',
      allowsMultiple: false,
      options: [
        {
          id: 'wild_type',
          label: 'Natural / Wild-Type Brown',
          description:
            'Warm earthy brown — the standard wild-type coloration. Brown hues visible on head-stamp. (Wild-Type Melanin, WT-MEL)',
        },
        {
          id: 'black',
          label: 'Dark to Black',
          description:
            'Dark brown to near-black base. Selectively bred for deep melanin expression. (Black Base, B — dominant)',
        },
        {
          id: 'red',
          label: 'Orange-Red to Deep Red',
          description:
            'Warm orange-red to crimson base color. May show "Blush" on cheeks if carrying one copy. (Red Base, r — recessive, needs two copies to fully express)',
        },
        {
          id: 'yellow',
          label: 'Vivid Yellow',
          description:
            'Bright yellow cast throughout. Yellow visible at knees and toes. (Yellow Base, y — dominant)',
        },
      ],
    },

    // ── 2. Pattern type ────────────────────────────────────────────────────
    {
      id: 'pattern_type',
      prompt: "What pattern does the gecko's body show?",
      category: 'pattern',
      allowsMultiple: false,
      options: [
        {
          id: 'harlequin',
          label: 'Harlequin',
          description:
            'Bold cream or white pattern extending from the dorsal onto the sides and legs. Pattern reaches the limbs. (HQ — incomplete dominant)',
        },
        {
          id: 'flame',
          label: 'Flame',
          description:
            'Cream or white dorsal stripe or blaze, mostly confined to the back. Pattern does not fully reach the sides. (FLAME)',
        },
        {
          id: 'bicolor',
          label: 'Bi-Color / Phantom',
          description:
            'Two-tone: distinctly darker dorsal vs lighter laterals. Pattern color appears suppressed or washed out. (Phantom, PH — recessive)',
        },
        {
          id: 'patternless',
          label: 'Patternless',
          description:
            'No visible lateral pattern — uniform coloration. May be true Patternless (PTL allele) or strong Phantom suppression.',
        },
        {
          id: 'brindle',
          label: 'Brindle',
          description:
            'Mixed, blended lateral patterning — jagged or aberrant banding with no clean edges. Note: brindle is a Tiger × Pinstripe visual interaction, not a standalone trait.',
        },
        {
          id: 'superstripe',
          label: 'Superstripe / Quad-Stripe',
          description:
            'Continuous dorsal stripe with additional parallel lateral stripes (quad stripes). (Superstripe, s — recessive)',
        },
      ],
    },

    // ── 3. Pattern color — white / orange ─────────────────────────────────
    {
      id: 'pattern_color',
      prompt: 'What colors appear in the patterned areas of the body?',
      category: 'pattern',
      allowsMultiple: false,
      dependsOn: {
        questionId: 'pattern_type',
        selectedOptionIds: ['harlequin', 'flame', 'superstripe'],
      },
      options: [
        {
          id: 'white_only',
          label: 'White / Cream only',
          description: 'Pattern areas are white or cream-colored — no orange visible.',
        },
        {
          id: 'orange_only',
          label: 'Orange only',
          description: 'Pattern areas are orange or yellow-orange — no white or cream areas.',
        },
        {
          id: 'both',
          label: 'Both white and orange',
          description:
            'Pattern shows both white/cream areas and orange areas — may be a Tri-Color expression. (White Pattern + Orange Pattern)',
        },
        {
          id: 'none',
          label: 'None / Cream neutral',
          description: 'Pattern is neutral cream — no strong white or orange emphasis.',
        },
      ],
    },

    // ── 4. Structural — pinstripe ──────────────────────────────────────────
    {
      id: 'structural',
      prompt: 'Do you see raised pinstripe scaling along the dorsal or sides?',
      category: 'structural',
      allowsMultiple: false,
      options: [
        {
          id: 'none',
          label: 'No pinstripe',
          description: 'Scales lie flat — no raised linear rows visible.',
        },
        {
          id: 'partial_pinstripe',
          label: 'Partial Pinstripe',
          description:
            'Some raised scale rows present but not running continuously end-to-end.',
        },
        {
          id: 'full_pinstripe',
          label: 'Full Pinstripe',
          description:
            'Raised cream or white scale rows running continuously along the dorsal and/or sides. (PIN — dominant)',
        },
      ],
    },

    // ── 5. Color modifier ─────────────────────────────────────────────────
    {
      id: 'color_modifier',
      prompt: 'Does the gecko show any of these color-modifying traits?',
      category: 'modifier',
      allowsMultiple: false,
      options: [
        {
          id: 'none',
          label: 'None apparent',
          description: 'No obvious color modifier — typical pigmentation for the base color.',
        },
        {
          id: 'hypo',
          label: 'Hypo — lighter, reduced dark pigment',
          description:
            'Overall lighter coloration with reduced dark areas. Pattern borders cleaner. (Hypo, H — dominant)',
        },
        {
          id: 'phantom',
          label: 'Phantom — pattern color suppressed',
          description:
            'Pattern structure is present but pattern color is missing or washed out — two-tone or "patternless" look. (PH — recessive)',
        },
        {
          id: 'tangerine',
          label: 'Tangerine — vivid orange throughout',
          description:
            'Body and pattern show intense orange-red saturation beyond typical orange pattern. (TAN — polygenic)',
        },
        {
          id: 'sable',
          label: 'Sable — dark smoky overlay',
          description:
            'A dark, smoky or charcoal overlay across the base color, intensifying depth. (SA)',
        },
        {
          id: 'cappuccino',
          label: 'Cappuccino — warm coffee tones',
          description:
            'A warm brown-coffee color modifier — allelic with Sable (same gene locus). (CAPP)',
        },
      ],
    },

    // ── 6. Modifier — dalmatian ────────────────────────────────────────────
    {
      id: 'dalmatian',
      prompt: 'Are there black spots scattered across the body?',
      category: 'modifier',
      allowsMultiple: false,
      options: [
        {
          id: 'none',
          label: 'No spots',
          description: 'No black spots visible.',
        },
        {
          id: 'low_spots',
          label: 'Low Dalmatian',
          description:
            'A handful of black spots — roughly fewer than 50 visible. (DAL — dominant, one copy sufficient)',
        },
        {
          id: 'heavy_spots',
          label: 'Heavy Dalmatian',
          description: 'Dense black spot coverage across the body.',
        },
      ],
    },

    // ── 7. Modifier — axanthic ─────────────────────────────────────────────
    {
      id: 'axanthic',
      prompt:
        'Does the gecko appear grey-toned even when fully fired up — no yellow or warm tones?',
      category: 'modifier',
      allowsMultiple: false,
      options: [
        {
          id: 'no',
          label: 'No — normal warm tones when fired',
          description:
            'Yellow, red, orange, or brown tones appear when fired up.',
        },
        {
          id: 'yes',
          label: 'Yes — grey-toned even when fired up',
          description:
            'Little to no yellow pigment. Pattern appears paper-white on a grey base. (Axanthic, x — recessive, needs two copies)',
        },
      ],
    },

    // ── 8. White expression (conditional on harlequin / flame) ────────────
    {
      id: 'white_expression',
      prompt:
        'How would you describe the white expression in the pattern areas?',
      category: 'modifier',
      allowsMultiple: false,
      dependsOn: {
        questionId: 'pattern_type',
        selectedOptionIds: ['harlequin', 'flame'],
      },
      options: [
        {
          id: 'none',
          label: 'Normal — typical cream or off-white pattern',
          description: 'Pattern white looks as expected for the pattern type.',
        },
        {
          id: 'high_white',
          label: 'High White / Whitewall',
          description:
            'Significantly more white than typical — large solid white areas on sides or head. (Whitewall, W — incomplete dominant)',
        },
        {
          id: 'lilly_white',
          label: 'Lilly White — extreme white throughout',
          description:
            'Pattern areas are near-pure white throughout the body. ⚠️ Super form (L/L) is lethal — never breed Lilly White × Lilly White. (L — incomplete dominant)',
        },
      ],
    },

    // ── 9. Blush indicator (conditional: non-red base) ────────────────────
    {
      id: 'blush_indicator',
      prompt:
        'Do you see a warm pink or reddish "blush" color on the cheeks or neck — even though the base is not fully red?',
      category: 'modifier',
      allowsMultiple: false,
      dependsOn: {
        questionId: 'base_color',
        // Show for wild-type, black, and yellow — NOT for red (already expressing fully)
        selectedOptionIds: ['wild_type', 'black', 'yellow'],
      },
      options: [
        {
          id: 'no',
          label: 'No blush visible',
          description: 'Cheeks and neck match overall base color — no pink or red tones.',
        },
        {
          id: 'yes',
          label: 'Yes — pink or reddish blush visible on cheeks',
          description:
            'A subtle warm flush on the cheeks even though the base is not fully red. This may indicate one copy of the recessive Red Base allele (r/+) — the animal could be a heterozygous carrier.',
        },
      ],
    },

    // ── 10. Firing state confidence ────────────────────────────────────────
    {
      id: 'firing_confidence',
      prompt: "How consistent is the gecko's color day to day?",
      category: 'modifier',
      allowsMultiple: false,
      options: [
        {
          id: 'consistent_pale',
          label: 'Consistently pale / fired-down',
          description:
            'Color looks the same most of the time and tends to be lighter.',
        },
        {
          id: 'variable',
          label: 'Varies a lot',
          description:
            'Color shifts noticeably between observations — difficult to get a consistent read.',
        },
        {
          id: 'consistent_dark',
          label: 'Consistently fired-up / dark',
          description:
            'Color looks the same most of the time and tends to be richer and darker.',
        },
      ],
    },
  ]
}

// ─────────────────────────────────────────────
// Internal helpers — allele matching
// ─────────────────────────────────────────────

const BASE_COLOR_ALLELE_MAP: Record<string, string> = {
  black: 'black_base',
  red: 'red_base',
  yellow: 'yellow_base',
  wild_type: 'wild_type_melanin',
}

const PATTERN_ALLELE_MAP: Record<string, string> = {
  harlequin: 'harlequin',
  flame: 'flame',
  bicolor: 'phantom',       // bi-color appearance is a Phantom expression
  patternless: 'patternless', // may be PTL or Phantom — flagged in notes
  brindle: 'pinstripe',     // brindle = TIG × PIN; PIN is the selectable allele
  superstripe: 'superstripe',
}

const COLOR_MODIFIER_ALLELE_MAP: Record<string, string> = {
  hypo: 'hypo',
  phantom: 'phantom',
  tangerine: 'tangerine',
  sable: 'sable',
  cappuccino: 'cappuccino',
}

/**
 * Converts wizard observation answers to matched allele IDs.
 * Tiger (FIXED) is always prepended — it is present in every crested gecko.
 */
function matchAlleleIds(obs: Map<string, string>): string[] {
  // Tiger is FIXED — always present, never a wizard question
  const matched: string[] = ['tiger']

  // Base color
  const base = obs.get('base_color')
  if (base && BASE_COLOR_ALLELE_MAP[base]) {
    matched.push(BASE_COLOR_ALLELE_MAP[base])
  }

  // Pattern type
  const pattern = obs.get('pattern_type')
  if (pattern && PATTERN_ALLELE_MAP[pattern]) {
    matched.push(PATTERN_ALLELE_MAP[pattern])
  }
  // Brindle is TIG × PIN — push tiger already done above; push pinstripe explicitly
  if (pattern === 'brindle' && !matched.includes('pinstripe')) {
    matched.push('pinstripe')
  }

  // Pattern color — white pattern / orange pattern
  const patternColor = obs.get('pattern_color')
  if (patternColor === 'white_only' || patternColor === 'both') {
    if (!matched.includes('white_pattern')) matched.push('white_pattern')
  }
  if (patternColor === 'orange_only' || patternColor === 'both') {
    if (!matched.includes('orange_pattern')) matched.push('orange_pattern')
  }

  // Structural pinstripe
  const structural = obs.get('structural')
  if (structural === 'full_pinstripe' || structural === 'partial_pinstripe') {
    if (!matched.includes('pinstripe')) matched.push('pinstripe')
  }

  // Color modifier
  const colorMod = obs.get('color_modifier')
  if (colorMod && COLOR_MODIFIER_ALLELE_MAP[colorMod]) {
    const alleleId = COLOR_MODIFIER_ALLELE_MAP[colorMod]
    if (!matched.includes(alleleId)) matched.push(alleleId)
  }

  // Dalmatian
  const dalmatian = obs.get('dalmatian')
  if (dalmatian && dalmatian !== 'none') {
    matched.push('dalmatian')
  }

  // Axanthic
  if (obs.get('axanthic') === 'yes') matched.push('axanthic')

  // White expression
  const whiteExpr = obs.get('white_expression')
  if (whiteExpr === 'lilly_white') matched.push('lilly_white')
  if (whiteExpr === 'high_white') matched.push('whitewall')

  return matched
}

// ─────────────────────────────────────────────
// Internal helpers — combo morph detection
// ─────────────────────────────────────────────

/**
 * Returns the most-specific combo morph whose required alleles are all present
 * in the matched allele set. Sorted by specificity (most requiredAlleleIds first)
 * to prevent shorter combos from shadowing supersets.
 */
function detectComboMorph(matchedIds: string[]): ComboMorph | undefined {
  const sorted = [...CRESTED_GECKO_COMBO_MORPHS].sort(
    (a, b) => b.requiredAlleleIds.length - a.requiredAlleleIds.length
  )
  return sorted.find((combo) =>
    combo.requiredAlleleIds.every((id) => matchedIds.includes(id))
  )
}

// ─────────────────────────────────────────────
// Internal helpers — education note detection
// ─────────────────────────────────────────────

/**
 * Returns education notes for any trait interactions where the observed alleles
 * are involved AND isOftenMistakenForTrait is true.
 */
function detectEducationNotes(matchedIds: string[]): string[] {
  return CRESTED_GECKO_TRAIT_INTERACTIONS
    .filter(
      (interaction) =>
        interaction.isOftenMistakenForTrait &&
        interaction.educationNote !== undefined &&
        interaction.involvedAlleleIds.some((id) => matchedIds.includes(id))
    )
    .map((interaction) => interaction.educationNote!)
}

// ─────────────────────────────────────────────
// Internal helpers — name assembly
// ─────────────────────────────────────────────

const BASE_COLOR_LABELS: Record<string, string> = {
  red: 'Red',
  yellow: 'Yellow',
  black: 'Black',
  // wild_type does not qualify the morph name — it's the neutral default
}

const PATTERN_LABELS: Record<string, string> = {
  harlequin: 'Harlequin',
  flame: 'Flame',
  bicolor: 'Bi-Color',
  patternless: 'Patternless',
  brindle: 'Brindle',
  superstripe: 'Superstripe',
}

/**
 * Assembles the morph display name.
 *
 * If a combo morph is detected, uses the combo's display name as the anchor.
 * Remaining modifiers (dalmatian, axanthic) are appended.
 * If no combo is detected, falls back to a human-readable trait list.
 */
function assembleMorphName(
  obs: Map<string, string>,
  matchedIds: string[],
  combo: ComboMorph | undefined
): string {
  const parts: string[] = []

  const dalmatian = obs.get('dalmatian') ?? 'none'
  const axanthic = obs.get('axanthic') ?? 'no'
  const whiteExpr = obs.get('white_expression') ?? 'none'
  const structural = obs.get('structural') ?? 'none'

  if (combo) {
    // ── Combo-anchored name ────────────────────────────────────────────────
    // Axanthic leads the name (most distinctive modifier)
    if (axanthic === 'yes' && !combo.requiredAlleleIds.includes('axanthic')) {
      parts.push('Axanthic')
    }

    parts.push(combo.displayName)

    // Append pinstripe only if not already baked into the combo name
    if (
      structural === 'full_pinstripe' &&
      !combo.requiredAlleleIds.includes('pinstripe')
    ) {
      parts.push('Full Pinstripe')
    } else if (
      structural === 'partial_pinstripe' &&
      !combo.requiredAlleleIds.includes('pinstripe')
    ) {
      parts.push('Pinstripe')
    }

    // Dalmatian modifier
    if (dalmatian === 'low_spots') parts.push('Dalmatian')
    else if (dalmatian === 'heavy_spots') parts.push('Heavy Dalmatian')
  } else {
    // ── Trait-list name (no combo) ─────────────────────────────────────────
    const base = obs.get('base_color') ?? 'wild_type'
    const pattern = obs.get('pattern_type') ?? 'flame'

    // Lilly White leads the name (most distinctive modifier)
    if (whiteExpr === 'lilly_white') parts.push('Lilly White')

    // Axanthic prefix
    if (axanthic === 'yes') parts.push('Axanthic')

    // Notable base color (wild_type is omitted — neutral default)
    const baseLabel = BASE_COLOR_LABELS[base]
    if (baseLabel) parts.push(baseLabel)

    // Pattern name
    const patternLabel = PATTERN_LABELS[pattern]
    if (patternLabel) parts.push(patternLabel)

    // High White / Whitewall after pattern
    if (whiteExpr === 'high_white') parts.push('High White')

    // Structural pinstripe
    if (structural === 'full_pinstripe') parts.push('Full Pinstripe')
    else if (structural === 'partial_pinstripe') parts.push('Pinstripe')

    // Dalmatian modifier
    if (dalmatian === 'low_spots') parts.push('Dalmatian')
    else if (dalmatian === 'heavy_spots') parts.push('Heavy Dalmatian')
  }

  if (parts.length === 0) {
    const pattern = obs.get('pattern_type') ?? 'flame'
    return PATTERN_LABELS[pattern] ?? 'Crested Gecko'
  }

  return parts.join(' ')
}

// ─────────────────────────────────────────────
// Internal helpers — contradiction & notes
// ─────────────────────────────────────────────

function detectContradictions(obs: Map<string, string>): string | undefined {
  const whiteExpr = obs.get('white_expression')
  const pattern = obs.get('pattern_type')

  if (
    whiteExpr === 'lilly_white' &&
    pattern !== undefined &&
    !['harlequin', 'flame'].includes(pattern)
  ) {
    return 'Lilly White (L) requires a harlequin or flame pattern to be expressed visually. The result may be less accurate.'
  }

  return undefined
}

function buildNotes(
  obs: Map<string, string>,
  matchedIds: string[],
  contradiction: string | undefined
): string | undefined {
  const notes: string[] = []

  if (contradiction) notes.push(contradiction)

  // ⚠️ Lilly White lethal homozygous safety warning
  if (matchedIds.includes('lilly_white')) {
    notes.push(
      '⚠️ Lilly White (L) is lethal when homozygous — Super Lilly White (L/L) offspring die within days of hatching. Never breed Lilly White × Lilly White.'
    )
  }

  if (obs.get('pattern_type') === 'patternless') {
    notes.push(
      '"Patternless" appearance can result from the true Patternless allele (PTL) or from Phantom (PH) suppressing pattern color — a breeding test is needed to distinguish them.'
    )
  }

  if (obs.get('pattern_type') === 'brindle') {
    notes.push(
      'Brindle is a visual effect from Tiger × Pinstripe interaction — not a standalone genetic trait. Both Tiger (fixed in all geckos) and Pinstripe are present to create this look.'
    )
  }

  // Education notes for common misconceptions
  const educationNotes = detectEducationNotes(matchedIds)
  notes.push(...educationNotes)

  return notes.length > 0 ? notes.join(' ') : undefined
}

// ─────────────────────────────────────────────
// resolveObservation
// ─────────────────────────────────────────────

/**
 * Resolves a set of wizard answers into a morph name and confidence level.
 *
 * @param observations - Array of { questionId, selectedOptionIds[] } from the wizard
 * @returns ResolutionResult with morphName, confidence, matchedAlleleIds, and CTA copy
 */
export function resolveObservation(observations: ObservationInput[]): ResolutionResult {
  // Flatten to a simple map — single-select questions use index 0
  const obs = new Map<string, string>()
  for (const { questionId, selectedOptionIds } of observations) {
    if (selectedOptionIds.length > 0) {
      obs.set(questionId, selectedOptionIds[0])
    }
  }

  const matchedAlleleIds = matchAlleleIds(obs)
  const combo = detectComboMorph(matchedAlleleIds)
  const morphName = assembleMorphName(obs, matchedAlleleIds, combo)
  const contradiction = detectContradictions(obs)
  const notes = buildNotes(obs, matchedAlleleIds, contradiction)

  // ── Blush het hint ─────────────────────────────────────────────────────
  // If the user answered 'yes' to blush_indicator on a non-red base, the
  // animal may be heterozygous for the recessive Red Base allele (r/+).
  let hetHint: string | undefined
  if (obs.get('blush_indicator') === 'yes') {
    hetHint =
      'The blush visible on the cheeks suggests this animal may carry one copy of the recessive Red Base allele (r/+). It will not visually express red, but can pass it to offspring — pairing with another r/+ carrier gives a 25% chance of a fully red-based animal.'
  }

  // Confidence scoring
  const firing = obs.get('firing_confidence')
  let confidence: 'high' | 'medium' | 'low'

  if (contradiction) {
    confidence = 'low'
  } else if (firing === 'variable') {
    confidence = 'medium'
  } else {
    confidence = 'high'
  }

  // Use early-stage research flag to lower confidence
  const hasEarlyStageResearch = matchedAlleleIds.some((id) =>
    (EARLY_STAGE_RESEARCH as readonly string[]).includes(id)
  )
  if (hasEarlyStageResearch && confidence === 'high') {
    confidence = 'medium'
  }

  const reptiDexPrompt = `Track ${morphName}'s offspring in ReptiDex — built for breeders by a breeder.`

  return {
    morphName,
    confidence,
    matchedAlleleIds,
    notes,
    hetHint,
    reptiDexPrompt,
  }
}
