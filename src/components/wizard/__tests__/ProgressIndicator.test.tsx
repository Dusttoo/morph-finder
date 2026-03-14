import { render } from '@testing-library/react-native'
import ProgressIndicator from '../ProgressIndicator'

describe('ProgressIndicator', () => {
  it('renders "Step 1 of 5"', () => {
    const { getByText } = render(<ProgressIndicator currentStep={1} totalSteps={5} />)
    expect(getByText('Step 1 of 5')).toBeTruthy()
  })

  it('renders "Step 3 of 5"', () => {
    const { getByText } = render(<ProgressIndicator currentStep={3} totalSteps={5} />)
    expect(getByText('Step 3 of 5')).toBeTruthy()
  })

  it('fill bar width reflects the correct percentage', () => {
    const { getByTestId } = render(<ProgressIndicator currentStep={2} totalSteps={5} />)
    const fill = getByTestId('progress-fill')
    // 2/5 = 40%
    expect(fill.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: '40%' }),
      ])
    )
  })
})
