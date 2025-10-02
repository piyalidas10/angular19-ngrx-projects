import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import {Observable} from 'rxjs';
import { Book } from '../models/book';
import { RemoveBook } from '../books/book.actions';
import { AppState } from '../app.state';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BookListComponent{  
  books$: Observable<Book[]>;
  
  constructor(private store: Store<AppState>) {
    this.books$ = this.store.pipe(select('book'));
  }

  removeBook(bookId: number){
    this.store.dispatch(RemoveBook({bookId}));
  }

}
