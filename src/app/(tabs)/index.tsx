import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, PressableCard } from '@/components/ui/card';
import { FAB_CLEARANCE, FloatingActionButton } from '@/components/ui/floating-action-button';
import { Icon } from '@/components/ui/icon';
import { IconButton } from '@/components/ui/icon-button';
import { Colors, Layout, Radius, Space } from '@/constants/theme';
import { useT } from '@/i18n';
import { useFarmer } from '@/state/farmer-store';

const TRUST_POINTS = ['Privacy controls active', 'Secure access', 'Human review available'];

export default function HomeScreen() {
  const t = useT();
  const insets = useSafeAreaInsets();
  const { profile, activeFarmRecords, pendingReviewCount, latestRecommendation, marketComparison } =
    useFarmer();

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.content, { paddingTop: insets.top + Space.base }]}>
        {/* Greeting + notifications */}
        <View style={styles.header}>
          <View style={styles.flex}>
            <AppText variant="label" color="textSecondary">
              Welcome,
            </AppText>
            <AppText variant="h1" accessibilityRole="header">
              {profile.firstName}
            </AppText>
          </View>
          <IconButton
            icon="bell"
            accessibilityLabel={`Human review, ${pendingReviewCount} pending`}
            count={pendingReviewCount}
            onPress={() => router.push('/reviews')}
          />
        </View>

        {/* Hero */}
        <Card tone="dark" style={styles.hero}>
          <AppText variant="h3" color="textInverse">
            Make better farm decisions with transparent AI support
          </AppText>
          <AppText variant="body" color="textInverseSecondary">
            AI advice is preliminary. You remain in control and can request extension-officer review
            at any time.
          </AppText>

          <View style={styles.trustList}>
            {TRUST_POINTS.map((point) => (
              <View key={point} style={styles.trustRow}>
                <View style={styles.trustCheck}>
                  <Icon name="check" size={14} />
                </View>
                <AppText variant="label" color="textInverse">
                  {point}
                </AppText>
              </View>
            ))}
          </View>

          <View style={styles.heroActions}>
            <Button
              label="Diagnose a crop problem"
              variant="primary"
              leadingIcon="diagnose"
              fullWidth
              onPress={() => router.navigate('/diagnose')}
            />
            <Button
              label="Ask the AI adviser"
              variant="darkSecondary"
              leadingIcon="adviser"
              fullWidth
              onPress={() => router.push('/adviser')}
            />
          </View>
        </Card>

        {/* At a glance */}
        <View style={styles.section}>
          <AppText variant="h4" accessibilityRole="header">
            At a glance
          </AppText>
          <View style={styles.metricRow}>
            <Card tone="pink" style={styles.metric}>
              <Icon name="leaf" />
              <AppText variant="display">{activeFarmRecords}</AppText>
              <AppText variant="label">Active farm records</AppText>
            </Card>
            <PressableCard
              tone="blue"
              style={styles.metric}
              accessibilityLabel={`${pendingReviewCount} pending human review. Open human review`}
              onPress={() => router.push('/reviews')}>
              <View style={styles.metricTop}>
                <Icon name="people" />
                <Icon name="chevronRight" size={18} />
              </View>
              <AppText variant="display">{pendingReviewCount}</AppText>
              <AppText variant="label">Pending human review</AppText>
            </PressableCard>
          </View>
          <Card tone="mint" style={styles.sharingTile}>
            <View style={styles.sharingIcon}>
              <Icon name="lock" size={20} />
            </View>
            <View style={styles.flex}>
              <AppText variant="cardHeading">All optional</AppText>
              <AppText variant="label">Secondary data sharing</AppText>
            </View>
          </Card>
        </View>

        {/* Latest AI recommendation */}
        {latestRecommendation && (
          <View style={styles.section}>
            <AppText variant="h4" accessibilityRole="header">
              Latest AI recommendation
            </AppText>
            <Card style={styles.cardBody}>
              <Badge label="AI · Preliminary advice" tone="blue" icon="sparkles" />
              <AppText variant="cardHeading">{latestRecommendation.topic}</AppText>
              <AppText variant="body" color="textSecondary">
                {latestRecommendation.advice}
              </AppText>
              <Button
                label="View reasons and limitations"
                variant="link"
                trailingIcon="arrowRight"
                onPress={() =>
                  router.push({
                    pathname: '/adviser',
                    params: { recommendationId: latestRecommendation.id },
                  })
                }
              />
            </Card>
          </View>
        )}

        {/* Market prices — summary; full comparison opens as its own page */}
        {marketComparison && (
          <View style={styles.section}>
            <AppText variant="h4" accessibilityRole="header">
              Market prices
            </AppText>
            <Card style={styles.cardBody}>
              <Badge label="AI suggestion" tone="blue" icon="sparkles" />
              <View>
                <AppText variant="cardHeading">{marketComparison.recommendedMarket}</AppText>
                <AppText variant="body" color="textSecondary">
                  Strongest estimated return after transport
                </AppText>
              </View>

              <View>
                {marketComparison.prices.map((p, i) => {
                  const suggested = p.market === marketComparison.recommendedMarket;
                  return (
                    <View key={p.market} style={[styles.priceRow, i > 0 && styles.divider]}>
                      <View style={styles.priceMarket}>
                        <AppText variant="body">{p.market}</AppText>
                        {suggested && <Badge label="Suggested" tone="mint" icon="check" />}
                      </View>
                      <AppText variant="button">
                        {marketComparison.currency} {p.pricePer100kg}
                      </AppText>
                    </View>
                  );
                })}
              </View>
              <AppText variant="caption" color="textSecondary">
                {marketComparison.crop} · price per 100 kg
              </AppText>

              <Button
                label="View more market details"
                variant="accent"
                trailingIcon="arrowRight"
                fullWidth
                onPress={() => router.push('/market')}
              />
              <Button
                label={t('marketplace.homeEntry')}
                variant="secondary"
                leadingIcon="people"
                fullWidth
                onPress={() => router.push('/marketplace')}
              />
            </Card>
          </View>
        )}

        <View style={styles.disclaimer}>
          <Icon name="info" size={16} color="textSecondary" />
          <AppText variant="caption" color="textSecondary" style={styles.flex}>
            AI results are preliminary and do not replace an agronomist or extension officer. Check
            with a human before making high-cost decisions.
          </AppText>
        </View>
      </ScrollView>

      <FloatingActionButton
        icon="adviser"
        label="Ask AI"
        onPress={() => router.push('/adviser')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Layout.screenPadding,
    paddingBottom: FAB_CLEARANCE,
    gap: Space.xl,
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.md,
  },
  hero: {
    gap: Space.base,
    padding: Space.xl,
  },
  trustList: {
    gap: Space.sm,
  },
  trustRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.md,
  },
  trustCheck: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroActions: {
    gap: Space.md,
    marginTop: Space.xs,
  },
  section: {
    gap: Space.md,
  },
  metricRow: {
    flexDirection: 'row',
    gap: Space.md,
  },
  metric: {
    flex: 1,
    gap: Space.xs,
    borderRadius: Radius.lg,
  },
  metricTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sharingTile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.base,
    borderRadius: Radius.lg,
  },
  sharingIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.mint,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    gap: Space.md,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Space.md,
    paddingVertical: Space.md,
  },
  priceMarket: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
    flexShrink: 1,
  },
  divider: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
  disclaimer: {
    flexDirection: 'row',
    gap: Space.sm,
    alignItems: 'flex-start',
  },
});
