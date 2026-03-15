import { create } from 'zustand'

export type WizardAnswers = Record<number, string | string[]>

interface WizardState {
  stepIndex: number
  totalSteps: number
  answers: WizardAnswers
  goNext: () => void
  goBack: () => void
  setAnswer: (stepIndex: number, value: string | string[]) => void
  reset: () => void
  /**
   * Returns true when the given step has a valid answer and the user may
   * advance to the next step. Steps without a validation rule default to true.
   *
   * Step 0 — base color: requires answers[0] to be set.
   * Step 1 — pattern type: requires answers[1] to be set.
   * Steps 2–4 — not yet implemented: always completable.
   */
  isStepComplete: (stepIndex: number) => boolean
}

const TOTAL_STEPS = 5

export const useWizardStore = create<WizardState>((set, get) => ({
  stepIndex: 0,
  totalSteps: TOTAL_STEPS,
  answers: {},

  goNext: () => {
    const { stepIndex, totalSteps } = get()
    if (stepIndex < totalSteps - 1) {
      set({ stepIndex: stepIndex + 1 })
    }
  },

  goBack: () => {
    const { stepIndex } = get()
    if (stepIndex > 0) {
      set({ stepIndex: stepIndex - 1 })
    }
  },

  setAnswer: (stepIndex, value) => {
    set((state) => ({
      answers: { ...state.answers, [stepIndex]: value },
    }))
  },

  reset: () => {
    set({ stepIndex: 0, answers: {} })
  },

  isStepComplete: (stepIndex) => {
    const { answers } = get()
    if (stepIndex === 0) return !!answers[0]  // base color
    if (stepIndex === 1) return !!answers[1]  // pattern type
    // Steps 2–4 add their own rules as they are built (PROD-19+)
    return true
  },
}))
