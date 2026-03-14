import {
  generatePhenotypeQuestions,
  resolveObservation,
  getAlleleDisplayInfo,
  CRESTED_GECKO_ALLELES,
} from '../index'

describe('@morphfinder/genetics smoke tests', () => {
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
})
