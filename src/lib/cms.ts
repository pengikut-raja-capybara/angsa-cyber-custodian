// =============================================================================
// cms.ts — Portable CMS Fetch Utility
//
// Satu file lengkap untuk mengambil file JSON dari GitHub repo via jsDelivr CDN
// (fallback ke GitHub raw). Copy file ini ke proyek manapun untuk pakai ulang.
//
// Dependensi: tidak ada (hanya Web Fetch API standar).
//
// ─── Cara Pakai ──────────────────────────────────────────────────────────────
//
//   const cms = new CmsFetcher({ owner: 'org', repo: 'repo', branch: 'content' });
//
//   // Path dengan ekstensi → ambil satu file
//   const services = await cms.fetch<ServiceCategory[]>('src/data/services.json');
//
//   // Path tanpa ekstensi → list semua .json dalam folder
//   const posts = await cms.fetch<BlogPost[]>('content/posts');
//
// =============================================================================

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CmsSourceConfig {
  owner: string;
  repo: string;
  branch?: string;
}

// ─── Source Configuration ─────────────────────────────────────────────────────

/** Ubah nilai ini sesuai repo target proyek. */
export const DEFAULT_CMS_SOURCE: CmsSourceConfig = {
  owner: "pengikut-raja-capybara",
  repo: "angsa-cyber-custodian",
  branch: "content",
};

export const CACHE_CONFIG = {
  /** TTL cache commit SHA terbaru (ms). */
  latestRefTtlMs: 60 * 1000,
  /** Maks hit ke GitHub Branch API per window. */
  latestRefMaxHitsPerHour: 4,
  /** Durasi window rate-limit (ms). */
  latestRefWindowMs: 60 * 60 * 1000,
};

// ─── HTTP Utilities ───────────────────────────────────────────────────────────

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status}) to ${url}`);
  return (await response.json()) as T;
}

async function fetchText(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed (${response.status}) to ${url}`);
  return response.text();
}

// ─── Internal Types ───────────────────────────────────────────────────────────

type JsDelivrFlatFileEntry = { name: string; hash: string; size: number };
type JsDelivrFlatResponse = { files: JsDelivrFlatFileEntry[] };
type GitHubBranchResponse = { commit: { sha: string } };

// ─── URL Builders ─────────────────────────────────────────────────────────────

function getSourceBranch(source: CmsSourceConfig): string {
  return source.branch ?? "content";
}

function getSourceKey(source: CmsSourceConfig): string {
  return `${source.owner}/${source.repo}@${getSourceBranch(source)}`;
}

function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

function buildJsDelivrRawUrl(path: string, source: CmsSourceConfig, ref: string): string {
  return `https://cdn.jsdelivr.net/gh/${source.owner}/${source.repo}@${encodeURIComponent(ref)}/${encodePath(path)}`;
}

function buildGitHubRawUrl(path: string, source: CmsSourceConfig, ref: string): string {
  return `https://raw.githubusercontent.com/${source.owner}/${source.repo}/${encodeURIComponent(ref)}/${encodePath(path)}`;
}

function buildBranchApiUrl(source: CmsSourceConfig): string {
  return `https://api.github.com/repos/${source.owner}/${source.repo}/branches/${encodeURIComponent(getSourceBranch(source))}`;
}

function buildJsDelivrFlatApiUrl(source: CmsSourceConfig, ref: string): string {
  return `https://data.jsdelivr.com/v1/package/gh/${source.owner}/${source.repo}@${encodeURIComponent(ref)}/flat`;
}

// ─── Commit SHA Cache ─────────────────────────────────────────────────────────

const latestRefCacheBySource = new Map<string, { ref: string; fetchedAt: number }>();
const refWindowCacheBySource = new Map<string, { startsAt: number; hits: number }>();

async function getLatestContentRef(source: CmsSourceConfig): Promise<string> {
  const key = getSourceKey(source);
  const branch = getSourceBranch(source);
  const now = Date.now();

  const refCache = latestRefCacheBySource.get(key);
  if (refCache && now - refCache.fetchedAt < CACHE_CONFIG.latestRefTtlMs) {
    return refCache.ref;
  }

  const windowCache = refWindowCacheBySource.get(key);
  if (!windowCache || now - windowCache.startsAt >= CACHE_CONFIG.latestRefWindowMs) {
    refWindowCacheBySource.set(key, { startsAt: now, hits: 0 });
  }

  const currentWindow = refWindowCacheBySource.get(key)!;
  if (currentWindow.hits >= CACHE_CONFIG.latestRefMaxHitsPerHour) {
    if (refCache) return refCache.ref;
    console.warn(`Latest ref API hit limit reached (${CACHE_CONFIG.latestRefMaxHitsPerHour}/hour), fallback to branch ref`);
    return branch;
  }

  currentWindow.hits += 1;
  refWindowCacheBySource.set(key, currentWindow);

  try {
    const res = await fetchJson<GitHubBranchResponse>(buildBranchApiUrl(source));
    const ref = res.commit.sha;
    latestRefCacheBySource.set(key, { ref, fetchedAt: now });
    return ref;
  } catch (error) {
    console.warn("Failed to resolve latest commit SHA, fallback to branch ref", error);
    return branch;
  }
}

