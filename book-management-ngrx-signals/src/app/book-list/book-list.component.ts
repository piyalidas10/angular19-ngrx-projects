import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BookStore} from '../stores/book.store';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BookListComponent{
  // Inject the BookStore
  readonly bookStore = inject(BookStore);
  books = computed(() => this.bookStore.books());

  remove(id: number) {
    this.bookStore.removeBook(id);
  }

}
