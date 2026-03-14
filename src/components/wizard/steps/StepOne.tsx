import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { useWizardStore } from '@/store/wizardStore'

export default function StepOne() {
  const goNext = useWizardStore((s) => s.goNext)
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Step One</Text>
      <TouchableOpacity style={styles.button} onPress={goNext}>
        <Text style={styles.buttonText}>Next</Text>
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
