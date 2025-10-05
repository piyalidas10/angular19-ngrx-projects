import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { take} from 'rxjs';
import { Book } from '../models/book';
import { loadBooks, removeBook, updateBook } from '../books/book.actions';
import { CommonModule } from '@angular/common';
import { BookUIStore } from '../books/book-ui.store';
import { BookFilterPipe } from '../shared/pipes/book-filter.pipe';
import { FormsModule } from '@angular/forms';
import { selectBooks, selectBookById } from '../books/book.selector';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, BookFilterPipe]
})
export class BookListComponent implements OnInit {
  private store = inject(Store);
  uiStore = inject(BookUIStore);
  books$ = this.store.select(selectBooks);
  
  ngOnInit() {
    this.store.dispatch(loadBooks());
    this.books$.subscribe(books => {
      console.log('Books loaded:', books);
    });
  }

  removeBook(bookId: number){
    this.store.dispatch(removeBook({bookId}));
  }

  updateBook(bookId: number) {
    this.store.select(selectBookById(bookId)).pipe(take(1)).subscribe(book => {
      if (!book) return;

      // For demo, simple prompt-based edit
      const title = prompt('Edit Title', book.title);
      const author = prompt('Edit Author', book.author);
      const checkInDate = prompt('Edit Check-In Date (YYYY-MM-DD)', book.checkInDate);

      if (title !== null && author !== null && checkInDate !== null) {
        const updatedBook: Book = { ...book, title, author, checkInDate };
        this.store.dispatch(updateBook({ book: updatedBook }));
      }
    });
  }

  onSortChange(value: string) {
    if (value === 'title' || value === 'date') {
      this.uiStore.setSort(value as 'title' | 'date');
    }
  }

}
