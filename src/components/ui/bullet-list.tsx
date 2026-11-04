import { StyleSheet, View } from 'react-native';

import { Colors, Space } from '@/constants/theme';

import { AppText } from './app-text';

export function BulletList({ items, dotColor = Colors.primary }: { items: string[]; dotColor?: string }) {
  return (
    <View style={styles.list}>
      {items.map((item) => (
        <View key={item} style={styles.row}>
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
          <AppText variant="body" style={styles.text}>
            {item}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: Space.sm,
  },
  row: {
    flexDirection: 'row',
    gap: Space.md,
    alignItems: 'flex-start',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 7,
  },
  text: {
    flex: 1,
  },
});
