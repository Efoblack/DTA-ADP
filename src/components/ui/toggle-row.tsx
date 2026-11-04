import { Pressable, StyleSheet, Switch, View } from 'react-native';

import { Colors, Space } from '@/constants/theme';

import { AppText } from './app-text';
import { Badge } from './badge';

type ToggleRowProps = {
  title: string;
  description?: string;
  value: boolean;
  onValueChange?: (value: boolean) => void;
  /** Locked rows (essential processing) show an "Always on" badge instead. */
  locked?: boolean;
};

/** A labelled switch. The whole row is tappable. */
export function ToggleRow({ title, description, value, onValueChange, locked }: ToggleRowProps) {
  const toggle = () => {
    if (!locked) onValueChange?.(!value);
  };
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={title}
      accessibilityHint={description}
      accessibilityState={{ checked: value, disabled: locked }}
      onPress={toggle}
      disabled={locked}
      style={styles.row}>
      <View style={styles.text}>
        <AppText variant="cardHeading" style={styles.title}>
          {title}
        </AppText>
        {description && (
          <AppText variant="body" color="textSecondary">
            {description}
          </AppText>
        )}
        {locked && <Badge label="Always on · essential" tone="gray" icon="lock" />}
      </View>
      <Switch
        value={value}
        onValueChange={toggle}
        disabled={locked}
        trackColor={{ false: Colors.border, true: Colors.primary }}
        thumbColor={Colors.surface}
        ios_backgroundColor={Colors.border}
        importantForAccessibility="no-hide-descendants"
        accessibilityElementsHidden
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.base,
    paddingVertical: Space.md,
  },
  text: {
    flex: 1,
    gap: Space.xs,
  },
  title: {
    fontSize: 16,
  },
});
