// ─────────────────────────────────────────────────────────────────────────────
// Crested Gecko Allele Dataset — Full 30-allele set
//
// Source: Foundation Genetics documentation — 27 years of breeding research
// (1998-2025), LIL MONSTERS Reptiles, Geckological, and 20+ major breeders
// across Korea, US, and UK programs.
//
// ⚠️ SAFETY: Super Lilly White (L/L homozygous) is LETHAL.
//    Offspring die within days. NEVER breed Lilly White × Lilly White.
//
// KEY RESEARCH FACTS encoded here:
// - Tiger (TIG) is FIXED in every crested gecko — not a selectable trait
// - Brindle is NOT an allele — Tiger × Pinstripe visual interaction
// - Bi-color / colloquial "Patternless" / Buckskin / Cream / Tan are all
//   phenotypic expressions of Phantom (PH) — not separate genetic traits
// - Cream-on-Cream (C2) = Yellow Base + Hypo — not a standalone allele
// - Sable and Cappuccino are ALLELIC (occupy the same genetic locus)
// - Snowflake is EPISTATIC to White Pattern — silent without WP
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
  lethalHomozygous?: boolean     // true if super form is fatal (Lilly White)
  earlyStageResearch?: boolean   // true = insufficient proven data, low confidence
  imageUrl?: string              // path to a reference photo, e.g. '/images/traits/black-base.jpg'
}

// ─────────────────────────────────────────────
// BASE COLORS (4)
// ─────────────────────────────────────────────

