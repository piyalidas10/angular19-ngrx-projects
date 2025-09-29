import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';
import { from, Observable } from 'rxjs';

const DB_NAME = 'products-db';
const DB_VERSION = 1;
const STORE = 'products';
const META = 'meta';
const PAGE_CACHE_LIMIT = 5;

export interface PageCacheEntry {
  page: number;
  pageSize: number;
  fetchedAt: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private dbPromise: Promise<IDBPDatabase>;

  constructor() {
    this.dbPromise = this.initDB();
  }

  /**
   * 
   * @returns Promise<IDBPDatabase>
   * Initializes the IndexedDB database and object stores if they don't exist.
   * initialize two stores: 1. products 2. meta
   * products (canonical product data)
   * meta (to store pagination cache metadata)
   */
  private async initDB() {
    return openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true });
        }
        if (!db.objectStoreNames.contains(META)) {
          db.createObjectStore(META);
        }
      }
    });
  }

  async seedIfEmpty() {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE, 'readwrite');
    const count = await tx.store.count();
    if (count === 0) {
      const items = Array.from({ length: 25 }).map((_, i) => ({
        id: i + 1,
        name: `Product #${i + 1}`,
        price: Math.floor(Math.random() * 900) + 10
      }));
      for (const it of items) {
        await tx.store.add(it);
      }
    }
    await tx.done;
  }

  /**
   * 
   * @param page 
   * @param pageSize 
   * @returns 
   * If you’re using NgRx or Angular signals/observables, make sure fetchPageAsync is wrapped in an Observable or state update. 
   * Returning a plain Promise won’t trigger Angular change detection unless you await it and manually assign.
   */
  fetchPage(page: number, pageSize: number): Observable<{ items: any[], total: number }> {
    return from(this.fetchPageAsync(page, pageSize));
  }


  async fetchPageAsync(page: number, pageSize: number) {
    await this.seedIfEmpty();
    const db = await this.dbPromise;

    const total = await db.count(STORE); // total items in store
    const start = (page - 1) * pageSize; // zero-based index
    const end = start + pageSize;

    const items: any[] = [];
    let idx = 0;

    /**
     * Fetch items in a deterministic order using a cursor. This ensures consistent pagination results.
     * ✅ This works, but you’re not explicitly ordering by id. 
     * By default, it will iterate in key order (which is fine since id is keyPath), 
     * but if you ever change the store, it may break.
     * 👉 Suggestion: use an index or keep id as primary key for guaranteed order.
     * 
     * 🔎 What your code does
     * Opens a read-only transaction on the products store.
     * Starts a cursor at the beginning (null, 'next').
     * Iterates record by record, maintaining a manual counter (idx).
     * Collects only the items in [start, end).
     * Stops early once enough items are fetched.
     * Calls await tx.done to ensure the transaction completes.
     */
    const tx = db.transaction(STORE, 'readonly'); // read-only transaction
    let cursor = await tx.store.openCursor(null, 'next'); // ✅Since STORE uses id as the keyPath, and iterating with 'next', the order will always be ascending by id.
    while (cursor) {
      if (idx >= start && idx < end) {
        items.push(cursor.value);
      }
      idx++;
      cursor = await cursor.continue(); // move to next record
      if (idx >= end) break; // stop if we've collected enough items
    }
    await tx.done;

    /** 
     * update cache metadata i.e updating meta store to keep track of which pages were fetched and when
     * get('pages') → which is an array of cache entries (PageCacheEntry[]).
     * remove any existing entry for (page, pageSize) before inserting a new one.
     * prepend the new entry (cache.unshift(...)) → so newest is first.
     * If the cache array grows beyond PAGE_CACHE_LIMIT, truncate it.
     * then put the whole array back under key 'pages'.
     * This means storing all page cache metadata in a single record with key "pages".
     */
    const metaTx = db.transaction(META, 'readwrite');
    let cache: PageCacheEntry[] = (await metaTx.store.get('pages')) || [];
    cache = cache.filter(c => !(c.page === page && c.pageSize === pageSize));
    cache.unshift({ page, pageSize, fetchedAt: Date.now() });

    if (cache.length > PAGE_CACHE_LIMIT) {
      cache.splice(PAGE_CACHE_LIMIT); // drop old entries
    }
    await metaTx.store.put(cache, 'pages');
    await metaTx.done;



    await new Promise(r => setTimeout(r, 120)); // simulate latency i.e. network/db delay
    return { items, total };
  }
}
