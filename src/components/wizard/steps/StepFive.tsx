import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useWizardStore } from '@/store/wizardStore'

export default function StepFive() {
  const reset = useWizardStore((s) => s.reset)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Step Five</Text>
      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.buttonText}>See Results</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 24 },
  label: { fontSize: 18, color: '#4A5C46' },
  button: { backgroundColor: '#2D5016', paddingHorizontal: 32, paddingVertical: 12, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
})
