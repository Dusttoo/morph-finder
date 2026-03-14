// ─────────────────────────────────────────────────────────────────────────────
// Crested Gecko Combo Morph Definitions
//
// Combo morphs are named visual phenotypes that result from two or more alleles
// interacting together. They are NOT alleles themselves; they are recognized
// trade names for predictable multi-allele expressions.
//
// Source of truth: LIL MONSTERS Reptiles / Geckological / Geckistry SQL seed.
// Formula notation follows breeder convention (e.g. SA/L = Sable het Lilly White).
//
// IMPORTANT: When detecting combos in resolveObservation(), sort by
// requiredAlleleIds.length DESCENDING to prevent a shorter combo (e.g. C2)
// from matching before a more-specific superset (e.g. Creamsicle).
// ─────────────────────────────────────────────────────────────────────────────

export interface ComboMorph {
  id: string
  displayName: string
  /** Allele IDs (from crested-gecko-alleles.ts) required for this combo to express */
  requiredAlleleIds: string[]
  description: string
  /** Breeder formula notation */
  formula: string
  /** Whether one of the alleles carries Lilly White (lethal homozygous risk) */
  hasLillyWhiteRisk?: boolean
}

export const CRESTED_GECKO_COMBO_MORPHS: ComboMorph[] = [
  // ── Hypo × Base Color combos ───────────────────────────────────────────────

  {
    id: 'lavender',
    displayName: 'Lavender',
    requiredAlleleIds: ['black_base', 'hypo'],
    formula: 'B/H',
    description:
      'Black Base (B) combined with Hypo (H) produces a lavender-toned animal. The deep melanin of Black Base is lightened by Hypo, creating a cool-grey to purple-lavender hue. Often mistaken for Axanthic — but fires warm rather than grey.',
  },
  {
    id: 'pink',
    displayName: 'Pink',
    requiredAlleleIds: ['red_base', 'hypo'],
    formula: 'r/H',
    description:
      'Red Base (r) combined with Hypo (H) produces a pink or rose-toned animal. Hypo removes the deeper reds and oranges, leaving a soft pink cast. Full expression requires two copies of the recessive Red Base allele.',
  },
  {
    id: 'c2',
    displayName: 'C2 (Citrus 2.0)',
    requiredAlleleIds: ['yellow_base', 'hypo'],
    formula: 'y/H',
    description:
      'Yellow Base (y) combined with Hypo (H) produces C2 — a bright lemon-yellow animal with clean, reduced pattern borders. Widely misidentified as "Citrus" in the hobby; C2 is the genetically accurate term. Yellow Base is dominant and requires only one copy.',
  },
  {
    id: 'creamsicle',
    displayName: 'Creamsicle',
    requiredAlleleIds: ['yellow_base', 'hypo', 'tangerine'],
    formula: 'y/H/TAN',
    description:
      'Yellow Base (y) combined with Hypo (H) and Tangerine produces a warm orange-cream animal reminiscent of a creamsicle. Tangerine shifts the yellow into orange territory while Hypo keeps the overall tone pastel and clean.',
  },

  // ── Base Color × pattern combos ────────────────────────────────────────────

  {
    id: 'halloween',
    displayName: 'Halloween',
    requiredAlleleIds: ['black_base', 'orange_pattern'],
    formula: 'B/OP',
    description:
      'Black Base (B) combined with Orange Pattern (OP) creates a high-contrast black-and-orange animal. The near-black body ground color dramatically offsets vivid orange patterning — producing the signature "Halloween" look.',
  },

  // ── White Pattern combos ───────────────────────────────────────────────────

  {
    id: 'tri_color',
    displayName: 'Tri-Color',
    requiredAlleleIds: ['white_pattern', 'orange_pattern'],
    formula: 'WP/OP',
    description:
      'White Pattern (WP) combined with Orange Pattern (OP) produces an animal showing three distinct colors: base, white, and orange in the pattern. Breeders sometimes call this "Tricolor" without formal naming convention.',
  },
  {
    id: 'tri_color_harlequin',
    displayName: 'Tri-Color Harlequin',
    requiredAlleleIds: ['white_pattern', 'orange_pattern', 'harlequin'],
    formula: 'WP/OP/HQ',
    description:
      'White Pattern (WP) and Orange Pattern (OP) expressed across a full Harlequin (HQ) base, producing three-color patterning that extends onto the limbs. One of the most visually complex and desirable crested gecko combinations.',
  },
  {
    id: 'bubblegum_pink',
    displayName: 'Bubblegum Pink',
    requiredAlleleIds: ['hypo', 'tangerine', 'white_pattern'],
    formula: 'H/TAN/WP',
    description:
      'Hypo (H) combined with Tangerine and White Pattern (WP) produces a pastel pink-to-coral animal with clean white pattern areas. Hypo softens the tangerine orange into bubblegum-pink tones against bright white.',
  },
  {
    id: 'whiteout',
    displayName: 'Whiteout',
    requiredAlleleIds: ['white_pattern', 'lilly_white'],
    formula: 'WP/L',
    description:
      'White Pattern (WP) combined with Lilly White (L) produces an animal with extreme white coverage — often near-completely white bodied. The two white-enhancing traits stack to maximize white expression well beyond either alone.',
    hasLillyWhiteRisk: true,
  },
  {
    id: 'brindlequin',
    displayName: 'Brindlequin',
    requiredAlleleIds: ['yellow_base', 'white_pattern', 'harlequin', 'pinstripe', 'tiger'],
    formula: 'y/WP/HQ/PIN/TIG',
    description:
      'A highly complex combo combining Yellow Base (y), White Pattern (WP), Harlequin (HQ), and Pinstripe (PIN) — all expressed over the universal Tiger (TIG) background. Produces a striking blended brindle-harlequin pattern with yellow undertones and raised scale rows.',
  },

  // ── Lilly White combos ─────────────────────────────────────────────────────

  {
    id: 'frappuccino',
    displayName: 'Frappuccino',
    requiredAlleleIds: ['cappuccino', 'lilly_white'],
    formula: 'CAPP/L',
    description:
      'Cappuccino (CAPP) combined with Lilly White (L) produces a soft, creamy animal with dramatically whitened pattern areas. The coffee-tone Cappuccino modifier cools the cream tones while Lilly White maxes out the pattern white.',
    hasLillyWhiteRisk: true,
  },
  {
    id: 'sorak',
    displayName: 'Sorak',
    // SA/L — Sable het Lilly White. Despite some seed data listing CAPP,
    // the correct formula is SA/L (Sable + Lilly White).
    requiredAlleleIds: ['sable', 'lilly_white'],
    formula: 'SA/L',
    description:
      'Sable (SA) combined with Lilly White (L) produces the Sorak — a rich dark-toned animal with intense, near-pure-white pattern areas. The deep Sable modifier creates a dramatic dark-vs-white contrast. Formula: SA/L.',
    hasLillyWhiteRisk: true,
  },
  {
    id: 'tangerine_lilly_white',
    displayName: 'Tangerine Lilly White',
    requiredAlleleIds: ['tangerine', 'lilly_white'],
    formula: 'TAN/L',
    description:
      'Tangerine combined with Lilly White (L) produces a vivid orange animal with strikingly pure-white pattern areas. The orange-red Tangerine pigmentation creates maximum contrast against the extreme white of Lilly White expression.',
    hasLillyWhiteRisk: true,
  },
  {
    id: 'dark_lilly_white',
    displayName: 'Dark Lilly White',
    requiredAlleleIds: ['black_base', 'lilly_white'],
    formula: 'B/L',
    description:
      'Black Base (B) combined with Lilly White (L) produces a dark-bodied animal with stark, pure-white pattern areas. The near-black background of Black Base maximizes the visual contrast of the Lilly White patterning.',
    hasLillyWhiteRisk: true,
  },
  {
    id: 'red_lilly_white',
    displayName: 'Red Lilly White',
    requiredAlleleIds: ['red_base', 'lilly_white'],
    formula: 'r/L',
    description:
      'Red Base (r) combined with Lilly White (L) produces a warm red-bodied animal with bright white pattern areas. Requires two copies of the recessive Red Base allele for full red base expression.',
    hasLillyWhiteRisk: true,
  },
  {
    id: 'axanthic_lilly_white',
    displayName: 'Axanthic Lilly White',
    requiredAlleleIds: ['axanthic', 'lilly_white'],
    formula: 'x/L',
    description:
      'Axanthic (x) combined with Lilly White (L) produces a grey-toned animal with pure-white pattern. Axanthic removes yellow pigment, shifting the entire palette to cool silver-grey and white. Requires two copies of the recessive Axanthic allele.',
    hasLillyWhiteRisk: true,
  },

  // ── Sable / Cappuccino interaction ─────────────────────────────────────────

  {
    id: 'luwak',
    displayName: 'Luwak',
    requiredAlleleIds: ['sable', 'cappuccino'],
    formula: 'SA/CAPP',
    description:
      'Luwak is the compound heterozygous form of Sable (SA) and Cappuccino (CAPP) — two alleles at the same gene locus. Since SA and CAPP are allelic (occupying the same position), an animal cannot be homozygous for both; Luwak animals carry one copy of each. The result is a complex blend of both color modifiers.',
  },

  // ── Phantom combos ─────────────────────────────────────────────────────────

  {
    id: 'cream_on_cream',
    displayName: 'Cream on Cream',
    requiredAlleleIds: ['phantom', 'harlequin'],
    formula: 'PH/HQ',
    description:
      'Phantom (PH) combined with Harlequin (HQ) produces a "cream on cream" look — Phantom suppresses the pattern color, leaving cream or off-white pattern areas on a similarly light base. The pattern is still present structurally but lacks the color contrast of standard Harlequin.',
  },
]
