import type { NativeStackNavigationOptions } from 'expo-router';

import { Colors } from '@/constants/theme';

/**
 * Same header as the app's other detail pages (mirrors `detailHeader` in
 * src/app/_layout.tsx). Marketplace and payment screens apply it themselves with
 * <Stack.Screen options={...} />, so the root layout doesn't need editing and
 * titles can come from i18n.
 */
export const marketplaceHeader: NativeStackNavigationOptions = {
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: Colors.background },
  headerTintColor: Colors.textPrimary,
  headerTitleStyle: { fontWeight: '600' },
  headerBackButtonDisplayMode: 'minimal',
};
