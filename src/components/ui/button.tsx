import { ActivityIndicator, Pressable, StyleSheet, View, type PressableProps } from 'react-native';

import { Colors, Layout, Radius, Space, type ColorToken } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

type Variant =
  /** White pill — primary CTA on dark surfaces. */
  | 'primary'
  /** Cyan pill — primary CTA on light surfaces. */
  | 'accent'
  /** Dark gray pill — secondary action on dark surfaces. */
  | 'darkSecondary'
  /** Light gray pill — secondary action on light surfaces. */
  | 'secondary'
  /** Text-only link-style action. */
  | 'link';

const VARIANTS: Record<Variant, { bg: string; fg: ColorToken }> = {
  primary: { bg: Colors.surface, fg: 'textPrimary' },
  accent: { bg: Colors.primary, fg: 'textPrimary' },
  darkSecondary: { bg: Colors.surfaceDarkSecondary, fg: 'textInverse' },
  secondary: { bg: Colors.backgroundSecondary, fg: 'textPrimary' },
  link: { bg: 'transparent', fg: 'textPrimary' },
};

type ButtonProps = Omit<PressableProps, 'children' | 'style'> & {
  label: string;
  variant?: Variant;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  loading?: boolean;
  fullWidth?: boolean;
};

export function Button({
  label,
  variant = 'accent',
  leadingIcon,
  trailingIcon,
  loading,
  disabled,
  fullWidth,
  ...rest
}: ButtonProps) {
  const { bg, fg } = VARIANTS[variant];
  const isLink = variant === 'link';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: !!isDisabled, busy: !!loading }}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        isLink ? styles.link : styles.pill,
        { backgroundColor: bg },
        fullWidth && styles.fullWidth,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={Colors[fg]} />
      ) : (
        <View style={styles.content}>
          {leadingIcon && <Icon name={leadingIcon} size={18} color={fg} />}
          <AppText
            variant="button"
            color={fg}
            style={isLink && styles.linkText}>
            {label}
          </AppText>
          {trailingIcon && <Icon name={trailingIcon} size={16} color={fg} />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: Layout.minTouch,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pill: {
    height: Layout.buttonHeight,
    paddingHorizontal: Space.xl,
    borderRadius: Radius.full,
  },
  link: {
    alignSelf: 'flex-start',
    paddingVertical: Space.sm,
  },
  linkText: {
    textDecorationLine: 'underline',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
