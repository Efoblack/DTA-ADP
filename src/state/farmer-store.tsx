/**
 * App-wide farmer state. Screens read and change data only through here, so
 * every screen stays in sync (e.g. requesting a review on a diagnosis updates
 * the Home "pending review" count and the Human Review list).
 *
 * Backend integration: initial values come from `@/data/mock-farmer` and all
 * writes go through `@/services/farmer-api`. Replace those with real API calls;
 * the screens shouldn't need to change.
 */
import { createContext, use, useState, type ReactNode } from 'react';

import {
  mockActiveFarmRecords,
  mockConsents,
  mockDataInventory,
  mockDiagnoses,
  mockLatestRecommendation,
  mockMaizeMarket,
  mockModelInfo,
  mockProfile,
  mockReviewCases,
} from '@/data/mock-farmer';
import * as api from '@/services/farmer-api';
import type {
  AccountDeletionStatus,
  AiRecommendation,
  ChatMessage,
  Consents,
  DataInventoryItem,
  DiagnosisInput,
  DiagnosisRecord,
  FarmerProfile,
  MarketComparison,
  ModelInfo,
  ReviewCase,
  ReviewSource,
} from '@/types/farmer';

type FarmerState = {
  profile: FarmerProfile;
  activeFarmRecords: number;
  modelInfo: ModelInfo;
  latestRecommendation: AiRecommendation | null;
  marketComparison: MarketComparison | null;
  dataInventory: DataInventoryItem[];

  // Consent
  consents: Consents;
  saveConsents: (next: Consents) => Promise<void>;

  // Diagnosis
  diagnoses: DiagnosisRecord[];
  submitDiagnosis: (input: DiagnosisInput) => Promise<string>;
  deleteDiagnosisImage: (diagnosisId: string) => Promise<void>;
  reportIncorrectResult: (diagnosisId: string, comment: string) => Promise<void>;

  // Human review
  reviewCases: ReviewCase[];
  /** Cases still waiting on an extension officer or on the farmer. */
  pendingReviewCount: number;
  /**
   * Create a review case. Callers must make sure extension-officer sharing is
   * on first (the backend enforces it too).
   */
  requestReview: (source: ReviewSource, summary: string) => Promise<string>;
  submitEvidence: (caseId: string, evidence: { note: string; imageUri: string | null }) => Promise<void>;

  // AI adviser
  chatMessages: ChatMessage[];
  adviserBusy: boolean;
  askAdviser: (question: string) => Promise<void>;

  // Account
  accountDeletion: AccountDeletionStatus;
  requestAccountDeletion: () => Promise<void>;
  buildDataExport: () => Promise<object>;
};

const FarmerContext = createContext<FarmerState | null>(null);

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

