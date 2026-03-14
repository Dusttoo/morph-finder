// ─────────────────────────────────────────────────────────────────────────────
// Crested Gecko Trait Interactions
//
// Documents how two or more alleles interact to produce emergent visual effects.
// These interactions are distinct from combo morphs — a combo morph is a named
// trade term; a trait interaction is a genetic relationship that explains WHY a
// visual phenotype appears, or WHY a genetic assumption is wrong.
//
// Source of truth: LIL MONSTERS Reptiles / Geckological / Geckistry SQL seed.
//
// isOftenMistakenForTrait: true → this interaction produces a phenotype that
// breeders commonly (incorrectly) treat as a standalone allele or named morph.
// educationNote is required for all such interactions.
// ─────────────────────────────────────────────────────────────────────────────

export type InteractionType =
  | 'EPISTATIC'         // One allele masks or reveals another
  | 'RATIO_DEPENDENT'   // Visual output depends on dosage / copy count
  | 'DOMINANCE_FIGHTING'// Two alleles compete at the same or linked locus
  | 'PATTERN_MODIFIER'  // One allele changes how a pattern gene is expressed
  | 'SYNERGISTIC'       // Alleles enhance each other's expression
  | 'ENHANCER'          // One allele amplifies another's phenotypic effect
  | 'SUPPRESSOR'        // One allele reduces another's phenotypic expression

export interface TraitInteraction {
  id: string
  displayName: string
  interactionType: InteractionType
  involvedAlleleIds: string[]
  description: string
  /**
   * True when this interaction is frequently misidentified as a discrete allele
   * or standalone named trait in the hobby — breeders list it as a "morph" when
   * it is actually a multi-gene effect.
   */
  isOftenMistakenForTrait: boolean
  /**
   * Required when isOftenMistakenForTrait is true.
   * Plain-English explanation of why the common assumption is incorrect.
   */
  educationNote?: string
}

