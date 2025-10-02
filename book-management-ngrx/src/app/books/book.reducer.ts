import { createReducer, on } from "@ngrx/store";
import { AddBook, RemoveBook, AddBookSuccess, AddBookFailure } from "./book.actions";
import { Book } from "../models/book";

export const initialState: Book[] = [];

export const BookReducer = createReducer(
    initialState,
    on(AddBook, (state) => {return state}),
    on(AddBookSuccess, (state, {id, title, author, checkInDate}) => [...state, {id, title, author, checkInDate}]),
    on(AddBookFailure, (state, {error}) => {
        console.error(error);
        return state;
    }),
    on(RemoveBook, (state, {bookId}) => state.filter(book => book.id !== bookId))
);