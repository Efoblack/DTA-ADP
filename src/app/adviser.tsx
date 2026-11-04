import { router, useLocalSearchParams } from 'expo-router';
import { useHeaderHeight } from 'expo-router/react-navigation';
import { useRef, useState, type ComponentRef } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Colors, Layout, Radius, Space, Typography } from '@/constants/theme';
import { useReviewRequest } from '@/hooks/use-review-request';
import { useFarmer } from '@/state/farmer-store';
import type { AdvisoryAnswer, ChatMessage } from '@/types/farmer';

export default function AdviserScreen() {
  const { recommendationId } = useLocalSearchParams<{ recommendationId?: string }>();
  const { profile, chatMessages, adviserBusy, askAdviser, latestRecommendation } = useFarmer();
  const review = useReviewRequest();
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ComponentRef<typeof ScrollView>>(null);
  const [question, setQuestion] = useState('');

  const pinned =
    recommendationId && latestRecommendation?.id === recommendationId ? latestRecommendation : null;
  const canSend = question.trim().length > 0 && !adviserBusy;

  const send = () => {
    const q = question.trim();
    if (!q || adviserBusy) return;
    setQuestion('');
    void askAdviser(q);
  };

  /** The farmer's question that an answer replied to — used as the case summary. */
  const questionFor = (index: number) => {
    for (let i = index - 1; i >= 0; i--) {
      const m = chatMessages[i];
      if (m.role === 'user') return m.text;
    }
    return 'AI adviser answer';
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={headerHeight}
      style={styles.root}>
      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.thread}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
        <View style={styles.privacyNote}>
          <Icon name="lock" size={14} color="textSecondary" />
          <AppText variant="caption" color="textSecondary" style={styles.flex}>
            AI advice is preliminary. Conversations are kept for 12 months for safety and
            traceability.
          </AppText>
        </View>

        {pinned && (
          <View style={styles.assistantRow}>
            <View style={[styles.assistantBubble, styles.pinned]}>
              <Badge label={`About: ${pinned.topic}`} tone="mint" icon="sparkles" />
              <AnswerSections answer={pinned} />
            </View>
          </View>
        )}

        <View style={styles.assistantRow}>
          <View style={styles.assistantBubble}>
            <AppText variant="bodyLarge">
              Hello {profile.firstName}. I can provide preliminary crop, weather and market advice.
              Important decisions can be reviewed by an extension officer.
            </AppText>
          </View>
        </View>

        {chatMessages.map((m, i) => (
          <MessageBubble
            key={m.id}
            message={m}
            reviewBusy={review.busy}
            onRequestReview={() =>
              review.request(
                { type: 'advice', messageId: m.id },
                `AI advice: "${truncate(questionFor(i), 60)}"`,
              )
            }
          />
        ))}

        {adviserBusy && (
          <View style={styles.assistantRow} accessibilityLiveRegion="polite">
            <View style={[styles.assistantBubble, styles.thinking]}>
              <ActivityIndicator color={Colors.textPrimary} />
              <AppText variant="body" color="textSecondary">
                Thinking…
              </AppText>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: Math.max(insets.bottom, Space.md) }]}>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Example: Should I plant maize this week?"
          placeholderTextColor={Colors.textMuted}
          accessibilityLabel="Your question"
          multiline
          submitBehavior="submit"
          returnKeyType="send"
          onSubmitEditing={send}
          style={styles.input}
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Ask"
          accessibilityState={{ disabled: !canSend }}
          disabled={!canSend}
          onPress={send}
          style={({ pressed }) => [
            styles.send,
            !canSend && styles.sendDisabled,
            pressed && styles.sendPressed,
          ]}>
          <Icon name="send" size={22} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function MessageBubble({
  message,
  reviewBusy,
  onRequestReview,
}: {
  message: ChatMessage;
  reviewBusy: boolean;
  onRequestReview: () => void;
}) {
  if (message.role === 'user') {
    return (
      <View style={styles.userRow}>
        <View style={styles.userBubble}>
          {/* Plain <Text> — user input is never interpreted as markup. */}
          <AppText variant="bodyLarge">{message.text}</AppText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.assistantRow}>
      <View style={styles.assistantBubble}>
        <Badge label="Preliminary AI advice" tone="blue" icon="sparkles" />
        <AnswerSections answer={message.answer} />
        {message.reviewCaseId ? (
          <Button
            label={`Review requested · ${message.reviewCaseId}`}
            variant="link"
            trailingIcon="arrowRight"
            onPress={() =>
              router.push({ pathname: '/reviews/[id]', params: { id: message.reviewCaseId! } })
            }
          />
        ) : (
          <Button
            label="Ask an extension officer to review"
            variant="link"
            trailingIcon="arrowRight"
            disabled={reviewBusy}
            onPress={onRequestReview}
          />
        )}
      </View>
    </View>
  );
}

/** Advice / Why / Uncertainty — the fixed structure of every AI answer. */
function AnswerSections({ answer }: { answer: AdvisoryAnswer }) {
  const parts: [string, string][] = [
    ['Advice', answer.advice],
    ['Why', answer.why],
    ['Uncertainty', answer.uncertainty],
  ];
  return (
    <View style={styles.sections}>
      {parts.map(([label, text]) => (
        <View key={label} style={styles.part}>
          <AppText variant="label" color="textSecondary">
            {label}
          </AppText>
          <AppText variant="bodyLarge">{text}</AppText>
        </View>
      ))}
    </View>
  );
}

const truncate = (s: string, max: number) => (s.length > max ? `${s.slice(0, max - 1)}…` : s);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  thread: {
    paddingHorizontal: Layout.screenPadding,
    paddingVertical: Space.base,
    gap: Space.md,
    width: '100%',
    maxWidth: Layout.maxContentWidth,
    alignSelf: 'center',
  },
  privacyNote: {
    flexDirection: 'row',
    gap: Space.sm,
    alignItems: 'flex-start',
    marginBottom: Space.xs,
  },
  assistantRow: {
    alignItems: 'flex-start',
  },
  assistantBubble: {
    maxWidth: '90%',
    gap: Space.md,
    padding: Space.base,
    borderRadius: Radius.lg,
    borderTopLeftRadius: Radius.xs,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pinned: {
    backgroundColor: Colors.mintLight,
  },
  thinking: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Space.sm,
  },
  userRow: {
    alignItems: 'flex-end',
  },
  userBubble: {
    maxWidth: '85%',
    paddingHorizontal: Space.base,
    paddingVertical: Space.md,
    borderRadius: Radius.lg,
    borderTopRightRadius: Radius.xs,
    backgroundColor: Colors.primaryLight,
  },
  sections: {
    gap: Space.md,
  },
  part: {
    gap: Space.xs,
  },
  composer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Space.sm,
    paddingHorizontal: Layout.screenPadding,
    paddingTop: Space.md,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: Colors.border,
  },
  input: {
    ...Typography.bodyLarge,
    flex: 1,
    minHeight: Layout.buttonHeight,
    maxHeight: 120,
    paddingHorizontal: Space.lg,
    paddingTop: 14,
    paddingBottom: 14,
    borderRadius: 26,
    backgroundColor: Colors.backgroundSecondary,
    color: Colors.textPrimary,
  },
  send: {
    width: Layout.buttonHeight,
    height: Layout.buttonHeight,
    borderRadius: Layout.buttonHeight / 2,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: {
    opacity: 0.4,
  },
  sendPressed: {
    transform: [{ scale: 0.95 }],
  },
});
