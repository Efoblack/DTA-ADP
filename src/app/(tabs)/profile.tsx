import { router, type Href } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Icon, type IconName } from '@/components/ui/icon';
import { Colors, Layout, Space } from '@/constants/theme';
import { useFarmer } from '@/state/farmer-store';
import type { ConsentPurpose } from '@/types/farmer';

const DATA_STATUS_ROWS: { purpose: ConsentPurpose; label: string }[] = [
  { purpose: 'modelImprovement', label: 'Model improvement consent' },
  { purpose: 'extensionOfficerSharing', label: 'Extension officer sharing' },
  { purpose: 'marketing', label: 'Marketing messages' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const { profile, consents, pendingReviewCount } = useFarmer();

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + Space.xl }]}>
      {/* Avatar + name */}
      <View style={styles.identity}>
        <View style={styles.avatar} accessibilityElementsHidden importantForAccessibility="no">
          <AppText variant="h1">{profile.firstName.charAt(0)}</AppText>
        </View>
        <AppText variant="h2" accessibilityRole="header">
          {profile.name}
        </AppText>
        <AppText variant="body" color="textSecondary">
          Farmer · {profile.district}
        </AppText>
      </View>

      {/* Data status (moved from the home screen) */}
      <View style={styles.section}>
        <AppText variant="h4" accessibilityRole="header">
          Your data status
        </AppText>
        <Card style={styles.cardBody}>
          {DATA_STATUS_ROWS.map(({ purpose, label }, i) => {
            const on = consents[purpose];
            return (
              <View key={purpose} style={[styles.statusRow, i > 0 && styles.divider]}>
                <AppText variant="body" style={styles.flex}>
                  {label}
                </AppText>
                <Badge
                  label={on ? 'On' : 'Off'}
                  tone={on ? 'mint' : 'gray'}
                  icon={on ? 'check' : undefined}
                />
              </View>
            );
          })}
          <Button
            label="Manage consent"
            variant="link"
            trailingIcon="arrowRight"
            onPress={() => router.push('/privacy')}
          />
        </Card>
      </View>

      {/* Settings list */}
      <View style={styles.section}>
        <AppText variant="h4" accessibilityRole="header">
          Account
        </AppText>
        <Card style={styles.list}>
          <SettingsRow icon="privacy" label="My Data & Privacy" href="/privacy" />
          <View style={styles.divider} />
          <SettingsRow
            icon="people"
            label="Human review cases"
            href="/reviews"
            detail={pendingReviewCount > 0 ? `${pendingReviewCount} pending` : undefined}
          />
          <View style={styles.divider} />
          <SettingsRow icon="leaf" label="My diagnoses" href="/diagnose" />
        </Card>
      </View>
    </ScrollView>
  );
}

function SettingsRow({
  icon,
  label,
  href,
  detail,
}: {
  icon: IconName;
  label: string;
  href: Href;
  detail?: string;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={detail ? `${label}, ${detail}` : label}
      onPress={() => router.navigate(href)}
      style={({ pressed }) => [styles.settingsRow, pressed && styles.pressed]}>
      <Icon name={icon} size={22} />
      <AppText variant="bodyLarge" style={styles.flex}>
        {label}
      </AppText>
      {detail && <Badge label={detail} tone="blue" />}
      <Icon name="chevronRight" size={18} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: Space['2xl'],
    gap: Space['2xl'],
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
  identity: {
    alignItems: 'center',
    gap: Space.xs,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space.sm,
  },
  section: {
    gap: Space.md,
  },
  cardBody: {
    gap: Space.md,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.md,
    paddingVertical: Space.sm,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  list: {
    paddingVertical: Space.xs,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.base,
    minHeight: 56,
  },
  pressed: {
    opacity: 0.7,
  },
});
