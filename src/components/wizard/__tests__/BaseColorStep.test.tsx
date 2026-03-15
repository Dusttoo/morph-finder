import { render, fireEvent } from '@testing-library/react-native'
import StepOne from '../steps/StepOne'
import { useWizardStore } from '@/store/wizardStore'

beforeEach(() => {
  useWizardStore.getState().reset()
})

describe('BaseColorStep (StepOne)', () => {
  it('renders the question text', () => {
    const { getByText } = render(<StepOne />)
    expect(getByText('What is the most dominant color on your gecko?')).toBeTruthy()
  })

  it('renders all four option cards with correct labels', () => {
    const { getByText } = render(<StepOne />)
    expect(getByText('Dark / Black-based')).toBeTruthy()
    expect(getByText('Red / Burgundy')).toBeTruthy()
    expect(getByText('Yellow / Cream')).toBeTruthy()
    expect(getByText('Wild Type / Buckskin')).toBeTruthy()
  })

  it('renders a trait image or fallback for each option', () => {
    const { getAllByTestId, queryAllByTestId } = render(<StepOne />)
    // In the test environment Image.onError never fires, so we get real Image
    // elements. On device with missing files, fallbacks appear instead.
    // Either way, each of the 4 options must have exactly one image or fallback.
    const images    = queryAllByTestId('trait-image')
    const fallbacks = queryAllByTestId('trait-image-fallback')
    expect(images.length + fallbacks.length).toBe(4)
  })

  it('selecting an option writes to the wizard store', () => {
    const { getByTestId } = render(<StepOne />)
    fireEvent.press(getByTestId('option-RED'))
    expect(useWizardStore.getState().answers[0]).toBe('RED')
  })

  it('changing selection overwrites the previous value in the store', () => {
    const { getByTestId } = render(<StepOne />)
    fireEvent.press(getByTestId('option-RED'))
    fireEvent.press(getByTestId('option-BLACK'))
    expect(useWizardStore.getState().answers[0]).toBe('BLACK')
  })

  it('preserves a previous selection on remount', () => {
    useWizardStore.getState().setAnswer(0, 'YELLOW')
    const { getByTestId, queryByTestId } = render(<StepOne />)
    // The check badge only renders on the selected card
    expect(getByTestId('check-YELLOW')).toBeTruthy()
    expect(queryByTestId('check-BLACK')).toBeNull()
  })

  it('shows the tip text after tapping the info icon', () => {
    const { getByTestId, getByText, queryByTestId } = render(<StepOne />)
    expect(queryByTestId('tip-box')).toBeNull()
    fireEvent.press(getByTestId('tip-toggle'))
    expect(getByTestId('tip-box')).toBeTruthy()
    expect(getByText(/fired-down state/)).toBeTruthy()
  })

  it('hides the tip after tapping the info icon a second time', () => {
    const { getByTestId, queryByTestId } = render(<StepOne />)
    fireEvent.press(getByTestId('tip-toggle'))
    expect(getByTestId('tip-box')).toBeTruthy()
    fireEvent.press(getByTestId('tip-toggle'))
    expect(queryByTestId('tip-box')).toBeNull()
  })
})
