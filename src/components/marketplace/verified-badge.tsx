import { Badge } from '@/components/ui/badge';
import { useT } from '@/i18n';

/** Mint "Verified" badge with a check icon (icon + text). */
export function VerifiedBadge() {
  const t = useT();
  return <Badge label={t('common.verified')} tone="mint" icon="check" />;
}
