import { View, Text, StyleSheet } from 'react-native'

// Placeholder — navigation is handled by WizardContainer (PROD-16).
// Real content arrives in PROD-18.
export default function StepTwo() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Step Two</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 18, color: '#4A5C46' },
})
