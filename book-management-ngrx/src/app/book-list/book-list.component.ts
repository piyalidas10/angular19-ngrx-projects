import { Component, inject, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../app.state';
import { CommonModule } from '@angular/common';
import { selectBooks } from '../books/book.selector';
import { BookFacade } from '../books/book.facade';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BookListComponent implements OnInit{
  bookFacade = inject(BookFacade);
  books$ = this.bookFacade.books$;
  
  ngOnInit(): void {
    this.bookFacade.load();
  }

  removeBook(bookId: number){
    this.bookFacade.remove(bookId);
  }

}
