/**
 * Simulated payments ledger — offline-first.
 *
 * Every payment is saved on the phone first (`savedOnPhone`), then synced when
 * the phone is online (`synced`). Syncing is a MOCK: nothing is sent anywhere
 * and no real money moves. A backend would replace `uploadTransactions`.
 *
 * Module-level store (useSyncExternalStore), so no provider is needed in the
 * root layout.
 */
import * as Network from 'expo-network';
import { useSyncExternalStore } from 'react';

import { buildPriceBreakdown } from '@/services/marketplace-api';
import type {
  Dealer,
  DealerProduct,
  SimulatedPaymentMethod,
  SimulatedTransaction,
} from '@/types/marketplace';

import { loadJson, saveJson } from './persist';

const STORAGE_KEY = 'marketplace.transactions.v1';

type StoreState = {
  transactions: SimulatedTransaction[];
  /** True while saved items are being synced (visible "Syncing…" state). */
  syncing: boolean;
};

let state: StoreState = {
  transactions: loadJson<SimulatedTransaction[]>(STORAGE_KEY, []),
  syncing: false,
};
const listeners = new Set<() => void>();

function setState(patch: Partial<StoreState>) {
  state = { ...state, ...patch };
  if (patch.transactions) saveJson(STORAGE_KEY, state.transactions);
  listeners.forEach((l) => l());
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

// ── Hooks (return stable references so useSyncExternalStore doesn't loop) ────

export function useTransactions() {
  return useSyncExternalStore(subscribe, () => state.transactions, () => state.transactions);
}

export function useSyncing() {
  return useSyncExternalStore(subscribe, () => state.syncing, () => state.syncing);
}

// ── Actions ──────────────────────────────────────────────────────────────────

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Record a SIMULATED payment. Always succeeds offline: the transaction is saved
 * on the phone, then a sync is attempted.
 */
export async function recordSimulatedPayment(input: {
  dealer: Dealer;
  product: DealerProduct;
  quantity: number;
  method: SimulatedPaymentMethod;
}): Promise<SimulatedTransaction> {
  await delay(1200); // "processing" pause so the confirm step feels deliberate

  const { dealer, product, quantity, method } = input;
  const tx: SimulatedTransaction = {
    id: `tx-${Date.now()}`,
    receiptNumber: `SIM-${String(state.transactions.length + 1).padStart(4, '0')}`,
    createdAt: new Date().toISOString(),
    dealerId: dealer.id,
    productId: product.id,
    dealerName: dealer.name,
    productName: product.name,
    productUnit: product.unit,
    method,
    breakdown: buildPriceBreakdown(dealer, product, quantity),
    syncStatus: 'savedOnPhone',
    simulated: true,
  };
  setState({ transactions: [tx, ...state.transactions] });
  void syncPending();
  return tx;
}

/** MOCK upload. Backend: send the transactions, resolve when the server has them. */
async function uploadTransactions(transactions: SimulatedTransaction[]) {
  void transactions;
  await delay(1500);
}

async function isOnline() {
  try {
    const net = await Network.getNetworkStateAsync();
    return net.isConnected !== false && net.isInternetReachable !== false;
  } catch {
    return false;
  }
}

let syncInFlight = false;

/** Sync everything saved on the phone, if online. Safe to call any time. */
export async function syncPending() {
  if (syncInFlight) return;
  const pending = state.transactions.filter((t) => t.syncStatus === 'savedOnPhone');
  if (pending.length === 0 || !(await isOnline())) return;

  syncInFlight = true;
  setState({ syncing: true });
  try {
    await uploadTransactions(pending);
    const ids = new Set(pending.map((t) => t.id));
    setState({
      transactions: state.transactions.map((t) =>
        ids.has(t.id) ? { ...t, syncStatus: 'synced' } : t,
      ),
    });
  } catch {
    // Stays `savedOnPhone`; retried on the next reconnect.
  } finally {
    syncInFlight = false;
    setState({ syncing: false });
  }
}

// Retry automatically when the phone comes back online, and once at start-up.
// (Skipped during web server rendering, where there is no network API.)
if (typeof window !== 'undefined') {
  try {
    Network.addNetworkStateListener((s) => {
      if (s.isConnected && s.isInternetReachable !== false) void syncPending();
    });
    void syncPending();
  } catch {
    // Network events unavailable on this platform; syncs still run after each payment.
  }
}
