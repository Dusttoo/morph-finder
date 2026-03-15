/**
 * PatternSilhouettes — View-based gecko body silhouettes for the pattern wizard step.
 *
 * Each component renders a simplified side-view gecko body (pill shape, 120×56)
 * with the defining pattern type shaded inside. overflow:hidden clips all fill
 * shapes cleanly to the body boundary.
 *
 * No external SVG library required — these render identically on iOS, Android,
 * and web, and work in Jest without mocking.
 *
 * testID="pattern-silhouette" is present on every component for test targeting.
 */

import { View, Text, StyleSheet, ViewStyle } from 'react-native'
import type { ReactNode } from 'react'

// ─────────────────────────────────────────────
// Props and shared dimensions
// ─────────────────────────────────────────────

export interface SilhouetteProps {
  selected?: boolean
  style?: ViewStyle
}

// Body pill: 120 wide × 56 tall. Pill radius = half the short axis = 28.
const BODY_W = 120
const BODY_H = 56
const RADIUS = 28

// ─────────────────────────────────────────────
// Color palette (matches BBD brand)
// ─────────────────────────────────────────────

const COLOR = {
  bodyUnsel:    '#CBD7C7',  // muted sage-grey — unselected body fill
  patternUnsel: '#7A9A7A',  // medium sage — unselected pattern marks
  bodySelFill:  '#EBF4E7',  // light sage — selected body fill
  patternSel:   '#2D5016',  // forest green — selected pattern marks
  borderUnsel:  'rgba(0,0,0,0.18)',
  borderSel:    '#2D5016',
} as const

function body(selected?: boolean) {
  return selected ? COLOR.bodySelFill : COLOR.bodyUnsel
}
function pattern(selected?: boolean) {
  return selected ? COLOR.patternSel : COLOR.patternUnsel
}

// ─────────────────────────────────────────────
// Shared pill container
// ─────────────────────────────────────────────

function SilhouetteBase({
  selected,
  style,
  bgColor,
  children,
}: {
  selected?: boolean
  style?: ViewStyle
  bgColor?: string
  children?: ReactNode
}) {
  return (
    <View
      testID="pattern-silhouette"
      style={[
        styles.body,
        {
          backgroundColor: bgColor ?? body(selected),
          borderColor: selected ? COLOR.borderSel : COLOR.borderUnsel,
        },
        style,
      ]}
    >
      {children}
    </View>
  )
}

// ─────────────────────────────────────────────
// Harlequin — bold side patches + contrasting limb corners
// ─────────────────────────────────────────────

/**
 * Bold, irregular patches fill the lateral thirds of the body.
 * Four small corner tabs represent the contrasting limbs.
 * The central 30% is left lighter — typical of harlequin geckos where the
 * dorsal/spine area contrasts with the heavily patterned flanks.
 */
export function HarlequinSilhouette({ selected, style }: SilhouetteProps) {
  const fill = pattern(selected)
  return (
    <SilhouetteBase selected={selected} style={style}>
      {/* Left flank patches */}
      <View style={[styles.abs, { top: 6,  left: 8,  width: 22, height: 35, backgroundColor: fill, borderRadius: 6 }]} />
      <View style={[styles.abs, { top: 18, left: 26, width: 14, height: 22, backgroundColor: fill, borderRadius: 4 }]} />
      {/* Right flank patches */}
      <View style={[styles.abs, { top: 6,  right: 8,  width: 22, height: 35, backgroundColor: fill, borderRadius: 6 }]} />
      <View style={[styles.abs, { top: 18, right: 26, width: 14, height: 22, backgroundColor: fill, borderRadius: 4 }]} />
      {/* Corner leg tabs — front pair */}
      <View style={[styles.abs, { top: 2,  left: 14, width: 12, height: 10, backgroundColor: fill, borderRadius: 2 }]} />
      <View style={[styles.abs, { top: 2,  right: 14, width: 12, height: 10, backgroundColor: fill, borderRadius: 2 }]} />
      {/* Corner leg tabs — rear pair */}
      <View style={[styles.abs, { bottom: 2, left: 14,  width: 12, height: 10, backgroundColor: fill, borderRadius: 2 }]} />
      <View style={[styles.abs, { bottom: 2, right: 14, width: 12, height: 10, backgroundColor: fill, borderRadius: 2 }]} />
    </SilhouetteBase>
  )
}

