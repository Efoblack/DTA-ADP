import { useNetworkState } from 'expo-network';

import { Notice } from '@/components/notice';
import { useT } from '@/i18n';

/**
 * True only when the device reports no connection or no internet. While the
 * state is still unknown (first render) we assume online, so the banner
 * doesn't flash on every screen open.
 */
export function useIsOffline() {
  const { isConnected, isInternetReachable } = useNetworkState();
  return isConnected === false || isInternetReachable === false;
}

/** Visible offline state for marketplace and payment screens. */
export function OfflineBanner() {
  const t = useT();
  const offline = useIsOffline();
  if (!offline) return null;
  return (
    <Notice title={t('common.offlineTitle')} icon="warning" tone="blue">
      {t('common.offlineBody')}
    </Notice>
  );
}
