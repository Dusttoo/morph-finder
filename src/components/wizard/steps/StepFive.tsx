import { View, Text, StyleSheet } from 'react-native'

// Placeholder — navigation/reset is handled by WizardContainer (PROD-16).
// Real result screen arrives in PROD-21.
export default function StepFive() {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Step Five</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  label: { fontSize: 18, color: '#4A5C46' },
})
