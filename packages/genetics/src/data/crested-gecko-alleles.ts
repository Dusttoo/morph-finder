// ─────────────────────────────────────────────────────────────────────────────
// Crested Gecko Allele Dataset
//
// Source: Foundation Genetics documentation — 27 years of breeding research
// (1998-2025) compiled from LIL MONSTERS Reptiles, Geckological, and 20+ major
// breeders across Korea, US, and UK programs.
//
// ⚠️ SAFETY: Super Lilly White (L/L homozygous) is LETHAL.
//    Offspring die within days. Never breed Lilly White × Lilly White.
//
// KEY RESEARCH FINDINGS encoded in this data:
// - Tiger (TIG) is FIXED in all crested geckos — not a selectable trait
// - Brindle is NOT an allele — it is a Tiger × Pinstripe visual interaction
// - Bi-color / Patternless (colloquial) / Buckskin / Cream are all phenotypic
//   expressions of Phantom (PH) — NOT separate genetic traits
// - Cream-on-Cream (C2) is a combo morph (y + H), not a standalone modifier
// - Lilly White is INCOMPLETE_DOMINANT (not recessive) — super form is lethal
// ─────────────────────────────────────────────────────────────────────────────

export type InheritancePattern =
  | 'recessive'
  | 'dominant'
  | 'incomplete_dominant'
  | 'polygenic'
  | 'codominant'

export type TraitCategory =
  | 'base_color'
  | 'pattern'
  | 'structural'
  | 'modifier'

export interface Allele {
  id: string                     // snake_case slug, e.g. 'lilly_white'
  geneLocusCode: string          // breeder notation, e.g. 'L', 'PH', 'PIN'
  displayName: string            // human label, e.g. 'Lilly White'
  category: TraitCategory
  inheritance: InheritancePattern
  description: string            // plain English, shown on result screen
  visualCues: string[]           // what to look for — drives wizard questions
  incompatibleWith?: string[]    // allele IDs that cannot co-occur
  lethalHomozygous?: boolean     // true if super/HOM form is fatal (e.g. Lilly White)
}

