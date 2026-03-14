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
// ─────────────────────────────────────────────────────────────────────────────

import type { TraitCategory } from './data/crested-gecko-alleles'

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
 *   3. Structural — pinstripe degree
 *   4. Modifiers — dalmatian
 *   5. Modifiers — axanthic
 *   6. Modifiers — white expression (dependsOn harlequin or flame)
 *   7. Firing state confidence
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

    // ── 3. Structural — pinstripe ──────────────────────────────────────────
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

    // ── 4. Modifier — dalmatian ────────────────────────────────────────────
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

    // ── 5. Modifier — axanthic ─────────────────────────────────────────────
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

    // ── 6. Modifier — white expression (conditional on harlequin / flame) ──
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

    // ── 7. Firing state confidence ─────────────────────────────────────────
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
// Internal name assembly helpers
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

function assembleMorphName(obs: Map<string, string>): string {
  const base = obs.get('base_color') ?? 'wild_type'
  const pattern = obs.get('pattern_type') ?? 'flame'
  const structural = obs.get('structural') ?? 'none'
  const dalmatian = obs.get('dalmatian') ?? 'none'
  const axanthic = obs.get('axanthic') ?? 'no'
  const whiteExpr = obs.get('white_expression') ?? 'none'

  const parts: string[] = []

  // Lilly White leads the name (most distinctive modifier)
  if (whiteExpr === 'lilly_white') {
    parts.push('Lilly White')
  }

  // Axanthic prefix
  if (axanthic === 'yes') {
    parts.push('Axanthic')
  }

  // Notable base color qualifier (wild_type / natural is omitted — it's the default)
  const baseLabel = BASE_COLOR_LABELS[base]
  if (baseLabel) {
    parts.push(baseLabel)
  }

  // Pattern name
  const patternLabel = PATTERN_LABELS[pattern]
  if (patternLabel) {
    parts.push(patternLabel)
  }

  // High White after pattern (it modifies the pattern expression, not precedes it)
  if (whiteExpr === 'high_white') {
    parts.push('High White')
  }

  // Structural pinstripe
  if (structural === 'full_pinstripe') {
    parts.push('Full Pinstripe')
  } else if (structural === 'partial_pinstripe') {
    parts.push('Pinstripe')
  }

  // Dalmatian modifier
  if (dalmatian === 'low_spots') {
    parts.push('Dalmatian')
  } else if (dalmatian === 'heavy_spots') {
    parts.push('Heavy Dalmatian')
  }

  return parts.length > 0 ? parts.join(' ') : (patternLabel ?? 'Crested Gecko')
}

function matchAlleleIds(obs: Map<string, string>): string[] {
  const matched: string[] = []

  // Base color → allele id
  const baseMap: Record<string, string> = {
    black: 'black_base',
    red: 'red_base',
    yellow: 'yellow_base',
    wild_type: 'wild_type_melanin',
  }
  const base = obs.get('base_color')
  if (base && baseMap[base]) matched.push(baseMap[base])

  // Pattern → allele id
  const patternMap: Record<string, string> = {
    harlequin: 'harlequin',
    flame: 'flame',
    bicolor: 'phantom',       // bi-color appearance is a Phantom expression
    patternless: 'patternless', // may be PTL or Phantom — flagged in notes
    brindle: 'pinstripe',     // brindle = TIG × PIN interaction; PIN is the selectable allele
    superstripe: 'superstripe',
  }
  const pattern = obs.get('pattern_type')
  if (pattern && patternMap[pattern]) matched.push(patternMap[pattern])

  // Also add tiger for brindle (TIG × PIN interaction)
  if (pattern === 'brindle') matched.push('tiger')

  // Structural
  const structural = obs.get('structural')
  if (structural === 'full_pinstripe' || structural === 'partial_pinstripe') {
    if (!matched.includes('pinstripe')) matched.push('pinstripe')
  }

  // Dalmatian
  if (obs.get('dalmatian') !== 'none' && obs.get('dalmatian') !== undefined) {
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

function detectContradictions(
  obs: Map<string, string>
): string | undefined {
  const whiteExpr = obs.get('white_expression')
  const pattern = obs.get('pattern_type')

  // Lilly White only expresses in harlequin or flame animals
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
  contradiction: string | undefined
): string | undefined {
  const notes: string[] = []

  if (contradiction) notes.push(contradiction)

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

  const morphName = assembleMorphName(obs)
  const matchedAlleleIds = matchAlleleIds(obs)
  const contradiction = detectContradictions(obs)
  const notes = buildNotes(obs, contradiction)

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

  const reptiDexPrompt = `Track ${morphName}'s offspring in ReptiDex — built for breeders by a breeder.`

  return {
    morphName,
    confidence,
    matchedAlleleIds,
    notes,
    reptiDexPrompt,
  }
}
