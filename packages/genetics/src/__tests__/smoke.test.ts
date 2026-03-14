import {
  generatePhenotypeQuestions,
  resolveObservation,
  getAlleleDisplayInfo,
  CRESTED_GECKO_ALLELES,
  CRESTED_GECKO_COMBO_MORPHS,
  CRESTED_GECKO_TRAIT_INTERACTIONS,
} from '../index'

describe('@morphfinder/genetics smoke tests', () => {
  // ── Phase 1 (original) ────────────────────────────────────────────────────

  it('generates at least 5 questions', () => {
    const questions = generatePhenotypeQuestions()
    expect(questions.length).toBeGreaterThanOrEqual(5)
    expect(questions[0].id).toBeDefined()
    expect(questions[0].options.length).toBeGreaterThan(0)
  })

  it('resolves a harlequin pinstripe observation', () => {
    const result = resolveObservation([
      { questionId: 'base_color', selectedOptionIds: ['red'] },
      { questionId: 'pattern_type', selectedOptionIds: ['harlequin'] },
      { questionId: 'structural', selectedOptionIds: ['full_pinstripe'] },
      { questionId: 'dalmatian', selectedOptionIds: ['none'] },
      { questionId: 'firing_confidence', selectedOptionIds: ['consistent_pale'] },
    ])
    expect(result.morphName).toBeTruthy()
    expect(result.confidence).toBe('high')
    expect(result.reptiDexPrompt).toContain('ReptiDex')
  })

  it('returns display info for a known allele', () => {
    const info = getAlleleDisplayInfo('lilly_white')
    expect(info).not.toBeNull()
    expect(info?.displayName).toBe('Lilly White')
  })

  it('exports allele data with required fields', () => {
    expect(CRESTED_GECKO_ALLELES.length).toBeGreaterThan(5)
    const first = CRESTED_GECKO_ALLELES[0]
    expect(first.id).toBeDefined()
    expect(first.category).toBeDefined()
    expect(first.inheritance).toBeDefined()
    expect(first.visualCues.length).toBeGreaterThan(0)
  })

  // ── Phase 2 (v2 upgrades) ─────────────────────────────────────────────────

  it('exports exactly 30 alleles', () => {
    expect(CRESTED_GECKO_ALLELES.length).toBe(30)
  })

  it('exports at least 10 combo morphs with non-empty requiredAlleleIds', () => {
    expect(CRESTED_GECKO_COMBO_MORPHS.length).toBeGreaterThanOrEqual(10)
    for (const combo of CRESTED_GECKO_COMBO_MORPHS) {
      expect(combo.id).toBeDefined()
      expect(combo.displayName).toBeDefined()
      expect(combo.requiredAlleleIds.length).toBeGreaterThan(0)
      expect(combo.formula).toBeDefined()
    }
  })

  it('exports at least 10 trait interactions with at least 3 isOftenMistakenForTrait', () => {
    expect(CRESTED_GECKO_TRAIT_INTERACTIONS.length).toBeGreaterThanOrEqual(10)
    const misconceptions = CRESTED_GECKO_TRAIT_INTERACTIONS.filter(
      (i) => i.isOftenMistakenForTrait
    )
    expect(misconceptions.length).toBeGreaterThanOrEqual(3)
    // Every isOftenMistakenForTrait interaction must have an educationNote
    for (const m of misconceptions) {
      expect(m.educationNote).toBeDefined()
      expect(m.educationNote!.length).toBeGreaterThan(0)
    }
  })

  it('detects Lavender when Black Base + Hypo are observed', () => {
    const result = resolveObservation([
      { questionId: 'base_color', selectedOptionIds: ['black'] },
      { questionId: 'color_modifier', selectedOptionIds: ['hypo'] },
      { questionId: 'pattern_type', selectedOptionIds: ['harlequin'] },
      { questionId: 'firing_confidence', selectedOptionIds: ['consistent_dark'] },
    ])
    expect(result.morphName.toLowerCase()).toContain('lavender')
    expect(result.matchedAlleleIds).toContain('black_base')
    expect(result.matchedAlleleIds).toContain('hypo')
  })

  it('includes Lilly White lethal warning in notes when lilly_white is matched', () => {
    const result = resolveObservation([
      { questionId: 'base_color', selectedOptionIds: ['wild_type'] },
      { questionId: 'pattern_type', selectedOptionIds: ['harlequin'] },
      { questionId: 'white_expression', selectedOptionIds: ['lilly_white'] },
      { questionId: 'firing_confidence', selectedOptionIds: ['consistent_pale'] },
    ])
    expect(result.matchedAlleleIds).toContain('lilly_white')
    expect(result.notes).toBeDefined()
    expect(result.notes!.toLowerCase()).toContain('lethal')
  })

  it('returns a hetHint when blush_indicator is yes on a non-red base', () => {
    const result = resolveObservation([
      { questionId: 'base_color', selectedOptionIds: ['wild_type'] },
      { questionId: 'pattern_type', selectedOptionIds: ['harlequin'] },
      { questionId: 'blush_indicator', selectedOptionIds: ['yes'] },
      { questionId: 'firing_confidence', selectedOptionIds: ['consistent_pale'] },
    ])
    expect(result.hetHint).toBeDefined()
    expect(result.hetHint!.length).toBeGreaterThan(0)
    // Should mention Red Base or carrier
    expect(result.hetHint!.toLowerCase()).toMatch(/red base|carrier|r\/\+/)
  })
})
