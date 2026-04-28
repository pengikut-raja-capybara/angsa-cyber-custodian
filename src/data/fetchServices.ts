// ---------------------------------------------------------------------------
// fetchServices
// Mengambil data services dari file `src/data/services.json` di branch
// `content` repo angsa-cyber-custodian via jsDelivr CDN (fallback GitHub raw).
// ---------------------------------------------------------------------------

import type { ServiceCategory } from "../types";
import { angsaCmsFetcher } from "../lib/cms";

/**
 * Fetch daftar layanan dari GitHub content branch.
 * Menyesuaikan dengan struktur PagesCMS (objek dengan field 'categories').
 * @returns Array of ServiceCategory.
 */
export async function fetchServices(): Promise<ServiceCategory[]> {
  const data = await angsaCmsFetcher.fetch<{ categories: ServiceCategory[] }>("src/data/services.json");
  return data.categories || [];
}
