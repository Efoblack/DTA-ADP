/**
 * SAMPLE DATA — fictional buyer offers for buyer matching. Prices per 100 kg.
 *
 * The maize offers are chosen so the highest headline offer is NOT the best
 * deal once transport is subtracted — this is what ranking by net value shows:
 *
 *   Offer                 Headline  Transport  Net
 *   Ridge Grain Mill        480        75      405
 *   Volta Maize Collectors  460        40      420  ← best net
 *   Ho Market Traders       430        20      410
 *   Southern Feed Co.       470        90      380
 */
import type { BuyerOffer } from '@/types/marketplace';

export const SAMPLE_BUYER_OFFERS: BuyerOffer[] = [
  {
    id: 'offer-maize-01',
    buyerName: 'Ridge Grain Mill',
    buyerType: 'processor',
    crop: 'Maize',
    market: 'Hohoe',
    district: 'Hohoe',
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-07-30',
      reference: 'SAMPLE-BUY-0021',
    },
    offerPer100kg: 480,
    transportPer100kg: 75,
    minBags: 10,
  },
  {
    id: 'offer-maize-02',
    buyerName: 'Volta Maize Collectors',
    buyerType: 'aggregator',
    crop: 'Maize',
    market: 'Kpando',
    district: 'Kpando',
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-08-05',
      reference: 'SAMPLE-BUY-0034',
    },
    offerPer100kg: 460,
    transportPer100kg: 40,
    minBags: 5,
  },
  {
    id: 'offer-maize-03',
    buyerName: 'Ho Market Traders',
    buyerType: 'trader',
    crop: 'Maize',
    market: 'Ho Central',
    district: 'Ho West',
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-09-12',
      reference: 'SAMPLE-BUY-0040',
    },
    offerPer100kg: 430,
    transportPer100kg: 20,
    minBags: 2,
  },
  {
    id: 'offer-maize-04',
    buyerName: 'Southern Feed Co.',
    buyerType: 'processor',
    crop: 'Maize',
    market: 'Vane',
    district: 'Afadzato South',
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-05-19',
      reference: 'SAMPLE-BUY-0052',
    },
    offerPer100kg: 470,
    transportPer100kg: 90,
    minBags: 20,
  },
  {
    id: 'offer-tomato-01',
    buyerName: 'Fresh Basket Aggregators',
    buyerType: 'aggregator',
    crop: 'Tomato',
    market: 'Ho Central',
    district: 'Ho West',
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-08-28',
      reference: 'SAMPLE-BUY-0061',
    },
    offerPer100kg: 640,
    transportPer100kg: 30,
    minBags: 3,
  },
  {
    id: 'offer-tomato-02',
    buyerName: 'Valley Tomato Processors',
    buyerType: 'processor',
    crop: 'Tomato',
    market: 'Kpando',
    district: 'Kpando',
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-07-11',
      reference: 'SAMPLE-BUY-0066',
    },
    offerPer100kg: 690,
    transportPer100kg: 95,
    minBags: 8,
  },
];
