import { StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Space } from '@/constants/theme';

type ScreenIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Eyebrow + heading + short description at the top of a screen. */
export function ScreenIntro({ eyebrow, title, description }: ScreenIntroProps) {
  return (
    <View style={styles.intro}>
      <AppText variant="label" color="textSecondary">
        {eyebrow}
      </AppText>
      <AppText variant="h2" accessibilityRole="header">
        {title}
      </AppText>
      {description && (
        <AppText variant="bodyLarge" color="textSecondary">
          {description}
        </AppText>
      )}
    </View>
  );
}

export function SectionTitle({ children }: { children: string }) {
  return (
    <AppText variant="h4" accessibilityRole="header">
      {children}
    </AppText>
  );
}

const styles = StyleSheet.create({
  intro: {
    gap: Space.sm,
  },
});
