import { useEffect, useRef } from 'react'
import { Animated, Dimensions, Easing, StyleSheet, View } from 'react-native'
import { useWizardStore } from '@/store/wizardStore'
import ProgressIndicator from './ProgressIndicator'
import StepOne from './steps/StepOne'
import StepTwo from './steps/StepTwo'
import StepThree from './steps/StepThree'
import StepFour from './steps/StepFour'
import StepFive from './steps/StepFive'

const SCREEN_WIDTH = Dimensions.get('window').width

const STEPS = [StepOne, StepTwo, StepThree, StepFour, StepFive]

export default function WizardContainer() {
  const { stepIndex, totalSteps } = useWizardStore()
  const slideAnim = useRef(new Animated.Value(0)).current
  const prevStepRef = useRef(stepIndex)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    // Determine direction: forward = slide in from right, backward = from left
    const direction = stepIndex > prevStepRef.current ? 1 : -1
    prevStepRef.current = stepIndex

    // Start off-screen then animate to center
    slideAnim.setValue(direction * SCREEN_WIDTH)
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start()
  }, [stepIndex, slideAnim])

  const CurrentStep = STEPS[stepIndex]

  return (
    <View style={styles.container}>
      <View style={styles.progressWrapper}>
        <ProgressIndicator currentStep={stepIndex + 1} totalSteps={totalSteps} />
      </View>

      <Animated.View
        style={[styles.stepWrapper, { transform: [{ translateX: slideAnim }] }]}
      >
        <CurrentStep />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressWrapper: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
  },
  stepWrapper: {
    flex: 1,
  },
})
