import { useState } from 'react'
import { Image, View, Text, StyleSheet } from 'react-native'

type Size = 'sm' | 'md' | 'lg'

const SIZE_PX: Record<Size, number> = {
  sm: 56,
  md: 80,
  lg: 112,
}

interface Props {
  /** Image URI to load. Pass null to show the fallback immediately. */
  src: string | null
  /** Accessibility label for the image or placeholder. */
  alt: string
  /** Hex color rendered when no image is available or the load fails. */
  fallbackColor?: string
  /** Controls rendered dimensions (square). Defaults to 'md'. */
  size?: Size
}

/**
 * Reusable trait reference image used across all wizard steps.
 *
 * If `src` is null or the image fails to load, renders a colored placeholder
 * rectangle so the UI never shows a broken-image gap. Real gecko photos can
 * be dropped into public/images/traits/ at any time without touching this
 * component — just update the traitImages.ts map.
 */
export default function TraitImage({ src, alt, fallbackColor = '#9E9E9E', size = 'md' }: Props) {
  const [failed, setFailed] = useState(false)

  const px = SIZE_PX[size]
  const showFallback = src === null || failed

  if (showFallback) {
    return (
      <View
        style={[styles.placeholder, { width: px, height: px, backgroundColor: fallbackColor }]}
        accessibilityLabel={alt}
        testID="trait-image-fallback"
      >
        {src === null && (
          <Text style={styles.questionMark}>?</Text>
        )}
      </View>
    )
  }

  return (
    <Image
      source={{ uri: src }}
      style={[styles.image, { width: px, height: px }]}
      accessibilityLabel={alt}
      onError={() => setFailed(true)}
      testID="trait-image"
      resizeMode="cover"
    />
  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.08)',
  },
  placeholder: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionMark: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
  },
})