export const CRESTED_GECKO_TRAIT_INTERACTIONS: TraitInteraction[] = [
  // ── isOftenMistakenForTrait: true (5) ──────────────────────────────────────

  {
    id: 'brindle_effect',
    displayName: 'Brindle Effect',
    interactionType: 'RATIO_DEPENDENT',
    involvedAlleleIds: ['tiger', 'pinstripe'],
    description:
      'Brindle is the visual outcome of Tiger (TIG) and Pinstripe (PIN) interacting at a specific expression ratio. When PIN expression is moderate and TIG banding is present, the result is the blended, jagged lateral pattern known as "brindle." Neither allele alone produces it.',
    isOftenMistakenForTrait: true,
    educationNote:
      '"Brindle" is not a genetic allele — it cannot be selectively bred for in isolation. It is an emergent visual effect of Tiger (present in all crested geckos as a fixed allele) interacting with variable Pinstripe dosage. When you see brindle, you are seeing TIG × PIN interaction, not a distinct gene.',
  },
  {
    id: 'reverse_pin_effect',
    displayName: 'Reverse Pinstripe Effect',
    interactionType: 'DOMINANCE_FIGHTING',
    involvedAlleleIds: ['tiger', 'pinstripe'],
    description:
      'When Pinstripe (PIN) banding and Tiger (TIG) lateral markings compete in opposing orientations, the raised scale rows can appear to run "against" the tiger banding — producing the "reverse pin" appearance. This is a visual interaction, not a separate allele.',
    isOftenMistakenForTrait: true,
    educationNote:
      '"Reverse Pinstripe" is sometimes listed as a morph or trait in classifieds, but there is no Reverse Pin allele. The visual is the result of Pinstripe and Tiger patterning pulling in different directions on the same animal. Any gecko with PIN can occasionally display this expression.',
  },
  {
    id: 'lavender_effect',
    displayName: 'Lavender Effect (Black Base + Hypo)',
    interactionType: 'EPISTATIC',
    involvedAlleleIds: ['black_base', 'hypo'],
    description:
      'Black Base (B) dramatically deepens melanin expression. When Hypo (H) is added, it selectively suppresses darker pigments — the interaction between deep black and pigment reduction produces a lavender or purple-grey hue not present in either allele alone.',
    isOftenMistakenForTrait: true,
    educationNote:
      'Many breeders list "Lavender" as a standalone allele or morph independent of Black Base and Hypo. It is not. Lavender is an epistatic interaction: Black Base provides the deep melanin canvas; Hypo lightens it selectively, producing the lavender tone. Without Black Base, Hypo alone yields a standard lighter animal, not lavender.',
  },
  {
    id: 'pink_effect',
    displayName: 'Pink Effect (Red Base + Hypo)',
    interactionType: 'EPISTATIC',
    involvedAlleleIds: ['red_base', 'hypo'],
    description:
      'Red Base (r) is recessive and requires two copies for full red expression. When combined with Hypo (H), the reds are softened and shifted toward pink — a tone neither allele produces on its own. Hypo removes the deeper reds, leaving a soft rose-pink that is emergent from both alleles together.',
    isOftenMistakenForTrait: true,
    educationNote:
      '"Pink" crested geckos are sometimes sold as if pink is a standalone trait. It is not — pink coloration results specifically from Red Base (r/r, two copies required) combined with Hypo. An animal with Hypo but no Red Base will not produce pink offspring; an animal with Red Base but no Hypo will produce red or orange, not pink.',
  },
  {
    id: 'phantom_pattern_suppression',
    displayName: 'Phantom Pattern Suppression',
    interactionType: 'SUPPRESSOR',
    involvedAlleleIds: ['phantom'],
    description:
      'Phantom (PH) is a recessive allele that suppresses pattern color — the pattern structure (harlequin, flame, etc.) is genetically present but its color expression is reduced or eliminated. This causes a two-toned bi-color look, or in strong expression, apparent "patternlessness." PH acts as a genetic suppressor of chromatophore color in pattern cells.',
    isOftenMistakenForTrait: true,
    educationNote:
      'Many animals sold as "Patternless" or "Bi-Color" are actually Phantom (PH) animals whose pattern color has been suppressed, not animals with the true Patternless (PTL) allele. A breeding test is the only reliable way to distinguish them. Phantom-suppressed animals carry and pass pattern alleles to offspring; true PTL animals do not.',
  },

  // ── isOftenMistakenForTrait: false (10) ───────────────────────────────────

  {
    id: 'snowflake_wp_dependency',
    displayName: 'Snowflake Requires White Pattern',
    interactionType: 'EPISTATIC',
    involvedAlleleIds: ['snowflake', 'white_pattern'],
    description:
      'Snowflake (SF) is epistatic to White Pattern (WP) — Snowflake cannot visually express without White Pattern present. An animal that carries Snowflake but lacks WP will appear to show no snowflake expression at all. The white-flecked pattern typical of Snowflake only develops where WP creates the white ground for it to appear.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'c2_synergy',
    displayName: 'C2 / Citrus 2.0 Synergy',
    interactionType: 'SYNERGISTIC',
    involvedAlleleIds: ['yellow_base', 'hypo'],
    description:
      'Yellow Base (y) and Hypo (H) are synergistic — Yellow Base brightens the ground color toward vivid lemon-yellow; Hypo cleans the pattern edges and reduces darker pigmentation. Together they amplify each other to produce the C2 phenotype, which is brighter and cleaner than either allele alone.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'lilly_white_lethal_homozygous',
    displayName: 'Lilly White Lethal Homozygous (Super Form)',
    interactionType: 'DOMINANCE_FIGHTING',
    involvedAlleleIds: ['lilly_white'],
    description:
      'Lilly White (L) is incomplete dominant — heterozygous (L/+) animals express Lilly White patterning normally. Homozygous (L/L) "Super Lilly White" animals are born but die within days of hatching. This is a well-documented lethal allele interaction. Never pair Lilly White × Lilly White.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'sable_cappuccino_allelism',
    displayName: 'Sable / Cappuccino Allelism',
    interactionType: 'DOMINANCE_FIGHTING',
    involvedAlleleIds: ['sable', 'cappuccino'],
    description:
      'Sable (SA) and Cappuccino (CAPP) occupy the same gene locus — they are allelic. An animal cannot be homozygous for both simultaneously; it can carry one copy of each (compound heterozygous), producing the Luwak phenotype. Breeders must account for this locus when planning pairings involving either allele.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'axanthic_pigment_suppression',
    displayName: 'Axanthic Yellow Pigment Suppression',
    interactionType: 'SUPPRESSOR',
    involvedAlleleIds: ['axanthic'],
    description:
      'Axanthic (x) suppresses xanthophore (yellow pigment cell) function. Regardless of what base color alleles are present, an axanthic animal lacks functional yellow pigment — reds cool toward pink-grey, yellows disappear, and the overall palette shifts to silver-grey and white. Requires two copies (x/x) for full expression.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'tangerine_orange_enhancement',
    displayName: 'Tangerine Enhances Orange Expression',
    interactionType: 'ENHANCER',
    involvedAlleleIds: ['tangerine', 'orange_pattern'],
    description:
      'Tangerine amplifies orange pigment expression throughout the body, and when combined with Orange Pattern (OP), it significantly intensifies the saturation and coverage of orange in pattern areas. The interaction is additive — Tangerine shifts orange patterning from moderate orange to vivid flame-orange or deep red-orange.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'hypo_base_brightening',
    displayName: 'Hypo Base Color Brightening',
    interactionType: 'ENHANCER',
    involvedAlleleIds: ['hypo', 'red_base', 'yellow_base', 'black_base'],
    description:
      'Hypo (H) acts as an enhancer for base color alleles by reducing darker eumelanin, making the dominant hue of the base color appear brighter and more saturated. With Red Base the result is pink; with Yellow Base it produces C2; with Black Base it produces lavender. Hypo is base-color dependent in its visual output.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'dalmatian_on_phantom',
    displayName: 'Dalmatian Spots Visible Through Phantom Suppression',
    interactionType: 'PATTERN_MODIFIER',
    involvedAlleleIds: ['dalmatian', 'phantom'],
    description:
      'Dalmatian (DAL) produces black spots regardless of Phantom (PH) suppression — eumelanin spots are not suppressed by PH, which only reduces xanthophore-based pattern color. This means a Phantom/Dalmatian animal will display a muted bi-color body with clearly visible black dalmatian spots, a distinct and identifiable combination.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'whitewall_harlequin_enhancement',
    displayName: 'Whitewall Enhances Harlequin White Coverage',
    interactionType: 'ENHANCER',
    involvedAlleleIds: ['whitewall', 'harlequin'],
    description:
      'Whitewall (W) increases the white coverage and brightness in pattern areas and is particularly visually dramatic when expressed on a Harlequin (HQ) animal. HQ already extends patterning to the limbs — adding Whitewall expands the solid white areas significantly, reducing color in the pattern to create a high-white harlequin.',
    isOftenMistakenForTrait: false,
  },
  {
    id: 'orange_white_pattern_tricolor',
    displayName: 'Orange Pattern + White Pattern → Tri-Color',
    interactionType: 'SYNERGISTIC',
    involvedAlleleIds: ['orange_pattern', 'white_pattern'],
    description:
      'Orange Pattern (OP) and White Pattern (WP) are independently expressed color modifiers for pattern areas. When both are present, they produce distinct orange and white regions within the pattern — creating the "Tri-Color" phenotype (base color, white, and orange). Neither allele suppresses the other; they express in separate pattern cells.',
    isOftenMistakenForTrait: false,
  },
]
