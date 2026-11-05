import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon } from '@/components/ui/icon';
import { Colors, Radius, Space } from '@/constants/theme';

import { MIN_TAP } from './constants';

type ChoiceChipsProps<T extends string> = {
  label: string;
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

/**
 * Single-select chips — same look as the app's ChipGroup (components/ui/chip),
 * but 48px tall for the marketplace's 48px tap-target rule, and with
 * translatable labels.
 */
export function ChoiceChips<T extends string>({ label, options, value, onChange }: ChoiceChipsProps<T>) {
  return (
    <View style={styles.group}>
      <AppText variant="label">{label}</AppText>
      <View style={styles.row} accessibilityRole="radiogroup" accessibilityLabel={label}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              key={option.value}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              accessibilityLabel={option.label}
              onPress={() => onChange(option.value)}
              style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}>
              {selected && <Icon name="check" size={14} />}
              <AppText variant="button">{option.label}</AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    gap: Space.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Space.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.xs,
    minHeight: MIN_TAP,
    paddingHorizontal: Space.base,
    borderRadius: Radius.full,
    backgroundColor: Colors.backgroundSecondary,
  },
  selected: {
    backgroundColor: Colors.primaryLight,
  },
  pressed: {
    opacity: 0.8,
  },
});
