/**
 * Mock data from the AgriTrust prototype. The backend developer should replace
 * these with API responses; the shapes are defined in `@/types/farmer`.
 */
import type {
  AdvisoryAnswer,
  AiRecommendation,
  Consents,
  CropType,
  DataInventoryItem,
  DiagnosisRecord,
  DiagnosisResult,
  District,
  FarmerProfile,
  MarketComparison,
  ModelInfo,
  ReviewCase,
} from '@/types/farmer';

export const CROP_TYPES: CropType[] = ['Maize', 'Rice', 'Tomato', 'Cassava', 'Cocoa'];
export const DISTRICTS: District[] = ['Ho West', 'Kpando', 'Hohoe', 'Afadzato South'];

export const mockModelInfo: ModelInfo = {
  name: 'CropVision',
  version: 'v1.3',
  supportedCrops: ['Maize', 'Tomato', 'Rice'],
};

export const mockProfile: FarmerProfile = {
  id: 'farmer-001',
  name: 'Ama K.',
  firstName: 'Ama',
  phone: '+233 24 000 0000',
  district: 'Ho West',
};

export const mockConsents: Consents = {
  extensionOfficerSharing: true,
  modelImprovement: false,
  districtAnalytics: false,
  marketing: false,
};

export const mockActiveFarmRecords = 2;

/** The prototype's (simulated) diagnosis — returned for every submission. */
export const mockDiagnosisResult: DiagnosisResult = {
  label: 'Possible fall armyworm damage',
  diseaseId: 'fall-armyworm',
  confidence: 72,
  confidenceBand: 'Moderate',
  reasons: [
    'Irregular feeding damage matches known maize-leaf patterns.',
    'The selected crop is maize.',
    'Similar cases have been reported in the selected district.',
    'Your description mentions leaf and whorl damage.',
  ],
  limitations: [
    'The image was not physically inspected by an agronomist.',
    'Lighting and camera quality can affect the result.',
    'This model does not replace professional diagnosis.',
  ],
  nextSteps:
    'Inspect additional plants, capture a clearer close-up if possible, and request extension-officer confirmation before applying treatment.',
  modelVersion: 'CropVision v1.3',
};

export const mockDiagnoses: DiagnosisRecord[] = [
  {
    id: 'diag-014',
    createdAt: '2026-11-02T09:30:00Z',
    cropType: 'Maize',
    district: 'Ho West',
    symptoms: 'Holes in leaves and damaged maize whorl',
    trainingConsent: false,
    imageUri: null,
    imageDeleted: false,
    result: mockDiagnosisResult,
    reviewCaseId: 'AGR-2026-014',
    reportedIncorrect: false,
  },
];

export const mockReviewCases: ReviewCase[] = [
  {
    id: 'AGR-2026-014',
    summary: 'Possible fall armyworm',
    status: 'pending',
    createdAt: '2026-11-02T09:35:00Z',
    source: { type: 'diagnosis', diagnosisId: 'diag-014' },
    evidence: [],
  },
  {
    // An earlier, closed case so the "confirmed" state can be previewed.
    // Advice text is the officer assessment from the prototype.
    id: 'AGR-2026-011',
    summary: 'Possible fall armyworm',
    status: 'confirmed',
    createdAt: '2026-10-20T14:10:00Z',
    source: { type: 'diagnosis', diagnosisId: 'diag-011' },
    officerAdvice:
      'The symptoms are consistent with fall armyworm, but the farmer should inspect the whorl and provide a close-up image before treatment.',
    evidence: [],
  },
];

/** The prototype's (simulated) adviser answer — returned for every question. */
export const mockAdvisoryAnswer: AdvisoryAnswer = {
  advice: 'Consider delaying maize planting for about five days.',
  why: 'Low rainfall is forecast, the Ho West maize calendar supports a later window, and the soil condition you previously recorded is dry.',
  uncertainty:
    'Weather forecasts can change. Request an extension officer review before making a high-cost decision.',
};

export const mockLatestRecommendation: AiRecommendation = {
  id: 'rec-001',
  topic: 'Maize planting window',
  advice: 'Delay planting for approximately five days because low rainfall is forecast.',
  why: mockAdvisoryAnswer.why,
  uncertainty: mockAdvisoryAnswer.uncertainty,
};

export const mockMaizeMarket: MarketComparison = {
  crop: 'Maize',
  currency: 'GHS',
  prices: [
    { market: 'Ho Central', pricePer100kg: 420, transportCost: 35, verifiedDemand: 'Medium' },
    { market: 'Kpando', pricePer100kg: 455, transportCost: 42, verifiedDemand: 'High' },
    { market: 'Hohoe', pricePer100kg: 470, transportCost: 68, verifiedDemand: 'High' },
  ],
  recommendedMarket: 'Kpando',
  reason:
    'Suggested because the net estimated return is strongest after transport, buyer demand is high, and verified buyers completed recent transactions.',
  disclaimer: 'Prices can change. The platform does not guarantee sale or payment.',
  updatedAt: '2026-11-04T07:00:00Z',
};

export const mockDataInventory: DataInventoryItem[] = [
  {
    data: 'Phone number',
    purpose: 'Login and account recovery',
    sharedWith: 'No third party',
    retention: 'Until account deletion',
  },
  {
    data: 'Crop images',
    purpose: 'Diagnosis',
    sharedWith: 'Extension officer only when requested',
    retention: '90 days unless deleted earlier',
  },
  {
    data: 'District',
    purpose: 'Localised recommendations',
    sharedWith: 'Aggregated analytics if consented',
    retention: 'While account is active',
  },
  {
    data: 'AI interaction logs',
    purpose: 'Safety, traceability and complaints',
    sharedWith: 'Authorised auditors',
    retention: '12 months',
  },
];
