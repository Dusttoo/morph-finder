import { View, Text, StyleSheet } from 'react-native'

export default function WizardScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Morph Finder</Text>
      <Text style={styles.subheading}>
        Identify your crested gecko's morph in minutes.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    color: '#6B7280',
    lineHeight: 22,
    textAlign: 'center',
  },
})
