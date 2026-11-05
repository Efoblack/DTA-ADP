/**
 * Marketplace (verified dealers, buyer matching) and SIMULATED payments.
 *
 * Everything typed here is used with SAMPLE DATA only:
 * - no real dealers, buyers, products or personal data
 * - no real payment API and no real money (`simulated: true` on every transaction)
 *
 * Money is in Ghana cedi (GHS), matching the Market Prices page.
 */
import type { CropType, District } from '@/types/farmer';

export type Currency = 'GHS';

// ── Diseases ─────────────────────────────────────────────────────────────────

/**
 * Machine-readable pest/disease ids. A diagnosis result carries one of these
 * (`diseaseId`), and dealer products list the ones they are meant for
 * (`forDiseases`) — that is how the diagnosis screen links to matching dealers.
 */
export type DiseaseId = 'fall-armyworm' | 'early-blight';

// ── Verification ─────────────────────────────────────────────────────────────

export type VerificationStatus = 'verified' | 'pending';

/** Who checked a dealer or buyer, and when. Shown behind the "Verified" badge. */
export type Verification = {
  status: VerificationStatus;
  /** Body that verified them, e.g. "District Agriculture Office (sample)". */
  verifiedBy: string;
  /** ISO date; absent while pending. */
  verifiedOn?: string;
  /** Sample registration/licence reference — never a real one. */
  reference: string;
};

// ── Dealers (agro-input sellers) ─────────────────────────────────────────────

export type ProductCategory = 'cropProtection' | 'seed' | 'fertiliser';

export type DealerProduct = {
  id: string;
  name: string;
  category: ProductCategory;
  /** Pack size the price is for, e.g. "1 L bottle". */
  unit: string;
  unitPrice: number;
  /** Diseases/pests this product is intended for. Empty for seed, fertiliser, etc. */
  forDiseases: DiseaseId[];
  inStock: boolean;
};

export type Dealer = {
  id: string;
  name: string;
  town: string;
  district: District;
  /** Sample distance from the farmer's district, for display only. */
  distanceKm: number;
  verification: Verification;
  /** Flat delivery fee added to every order (part of the price breakdown). */
  deliveryFee: number;
  /** Typical delivery time in days. */
  deliveryDays: number;
  products: DealerProduct[];
};

// ── Buyer matching ───────────────────────────────────────────────────────────

export type BuyerType = 'aggregator' | 'processor' | 'trader';

/** A buyer's offer for a crop. Prices are per 100 kg, like Market Prices. */
export type BuyerOffer = {
  id: string;
  buyerName: string;
  buyerType: BuyerType;
  crop: CropType;
  /** Where the farmer would deliver. */
  market: string;
  district: District;
  verification: Verification;
  /** Headline price offered per 100 kg. */
  offerPer100kg: number;
  /** Estimated cost for the farmer to transport 100 kg to this buyer. */
  transportPer100kg: number;
  /** Smallest quantity the buyer accepts, in 100 kg bags. */
  minBags: number;
};

/** A buyer offer with its net value. Lists are ranked by `netPer100kg`, not the headline offer. */
export type RankedBuyerOffer = BuyerOffer & {
  /** offerPer100kg − transportPer100kg */
  netPer100kg: number;
  /** 1 = best net value. */
  rank: number;
};

/** "Express interest" sent to a buyer (simulated; shares crop, bags and district). */
export type BuyerInterest = {
  id: string;
  offerId: string;
  bags: number;
  createdAt: string;
  syncStatus: SyncStatus;
};

// ── Simulated payments ───────────────────────────────────────────────────────

/** Simulated methods only — nothing is charged. */
export type SimulatedPaymentMethod = 'mobileMoney' | 'cashOnDelivery';

/** Offline-first: actions are saved on the phone first, then synced. */
export type SyncStatus = 'savedOnPhone' | 'synced';

export type PriceBreakdown = {
  unitPrice: number;
  quantity: number;
  /** unitPrice × quantity */
  itemsTotal: number;
  deliveryFee: number;
  /** itemsTotal + deliveryFee */
  total: number;
  currency: Currency;
};

export type SimulatedTransaction = {
  id: string;
  /** Shown on the receipt, e.g. "SIM-0001". */
  receiptNumber: string;
  createdAt: string;
  dealerId: string;
  productId: string;
  /** Names copied at purchase time so the receipt never changes. */
  dealerName: string;
  productName: string;
  productUnit: string;
  method: SimulatedPaymentMethod;
  breakdown: PriceBreakdown;
  syncStatus: SyncStatus;
  /** Always true. This is a prototype: no real money moves. */
  simulated: true;
};

// ── Trust layer ──────────────────────────────────────────────────────────────

/** What a consent sheet asks to share, per action. */
export type SharingPurpose = 'dealerOrder' | 'buyerInterest';

export type MarketplaceAuditAction =
  | 'dealerListViewed'
  | 'dealerViewed'
  | 'buyerMatchesViewed'
  | 'consentGiven'
  | 'consentDeclined'
  | 'paymentStarted'
  | 'paymentConfirmed'
  | 'receiptViewed'
  | 'buyerInterestSent'
  | 'syncCompleted';

/** One audit-log entry, in the app's existing `FARMER | <action>` style. */
export type MarketplaceAuditEntry = {
  id: string;
  at: string;
  actor: 'FARMER';
  action: MarketplaceAuditAction;
  /** Id of the dealer, offer or transaction the action was about. */
  refId?: string;
  syncStatus: SyncStatus;
};