// ─────────────────────────────────────────────
// Flame — light dorsal stripe, darker lateral sides
// ─────────────────────────────────────────────

/**
 * The body background is set to the "darker sides" color. A lighter central
 * band runs full-height down the spine — the defining feature of flame geckos.
 * This creates the classic "light back, dark sides" silhouette.
 */
export function FlameSilhouette({ selected, style }: SilhouetteProps) {
  const darkSides = pattern(selected)
  const stripeColor = selected ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.42)'
  return (
    <SilhouetteBase selected={selected} style={style} bgColor={darkSides}>
      {/* Central dorsal stripe */}
      <View
        style={[
          styles.abs,
          {
            top: 0,
            bottom: 0,
            left: BODY_W * 0.34,
            right: BODY_W * 0.34,
            backgroundColor: stripeColor,
            borderRadius: 4,
          },
        ]}
      />
    </SilhouetteBase>
  )
}

// ─────────────────────────────────────────────
// Tiger — three even vertical bands across the body
// ─────────────────────────────────────────────

/**
 * Three evenly spaced vertical bands of equal width cross the full height of
 * the body. Clear tiger-stripe pattern, immediately distinct from all others
 * at small sizes.
 */
export function TigerSilhouette({ selected, style }: SilhouetteProps) {
  const fill = pattern(selected)
  // 3 bands, each 13px wide, starting at ~18%, 43%, 68% of body width
  const bandWidth = 14
  const positions = [
    Math.round(BODY_W * 0.17),
    Math.round(BODY_W * 0.43),
    Math.round(BODY_W * 0.69),
  ]
  return (
    <SilhouetteBase selected={selected} style={style}>
      {positions.map((left) => (
        <View
          key={left}
          style={[
            styles.abs,
            {
              top: 0,
              bottom: 0,
              left,
              width: bandWidth,
              backgroundColor: fill,
            },
          ]}
        />
      ))}
    </SilhouetteBase>
  )
}

// ─────────────────────────────────────────────
// Patternless — solid fill, zero marks
// ─────────────────────────────────────────────

/**
 * A single uniform color with no internal markings. The clean solid fill
 * immediately communicates "no pattern" by contrast with all the other
 * silhouettes on the same screen.
 */
export function PatternlessSilhouette({ selected, style }: SilhouetteProps) {
  return <SilhouetteBase selected={selected} style={style} />
}

// ─────────────────────────────────────────────
// Unknown — outline + question mark
// ─────────────────────────────────────────────

/**
 * Very light fill body with a centered "?" glyph. Signals uncertainty without
 * showing any pattern type.
 */
export function UnknownSilhouette({ selected, style }: SilhouetteProps) {
  return (
    <SilhouetteBase
      selected={selected}
      bgColor={selected ? '#EBF4E7' : '#E8EDE6'}
      style={style}
    >
      <Text
        style={[
          styles.questionMark,
          { color: selected ? COLOR.patternSel : COLOR.patternUnsel },
        ]}
      >
        ?
      </Text>
    </SilhouetteBase>
  )
}

// ─────────────────────────────────────────────
// Shared styles
// ─────────────────────────────────────────────

const styles = StyleSheet.create({
  body: {
    width: BODY_W,
    height: BODY_H,
    borderRadius: RADIUS,
    borderWidth: 1.5,
    overflow: 'hidden',
    position: 'relative',
  },
  abs: {
    position: 'absolute',
  },
  questionMark: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: BODY_H,
  },
})
