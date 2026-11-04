import { Pressable, StyleSheet, View, type PressableProps, type ViewProps } from 'react-native';

import { Colors, Radius, Space } from '@/constants/theme';

export type CardTone = 'surface' | 'dark' | 'blue' | 'mint' | 'pink' | 'gray';

const TONES: Record<CardTone, string> = {
  surface: Colors.surface,
  dark: Colors.surfaceDark,
  blue: Colors.primaryLight,
  mint: Colors.mintLight,
  pink: Colors.pinkLight,
  gray: Colors.backgroundSecondary,
};

type CardProps = ViewProps & { tone?: CardTone };

export function Card({ tone = 'surface', style, ...rest }: CardProps) {
  return (
    <View
      style={[styles.card, { backgroundColor: TONES[tone] }, tone === 'surface' && styles.outlined, style]}
      {...rest}
    />
  );
}

type PressableCardProps = Omit<PressableProps, 'style'> & {
  tone?: CardTone;
  style?: ViewProps['style'];
};

/** A card with subtle press feedback. */
export function PressableCard({ tone = 'surface', style, ...rest }: PressableCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.card,
        { backgroundColor: TONES[tone] },
        tone === 'surface' && styles.outlined,
        pressed && styles.pressed,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.xl,
    padding: Space.lg,
  },
  /** White cards sit on a near-white background, so a subtle line separates them (no shadows). */
  outlined: {
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.99 }],
  },
});
