
# NgRx Product Catalog Pagination using IndexedDB

What's included:
- Full Angular CLI-like project structure (configs, tsconfigs, karma)
- NgRx store with Entity, Effects, Selectors
- ProductService with IndexedDB persistence, lazy-evict cache for pages, and a server-sync stub
- Unit tests for reducer and effects (Jasmine + Karma)

How to run:
1. npm install
2. npm start      (runs ng serve)
3. npm test       (runs unit tests once using ChromeHeadless)


🔄 Typical NgRx flow with IndexedDB
    -   Component dispatches an action → loadProducts({ page, pageSize })
    -   Effect catches it → calls fetchPage from your ProductService
    -   Effect dispatches success → loadProductsSuccess({ items, total })
    -   Reducer updates store → sets products and total
    -   Selector reads products → selectProducts
    -   Component subscribes → products$ = store.select(selectProducts)


## Code Explaination
block is the setup for pagination. Let’s unpack it carefully:

### 🔎 What it does

1. await this.seedIfEmpty();
    Ensures the database isn’t empty (seeds 25 demo products if needed).
    👉 This is good for a demo/dev setup, but in production you’d likely remove this.

2. const db = await this.dbPromise;
    Resolves your openDB promise, giving you the IDBPDatabase.

3. const total = await db.count(STORE);
    Fetches the total number of products in the products store.
    This is useful for:

    -   showing "Page 2 of 5"
    -   calculating how many pages exist

4. const start = (page - 1) * pageSize;
Calculates the zero-based starting index for the current page.

Example:

    -   Page = 1, PageSize = 10 → start = 0
    -   Page = 2, PageSize = 10 → start = 10
    -   Page = 3, PageSize = 10 → start = 20

5. const end = start + pageSize;
Marks the end index (exclusive) for this page.

Example:
Page = 2, PageSize = 10 → start=10, end=20.
So records [10–19] get returned.

✅ Example Walkthrough

Suppose:
    -   total = 25
    -   pageSize = 10

| Page | start | end | Items fetched                |
| ---- | ----- | --- | ---------------------------- |
| 1    | 0     | 10  | Products 1–10                |
| 2    | 10    | 20  | Products 11–20               |
| 3    | 20    | 30  | Products 21–25 (only 5 left) |


```
await this.seedIfEmpty();
    const db = await this.dbPromise;

    const total = await db.count(STORE); // total items in store
    const start = (page - 1) * pageSize; // zero-based index
    const end = start + pageSize;
```

### 🔎 What your code does
1. Opens a read-only transaction on the products store.
2. Starts a cursor at the beginning (null, 'next').
3. Iterates record by record, maintaining a manual counter (idx).
4. Collects only the items in [start, end).
5. Stops early once enough items are fetched.

Calls await tx.done to ensure the transaction completes.
```
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
```