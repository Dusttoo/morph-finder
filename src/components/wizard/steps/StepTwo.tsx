import { useState } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { useWizardStore } from '@/store/wizardStore'
import TraitImage from '../TraitImage'
import { patternImages, getTraitImage } from '@/data/traitImages'
import {
  HarlequinSilhouette,
  FlameSilhouette,
  TigerSilhouette,
  PatternlessSilhouette,
  UnknownSilhouette,
  type SilhouetteProps,
} from '../svg/PatternSilhouettes'

// ─────────────────────────────────────────────
// Option data
// ─────────────────────────────────────────────

type PatternValue = 'HARLEQUIN' | 'FLAME' | 'TIGER' | 'PATTERNLESS' | 'UNKNOWN'

interface PatternOption {
  label: string
  shortLabel: string
  value: PatternValue
  imageKey: string
  Silhouette: React.FC<SilhouetteProps>
}

const PATTERN_OPTIONS: PatternOption[] = [
  {
    label:      'Bold side pattern with contrasting limbs',
    shortLabel: 'Harlequin',
    value:      'HARLEQUIN',
    imageKey:   'HARLEQUIN',
    Silhouette: HarlequinSilhouette,
  },
  {
    label:      'Light stripe down the back, darker sides',
    shortLabel: 'Flame',
    value:      'FLAME',
    imageKey:   'FLAME',
    Silhouette: FlameSilhouette,
  },
  {
    label:      'Bold vertical bands across the body',
    shortLabel: 'Tiger',
    value:      'TIGER',
    imageKey:   'TIGER',
    Silhouette: TigerSilhouette,
  },
  {
    label:      'Solid or very minimal pattern',
    shortLabel: 'Patternless',
    value:      'PATTERNLESS',
    imageKey:   'PATTERNLESS',
    Silhouette: PatternlessSilhouette,
  },
  {
    label:      'Not sure',
    shortLabel: 'Not sure',
    value:      'UNKNOWN',
    imageKey:   'UNKNOWN',
    Silhouette: UnknownSilhouette,
  },
]

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function StepTwo() {
  const setAnswer  = useWizardStore((s) => s.setAnswer)
  const savedValue = useWizardStore((s) => s.answers[1]) as PatternValue | undefined

  const [selected, setSelected] = useState<PatternValue | undefined>(savedValue)

  function handleSelect(value: PatternValue) {
    setSelected(value)
    setAnswer(1, value)
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* ── Question ───────────────────────────────────────────────────── */}
      <Text style={styles.question}>
        Which best describes the pattern on your gecko's body and sides?
      </Text>

      {/* ── Option cards ───────────────────────────────────────────────── */}
      <View style={styles.grid}>
        {PATTERN_OPTIONS.map((option) => {
          const isSelected = selected === option.value
          const { Silhouette } = option
          const imageSrc = getTraitImage(patternImages, option.imageKey)

          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => handleSelect(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={option.shortLabel}
              testID={`option-${option.value}`}
              activeOpacity={0.75}
            >
              {/* SVG silhouette — primary visual, always rendered */}
              <Silhouette selected={isSelected} />

              {/* Reference photo — only shown if a real image exists.
                  showFallback=false suppresses the colored placeholder since
                  the silhouette above already covers the empty state. */}
              <TraitImage
                src={imageSrc}
                alt={`${option.shortLabel} pattern reference photo`}
                size="md"
                showFallback={false}
              />

              {/* Labels */}
              <Text style={[styles.shortLabel, isSelected && styles.shortLabelSelected]}>
                {option.shortLabel}
              </Text>
              <Text style={styles.longLabel} numberOfLines={3}>
                {option.label}
              </Text>

              {/* Selection check badge */}
              {isSelected && (
                <View style={styles.checkBadge} testID={`check-${option.value}`}>
                  <Text style={styles.checkMark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

// ─────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 8,
  },
  question: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A2E1A',
    lineHeight: 24,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  card: {
    width: '47%',
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    padding: 12,
    alignItems: 'center',
    gap: 8,
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#2D5016',
    backgroundColor: '#F0F7EC',
  },
  shortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2E1A',
    textAlign: 'center',
  },
  shortLabelSelected: {
    color: '#2D5016',
  },
  longLabel: {
    fontSize: 11,
    color: '#6B7B69',
    textAlign: 'center',
    lineHeight: 15,
  },
  checkBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#2D5016',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
})
