/**
 * SAMPLE DATA — fictional dealers and generic products for the prototype.
 * Not real businesses, not product recommendations, no real contact details.
 */
import type { Dealer } from '@/types/marketplace';

export const SAMPLE_DEALERS: Dealer[] = [
  {
    id: 'dealer-ho-01',
    name: 'Green Valley Agro Inputs',
    town: 'Ho',
    district: 'Ho West',
    distanceKm: 6,
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-08-14',
      reference: 'SAMPLE-HW-0012',
    },
    deliveryFee: 15,
    deliveryDays: 1,
    products: [
      {
        id: 'p-ho-01',
        name: 'Armyworm insecticide (sample)',
        category: 'cropProtection',
        unit: '1 L bottle',
        unitPrice: 85,
        forDiseases: ['fall-armyworm'],
        inStock: true,
      },
      {
        id: 'p-ho-02',
        name: 'Pheromone trap kit (sample)',
        category: 'cropProtection',
        unit: 'Pack of 5',
        unitPrice: 60,
        forDiseases: ['fall-armyworm'],
        inStock: true,
      },
      {
        id: 'p-ho-03',
        name: 'Hybrid maize seed (sample)',
        category: 'seed',
        unit: '5 kg bag',
        unitPrice: 120,
        forDiseases: [],
        inStock: true,
      },
    ],
  },
  {
    id: 'dealer-kp-01',
    name: 'Lakeside Farm Supplies',
    town: 'Kpando',
    district: 'Kpando',
    distanceKm: 38,
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-06-02',
      reference: 'SAMPLE-KP-0047',
    },
    deliveryFee: 25,
    deliveryDays: 2,
    products: [
      {
        id: 'p-kp-01',
        name: 'Armyworm insecticide (sample)',
        category: 'cropProtection',
        unit: '1 L bottle',
        unitPrice: 78,
        forDiseases: ['fall-armyworm'],
        inStock: true,
      },
      {
        id: 'p-kp-02',
        name: 'Blight fungicide (sample)',
        category: 'cropProtection',
        unit: '500 g pack',
        unitPrice: 70,
        forDiseases: ['early-blight'],
        inStock: false,
      },
      {
        id: 'p-kp-03',
        name: 'NPK fertiliser (sample)',
        category: 'fertiliser',
        unit: '50 kg bag',
        unitPrice: 450,
        forDiseases: [],
        inStock: true,
      },
    ],
  },
  {
    id: 'dealer-hh-01',
    name: 'Hilltop Crop Care',
    town: 'Hohoe',
    district: 'Hohoe',
    distanceKm: 54,
    verification: {
      status: 'verified',
      verifiedBy: 'District Agriculture Office (sample)',
      verifiedOn: '2026-09-21',
      reference: 'SAMPLE-HH-0008',
    },
    deliveryFee: 30,
    deliveryDays: 2,
    products: [
      {
        id: 'p-hh-01',
        name: 'Blight fungicide (sample)',
        category: 'cropProtection',
        unit: '500 g pack',
        unitPrice: 66,
        forDiseases: ['early-blight'],
        inStock: true,
      },
      {
        id: 'p-hh-02',
        name: 'Tomato seed (sample)',
        category: 'seed',
        unit: '50 g sachet',
        unitPrice: 45,
        forDiseases: [],
        inStock: true,
      },
    ],
  },
  {
    // Pending verification: kept in the data so the "verified only" rule can be
    // tested — the dealer list must not show this one.
    id: 'dealer-af-01',
    name: 'Mountain Road Traders',
    town: 'Vane',
    district: 'Afadzato South',
    distanceKm: 47,
    verification: {
      status: 'pending',
      verifiedBy: 'District Agriculture Office (sample)',
      reference: 'SAMPLE-AS-0103',
    },
    deliveryFee: 20,
    deliveryDays: 3,
    products: [
      {
        id: 'p-af-01',
        name: 'Armyworm insecticide (sample)',
        category: 'cropProtection',
        unit: '1 L bottle',
        unitPrice: 72,
        forDiseases: ['fall-armyworm'],
        inStock: true,
      },
    ],
  },
];
