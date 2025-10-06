import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { selectBooks } from "./book.selector";
import { AddBook, LoadBooks, RemoveBook } from "./book.actions";
import { Book } from "../models/book";

@Injectable({ providedIn: 'root' })
export class BookFacade {
    private store = inject(Store);
    // Observable store data
    books$ = this.store.select(selectBooks);

    load() {
        this.store.dispatch(LoadBooks());
    }

    add(book: Omit<Book, 'id'>) {
        const newBook: Book = { ...book, id: Date.now() };
        this.store.dispatch(AddBook({ book: newBook }));
    }

    remove(bookId: number){
        this.store.dispatch(RemoveBook({bookId}));
      }
}