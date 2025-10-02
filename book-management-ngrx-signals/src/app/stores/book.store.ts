import { signalStore, withState, patchState, withMethods } from '@ngrx/signals';
import { Book } from '../models/book';

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: []
};

/**
 * ✅ Key Points
 * signalStore automatically exposes books as a signal (so you can do store.books() in components).
 * patchState is the recommended way to update immutable state.
 * The addBook method uses Omit<Book, 'id'> to ensure the UI/form doesn’t need to provide an id.
 * Date.now() is a quick ID generator — in real-world apps, you’d likely use a UUID or backend-generated ID.
 */
export const BookStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addBook(book: Omit<Book, 'id'>) {
      const newBook: Book = { ...book, id: Date.now() }; // simple ID
      patchState(store, { books: [...store.books(), newBook] });
    },
    removeBook(id: number) {
      patchState(store, { books: store.books().filter(b => b.id !== id) });
    }
  }))
);
