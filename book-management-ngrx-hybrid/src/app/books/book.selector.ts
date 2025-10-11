import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookState } from './book.reducer';

export const selectBookState = createFeatureSelector<BookState>('books');
export const selectBooks = createSelector(selectBookState, state => state.books);
export const selectBookById = (id: string) =>
  createSelector(selectBooks, (books) =>
    books.find((b) => b.id === id)
  );
