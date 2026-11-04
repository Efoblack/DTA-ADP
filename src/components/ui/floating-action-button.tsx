import { Pressable, StyleSheet } from 'react-native';

import { Colors, Radius, Space } from '@/constants/theme';

import { AppText } from './app-text';
import { Icon, type IconName } from './icon';

type FloatingActionButtonProps = {
  icon: IconName;
  label: string;
  onPress: () => void;
};

/**
 * Pill-shaped floating button (icon + name) pinned to the bottom-right of its
 * parent. The parent must be a flex container that fills the screen area.
 */
export function FloatingActionButton({ icon, label, onPress }: FloatingActionButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [styles.fab, pressed && styles.pressed]}>
      <Icon name={icon} size={22} />
      <AppText variant="button">{label}</AppText>
    </Pressable>
  );
}

/** Height of the button plus its offset — add to scroll content so nothing hides behind it. */
export const FAB_CLEARANCE = 56 + Space.base * 2;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: Space.lg,
    bottom: Space.base,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
    paddingHorizontal: Space.lg,
    borderRadius: Radius.full,
    backgroundColor: Colors.primary,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.96 }],
  },
});
