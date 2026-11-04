import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { StyleSheet } from 'react-native';

import { FARMER_TABS, TabBarContainer, TabButton } from '@/components/tab-bar';
import { Colors } from '@/constants/theme';

export default function FarmerTabsLayout() {
  return (
    <Tabs style={styles.root}>
      <TabSlot style={styles.slot} />
      {/* TabList and TabTrigger must be direct JSX here — Tabs reads them to register routes. */}
      <TabList asChild>
        <TabBarContainer>
          {FARMER_TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton icon={tab.icon} label={tab.label} />
            </TabTrigger>
          ))}
        </TabBarContainer>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  slot: {
    flex: 1,
  },
});
