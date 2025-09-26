
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { openDB } from 'idb';
import { Product } from '../models/product.model';

const DB_NAME = 'products-db';
const STORE = 'products';
const META = 'meta';
const PAGE_CACHE_LIMIT = 5; // number of pages to keep cached

interface PageCacheEntry {
  page: number;
  pageSize: number;
  fetchedAt: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(META)) {
        db.createObjectStore(META);
      }
    }
  });

  // Mock dataset generator (for demo)
  private generateMockProducts(count = 120): Product[] {
    const products: Product[] = [];
    for (let i = 1; i <= count; i++) {
      products.push({
        id: i,
        name: `Product #${i}`,
        price: Math.round(Math.random() * 1000) + 10,
        description: 'A demo product for NgRx + IndexedDB example',
        updatedAt: new Date().toISOString()
      });
    }
    return products;
  }

  // Seed DB once
  async seedIfEmpty() {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE, 'readonly');
    const count = await tx.store.count();
    if (count === 0) {
      const data = this.generateMockProducts(120);
      const tx2 = db.transaction(STORE, 'readwrite');
      for (const p of data) {
        tx2.store.put(p);
      }
      await tx2.done;
    }
  }

  // fetch a page from IndexedDB (simulates server-side paging)
  fetchPage(page: number, pageSize: number): Observable<{ items: Product[], total: number }> {
    return from(this.fetchPageAsync(page, pageSize));
  }

  private async fetchPageAsync(page: number, pageSize: number) {
    await this.seedIfEmpty();
    const db = await this.dbPromise;

    // read meta page cache entries
    const metaTx = db.transaction(META, 'readwrite');
    let cache: PageCacheEntry[] = (await metaTx.store.get('pages')) || [];

    // check if page exists - we still read items from store, but manage cache for eviction
    const all = await db.getAll(STORE);
    const total = all.length;
    const start = (page - 1) * pageSize;
    const items = all.slice(start, start + pageSize);

    // update cache entries
    cache = cache.filter(c => !(c.page === page && c.pageSize === pageSize));
    cache.unshift({ page, pageSize, fetchedAt: Date.now() });

    // if cache grows beyond limit, evict the oldest pages (remove their item ranges)
    if (cache.length > PAGE_CACHE_LIMIT) {
      const toEvict = cache.splice(PAGE_CACHE_LIMIT);
      for (const e of toEvict) {
        await this.evictPageRange(e.page, e.pageSize);
      }
    }

    await metaTx.store.put(cache, 'pages');
    await metaTx.done;

    // simulate latency
    await new Promise(r => setTimeout(r, 200));
    return { items, total };
  }

  // Evict product entries that belong only to the given page range.
  // For demo purposes we evict items by id range; in production be cautious if items span pages.
  private async evictPageRange(page: number, pageSize: number) {
    const db = await this.dbPromise;
    const tx = db.transaction(STORE, 'readwrite');
    const start = (page - 1) * pageSize + 1;
    const end = start + pageSize - 1;
    for (let id = start; id <= end; id++) {
      try { await tx.store.delete(id); } catch(e) { /* ignore */ }
    }
    await tx.done;
  }

  // Server-sync simulation: mark local changes and "push" them to server (mock)
  async syncToServer(): Promise<{ pushed: number }> {
    // In a real app you'd gather dirty items and call your API.
    // Here we just simulate a delay and return a pretend result.
    await new Promise(r => setTimeout(r, 500));
    return { pushed: 0 };
  }
}
