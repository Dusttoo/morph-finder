import { useWizardStore } from '../wizardStore'

beforeEach(() => {
  useWizardStore.getState().reset()
})

describe('wizardStore', () => {
  it('starts with stepIndex 0 and empty answers', () => {
    const { stepIndex, answers } = useWizardStore.getState()
    expect(stepIndex).toBe(0)
    expect(answers).toEqual({})
  })

  it('goNext increments stepIndex by 1', () => {
    useWizardStore.getState().goNext()
    expect(useWizardStore.getState().stepIndex).toBe(1)
  })

  it('goNext does not exceed totalSteps - 1', () => {
    const store = useWizardStore.getState()
    // Advance to the last step
    for (let i = 0; i < store.totalSteps + 5; i++) {
      useWizardStore.getState().goNext()
    }
    expect(useWizardStore.getState().stepIndex).toBe(store.totalSteps - 1)
  })

  it('goBack decrements stepIndex by 1', () => {
    useWizardStore.getState().goNext()
    useWizardStore.getState().goBack()
    expect(useWizardStore.getState().stepIndex).toBe(0)
  })

  it('goBack does not go below 0', () => {
    useWizardStore.getState().goBack()
    useWizardStore.getState().goBack()
    expect(useWizardStore.getState().stepIndex).toBe(0)
  })

  it('setAnswer stores the answer for a step and does not overwrite other steps', () => {
    useWizardStore.getState().setAnswer(0, 'black')
    useWizardStore.getState().setAnswer(1, ['harlequin', 'pinstripe'])

    const { answers } = useWizardStore.getState()
    expect(answers[0]).toBe('black')
    expect(answers[1]).toEqual(['harlequin', 'pinstripe'])
  })

  it('reset sets stepIndex to 0 and clears answers', () => {
    useWizardStore.getState().goNext()
    useWizardStore.getState().goNext()
    useWizardStore.getState().setAnswer(1, 'harlequin')
    useWizardStore.getState().reset()

    const { stepIndex, answers } = useWizardStore.getState()
    expect(stepIndex).toBe(0)
    expect(answers).toEqual({})
  })
})
