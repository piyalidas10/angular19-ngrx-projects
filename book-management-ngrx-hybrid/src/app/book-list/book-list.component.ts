import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookUIStore } from '../books/book-ui.store';
import { BookFilterPipe } from '../shared/pipes/book-filter.pipe';
import { FormsModule } from '@angular/forms';
import { BookFacade } from '../books/book.facade';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, BookFilterPipe]
})
export class BookListComponent implements OnInit {
  private facade = inject(BookFacade);
  uiStore = inject(BookUIStore);
  books$ = this.facade.books$;
  filter = this.facade.filter;
  sortBy = this.facade.sortBy;
  
  ngOnInit() {
    this.facade.load();
  }

  removeBook(bookId: string){
    this.facade.remove(bookId);
  }

  updateBook(bookId: string) {
    this.facade.isEditing.set(true);
    this.facade.bookId.set(bookId);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as 'title' | 'date';
    this.facade.setSort(value);
  }

  onFilterChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.facade.setFilter(value);
  }

}