export function FarmerProvider({ children }: { children: ReactNode }) {
  const [consents, setConsents] = useState<Consents>(mockConsents);
  const [diagnoses, setDiagnoses] = useState<DiagnosisRecord[]>(mockDiagnoses);
  const [reviewCases, setReviewCases] = useState<ReviewCase[]>(mockReviewCases);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [adviserBusy, setAdviserBusy] = useState(false);
  const [accountDeletion, setAccountDeletion] = useState<AccountDeletionStatus>('none');

  const updateDiagnosis = (id: string, patch: Partial<DiagnosisRecord>) =>
    setDiagnoses((prev) => prev.map((d) => (d.id === id ? { ...d, ...patch } : d)));

  const pendingReviewCount = reviewCases.filter(
    (c) => c.status === 'pending' || c.status === 'needsMoreEvidence',
  ).length;

  const value: FarmerState = {
    profile: mockProfile,
    activeFarmRecords: mockActiveFarmRecords,
    modelInfo: mockModelInfo,
    latestRecommendation: mockLatestRecommendation,
    marketComparison: mockMaizeMarket,
    dataInventory: mockDataInventory,

    consents,
    saveConsents: async (next) => {
      await api.saveConsents(next);
      setConsents(next);
    },

    diagnoses,
    submitDiagnosis: async (input) => {
      const { diagnosisId, result } = await api.submitDiagnosis(input);
      const record: DiagnosisRecord = {
        id: diagnosisId,
        createdAt: new Date().toISOString(),
        cropType: input.cropType,
        district: input.district,
        symptoms: input.symptoms,
        trainingConsent: input.trainingConsent,
        imageUri: input.imageUri,
        imageDeleted: false,
        result,
        reportedIncorrect: false,
      };
      setDiagnoses((prev) => [record, ...prev]);
      return diagnosisId;
    },
    deleteDiagnosisImage: async (diagnosisId) => {
      await api.deleteDiagnosisImage(diagnosisId);
      updateDiagnosis(diagnosisId, { imageUri: null, imageDeleted: true });
    },
    reportIncorrectResult: async (diagnosisId, comment) => {
      await api.reportIncorrectResult(diagnosisId, comment);
      updateDiagnosis(diagnosisId, { reportedIncorrect: true });
    },

    reviewCases,
    pendingReviewCount,
    requestReview: async (source, summary) => {
      const { caseId } = await api.requestReview(source);
      const newCase: ReviewCase = {
        id: caseId,
        summary,
        status: 'pending',
        createdAt: new Date().toISOString(),
        source,
        evidence: [],
      };
      setReviewCases((prev) => [newCase, ...prev]);
      if (source.type === 'diagnosis') {
        updateDiagnosis(source.diagnosisId, { reviewCaseId: caseId });
      } else {
        setChatMessages((prev) =>
          prev.map((m) =>
            m.id === source.messageId && m.role === 'assistant' ? { ...m, reviewCaseId: caseId } : m,
          ),
        );
      }
      return caseId;
    },
    submitEvidence: async (caseId, evidence) => {
      const saved = await api.submitEvidence(caseId, evidence);
      setReviewCases((prev) =>
        prev.map((c) =>
          c.id === caseId ? { ...c, status: 'pending', evidence: [...c.evidence, saved] } : c,
        ),
      );
    },

    chatMessages,
    adviserBusy,
    askAdviser: async (question) => {
      const createdAt = new Date().toISOString();
      setChatMessages((prev) => [...prev, { id: uid('msg'), role: 'user', text: question, createdAt }]);
      setAdviserBusy(true);
      try {
        const answer = await api.askAdviser(question);
        setChatMessages((prev) => [
          ...prev,
          { id: uid('msg'), role: 'assistant', answer, createdAt: new Date().toISOString() },
        ]);
      } finally {
        setAdviserBusy(false);
      }
    },

    accountDeletion,
    requestAccountDeletion: async () => {
      await api.requestAccountDeletion();
      setAccountDeletion('pending');
    },
    buildDataExport: () =>
      api.fetchDataExport({
        exportedAt: new Date().toISOString(),
        profile: { name: mockProfile.name, phone: mockProfile.phone, district: mockProfile.district },
        consents,
        activeCases: reviewCases
          .filter((c) => c.status === 'pending' || c.status === 'needsMoreEvidence')
          .map((c) => c.id),
        reviewCases: reviewCases.map(({ id, summary, status, createdAt }) => ({
          id,
          summary,
          status,
          createdAt,
        })),
        diagnoses: diagnoses.map(({ id, createdAt, cropType, district, symptoms, result }) => ({
          id,
          createdAt,
          cropType,
          district,
          symptoms,
          result: result.label,
          confidence: result.confidence,
        })),
        adviserMessages: chatMessages,
      }),
  };

  return <FarmerContext value={value}>{children}</FarmerContext>;
}

export function useFarmer() {
  const ctx = use(FarmerContext);
  if (!ctx) throw new Error('useFarmer must be used inside <FarmerProvider>');
  return ctx;
}
