import { Injectable, computed, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { addBook, removeBook, updateBook, loadBooks } from './book.actions';
import { BookUIStore } from './book-ui.store';
import { take } from 'rxjs/operators';
import { selectBookById, selectBooks } from './book.selector';
import { Book } from '../models/book';

@Injectable({ providedIn: 'root' })
export class BookFacade {
  private store = inject(Store);
  private ui = inject(BookUIStore);

  // Observable store data
  books$ = this.store.select(selectBooks);

  // Signal-based UI state (computed for reactive templates)
  filter = this.ui.filter;
  sortBy = this.ui.sortBy;

  // Computed filtered books (optional if you want to filter in facade)
  filteredBooks = computed(() => {
    const filter = this.filter();
    const sort = this.sortBy();
    let books: Book[] = [];

    // This computed works if you switch to signalStore later
    // For now, we can just rely on store selector instead
    return books;
  });

  // --- CRUD Actions ---
  load() {
    this.store.dispatch(loadBooks());
  }

  add(book: Omit<Book, 'id'>) {
    const newBook: Book = { ...book, id: Date.now() };
    this.store.dispatch(addBook({ book: newBook }));
  }

  remove(id: number) {
    this.store.dispatch(removeBook({ bookId: id }));
  }

  update(book: Book) {
    this.store.dispatch(updateBook({ book }));
  }

  updateById(id: number) {
    this.store.select(selectBookById(id)).pipe(take(1)).subscribe(book => {
      if (!book) return;

      const title = prompt('Edit Title', book.title);
      const author = prompt('Edit Author', book.author);
      const checkInDate = prompt('Edit Check-In Date (YYYY-MM-DD)', book.checkInDate);

      if (title && author && checkInDate) {
        this.update({
          ...book,
          title,
          author,
          checkInDate
        });
      }
    });
  }

  // --- UI State Management ---
  setFilter(value: string) {
    this.ui.setFilter(value);
  }

  setSort(value: 'title' | 'date') {
    this.ui.setSort(value);
  }

  toggleAddDialog() {
    this.ui.toggleAddDialog();
  }
}