// ─── JSON Parse Helper ────────────────────────────────────────────────────────

function parseJsonContent<T>(rawText: string, sourcePath: string): T {
  try {
    return JSON.parse(rawText.trim()) as T;
  } catch (error) {
    throw new Error(`Content at ${sourcePath} is not valid JSON`, { cause: error });
  }
}

async function getFileByRawPath<T>(path: string, source: CmsSourceConfig, ref: string): Promise<T> {
  try {
    const rawText = await fetchText(buildJsDelivrRawUrl(path, source, ref));
    return parseJsonContent<T>(rawText, path);
  } catch (error) {
    console.warn("jsDelivr failed, fallback to GitHub raw", error);
    const rawText = await fetchText(buildGitHubRawUrl(path, source, ref));
    return parseJsonContent<T>(rawText, path);
  }
}

// ─── CmsFetcher ───────────────────────────────────────────────────────────────

/**
 * Fetcher reusable untuk file JSON dari GitHub repo via jsDelivr CDN.
 *
 * Gunakan method `fetch<T>(path)` sebagai entry point utama:
 * - Path **dengan ekstensi** → mengambil satu file JSON.
 * - Path **tanpa ekstensi** → mengambil semua file `.json` dalam folder tersebut.
 *
 * @example
 * const cms = new CmsFetcher({ owner: 'org', repo: 'repo', branch: 'content' });
 *
 * // Satu file (array sudah ada di dalam JSON-nya)
 * const services = await cms.fetch<ServiceCategory[]>('src/data/services.json');
 *
 * // Koleksi: tiap file .json dalam folder menjadi satu item
 * const posts = await cms.fetch<BlogPost[]>('content/posts');
 */
export class CmsFetcher {
  source: CmsSourceConfig;

  constructor(source: CmsSourceConfig) {
    this.source = source;
  }

  // ── Entry Points ───────────────────────────────────────────────────────────

  /**
   * Ambil satu file JSON dari path yang mengandung ekstensi.
   * @example cms.fetch<ServiceCategory[]>('src/data/services.json')
   * @example cms.fetch<SiteSettings>('src/data/settings.json')
   */
  async fetch<T>(path: string): Promise<T> {
    return this._fetchFile<T>(path);
  }

  /**
   * Ambil semua file `.json` dalam folder. Tiap file menjadi satu item T.
   * @example cms.fetchMany<BlogPost>('content/posts') // → BlogPost[]
   */
  async fetchMany<T>(folderPath: string): Promise<T[]> {
    return this._fetchFolder<T>(folderPath);
  }

  // ── Explicit Methods (opsional, untuk kebutuhan spesifik) ──────────────────

  /**
   * Ambil satu file JSON berdasarkan path penuh dari root repo.
   * @example cms.fetchFile<Settings>('src/data/settings.json')
   */
  async fetchFile<T>(path: string): Promise<T> {
    return this._fetchFile<T>(path);
  }

  /**
   * Ambil semua file `.json` dalam folder berdasarkan path penuh dari root repo.
   * Tiap file menjadi satu item dalam array hasil.
   * @example cms.fetchFolder<BlogPost[]>('content/posts')
   */
  async fetchFolder<T>(folderPath: string): Promise<T[]> {
    return this._fetchFolder<T>(folderPath);
  }

  /**
   * Ambil satu file `.json` berdasarkan slug di dalam folder.
   * @example cms.fetchEntry<BlogPost>('content/posts', 'my-article')
   */
  async fetchEntry<T>(folderPath: string, slug: string): Promise<T> {
    const safeSlug = slug.trim();
    if (!safeSlug) throw new Error("Invalid entry slug.");

    const path = `${folderPath.replace(/\/+$/, "")}/${safeSlug}.json`;
    const ref = await getLatestContentRef(this.source);

    try {
      return await getFileByRawPath<T>(path, this.source, ref);
    } catch (error) {
      if (error instanceof Error && error.message.includes("404")) {
        throw new Error("Konten tidak ditemukan.");
      }
      throw error;
    }
  }

  // ── Private Implementations ────────────────────────────────────────────────

  private async _fetchFile<T>(path: string): Promise<T> {
    const ref = await getLatestContentRef(this.source);
    return getFileByRawPath<T>(path, this.source, ref);
  }

  private async _fetchFolder<T>(folderPath: string): Promise<T[]> {
    const ref = await getLatestContentRef(this.source);
    const flat = await fetchJson<JsDelivrFlatResponse>(buildJsDelivrFlatApiUrl(this.source, ref));

    const normalizedFolder = folderPath.replace(/^\/+|\/+$/g, "");
    const prefix = `/${normalizedFolder}/`;

    const files = flat.files.filter((f) => f.name.startsWith(prefix) && f.name.endsWith(".json")).sort((a, b) => a.name.localeCompare(b.name));

    return Promise.all(files.map((file) => getFileByRawPath<T>(file.name.replace(/^\/+/, ""), this.source, ref)));
  }
}

// ─── Default Instance ─────────────────────────────────────────────────────────

/** Instance siap pakai untuk proyek angsa-cyber-custodian. */
export const angsaCmsFetcher = new CmsFetcher(DEFAULT_CMS_SOURCE);
