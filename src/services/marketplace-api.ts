/**
 * Marketplace data access — MOCK IMPLEMENTATION over bundled SAMPLE DATA.
 *
 * Offline-first: reads are synchronous from data stored on the phone (here, the
 * bundled sample files). A real backend would refresh that local copy when
 * online; screens keep reading locally, so they work offline either way.
 */
import { SAMPLE_BUYER_OFFERS } from '@/data/marketplace/buyers';
import { SAMPLE_DEALERS } from '@/data/marketplace/dealers';
import type { CropType } from '@/types/farmer';
import type {
  Dealer,
  DealerProduct,
  DiseaseId,
  PriceBreakdown,
  RankedBuyerOffer,
} from '@/types/marketplace';

const DISEASE_IDS: readonly DiseaseId[] = ['fall-armyworm', 'early-blight'];

export function isDiseaseId(value: unknown): value is DiseaseId {
  return typeof value === 'string' && (DISEASE_IDS as readonly string[]).includes(value);
}

/** Products from this dealer that are meant for the given disease. */
export function productsForDisease(dealer: Dealer, disease: DiseaseId) {
  return dealer.products.filter((p) => p.forDiseases.includes(disease));
}

/**
 * Verified dealers only (pending ones are never listed), nearest first.
 * With `disease`, only dealers that sell at least one product for it.
 */
export function listVerifiedDealers(options?: { disease?: DiseaseId }): Dealer[] {
  const disease = options?.disease;
  return SAMPLE_DEALERS.filter((d) => d.verification.status === 'verified')
    .filter((d) => !disease || productsForDisease(d, disease).length > 0)
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

/** Any dealer by id, including pending ones (the screen decides what to allow). */
export function getDealer(dealerId: string): Dealer | undefined {
  return SAMPLE_DEALERS.find((d) => d.id === dealerId);
}

// ── Buyer matching ───────────────────────────────────────────────────────────

/** Crops that have at least one verified buyer offer, in data order. */
export function cropsWithBuyers(): CropType[] {
  const crops = SAMPLE_BUYER_OFFERS.filter((o) => o.verification.status === 'verified').map(
    (o) => o.crop,
  );
  return [...new Set(crops)];
}

/**
 * Verified buyer offers for a crop, ranked by NET value per 100 kg
 * (offer − transport), never by the headline offer. Ties go to the higher
 * headline offer, then by name, so the order is stable.
 */
export function listRankedBuyerOffers(crop: CropType): RankedBuyerOffer[] {
  return SAMPLE_BUYER_OFFERS.filter((o) => o.crop === crop && o.verification.status === 'verified')
    .map((o) => ({ ...o, netPer100kg: o.offerPer100kg - o.transportPer100kg, rank: 0 }))
    .sort(
      (a, b) =>
        b.netPer100kg - a.netPer100kg ||
        b.offerPer100kg - a.offerPer100kg ||
        a.buyerName.localeCompare(b.buyerName),
    )
    .map((o, i) => ({ ...o, rank: i + 1 }));
}

// ── Prices ───────────────────────────────────────────────────────────────────

/** Transparent price: item price × quantity, plus the dealer's flat delivery fee. */
export function buildPriceBreakdown(
  dealer: Dealer,
  product: DealerProduct,
  quantity = 1,
): PriceBreakdown {
  const itemsTotal = product.unitPrice * quantity;
  return {
    unitPrice: product.unitPrice,
    quantity,
    itemsTotal,
    deliveryFee: dealer.deliveryFee,
    total: itemsTotal + dealer.deliveryFee,
    currency: 'GHS',
  };
}
