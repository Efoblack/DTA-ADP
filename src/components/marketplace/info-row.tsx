import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Icon, type IconName } from '@/components/ui/icon';
import { Space } from '@/constants/theme';

/** Icon + text line (marketplace rule: never icon-only). */
export function InfoRow({ icon, text }: { icon: IconName; text: string }) {
  return (
    <View style={styles.row}>
      <Icon name={icon} size={18} color="textSecondary" />
      <AppText variant="body" color="textSecondary" style={styles.text}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
  },
  text: {
    flex: 1,
  },
});
