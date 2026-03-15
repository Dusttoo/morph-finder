import { useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  Easing,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native'
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
  const { stepIndex, totalSteps, isStepComplete, goNext, goBack, reset } = useWizardStore()
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
  const isLastStep  = stepIndex === totalSteps - 1
  const canAdvance  = isStepComplete(stepIndex)

  function handleNext() {
    if (isLastStep) {
      reset()
    } else {
      goNext()
    }
  }

  return (
    <View style={styles.container}>
      {/* Progress indicator */}
      <View style={styles.progressWrapper}>
        <ProgressIndicator currentStep={stepIndex + 1} totalSteps={totalSteps} />
      </View>

      {/* Animated step content */}
      <Animated.View
        style={[styles.stepWrapper, { transform: [{ translateX: slideAnim }] }]}
      >
        <CurrentStep />
      </Animated.View>

      {/* Navigation footer — shell owns all navigation, steps are pure input */}
      <View style={styles.navFooter}>
        {/* Back — invisible on step 0 to keep layout stable (no width jump) */}
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonBack, stepIndex === 0 && styles.invisible]}
          onPress={goBack}
          disabled={stepIndex === 0}
          accessibilityLabel="Go back"
          testID="nav-back"
        >
          <Text style={styles.navButtonBackText}>← Back</Text>
        </TouchableOpacity>

        {/* Next / See Results */}
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonNext, !canAdvance && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!canAdvance}
          accessibilityLabel={isLastStep ? 'See results' : 'Next step'}
          testID="nav-next"
        >
          <Text style={[styles.navButtonNextText, !canAdvance && styles.navButtonNextTextDisabled]}>
            {isLastStep ? 'See Results' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
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
  navFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E8EFE6',
    backgroundColor: '#FFFFFF',
  },
  navButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  navButtonBack: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#A8C89A',
  },
  navButtonBackText: {
    color: '#4A5C46',
    fontSize: 15,
    fontWeight: '500',
  },
  navButtonNext: {
    backgroundColor: '#2D5016',
  },
  navButtonDisabled: {
    backgroundColor: '#C4C4C4',
  },
  navButtonNextText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  navButtonNextTextDisabled: {
    color: 'rgba(255,255,255,0.6)',
  },
  invisible: {
    opacity: 0,
  },
})
