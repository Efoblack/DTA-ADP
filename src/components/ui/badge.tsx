import { StyleSheet, View } from 'react-native';

import { Colors, Radius, Space, type ColorToken } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

export type BadgeTone = 'mint' | 'blue' | 'pink' | 'gray' | 'dark';

const TONES: Record<BadgeTone, { bg: string; fg: ColorToken }> = {
  mint: { bg: Colors.mint, fg: 'textPrimary' },
  blue: { bg: Colors.primaryLight, fg: 'textPrimary' },
  pink: { bg: Colors.pink, fg: 'textPrimary' },
  gray: { bg: Colors.backgroundSecondary, fg: 'textPrimary' },
  dark: { bg: Colors.surfaceDarkSecondary, fg: 'textInverse' },
};

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  icon?: IconName;
};

/** Small pill label. Always carries text so state never relies on colour alone. */
export function Badge({ label, tone = 'gray', icon }: BadgeProps) {
  const { bg, fg } = TONES[tone];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {icon && <Icon name={icon} size={12} color={fg} />}
      <AppText variant="label" color={fg}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Space.xs,
    paddingHorizontal: Space.md,
    paddingVertical: Space.xs,
    borderRadius: Radius.sm,
  },
});
