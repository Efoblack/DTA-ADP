import { Stack, type NativeStackNavigationOptions } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { ToastProvider } from '@/components/ui/toast';
import { Colors } from '@/constants/theme';
import { FarmerProvider } from '@/state/farmer-store';

/** Header used by detail pages pushed on top of the tabs. */
const detailHeader: NativeStackNavigationOptions = {
  headerShown: true,
  headerShadowVisible: false,
  headerStyle: { backgroundColor: Colors.background },
  headerTintColor: Colors.textPrimary,
  headerTitleStyle: { fontWeight: '600' },
  headerBackButtonDisplayMode: 'minimal',
};

export default function RootLayout() {
  return (
    <FarmerProvider>
      <ToastProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
          }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="adviser" options={{ ...detailHeader, title: 'Ask AI Adviser' }} />
          <Stack.Screen name="diagnosis/[id]" options={{ ...detailHeader, title: 'Diagnosis result' }} />
          <Stack.Screen name="market" options={{ ...detailHeader, title: 'Market Prices' }} />
          <Stack.Screen name="reviews/index" options={{ ...detailHeader, title: 'Human Review' }} />
          <Stack.Screen name="reviews/[id]" options={{ ...detailHeader, title: 'Review case' }} />
          <Stack.Screen name="privacy" options={{ ...detailHeader, title: 'My Data & Privacy' }} />
        </Stack>
      </ToastProvider>
    </FarmerProvider>
  );
}
