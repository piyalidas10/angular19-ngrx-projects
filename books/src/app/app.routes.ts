import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', redirectTo: 'books/1', pathMatch: 'full'},
    {path: 'books/:id', 
        loadComponent: () => import('./pages/book-presenter/book-presenter.component')}
];
