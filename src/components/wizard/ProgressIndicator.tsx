import { View, Text, StyleSheet } from 'react-native'

interface Props {
  currentStep: number  // 1-indexed
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: Props) {
  const fillPercent = `${(currentStep / totalSteps) * 100}%` as `${number}%`

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        Step {currentStep} of {totalSteps}
      </Text>
      <View style={styles.track} testID="progress-track">
        <View style={[styles.fill, { width: fillPercent }]} testID="progress-fill" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: '#4A5C46',
    // DM Sans not loaded yet — system font fallback
  },
  track: {
    height: 6,
    backgroundColor: '#A8C89A',
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#2D5016',
    borderRadius: 3,
  },
})
