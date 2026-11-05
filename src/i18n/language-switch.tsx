import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ChoiceChips } from '@/components/marketplace/choice-chips';
import { Notice } from '@/components/notice';
import { AppText } from '@/components/ui/app-text';
import { Badge } from '@/components/ui/badge';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { Icon } from '@/components/ui/icon';
import { Space } from '@/constants/theme';

import { LANGUAGE_NAMES, LANGUAGES, NEEDS_REVIEW, setLanguage, useLanguage, useT, type Language } from './index';

/**
 * "Language" settings row + picker sheet. Looks like the Profile screen's
 * settings rows (icon, label, value badge, chevron). Changes the marketplace
 * and payment screens; the rest of the app is English for now.
 */
export function LanguageSwitch() {
  const t = useT();
  const language = useLanguage();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<Language>(language);

  const openSheet = () => {
    setDraft(language);
    setOpen(true);
  };

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${t('common.language')}, ${LANGUAGE_NAMES[language]}`}
        onPress={openSheet}
        style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
        <Icon name="adviser" size={22} />
        <AppText variant="bodyLarge" style={styles.flex}>
          {t('common.language')}
        </AppText>
        <Badge label={LANGUAGE_NAMES[language]} tone="blue" />
        <Icon name="chevronRight" size={18} />
      </Pressable>

      <BottomSheet
        visible={open}
        onClose={() => setOpen(false)}
        title={t('common.languageSheetTitle')}
        description={t('common.languageSheetBody')}
        confirmLabel={t('common.save')}
        cancelLabel={t('common.cancel')}
        onConfirm={() => {
          setLanguage(draft);
          setOpen(false);
        }}>
        <View style={styles.sheetBody}>
          <ChoiceChips
            label={t('common.language')}
            options={LANGUAGES.map((l) => ({ value: l, label: LANGUAGE_NAMES[l] }))}
            value={draft}
            onChange={setDraft}
          />
          {NEEDS_REVIEW.has(draft) && (
            <Notice title={LANGUAGE_NAMES[draft]} icon="warning" tone="pink">
              {t('common.twiDraftNote')}
            </Notice>
          )}
        </View>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.base,
    minHeight: 56,
  },
  pressed: {
    opacity: 0.7,
  },
  flex: {
    flex: 1,
  },
  sheetBody: {
    gap: Space.md,
  },
});
