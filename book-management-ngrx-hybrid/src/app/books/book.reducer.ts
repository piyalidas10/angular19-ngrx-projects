import { createReducer, on } from "@ngrx/store";
import { addBook, removeBook, addBookSuccess, addBookFailure, loadBooksSuccess, updateBook } from "./book.actions";
import { Book } from "../models/book";

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: []
};

export const BookReducer = createReducer(
    initialState,
    on(loadBooksSuccess, (state, { books }) => ({ ...state, books })),
    on(addBook, (state, { book }) => ({ ...state, books: [...state.books, book] })),
    on(updateBook, (state, { book }) => ({
      ...state,
      books: state.books.map(b => b.id === book.id ? book : b)
    })),
    on(removeBook, (state, { bookId }) => ({
        ...state,
        books: state.books.filter(book => book.id !== bookId)
    }))
);