const BASE_COLORS: Allele[] = [
  {
    id: 'wild_type_melanin',
    geneLocusCode: 'WT-MEL',
    displayName: 'Wild-Type Melanin',
    category: 'base_color',
    inheritance: 'dominant',
    description:
      'The baseline brown melanin characteristic of wild-caught and early captive-bred crested geckos. Brown hues especially visible on the head-stamp. Wild-type animals are different from the black-based animals selectively bred in captivity. Takes many generations toward Black Base to move away from brown tones.',
    visualCues: [
      'warm brown to golden-brown base color',
      'brown hues visible on the head-stamp especially',
      'natural earthy tones — no strong black, red, or yellow cast',
    ],
  },
  {
    id: 'black_base',
    geneLocusCode: 'B',
    displayName: 'Black Base',
    category: 'base_color',
    inheritance: 'dominant',
    description:
      'Dominant base color producing dark brown to near pitch-black coloration. Only one copy is needed to express. When combined with Hypo (H) it creates the epistatic Lavender phenotype (lavender, purple, or sky-blue). Can display both White Pattern and Orange Pattern. Selective breeding achieves near-black expression.',
    visualCues: [
      'dark brown to near-black base coloration throughout the body',
      'significantly darker base than wild-type brown',
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
      'Recessive base color requiring two copies (r/r) to fully express. Creates orange-red to deep red base coloration. Heterozygous animals (r/+) may show "Blush" — reddish cheek/face coloration that is the only reliably proven het marker in crested geckos. When combined with Hypo creates the Pink epistatic phenotype (neon red to cotton-candy pink).',
    visualCues: [
      'orange-red to deep red base color throughout the body',
      'warm red or orange-red tones visible on the sides and dorsal',
      'reddish blush on cheeks or face may indicate one copy (het r/+)',
    ],
  },
  {
    id: 'yellow_base',
    geneLocusCode: 'y',
    displayName: 'Yellow Base',
    category: 'base_color',
    inheritance: 'dominant',
    description:
      'Dominant base color producing bright to vivid yellow coloration. Acts as a secondary base — Black Base or Red Base can show through at knees, toes, and tiger breaks. Yellow Base naturally has reduced dark pigment (hypo-melanistic characteristics). Combined with Hypo produces C2 (Cream Squared) — a unicolor cream-to-white animal.',
    visualCues: [
      'vivid yellow cast throughout the base coloration',
      'yellow visible at knees, toes, and lateral breaks',
      'strong yellow expression distinct from wild-type brown even when fired down',
    ],
  },
]

// ─────────────────────────────────────────────
// PATTERN MODIFIERS (14)
// ─────────────────────────────────────────────

const PATTERN_MODIFIERS: Allele[] = [
  {
    id: 'tiger',
    geneLocusCode: 'TIG',
    displayName: 'Tiger',
    category: 'pattern',
    inheritance: 'dominant',
    description:
      'Tiger (tigering) is FIXED in every crested gecko — it is the lowest common denominator of crested gecko genetics, like spots on leopard geckos. Tiger acts like a Turing-pattern inhibitor: it creates boundaries between pattern expression areas and controls all pattern distribution. It is NOT a selectable trait. Tiger strength varies and influences how all other patterns express.',
    visualCues: [
      'vertical banding or reticulation visible on the laterals (present in ALL geckos)',
      'pattern breaks or separations between pattern expression areas',
      'alternating lighter and darker zones running perpendicular to the spine',
    ],
  },
  {
    id: 'harlequin',
    geneLocusCode: 'HQ',
    displayName: 'Harlequin',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant pattern modifier creating bold cream or white patterning extending from the dorsal onto the sides and legs. Two color variants (orange and white) appear allelic and incomplete dominant to each other. Distinguished from Flame by how far pattern extends laterally — reaching the sides and limbs is the hallmark. Expression level (stacking) determines pattern coverage.',
    visualCues: [
      'bold cream or white pattern extending from the dorsal onto the sides',
      'pattern visibly reaching the lateral surface and often the legs',
      'high contrast between base color and the pattern areas',
    ],
  },
  {
    id: 'flame',
    geneLocusCode: 'FLAME',
    displayName: 'Flame',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'Pattern morph producing a cream to white dorsal stripe or blaze running along the spine. Flame pattern migrates into spaces between tiger stripes — Tiger guides where Flame distributes. The entry-level pattern: even low expression shows visible lightening down the back. Expression is heavily influenced by Tiger strength and ratio.',
    visualCues: [
      'cream or white stripe or blaze along the dorsal ridge',
      'visible lightening running down the spine',
      'pattern mostly confined to the dorsal, not fully reaching sides or legs',
    ],
  },
  {
    id: 'white_pattern',
    geneLocusCode: 'WP',
    displayName: 'White Pattern',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'Polygenic trait producing white coloration in the pattern areas (dorsal, lateral, and on raised Pinstripe scales). White Pattern is the most common pattern color. It is affected by Phantom (which suppresses it on Pinstripe), Tangerine (which modifies it to pink/bubblegum), and Snowflake (which grows from it epistatically). Black and Red Base animals can display both WP and OP; Yellow Base animals rarely show OP.',
    visualCues: [
      'white or cream coloring in the dorsal and lateral pattern areas',
      'white pattern on raised pinstripe scales if pinstripe is present',
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
      'Polygenic trait producing orange to reddish-orange coloration in the pattern areas. Works alongside White Pattern — animals can have WP only, OP only, or both (Tri-Color). Yellow Base animals rarely show distinct OP (it fades to white). Check for Tangerine influence creating pink/bubblegum tones. Orange Pattern is more prominent on Black Base and Red Base animals.',
    visualCues: [
      'orange to reddish-orange coloring in the dorsal and lateral pattern areas',
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
      'The true Patternless allele (PTL) completely removes pattern from the animal — both pattern structure and color are absent. Proven genetically distinct from the colloquial "patternless" appearance caused by Phantom (PH) suppressing pattern COLOR. Phantom-patternless animals still have underlying pattern structure; PTL-patternless animals have no pattern at all.',
    visualCues: [
      'completely uniform coloration with no pattern structure or color whatsoever',
      'distinguished from Phantom-patternless by total absence of underlying pattern structure',
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
      'Dominant mutation producing black spots of varying size and density scattered across the body. Only one copy needed to express. Significant size and density variation exists between individuals. Spot density ranges from low (handful of spots) to heavy (dense coverage). Can occur on any base color or pattern combination.',
    visualCues: [
      'round black spots scattered across the body',
      'spots visible on sides, head, dorsal, or tail',
      'spots distinct from base color and pattern markings',
    ],
  },
  {
    id: 'orange_spot',
    geneLocusCode: 'OS',
    displayName: 'Orange Spot',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'Lateral orange spots originally described in early crested geckos. The trait responsible may constrain pattern to lateral positions like portholes, walling, and quad striping after decades of selective breeding and refinement. Relationship to modern White Pattern and Orange Pattern lateral expressions is still being studied.',
    visualCues: [
      'lateral orange spots toward the hind legs',
      'orange spot expression confined to the lateral surface',
      'pattern constrained to lateral areas in a spot-like distribution',
    ],
  },
  {
    id: 'marble',
    geneLocusCode: 'TI-M',
    displayName: 'Marble',
    category: 'pattern',
    inheritance: 'polygenic',
    description:
      'A form of tiger pattern with thicker, more widely spaced irregular bands than typical tigering. Creates a distinct marbled appearance rather than fine tiger reticulation. Distinguished from standard Tiger by the thickness and spacing of the bands.',
    visualCues: [
      'thick irregular banding pattern more widely spaced than typical tiger striping',
      'marbled effect rather than fine reticulated tigering',
      'heavier, more distinct banding pattern on the lateral surface',
    ],
  },
  {
    id: 'marbling',
    geneLocusCode: 'M',
    displayName: 'Marbling',
    category: 'pattern',
    inheritance: 'dominant',
    description:
      'Early-stage research. Creates broken pattern resembling marbling — mottled bands and orbs of concentrated solid white patterning instead of soft Snowflake patterning. Affects base color producing wine-colored translucent appearance with dark scale tips throughout. Currently being validated through systematic breeding trials.',
    visualCues: [
      'mottled bands and orbs of concentrated white patterning',
      'wine-colored or translucent base appearance with dark scale tips',
      'broken marbling pattern distinct from typical white or orange pattern',
    ],
    earlyStageResearch: true,
  },
  {
    id: 'empty_back',
    geneLocusCode: 'EB',
    displayName: 'Empty Back',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant trait similar to Superstripe and Pinstripe in appearance but with significantly reduced or absent pattern color. Best examples are completely empty of pattern color, leaving only a pinstripe outline on an empty back. Homozygous form suppresses almost all color (except Yellow Base and Tangerine animals where color is modified instead).',
    visualCues: [
      'dorsal pattern color significantly reduced or completely absent',
      'only pinstripe outline visible against an empty-colored back',
      'empty or near-empty dorsal area distinct from normal harlequin or flame coverage',
    ],
  },
  {
    id: 'superstripe',
    geneLocusCode: 's',
    displayName: 'Superstripe',
    category: 'pattern',
    inheritance: 'recessive',
    description:
      'Recessive trait creating a continuous dorsal stripe plus additional lateral stripes when combined with Pinstripe and White Pattern. A "perfect Superstripe" shows a dorsal stripe, quad stripes (Quadstripe pattern), and 100% Pinstripe. White Pattern forms quad stripes when combined with Pinstripe on the mid-lateral line. Quadstripe is a phenotypic expression of Superstripe + PIN + WP, not a separate trait.',
    visualCues: [
      'continuous dorsal stripe running neck to tail',
      'additional lateral stripes parallel to the dorsal (quad stripe appearance)',
      'clean, defined stripe pattern distinct from typical harlequin coverage',
    ],
  },
  {
    id: 'snowflake',
    geneLocusCode: 'SNOWFLAKE',
    displayName: 'Snowflake',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'One of only a few confirmed epistatic traits in crested gecko genetics. Snowflake REQUIRES White Pattern (WP) to express — without WP it remains completely silent. When WP is present, Snowflake grows small white blobs from all WP areas. Combined with Lilly White it can produce near-total white coverage. The "Drippy" pattern (dripping from Pinstripe onto laterals) is Snowflake expressing on Pinstripe + WP.',
    visualCues: [
      'small white blob-like growths radiating outward from white pattern areas',
      'dripping or spreading white coloration from pinstripe onto laterals',
      'snowflake-like spots blooming from areas of white pattern',
    ],
  },
  {
    id: 'whitewall',
    geneLocusCode: 'W',
    displayName: 'Whitewall',
    category: 'pattern',
    inheritance: 'incomplete_dominant',
    description:
      'Produces a thick wall of cream or white pattern on the laterals, often accompanied by raised scales. The lower expression form is called Whiteout; Whitewall is the "extreme" version where solid white lateral markings span the sides from limb to limb and reach up fairly high on the sides. Often associated with lower expression whiteouts having less coverage.',
    visualCues: [
      'thick solid wall of white or cream coloring spanning the lateral sides',
      'white lateral marking runs continuously from forelimbs to hindlimbs',
      'solid white lateral band distinct from the scattered pattern of harlequin',
    ],
  },
]

// ─────────────────────────────────────────────
// STRUCTURAL (3)
// ─────────────────────────────────────────────

const STRUCTURAL_TRAITS: Allele[] = [
  {
    id: 'pinstripe',
    geneLocusCode: 'PIN',
    displayName: 'Pinstripe',
    category: 'structural',
    inheritance: 'dominant',
    description:
      'Dominant structural trait producing raised cream or white scales aligned along the dorsal ridge and/or sides, creating linear stripe patterns. Pinstripe runs horizontally (head-to-tail) while Tiger runs vertically — they interact to create Brindle (TIG × PIN ratio interaction) and Reverse Pin (dark line where Tiger pushes against the Pin). Possibly homozygous Pinstripe produces 98-100% scale coverage.',
    visualCues: [
      'raised cream or white scales aligned in rows along the dorsal ridge',
      'linear rows of raised scales running lengthwise down the back or sides',
      'scale texture noticeably elevated compared to surrounding non-pin scales',
    ],
  },
  {
    id: 'softscale',
    geneLocusCode: 'S3',
    displayName: 'Softscale',
    category: 'structural',
    inheritance: 'incomplete_dominant',
    description:
      'Structural gene producing distinct matte coloration visible in both heterozygous and homozygous forms. Produces a significantly different color palette compared to non-Softscale animals — matte rather than typical sheen. The homozygous form shows visible scale spacing. Acts as both a structural trait and a color enhancer, shifting the entire color palette.',
    visualCues: [
      'matte texture instead of typical glossy or semi-glossy skin sheen',
      'different color palette — colors appear shifted or muted compared to same-morph animals without Softscale',
      'visible scale spacing in the homozygous super form',
    ],
  },
  {
    id: 'furry',
    geneLocusCode: 'F',
    displayName: 'Furry',
    category: 'structural',
    inheritance: 'polygenic',
    description:
      'Early-stage research. Wide area of raised scales lining the edge of the dorsum from neck extending to tail. In some cases scales start at the head crest. Physical structural trait not significantly affected by most other traits except Pinstripe. Inheritance pattern not yet confirmed.',
    visualCues: [
      'wide area of raised scales along the dorsal edge from neck to tail',
      'furry or feathered appearance along the dorsal ridge',
      'raised scale area wider and less organized than pinstripe',
    ],
    earlyStageResearch: true,
  },
]

// ─────────────────────────────────────────────
// COLOR MODIFIERS (9)
// ─────────────────────────────────────────────

const COLOR_MODIFIERS: Allele[] = [
  {
    id: 'phantom',
    geneLocusCode: 'PH',
    displayName: 'Phantom',
    category: 'modifier',
    inheritance: 'recessive',
    description:
      'Recessive melanin-producing trait requiring two copies (PH/PH) to express. Creates a wide range of phenotypes: bi-color, the colloquial "patternless" look, buckskin, cream, and tan — these are all Phantom expressions, NOT separate traits. Blends melanin with base colors and suppresses White Pattern color on Pinstripe raised scales. Any bi-color or colloquially-patternless-looking animal has Phantom.',
    visualCues: [
      'bi-color appearance: distinctly darker dorsal vs lighter lateral coloration',
      'pattern color suppressed creating a patternless or cream-colored appearance',
      'melanin blending into base creating buckskin or tan appearance',
    ],
  },
  {
    id: 'sable',
    geneLocusCode: 'SA',
    displayName: 'Sable',
    category: 'modifier',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant color modifier creating white patterning on the dorsum with distinct texture. Part of the first confirmed allelic complex in crested gecko genetics — Sable and Cappuccino are allelic (same locus, different mutations). The homozygous form (Super Sable) has a creamy-colored dorsum with yellowish areas and velvet-like texture. Shows a skull-shaped pattern around headstamp in super form.',
    visualCues: [
      'white to cream patterning on the dorsum with distinct matte texture',
      'velvet-like texture visible on dorsal areas',
      'lighter dorsal coloration with distinct headstamp pattern in super form',
    ],
  },
  {
    id: 'cappuccino',
    geneLocusCode: 'CAPP',
    displayName: 'Cappuccino',
    category: 'modifier',
    inheritance: 'incomplete_dominant',
    description:
      'Incomplete dominant color modifier allelic with Sable (same locus). The super (homozygous) form shows extreme melanistic or translucent appearance, smoother/more translucent skin texture, possible reduced nostril size, and possibly shorter snout structure. Health monitoring recommended for super form. Combined with Lilly White creates Frappuccino combo.',
    visualCues: [
      'intermediate color modification in het form — subtle darkening or color shift',
      'super form: very dark or translucent appearance with smooth/waxy skin texture',
      'super form: may show reduced or differently shaped nostril area',
    ],
  },
  {
    id: 'luwak',
    geneLocusCode: 'LUWAK',
    displayName: 'Luwak',
    category: 'modifier',
    inheritance: 'incomplete_dominant',
    description:
      'The allelic combination produced when Sable and Cappuccino are bred together — it represents the compound heterozygous state of both alleles at the same locus (SA/CAPP). Shows characteristics of both super forms blended: suppressed dorsal Sable stripe with more uniform Cappuccino coloration across the animal. Demonstrates incomplete dominance.',
    visualCues: [
      'blended characteristics of both Sable and Cappuccino',
      'suppressed dorsal Sable stripe combined with more uniform Cappuccino coloration',
      'intermediate appearance not matching either super Sable or super Cappuccino alone',
    ],
  },
  {
    id: 'cold_fusion',
    geneLocusCode: 'Hc',
    displayName: 'Cold Fusion',
    category: 'modifier',
    inheritance: 'polygenic',
    description:
      'A refined Hypo line selectively bred by Tom Favazza (@Geckological) to produce sky-blue coloration on Black Base animals. Creates unique yellows, reds, and lavenders. Paper-white White Pattern possible. Acts as an enhancer — the most significant aspect is blue tones with Black Base. When Black Base and Yellow Base Cold Fusion animals are bred, progeny are either yellow OR blue-tone lavender (no blended form).',
    visualCues: [
      'sky-blue tones on Black Base (strongest distinguishing feature)',
      'extremely blue-tone lavender when Black Base + Hypo',
      'paper-white White Pattern expression possible',
    ],
  },
  {
    id: 'hypo',
    geneLocusCode: 'H',
    displayName: 'Hypo',
    category: 'modifier',
    inheritance: 'dominant',
    description:
      'Dominant hypomelanistic trait that reduces overall melanin production. Creates epistatic color changes when combined with base colors: Black Base + Hypo = Lavender (grey to sky blue), Red Base + Hypo = Pink (neon red to cotton-candy pink), Yellow Base + Hypo = C2 (cream to unicolor white). At least three distinct Hypo forms exist. Cold Fusion (Hc) has the strongest effect for blue-tone lavender.',
    visualCues: [
      'overall lighter or paler appearance than the base color would suggest',
      'melanin noticeably reduced — grey, lavender, or pink tones emerge',
      'Black Base + Hypo = lavender to sky-blue coloration',
    ],
  },
  {
    id: 'lilly_white',
    geneLocusCode: 'L',
    displayName: 'Lilly White',
    category: 'modifier',
    inheritance: 'incomplete_dominant',
    description:
      '⚠️ LETHAL when homozygous (L/L). Super Lilly White offspring cannot breathe or eat properly and die within days to one week. NEVER breed Lilly White × Lilly White. Heterozygous Lilly White (L/+) produces dramatic white/cream expression in pattern areas on Harlequin or Flame animals. Areas that would be cream become near-pure white. Combined with Snowflake creates near-total white coverage.',
    visualCues: [
      'dramatically enhanced near-pure white expression in pattern areas',
      'pattern areas that would normally be cream are bleached to near-white',
      'extreme white expression most visible in harlequin or flame animals',
    ],
    lethalHomozygous: true,
  },
  {
    id: 'axanthic',
    geneLocusCode: 'x',
    displayName: 'Axanthic',
    category: 'modifier',
    inheritance: 'recessive',
    description:
      'Recessive trait eliminating or severely reducing yellow/xanthic pigment — requires two copies to express. Axanthic animals appear grey-toned even when fully fired up. Colors that would be yellow or orange appear grey or blue-grey. Three lines appeared within a short timeframe (AE, MSL, Obscurial) — all appear compatible. Axanthic + Harlequin = paper-white harlequin on a black-to-brown base.',
    visualCues: [
      'grey or blue-grey tones where yellow or warm pigment would normally appear',
      'overall grey appearance even when fired up — no warm yellow or orange tones',
      'paper-white pattern coloring on a greyed base',
    ],
  },
  {
    id: 'tangerine',
    geneLocusCode: 'TANG',
    displayName: 'Tangerine',
    category: 'modifier',
    inheritance: 'polygenic',
    description:
      'Color modifier that infuses tangerine/orange pigment throughout the animal, modifying both White Pattern (to pink or bubblegum hues) and Orange Pattern (to deeper tangerine or pink). Tangerine affects all pattern areas including fringing. Combined with Lilly White creates Tangerine Lilly combo — areas that would be white become deep tangerine. Inheritance pattern not fully confirmed.',
    visualCues: [
      'orange to tangerine pigment infused throughout pattern areas',
      'white pattern areas take on pink or bubblegum coloration',
      'overall warm orange-toned appearance beyond what base color alone produces',
    ],
  },
]

// ─────────────────────────────────────────────
// Combined export
// ─────────────────────────────────────────────

export const CRESTED_GECKO_ALLELES: Allele[] = [
  ...BASE_COLORS,
  ...PATTERN_MODIFIERS,
  ...STRUCTURAL_TRAITS,
  ...COLOR_MODIFIERS,
]
