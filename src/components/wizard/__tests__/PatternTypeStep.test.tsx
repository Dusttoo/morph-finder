import { render, fireEvent } from '@testing-library/react-native'
import StepTwo from '../steps/StepTwo'
import { useWizardStore } from '@/store/wizardStore'

beforeEach(() => {
  useWizardStore.getState().reset()
})

describe('PatternTypeStep (StepTwo)', () => {
  it('renders the question text', () => {
    const { getByText } = render(<StepTwo />)
    expect(
      getByText("Which best describes the pattern on your gecko's body and sides?")
    ).toBeTruthy()
  })

  it('renders all five options with correct short labels', () => {
    const { getByText, getAllByText } = render(<StepTwo />)
    expect(getByText('Harlequin')).toBeTruthy()
    expect(getByText('Flame')).toBeTruthy()
    expect(getByText('Tiger')).toBeTruthy()
    expect(getByText('Patternless')).toBeTruthy()
    expect(getAllByText('Not sure').length).toBeGreaterThanOrEqual(1)
  })

  it('renders a silhouette for each option', () => {
    const { getAllByTestId } = render(<StepTwo />)
    const silhouettes = getAllByTestId('pattern-silhouette')
    expect(silhouettes.length).toBe(5)
  })

  it('selecting an option writes to the wizard store', () => {
    const { getByTestId } = render(<StepTwo />)
    fireEvent.press(getByTestId('option-FLAME'))
    expect(useWizardStore.getState().answers[1]).toBe('FLAME')
  })

  it('changing selection overwrites the previous value', () => {
    const { getByTestId } = render(<StepTwo />)
    fireEvent.press(getByTestId('option-FLAME'))
    fireEvent.press(getByTestId('option-TIGER'))
    expect(useWizardStore.getState().answers[1]).toBe('TIGER')
  })

  it('preserves a previous selection on remount', () => {
    useWizardStore.getState().setAnswer(1, 'TIGER')
    const { getByTestId, queryByTestId } = render(<StepTwo />)
    expect(getByTestId('check-TIGER')).toBeTruthy()
    expect(queryByTestId('check-HARLEQUIN')).toBeNull()
  })

  it('does not render an info tip toggle', () => {
    const { queryByTestId } = render(<StepTwo />)
    expect(queryByTestId('tip-toggle')).toBeNull()
    expect(queryByTestId('tip-box')).toBeNull()
  })

  it('selected card silhouette receives the selected prop', () => {
    const { getByTestId, getAllByTestId } = render(<StepTwo />)
    fireEvent.press(getByTestId('option-HARLEQUIN'))
    // The check badge is only rendered on the selected card
    expect(getByTestId('check-HARLEQUIN')).toBeTruthy()
    // All 5 silhouettes still present
    expect(getAllByTestId('pattern-silhouette').length).toBe(5)
  })

  it('does not render a colored fallback placeholder in any card', () => {
    // showFallback=false on TraitImage means null is returned when image fails/missing
    const { queryAllByTestId } = render(<StepTwo />)
    expect(queryAllByTestId('trait-image-fallback').length).toBe(0)
  })

  it('isStepComplete returns false before selection and true after', () => {
    expect(useWizardStore.getState().isStepComplete(1)).toBe(false)
    useWizardStore.getState().setAnswer(1, 'FLAME')
    expect(useWizardStore.getState().isStepComplete(1)).toBe(true)
  })
})
