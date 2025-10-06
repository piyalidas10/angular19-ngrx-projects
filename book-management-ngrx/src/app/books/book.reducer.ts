import { createReducer, on } from "@ngrx/store";
import { AddBook, RemoveBook, AddBookSuccess, AddBookFailure, LoadBooksSuccess } from "./book.actions";
import { Book } from "../models/book";

export interface BookState {
  books: Book[];
}

const initialState: BookState = {
  books: []
};

export const BookReducer = createReducer(
    initialState,
    on(LoadBooksSuccess, (state, { books }) => ({ ...state, books })),
    on(AddBook, (state) => {return state}),
    on(AddBookSuccess, (state, { book }) => ({ ...state, books: [...state.books, book] })),
    on(AddBookFailure, (state, {error}) => {
        console.error(error);
        return state;
    }),
    on(RemoveBook, (state, { bookId }) => ({
        ...state,
        books: state.books.filter(book => book.id !== bookId)
    }))
);