export const CRESTED_GECKO_ALLELES: Allele[] = [
  // ─────────────────────────────────────────────
  // BASE COLORS
  // Three independently-inherited loci control base color.
  // ─────────────────────────────────────────────

  {
    id: 'wild_type_melanin',
    geneLocusCode: 'WT-MEL',
    displayName: 'Wild-Type Melanin',
    category: 'base_color',
    inheritance: 'dominant',
    description:
      'The baseline brown melanin characteristic of wild-caught and early captive-bred crested geckos. Wild-type animals display warm brown hues especially on the head-stamp. Takes many generations of selective breeding toward Black Base to move away from these brown tones.',
    visualCues: [
      'warm brown to golden-brown base color',
      'brown hues visible on the head-stamp especially',
      'natural earthy tones without strong black, red, or yellow cast',
    ],
  },
  {
    id: 'black_base',
    geneLocusCode: 'B',
    displayName: 'Black Base',
    category: 'base_color',
    inheritance: 'dominant',
    description:
      'Dominant base color producing dark brown to pure pitch-black coloration. Black Base animals require only one copy to show the trait. When combined with Hypo (H) it creates the epistatic Lavender phenotype (lavender, purple, or sky-blue). Wild-type animals display brown Black Base hues; selective breeding achieves near-black expression.',
    visualCues: [
      'dark brown to near-black base coloration throughout the body',
      'significantly darker base than wild-type brown animals',
      'melanin expression strongest on dorsal and head-stamp',
    ],
  },
  {
    id: 'red_base',
    geneLocusCode: 'r',
    displayName: 'Red Base',
    category: 'base_color',
    inheritance: 'recessive',
    description:
      'Recessive base color requiring two copies (r/r) to express fully. Creates orange-red to deep red base coloration. Heterozygous animals (r/+) may show "Blush" — a reddish cheek/face coloration that is the only reliably proven het marker in crested geckos. When combined with Hypo creates the Pink epistatic phenotype (neon red to cotton-candy pink).',
    visualCues: [
      'orange-red to deep red base color throughout the body',
      'warm red or orange-red tones visible on the sides and dorsal',
      'reddish blush on cheeks or face may indicate one copy (het)',
    ],
  },
  {
    id: 'yellow_base',
    geneLocusCode: 'y',
    displayName: 'Yellow Base',
    category: 'base_color',
    inheritance: 'dominant',
    description:
      'Dominant base color producing bright to vivid yellow coloration. Yellow Base acts as an overlay — other base colors show through at knees, toes, and tiger breaks. Combined with Hypo it produces C2 (Cream-on-Cream / Cream Squared), a unicolor cream-to-white animal. Yellow Base already naturally reduces melanin; Hypo amplifies this.',
    visualCues: [
      'vivid yellow cast throughout the base coloration',
      'yellow visible at knees, toes, and lateral breaks',
      'strong yellow expression distinct from wild-type brown even when fired down',
    ],
  },

  // ─────────────────────────────────────────────
  // PATTERN MODIFIERS
  // ─────────────────────────────────────────────

  {
    id: 'tiger',
    geneLocusCode: 'TIG',
    displayName: 'Tiger',
    category: 'pattern',
    inheritance: 'dominant',
    description:
      'Tiger (tigering) is a FIXED trait present in every crested gecko — it is the lowest common denominator of crested gecko genetics, equivalent to spots on leopard geckos. Tiger acts like a Turing pattern: it is the inhibitor that creates boundaries between pattern expression areas. It is NOT a selectable trait. Its strength and expression level varies within the population and influences how all other patterns distribute.',
    visualCues: [
      'vertical banding or reticulation visible on the laterals (present in all geckos)',
      'pattern breaks or separations between pattern expression areas',
      'lighter and darker alternating zones running perpendicular to the spine',
    ],
  },
  {
    id: 'harlequin',
    geneLocusCode: 'HQ',
    displayName: 'Harlequin',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant pattern modifier creating bold cream or white patterning extending from the dorsal onto the sides and legs. Harlequin is distinguished from Flame by how far the pattern extends laterally — reaching the sides and limbs is the hallmark. Expression level (stacking) determines pattern coverage and intensity. White Pattern (WP) Harlequin specifically shows white coloring on the dorsum.',
    visualCues: [
      'bold cream or white pattern extending from the dorsal onto the sides',
      'pattern visibly reaching the lateral surface and often the legs',
      'high contrast between base color and pattern areas',
    ],
  },
  {
    id: 'flame',
    geneLocusCode: 'FLAME',
    displayName: 'Flame',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'Pattern morph producing a light cream to white dorsal stripe or blaze running along the spine. Flame is the entry-level pattern — even low expression shows visible lightening down the back. Flame pattern interacts significantly with Tiger: the pattern migrates into spaces between tiger stripes, and Tiger guides where the Flame pattern distributes.',
    visualCues: [
      'cream or white stripe or blaze along the dorsal ridge',
      'visible lightening running down the spine',
      'pattern mostly confined to the dorsal, not extensively reaching the sides or legs',
    ],
  },
  {
    id: 'white_pattern',
    geneLocusCode: 'WP',
    displayName: 'White Pattern',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'Polygenic trait producing white coloration in the pattern areas (dorsal, lateral, and on raised Pinstripe scales). White Pattern is the most common pattern color in crested geckos. It interacts with Phantom (which suppresses it on Pinstripe), Tangerine (which modifies it to pink/bubblegum), and Snowflake (which grows from it epistatically). Black and Red Base animals can display both WP and Orange Pattern; Yellow Base animals rarely show Orange Pattern.',
    visualCues: [
      'white or cream coloring in the dorsal and lateral pattern areas',
      'white pattern on raised pinstripe scales (if pinstripe is present)',
      'bright white fringe, dorsal stripe, or lateral pattern expression',
    ],
  },
  {
    id: 'orange_pattern',
    geneLocusCode: 'OP',
    displayName: 'Orange Pattern',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'Polygenic trait producing orange coloration in the pattern areas. Orange Pattern works alongside White Pattern — animals can have WP only, OP only, or both (Tri-Color). Yellow Base animals rarely show distinct OP (it fades to white). Orange Pattern can be modified by Tangerine. Combined with Black Base creates the Halloween morph.',
    visualCues: [
      'orange coloring in the dorsal and lateral pattern areas',
      'distinct orange pattern distinct from the base color',
      'orange fringe, dorsal stripe, or lateral marking expression',
    ],
  },
  {
    id: 'patternless',
    geneLocusCode: 'PTL',
    displayName: 'Patternless (Allele)',
    category: 'pattern',
    inheritance: 'recessive',
    description:
      'The true Patternless allele (PTL) completely removes pattern from the animal — pattern structure and color are both absent. Proven genetically distinct from the colloquial "patternless" appearance caused by Phantom (PH) suppressing pattern COLOR. Phantom-patternless animals still have underlying pattern structure; PTL-patternless animals have no pattern at all. Requires two copies (recessive) to express.',
    visualCues: [
      'completely uniform coloration with no pattern structure whatsoever',
      'distinguished from Phantom-patternless by absence of any underlying pattern structure',
      'smooth, clean appearance with zero lateral patterning or dorsal striping',
    ],
  },
  {
    id: 'dalmatian',
    geneLocusCode: 'DAL',
    displayName: 'Dalmatian',
    category: 'pattern',
    inheritance: 'dominant',
    description:
      'Dominant mutation producing black spots of varying size and density scattered across the body. Requires only one copy to express. Spot density ranges from low (a handful of spots) to heavy (dense spot coverage). Can occur on any base color or pattern combination. Significant size and density variation exists between individuals.',
    visualCues: [
      'round black spots scattered across the body',
      'spots visible on the sides, head, dorsal, or tail',
      'spots distinct from base color and pattern markings',
    ],
  },
  {
    id: 'snowflake',
    geneLocusCode: 'SNOWFLAKE',
    displayName: 'Snowflake',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'One of the only confirmed epistatic traits in crested gecko genetics. Snowflake REQUIRES White Pattern (WP) to express — without WP it remains completely silent. When WP is present, Snowflake grows small white blobs from all WP areas (pinstripe, portholes, lateral pattern). Combined with Lilly White it can produce near-total white coverage. The "Drippy" pattern breeders describe is Snowflake dripping from Pinstripe onto the laterals.',
    visualCues: [
      'small white blob-like growths radiating outward from white pattern areas',
      'dripping or spreading white coloration from pinstripe onto the laterals',
      'white snowflake-like spots blooming from areas of white pattern',
    ],
  },
  {
    id: 'superstripe',
    geneLocusCode: 's',
    displayName: 'Superstripe',
    category: 'pattern',
    inheritance: 'recessive',
    description:
      'Recessive trait creating a continuous dorsal stripe plus additional lateral stripes when combined with Pinstripe and White Pattern. A "perfect Superstripe" shows a dorsal stripe, quad stripes, and 100% Pinstripe. White Pattern forms quad stripes when combined with Pinstripe on the mid-lateral line. Quadstripe is a phenotypic expression of Superstripe + Pinstripe + White Pattern, not a separate trait.',
    visualCues: [
      'continuous dorsal stripe running neck to tail',
      'additional lateral stripes parallel to the dorsal (quad stripe appearance)',
      'clean, defined stripe pattern distinct from typical harlequin coverage',
    ],
  },
  {
    id: 'whitewall',
    geneLocusCode: 'W',
    displayName: 'Whitewall',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'Produces a thick wall of cream or white pattern on the laterals, often accompanied by raised scales. The lower expression form is called Whiteout; Whitewall is the "extreme" version where solid white lateral markings span the sides from limb to limb. Often mistaken for Lilly White but genetically distinct.',
    visualCues: [
      'thick solid wall of white or cream coloring spanning the lateral sides',
      'white lateral marking runs continuously from forelimbs to hindlimbs',
      'solid white lateral band distinct from the scattered pattern of typical harlequin',
    ],
  },

  // ─────────────────────────────────────────────
  // STRUCTURAL
  // ─────────────────────────────────────────────

  {
    id: 'pinstripe',
    geneLocusCode: 'PIN',
    displayName: 'Pinstripe',
    category: 'structural',
    inheritance: 'dominant',
    description:
      'Dominant structural trait producing raised cream or white scales aligned along the dorsal ridge and/or sides, creating linear stripe patterns. Partial pinstripes show some raised scale rows; full pinstripes run continuously from neck to tail base. Pinstripe runs horizontally (head-to-tail) while Tiger runs vertically — they interact to create Brindle (TIG × PIN ratio interaction) and Reverse Pin (dark line where Tiger pushes against the Pin).',
    visualCues: [
      'raised cream or white scales aligned in rows along the dorsal ridge',
      'linear rows of raised scales running lengthwise down the back or sides',
      'scale texture noticeably elevated compared to surrounding non-pin scales',
    ],
  },
  {
    id: 'lilly_white',
    geneLocusCode: 'L',
    displayName: 'Lilly White',
    category: 'structural',
    inheritance: 'incomplete_dominant',
    description:
      '⚠️ LETHAL when homozygous (L/L). Super Lilly White offspring cannot breathe or eat properly and die within days. NEVER breed Lilly White × Lilly White. Heterozygous Lilly White (L/+) produces dramatic white or cream expression in pattern areas on Harlequin or Flame animals. The white areas that would normally be cream or off-white become near-pure white. Combined with Snowflake it can produce near-total white coverage animals.',
    visualCues: [
      'dramatically enhanced white or near-pure white expression in pattern areas',
      'pattern areas that would normally be cream are bleached to near-white',
      'extreme white expression most visible in harlequin or flame pattern animals',
    ],
    incompatibleWith: ['patternless'],
    lethalHomozygous: true,
  },

  // ─────────────────────────────────────────────
  // MODIFIERS (Color Modifiers)
  // ─────────────────────────────────────────────

  {
    id: 'phantom',
    geneLocusCode: 'PH',
    displayName: 'Phantom',
    category: 'modifier',
    inheritance: 'recessive',
    description:
      'Recessive melanin-producing trait — requires two copies (PH/PH) to express. Creates a wide range of phenotypes including bi-color, the colloquial "patternless" appearance, buckskin, cream, and tan. These are NOT separate traits — they are all expressions of Phantom at different dominance levels. Phantom blends melanin with base colors and suppresses White Pattern color on Pinstripe raised scales. Any bi-color or patternless-looking animal has Phantom.',
    visualCues: [
      'bi-color appearance with darker dorsal and lighter lateral coloration',
      'pattern color suppressed creating a patternless or cream-colored look',
      'melanin blending into base creating buckskin or tan appearance',
    ],
  },
  {
    id: 'hypo',
    geneLocusCode: 'H',
    displayName: 'Hypo',
    category: 'modifier',
    inheritance: 'dominant',
    description:
      'Dominant hypomelanistic trait that reduces overall melanin production. Creates epistatic color changes when combined with base colors: Black Base + Hypo = Lavender (pale grey to sky blue), Red Base + Hypo = Pink (neon red to cotton-candy pink), Yellow Base + Hypo = C2 (cream to unicolor white). At least three distinct Hypo forms exist (standard, Cold Fusion, and possibly a third) — Cold Fusion (Hc) has the strongest effect especially for blue-tone lavender.',
    visualCues: [
      'overall lighter or paler appearance than the base color would suggest',
      'melanin noticeably reduced — grey, lavender, or pink tones possible',
      'combination with black base creates lavender to sky-blue coloration',
    ],
  },
  {
    id: 'axanthic',
    geneLocusCode: 'x',
    displayName: 'Axanthic',
    category: 'modifier',
    inheritance: 'recessive',
    description:
      'Recessive trait that eliminates or severely reduces yellow/xanthic pigment. Axanthic animals appear grey-toned even when fully fired up — colors that would normally be yellow or orange appear grey or blue-grey. Axanthic + Harlequin creates paper-white harlequin pattern on a black-to-brown base. Axanthic + Pinstripe creates paper-white pinstripe coloration (the strongest effect). Requires two copies to express.',
    visualCues: [
      'grey or blue-grey tones where yellow or warm pigment would normally appear',
      'overall grey appearance even when fired up — no warm yellow or orange tones',
      'paper-white pattern coloring on a greyed base',
    ],
  },
  {
    id: 'sable',
    geneLocusCode: 'SA',
    displayName: 'Sable',
    category: 'modifier',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant color modifier creating white patterning on the dorsum with distinct texture characteristics. Part of the first confirmed allelic complex in crested gecko genetics — Sable and Cappuccino are allelic (occupy the same locus). The homozygous form (Super Sable) has a creamy-colored dorsum with yellowish areas and velvet-like texture. Heterozygous Sable shows an intermediate form.',
    visualCues: [
      'white to cream patterning on the dorsum with distinct texture',
      'velvet-like or matte texture visible on dorsal areas',
      'color modifier creating lighter dorsal coloration distinct from typical pattern',
    ],
  },
  {
    id: 'cappuccino',
    geneLocusCode: 'CAPP',
    displayName: 'Cappuccino',
    category: 'modifier',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant color modifier allelic with Sable — they occupy the same genetic locus. Heterozygous Cappuccino shows intermediate color modification. The super (homozygous) form shows extreme melanistic or translucent appearance, smoother/more translucent skin texture, possible reduced nostril size, and possibly shorter snout structure. Combined with Lilly White it creates the Frappuccino combo morph.',
    visualCues: [
      'intermediate color modification in het form — subtle darkening or color shift',
      'super form: very dark or translucent appearance with smooth/waxy skin texture',
      'super form: may show reduced or differently shaped nostril area',
    ],
  },
  {
    id: 'tangerine',
    geneLocusCode: 'TANG',
    displayName: 'Tangerine',
    category: 'modifier',
    inheritance: 'polygenic',
    description:
      'Color modifier that infuses tangerine/orange pigment throughout the animal, modifying both White Pattern (to pink or bubblegum hues) and Orange Pattern (to deeper tangerine or pink). Tangerine affects all pattern areas including fringing. Combined with Lilly White it creates the Tangerine Lilly combo — areas that would normally be white become deep tangerine instead.',
    visualCues: [
      'orange to tangerine pigment infused throughout pattern areas',
      'white pattern areas take on pink or bubblegum coloration',
      'overall warm orange-toned appearance beyond what the base color alone would produce',
    ],
  },
]
