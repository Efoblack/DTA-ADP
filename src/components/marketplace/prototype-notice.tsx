import { Notice } from '@/components/notice';
import { useT } from '@/i18n';

/**
 * Required labels:
 * - `sampleData` on every marketplace screen
 * - `noRealMoney` on every payment screen (added with the payment screens)
 */
export function PrototypeNotice({ kind }: { kind: 'sampleData' }) {
  const t = useT();
  if (kind === 'sampleData') {
    return (
      <Notice title={t('common.sampleDataTitle')} icon="info" tone="gray">
        {t('common.sampleDataBody')}
      </Notice>
    );
  }
  return null;
}
