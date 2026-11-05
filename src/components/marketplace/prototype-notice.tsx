import { Notice } from '@/components/notice';
import { useT } from '@/i18n';

/**
 * Required labels:
 * - `sampleData` on every marketplace screen
 * - `noRealMoney` on every payment screen
 */
export function PrototypeNotice({ kind }: { kind: 'sampleData' | 'noRealMoney' }) {
  const t = useT();
  if (kind === 'noRealMoney') {
    return (
      <Notice title={t('payments.noRealMoneyTitle')} icon="lock" tone="pink">
        {t('payments.noRealMoneyBody')}
      </Notice>
    );
  }
  return (
    <Notice title={t('common.sampleDataTitle')} icon="info" tone="gray">
      {t('common.sampleDataBody')}
    </Notice>
  );
}
