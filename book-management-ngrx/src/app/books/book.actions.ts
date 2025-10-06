import { createAction, props } from "@ngrx/store";
import { Book } from "../models/book";

export const LoadBooks = createAction('[Books API] Load Books');
export const LoadBooksSuccess = createAction('[Books API] Load Books Success', props<{ books: Book[] }>());
export const LoadBooksFailure = createAction('[Books API] Load Books Failure', props<{error:any}>());

export const AddBook = createAction('[Book] Add Book', props<{ book: Book }>());
export const AddBookSuccess = createAction('[Book] Add Book Successfully', props<{ book: Book }>());
export const AddBookFailure = createAction('[Book] Add Book Failure', props<{error:any}>());

export const RemoveBook = createAction('[Book] Remove Book', props<{bookId: number}>());