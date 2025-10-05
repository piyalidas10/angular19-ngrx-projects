import { createAction, props } from "@ngrx/store";
import { Book } from "../models/book";

export const loadBooks = createAction('[Books API] Load Books');
export const loadBooksSuccess = createAction('[Books API] Load Books Success', props<{ books: Book[] }>());

export const addBook = createAction('[Book] Add Book', props<{ book: Book }>());
export const addBookSuccess = createAction('[Book] Add Book Successfully', props<{ book: Book }>());
export const addBookFailure = createAction('[Book] Add Book Failure', props<{error:any}>());

export const updateBook = createAction('[Book] Update', props<{ book: Book }>());
export const removeBook = createAction('[Book] Remove Book', props<{bookId: number}>());