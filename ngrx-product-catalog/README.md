
# NgRx Product Catalog Example - Full CLI Project

What's included:
- Full Angular CLI-like project structure (configs, tsconfigs, karma)
- NgRx store with Entity, Effects, Selectors
- ProductService with IndexedDB persistence, lazy-evict cache for pages, and a server-sync stub
- Unit tests for reducer and effects (Jasmine + Karma)

How to run:
1. npm install
2. npm start      (runs ng serve)
3. npm test       (runs unit tests once using ChromeHeadless)

Notes:
- This repo is a compact, illustrative example. If you want a full generated CLI app, run `ng new` and copy files into it.
- The IndexedDB seed creates 120 mock products.
- Lazy-evict keeps only the most recent 5 pages cached and deletes older page ranges from IndexedDB (demo logic).

