import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native'
import { useWizardStore } from '@/store/wizardStore'
import TraitImage from '../TraitImage'
import { baseColorImages, BASE_COLOR_FALLBACKS, getTraitImage } from '@/data/traitImages'

// LayoutAnimation requires this flag on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

// ─────────────────────────────────────────────
// Option data
// ─────────────────────────────────────────────

type BaseColorValue = 'BLACK' | 'RED' | 'YELLOW' | 'WILD_TYPE'

interface BaseColorOption {
  label: string
  value: BaseColorValue
  imageKey: string
}

const BASE_COLOR_OPTIONS: BaseColorOption[] = [
  { label: 'Dark / Black-based',    value: 'BLACK',     imageKey: 'BLACK'     },
  { label: 'Red / Burgundy',        value: 'RED',       imageKey: 'RED'       },
  { label: 'Yellow / Cream',        value: 'YELLOW',    imageKey: 'YELLOW'    },
  { label: 'Wild Type / Buckskin',  value: 'WILD_TYPE', imageKey: 'WILD_TYPE' },
]

const TIP_TEXT =
  'Check your gecko when it is fully relaxed or sleeping. The fired-down state shows the true base color most clearly. Ignore the pattern and look only at the background color.'

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function StepOne() {
  const setAnswer  = useWizardStore((s) => s.setAnswer)
  const savedValue = useWizardStore((s) => s.answers[0]) as BaseColorValue | undefined

  const [selected, setSelected]     = useState<BaseColorValue | undefined>(savedValue)
  const [tipVisible, setTipVisible] = useState(false)

  function handleSelect(value: BaseColorValue) {
    setSelected(value)
    setAnswer(0, value)
  }

  function toggleTip() {
    LayoutAnimation.easeInEaseOut()
    setTipVisible((v) => !v)
  }

  return (
    <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
      {/* ── Question header ─────────────────────────────────────────────── */}
      <View style={styles.questionRow}>
        <Text style={styles.question}>
          What is the most dominant color on your gecko?
        </Text>
        <TouchableOpacity
          onPress={toggleTip}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          accessibilityLabel="Show identification tip"
          accessibilityRole="button"
          testID="tip-toggle"
        >
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Expandable tip ──────────────────────────────────────────────── */}
      {tipVisible && (
        <View style={styles.tipBox} testID="tip-box">
          <Text style={styles.tipText}>{TIP_TEXT}</Text>
        </View>
      )}

      {/* ── Option cards 2×2 grid ───────────────────────────────────────── */}
      <View style={styles.grid}>
        {BASE_COLOR_OPTIONS.map((option) => {
          const isSelected = selected === option.value
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.card, isSelected && styles.cardSelected]}
              onPress={() => handleSelect(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              accessibilityLabel={option.label}
              testID={`option-${option.value}`}
              activeOpacity={0.75}
            >
              <TraitImage
                src={getTraitImage(baseColorImages, option.imageKey)}
                alt={`${option.label} reference photo`}
                fallbackColor={BASE_COLOR_FALLBACKS[option.imageKey]}
                size="lg"
              />
              <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                {option.label}
              </Text>
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
  questionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  question: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#1A2E1A',
    lineHeight: 24,
  },
  infoIcon: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#A8C89A',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  infoIconText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#2D5016',
    fontStyle: 'italic',
  },
  tipBox: {
    backgroundColor: '#F0F7EC',
    borderLeftWidth: 3,
    borderLeftColor: '#2D5016',
    borderRadius: 6,
    padding: 12,
    marginBottom: 16,
  },
  tipText: {
    fontSize: 13,
    color: '#4A5C46',
    lineHeight: 19,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
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
  cardLabel: {
    fontSize: 13,
    fontWeight: '500',
    color: '#4A5C46',
    textAlign: 'center',
  },
  cardLabelSelected: {
    color: '#2D5016',
    fontWeight: '700',
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
