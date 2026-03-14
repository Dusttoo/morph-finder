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
}))
