import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home/product/:id',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
        const ids = ['1', '2'];
        return ids.map(id => ({ id }));
    },
  },
];
